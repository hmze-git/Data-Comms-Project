import React, { useEffect, useState,u } from "react";
import ReactHlsPlayer from "react-hls-video-player"
import api from "../services/api";
import { useLocation } from 'react-router-dom';
import {MEDIA_URL} from "../services/mediaURL"


const VideoPlayer = () => {

const [videoData, setVideoData] = useState({})
const [userDetails,setUserDetails]= useState({})

const BASE_URL= window.location.origin
const location = useLocation()
const vidId= location.state?.vId
const vidTitle= location.state?.vidTitle
const vidUpDate= location.state?.vId


useEffect(()=>{


    const fetchVidData = async ()=>{

        try {
            const response = await api.get(`/post/video/getVideos/${vidId}`)

            if (response.data.Success ===true){
                 setVideoData({...response.data.videoDetails})
                setUserDetails({...response.data.Uploader})
            }
        } catch (error) {
                console.log("Failed gettign player details")
                alert("failed loading player stuff")
        }


    }
     fetchVidData()

},[vidId])



    return (
        <div class="anime-details spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="anime__video__player">

                            <ReactHlsPlayer

                                src={
                                        !!videoData ? `${MEDIA_URL}${videoData.hslPath}` : ""

                                }
                                autoPlay={false}
                                controls={true}
                                disablePictureInPicture={false}
                                width="100%"
                                height="auto"
                            />
                       
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8">
                        <div class="anime__details__review">
                            <div class="section-title">
                                <h5>{vidTitle}              by: {userDetails?.username}</h5>
                            </div>
                            <div class="anime__review__item">
                                <h5>{userDetails?.username}</h5>
                            </div>
                            <div class="anime__details__form">
                                <div class="section-title">
                                    <h5>Description</h5>
                                </div>
                                <form action="#">
                                    <textarea readOnly={true} value={videoData?.description} style={{fontWeight:'bold',color:'black'}}/>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )

}

export default VideoPlayer
