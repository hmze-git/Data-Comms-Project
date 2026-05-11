import mqtt from 'mqtt'
import { useState,useEffect } from 'react'


export const useNoti = (isLoggedIn)=>{

    const [notimsg,setNotiMsg]= useState()
    const [topic,setTopic]= useState()
        
        
    useEffect(()=>{
        // mqtt uses web sockets not http
        if(!isLoggedIn) return
        const client = mqtt.connect(`ws://${window.location.hostname}/mqtt`)
        console.log(" testing mqtt",`ws://${window.location.hostname}/mqtt`)
        client.on('connect',()=>{
            client.subscribe('notifications')
        })
        client.on('message',(topic,message)=>{
            setTopic(topic)
            setNotiMsg(message.toString())

        })
        return ()=> client.end()

},[isLoggedIn])

    return {
        topic,
        notimsg
    }
}

