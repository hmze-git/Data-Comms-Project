import React, { useEffect, useState } from "react";
import VidCard from "../components/vidCard";

import api from "../services/api";
import { Link } from "react-router-dom";

const ActiveStreams = ()=>{

    const [streamData,setStreamData]=useState([])
    const [currPage,setCurrPage]=useState(1)
    const [pageCount,setPageCount]=useState(0)
    const [totalRecords,setTotalRecords]=useState(0)

    const LIMIT =9
    

    useEffect( ()=>{
        const fetchData= async()=>{

            try {
                const params={
                    page_num:currPage,
                    limit:LIMIT
                }
                const url=`/stream/active`

                const response=await api.get(url,{params})

 
                if (response.data.Success===true){
                    setStreamData([...response.data.results])
                    setTotalRecords(response.data.totalRecords)
                    console.log("Records loaded succesfully",response.data.results)

                }
            } catch (error) {
                console.log("Unable to access the stream data ",error)
                alert("ERR With stream retrievbal")
            }


        }

         fetchData()
    },[currPage,pageCount])


    const displayStreams= ()=>{
    return  !!streamData?.length ? (streamData.map((stream)=>(
                        <Link to={`/streams/watch/${stream.streamKey}`}>
                        <div class="anime__review__item">
                                <div class="anime__review__item__text">
                                    <h6>{stream.streamer}</h6>
                                    <p>{stream.streamTitle}</p>
                                </div>
                            </div>
                        </Link>


        ))):(

                    <div class="anime__review__item">
                                <div class="anime__review__item__text">
                                    <h6>No Active Streams</h6>
                                    <p>No Active Streams</p>
                                </div>
                            </div>

        );


    }


return(
    <div class="anime-details spad">
        <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-md-8">
                        <div class="anime__details__review">
                            <div class="section-title">
                                <h5>Active Stream List</h5>
                            </div>

                            
                            
                            {displayStreams()}
                          
                        </div>
                        <div class="anime__details__form">
                            <div class="section-title">

                               <Link to={"/streams/create"}> 
                                <h3 style={{backgroundColor:"red"}}>Go Live Now</h3>
                                </Link>
                            </div>
                             
                  
                            
                        </div>
                    </div>
                 
                </div>
            </div>
        </div>

    
)

};
export default ActiveStreams;