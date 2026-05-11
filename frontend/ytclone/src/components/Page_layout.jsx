import React, { useEffect,useContext } from "react";

import { Outlet,replace,useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import AuthContext from "../context/authContext";
import { toast } from "react-toastify";
import { useNoti } from "./notifications";

const Pagelayout = ()=>{


    const { isLoggedIn, isLoading,user } = useContext(AuthContext); //loading status updated in the authentication provider on reload
    let navigation = useNavigate();
        const { topic,notimsg}= useNoti(isLoggedIn);

    useEffect(()=>{

        if(!isLoggedIn && !isLoading || !user ){
            navigation("auth/login",{replace:true})
        }

    },[isLoading,isLoggedIn])

    useEffect(()=>{
        if (!!notimsg){
            toast.info(notimsg)
        }

    },[notimsg])

    return(

        <div>
            <Navbar/>

            <h1>Redered some bs</h1>

            <Outlet/>


        </div>



    )



}
export default Pagelayout