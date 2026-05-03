from .celery_app import celery #import the established celery connection to reddis 
from  Extensions.extensions import minio_client
import os
import subprocess

@celery.task 
def tanscode_video(objKey,vidId,userId):

    print("made it to transcode yipee")
    try:
        tmp_dir= "/tmp"
        raw_path=f"{tmp_dir}/raw"
        hsl_path=f"{tmp_dir}/hsl/{vidId}"

        os.makedirs(raw_path,exist_ok=True)
        os.makedirs(hsl_path,exist_ok=True)

    
    #minio Fget bucketname,files name in minio,where to save once pulled
        minio_client.fget_object("videos",objKey,f"{raw_path}/{vidId}.mp4")

 
        print("made it to ffmpeh yipee")
        result = subprocess.run([
            'ffmpeg',
            '-i',
            f'{raw_path}.mp4',
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
        
        if result.returncode !=0:
            raise Exception(f"FFmpeg fail: {result.stderr}")
        
        for filenames in os.listdir(hsl_path):
        # Fput bucketname, object name(what to save it as), which file to send
            fpath= f"{hsl_path}/{filenames}"
            storageKey=f"users/{userId}/hsl/{vidId}/{filenames}"
            minio_client.fput_object("videos",storageKey,fpath)


        os.remove(f"{raw_path}/{vidId}.mp4")
        for file in os.listdir(hsl_path):
            os.remove(f"{hsl_path}/{file}")
        os.rmdir(hsl_path)


        print("done transcoding to minio yipppeee")
    except Exception as e:
        print(f"transcoding failed {e}")