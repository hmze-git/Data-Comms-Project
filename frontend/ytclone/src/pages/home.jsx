import React, { useEffect, useState } from "react";
import VidCard from "../components/vidCard";

import api from "../services/api";

const Home = () => {

    const [videoMetaData, setVideoMetaData] = useState([])
    const [currPage, setCurrPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0)
    const [numPages, setNumPages] = useState(1)

    const LIMIT = 9


    useEffect(() => {
        const fetchData = async () => {

            try {
                const params = {
                    page_num: currPage,
                    limit: LIMIT
                }
                const url = `/post/video/getVideos`

                const response = await api.get(url, { params })


                if (response.data.Success === true) {
                    setVideoMetaData([...response.data.results])
                    setTotalRecords(response.data.totalRecords)

                    console.log("Records loaded succesfully", response.data.results)
                    setNumPages((Math.ceil(totalRecords / LIMIT)))
                
                }
            } catch (error) {
                console.log("Unable to access the videos ", error)
                alert("ERR With retrievbal")
            }


        }

        fetchData()
    }, [currPage])

    return (
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

                            </div>
                            <div className="row">

                                {videoMetaData.map((vidMeta) =>
                                    <VidCard vidThumb={vidMeta.vidThumb} vidTitle={vidMeta.vidTitle} vidId={vidMeta.vidId} vidUpDate={vidMeta.vidUpload} vidDuration={vidMeta.vidDuration} uploader={vidMeta.uploaderName} />
                                )}


                            </div>
                        </div>
                        <div class="product__pagination">
                            {Array.from({ length: numPages },
                                (_, i) => {
                                    const page = i + 1;
                                    return (
                                        <a key={i}
                                            onClick={
                                                () => setCurrPage(page)
                                            } className={currPage===page?"current-page":""} style={{}}>
                                            {page}
                                        </a>)
                                }
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>


    )

};
export default Home;