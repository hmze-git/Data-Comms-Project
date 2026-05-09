import React, { useContext, useEffect, useState } from "react";
import VidCard from "../components/vidCard";

import api from "../services/api";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import Swal from "sweetalert2";

const CreateStreams = () => {

    const user = useContext(AuthContext)

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


    useEffect(()=>{

        

    },streamKey)

    const generateStreamKey = async () => {

        try {

            const details = {
                streamTitle:streamTile,
                userId:user.id,


            }

            const response = await api.post("/stream/create",details)

            if(response.data.success){
                setStreamKey(response.data.StreamKey)
                setStreamUrl(response.data.streamUrl)


            }

        } catch (error) {
            console.log(error)
        }

    }




    return (
        <div className="login spad">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="login__form">
                            <h3>Generate Stream Key</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="input__item">
                                    <input type="text" placeholder="Video Title"
                                        onChange={handleTitleChange}
                                        required={true}

                                    />

                                </div>
                                <div className="description__item">
                                    <textarea
                                        value={description}
                                        onChange={handledescriptionChange}

                                    />

                                </div>
                                <div className="input__item input__item--file">
                                    <label htmlFor="vidFile">
                                        <span>{file ? file.name : "Choose video file…"}</span>
                                    </label>
                                    <input type="file"
                                        id="vidFile"
                                        placeholder="Video File"
                                        onChange={handleFileChange}
                                        required={true}
                                    />

                                </div>

                                <button type="submit" className="site-btn" >Generate StreamKey</button>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>



    )

};
export default CreateStreams;