import React, { useContext, useEffect, useState } from "react";
import VidCard from "../components/vidCard";

import api from "../services/api";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import Swal from "sweetalert2";

const CreateStreams = () => {

    const {user} = useContext(AuthContext)

    const [streamTile, setStreamTitle] = useState("")
    const [streamKey, setStreamKey] = useState("")
    const [streamUrl, setStreamUrl] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0)

    const LIMIT = 9


    const handleTitleChange = (e) => {
        setStreamTitle(e.target.value);
    };


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };


      if (!user) {
  return <div>Loading...</div>;
}

    const generateStreamKey = async (e) => {
        e.preventDefault()
        try {

            const details = {
                title:streamTile,
                userId:user.id,

            }

            const response = await api.post("/stream/create",details)

            console.log("Stream jey generated ",response.data)
            if(response.data.success){
                setStreamKey(response.data.StreamKey)
                setStreamUrl(response.data.streamURL)


            }

        } catch (error) {
            console.log(error)
        }

    }


    const displayStreamingInstructions = ()=>{

        return !!streamKey? (

   <div className="row">
                    <div className="col">
                       
                     <div class="anime__details__review">
                            <div class="section-title">
                                <h5>Steps To Start Your Stream</h5>
                            </div>
                            <div class="anime__review__item">
                                <div class="anime__review__item__text">
                                    <h6>Step 1 </h6>
                                    <p>Open OBS streaming software and enter settings menu</p>
                                </div>
                            </div>
                            <div class="anime__review__item">
                                <div class="anime__review__item__text">
                                    <h6>Step 2 </h6>
                                    <p>Enter the Stream submenu</p>
                                </div>
                            </div>
                            <div class="anime__review__item">
                                <div class="anime__review__item__text">
                                    <h6>Step 3</h6>
                                    <p>Copy the following link and paste it under the server field within the destination menu <b style={{color:"white"}}>"{streamUrl}"</b></p>
                                </div>
                            </div>

                              <div class="anime__review__item">
                                <div class="anime__review__item__text">
                                    <h6>Step 4</h6>
                                    <p>Paste the following under the Stream Key text field <b style={{color:"white"}}>"{streamKey}"</b></p>
                                </div>
                            </div>

                              <div class="anime__review__item">
                                <div class="anime__review__item__text">
                                    <h6>Step 5</h6>
                                    <p>Return to the main menu and click start stream to go live</p>
                                </div>

                               
                            </div>
                               <div class="anime__review__item__text">
                                    <h6>Step 6</h6>
                                    <p>Return to OBS and click end stream to end your stream</p>
                                </div>
                                 
                      
                            </div>

                            

                    </div>

                </div>

        ):(
                 <div className="row">
                    <div className="col">
                        <div className="login__form">
                            <h3>Generate Stream Key</h3>
                            <form onSubmit={generateStreamKey}>
                                <div className="input__item">
                                    <input type="text" placeholder="Video Title"
                                        onChange={handleTitleChange}
                                        required={true}

                                    />

                                </div>

                                <button type="submit" className="site-btn" disabled={!user} >Generate StreamKey</button>
                            </form>

                        </div>
                    </div>

                </div>
        )

    }


    return (
        <div className="login spad">
            <div className="container">

                {displayStreamingInstructions()}


              
            </div>
        </div>



    )

};
export default CreateStreams;