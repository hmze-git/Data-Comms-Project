import React, { useEffect, useState,useContext } from "react";
import ReactHlsPlayer from "react-hls-video-player"
import api from "../services/api";
import { useParams } from 'react-router-dom';
import {MEDIA_URL} from "../services/mediaURL"
import mqtt from 'mqtt'
import AuthContext from "../context/authContext";


const StreamPlayer = () => {

const [streamData, setStreamData] = useState({})
const [streamerDetails,setStreamerDetails]= useState("")
const [messages,setMessages]=useState([])
const [mosquittoCLient,setMosquittoClient]=useState()
const [newMsg,setNewMsg]= useState("")

const BASE_URL= window.location.origin
const {streamKey}= useParams()
 const {user } = useContext(AuthContext); 


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

    useEffect(()=>{

        const client = mqtt.connect(`ws://${window.location.hostname}/mqtt`)
        client.on('connect',()=>{
            client.subscribe(`streams/${streamKey}`)
            console.log("Chat connected")
        })

        client.on('message',(topic,msg)=>{
            const data = JSON.parse(msg.toString())
            setMessages(prev=>[...prev,data])
        })  

        setMosquittoClient(client)
        return ()=> client.end()

    },[streamKey])

    const sendMessage = ()=>{

        const payload= {
            userName: user.username,
            message: newMsg,
            time: new Date().toLocaleTimeString(),
        }
        console.log("p load ",payload)

        mosquittoCLient.publish(`streams/${streamKey}`,JSON.stringify(payload))
        setNewMsg('')

    }

    if(!user){
        return (<div>
            <h2>Loading.....</h2>
        </div>)
    }


    return (
        <div className="anime-details spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="anime__video__player">

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
                        <div className="col-lg-4">
                            <div style={{height:"428px", display:"flex" ,flexDirection:"column",border:"1px solid ", borderRadius:"5px", padding:"10px"}}>
                                <div className="section-title" >
                                    <h4>Live Chat</h4>
                                </div>
                                <div style={{flex:1,overflow:"auto",padding:"10px"}}>
                                    {messages?.map((msg,index)=>(

                                        <div key={index} style={{color:"white"}}>
                                        <span>{msg.userName}---{msg.time}</span>
                                        
                                        <p style={{color:"black",backgroundColor:"whitesmoke"}}><strong>{msg.message}</strong></p>

                                        </div>

                                    ))}

                                </div>
                                <div >
                                    <input 
                                        type="text"
                                        value={newMsg}
                                        onChange={(e)=>setNewMsg(e.target.value)}
                                        placeholder="send a message"
                                        style={{flex:1,marginRight:"10px"}}
                                    />
                                
                                    <button onClick={sendMessage} className="site-btn" style={{paddingLeft:"15px"}}>Post</button>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="anime__details__review">
                            <div className="section-title">
                                <h5>Reviews</h5>
                            </div>
                            <div className="anime__review__item">
                                <div className="anime__review__item__pic">
                                    <img src="img/anime/review-1.jpg" alt="" />
                                </div>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )

}

export default StreamPlayer
