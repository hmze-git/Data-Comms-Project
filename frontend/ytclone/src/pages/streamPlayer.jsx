import React, { useEffect, useState,u } from "react";
import ReactHlsPlayer from "react-hls-video-player"
import api from "../services/api";
import { useParams } from 'react-router-dom';
import {MEDIA_URL} from "../services/mediaURL"


const StreamPlayer = () => {

const [streamData, setStreamData] = useState({})
const [streamerDetails,setStreamerDetails]= useState("")

const BASE_URL= window.location.origin
const {streamKey}= useParams()


useEffect(()=>{


    const fetchStreamData = async ()=>{

        try {
            const response = await api.get(`/stream/${streamKey}`)

            if (response.data.Success ===true){
                setStreamData({...response.data})
                setStreamerDetails({...response.data.streamer})

                console.log( `${MEDIA_URL}${response.data.urlLiveVid}`)
            }
        } catch (error) {
                console.log("Failed gettign player details")
                alert("failed loading player stuff")
        }


    }
     fetchStreamData()


},[streamKey])



    return (
        <div class="anime-details spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="anime__video__player">

                            <ReactHlsPlayer

                                src={
                                        !!streamData ? `${MEDIA_URL}${streamData.urlLiveVid}` : ""

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
                                <h5>Reviews</h5>
                            </div>
                            <div class="anime__review__item">
                                <div class="anime__review__item__pic">
                                    <img src="img/anime/review-1.jpg" alt="" />
                                </div>
                            </div>
                            <div class="anime__details__form">
                                <div class="section-title">
                                    <h5>Your Comment</h5>
                                </div>
                                <form action="#">
                                    <textarea placeholder="Your Comment"></textarea>
                                    <button type="submit"><i class="fa fa-location-arrow"></i> Review</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )

}

export default StreamPlayer
