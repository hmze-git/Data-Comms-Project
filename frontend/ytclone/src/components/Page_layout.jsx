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

        if(!isLoading && (!isLoggedIn || !user) ){
            navigation("auth/login",{replace:true})
        }

    },[isLoading,isLoggedIn,user,navigation])

    useEffect(()=>{
        if (!!notimsg){
            toast.info(notimsg)
        }

    },[notimsg])

    return(

        <div>
            <Navbar/>


            <Outlet/>


        </div>



    )



}
export default Pagelayout