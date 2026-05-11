import React, { useEffect, useState } from "react";
import VidCard from "../components/vidCard";

import api from "../services/api";

const Home = ()=>{

    const [videoMetaData,setVideoMetaData]=useState([])
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
                const url=`/post/video/getVideos`

                const response=await api.get(url,{params})

 
                if (response.data.Success===true){
                    setVideoMetaData([...response.data.results])
                    setTotalRecords(response.data.totalRecords)
                    console.log("Records loaded succesfully",response.data.results)

                }
            } catch (error) {
                console.log("Unable to access the videos ",error)
                alert("ERR With retrievbal")
            }


        }

         fetchData()
    },[currPage,pageCount])

return(
    <div className="product spad">
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="trending__product">
                        <div className="row">
                            <div className="col-lg-8 col-md-8 col-sm-8">
                                <div className="section-title">
                                    <h4>Stored Videos</h4>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4">
                                <div className="btn__all">
                                    <a href="#" className="primary-btn">View All <span className="arrow_right"></span></a>
                                </div>
                            </div>
                        </div>
                        <div className="row">

                            {videoMetaData.map((vidMeta)=>
                                <VidCard vidThumb={vidMeta.vidThumb} vidTitle={vidMeta.vidTitle} vidId={vidMeta.vidId} vidUpDate={vidMeta.vidUpload} />
                            )}
                          
                                        
                        </div>
                    </div>            
                </div>
            
            </div>
        </div>
    </div>

    
)

};
export default Home;