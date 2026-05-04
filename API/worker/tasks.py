from .celery_app import celery #import the established celery connection to reddis 
from  Extensions.extensions import minio_client
from models.videoModel import VideoModel
import os
import subprocess
import mysql.connector



@celery.task 
def tanscode_video(objKey,vidId,userId):

    print("made it to transcode yipee")
    try:
        tmp_dir= "/tmp"
        raw_path=f"{tmp_dir}/raw"
        hsl_path=f"{tmp_dir}/hsl/{vidId}"
        thumb_path=f"{tmp_dir}/thumbnail/{vidId}"

        os.makedirs(raw_path,exist_ok=True)
        os.makedirs(hsl_path,exist_ok=True)
        os.makedirs(thumb_path,exist_ok=True)

    
    #minio Fget bucketname,files name in minio,where to save once pulled
        minio_client.fget_object("videos",objKey,f"{raw_path}/{vidId}.mp4")

 
        print("made it to ffmpeh yipee")
        result = subprocess.run([
            'ffmpeg',
            '-i',
            f'{raw_path}/{vidId}.mp4',
            '-c:v', 'libx264',
            '-c:a', 'aac',
            '-f',
            'hls',
            '-hls_time',
            '10',
            '-hls_list_size',
            '0',
            '-hls_playlist_type',
            'vod',
            '-hls_segment_filename',
            f'{hsl_path}/segment%03d.ts',
            f'{hsl_path}/index.m3u8'
            
            ],capture_output=True,text=True)
        print("made it to thumbnail gen")
        thumbnail= subprocess.run([ 
            'ffmpeg',
            '-i',
            f'{raw_path}/{vidId}.mp4',
            '-vf',
            'thumbnail',
            '-frames:v',
            '1',
            f"{thumb_path}/thumb.jpg",
            ],capture_output=True,text=True)
        
        if result.returncode !=0 :
            raise Exception(f"FFmpeg fail: {result.stderr}")
         
        if thumbnail.returncode !=0 :
            raise Exception(f" THumbnail FFmpeg fail: {thumbnail.stderr}")
        
        for filenames in os.listdir(hsl_path):
        # Fput bucketname, object name(what to save it as), which file to send
            fpath= f"{hsl_path}/{filenames}"
            storageKey=f"users/{userId}/hsl/{vidId}/{filenames}"
            minio_client.fput_object("videos",storageKey,fpath)

        minio_client.fput_object("videos",f"users/{userId}/thumbnail/{vidId}/thumb.jpg",f"{thumb_path}/thumb.jpg")
        update_vidStatus(vidId,
                         "processed",
                         f"users/{userId}/hsl/{vidId}/index.m3u8",f"users/{userId}/thumbnail/{vidId}/thumb.jpg")

        os.remove(f"{raw_path}/{vidId}.mp4")

        for file in os.listdir(hsl_path):
            os.remove(f"{hsl_path}/{file}")
        os.rmdir(hsl_path)


    except Exception as e:
        print(f"transcoding failed {e}")
        update_vidStatus(vidId,
                         "failed",
                         "None","None")



def update_vidStatus(vidId,status,hslPath,thumbPath):
    try:

        #ENV should work but if it doesnt
        #ORM problems sometimes  so avoid it
        connection= mysql.connector.connect(
            host=os.getenv("DB_HOST","db"),
            port=os.getenv("DB_PORT",3306),
            user=os.getenv("DB_USER","root"),
            password=os.getenv("DB_PASS","Pass"),
            database=os.getenv("DB_NAME","dbdatacoms"),
        )
        cursor = connection.cursor()

        cursor.execute(
            "UPDATE video  SET upload_status=%s, hslPath=%s, thumbnailPath=%s WHERE id=%s ",
            (status,hslPath,thumbPath,vidId)
        )
        connection.commit()
        connection.close()
       
    except Exception as e:
        print(f'Failed db vid update : {e}')


    
