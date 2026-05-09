import React, { useEffect,useContext } from "react";

import { Outlet,replace,useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import AuthContext from "../context/authContext";

const Pagelayout = ()=>{


    const { isLoggedIn, isLoading,user } = useContext(AuthContext); //loading status updated in the authentication provider on reload
    let navigation = useNavigate();

    useEffect(()=>{

        if(!isLoggedIn && !isLoading || !user ){
            navigation("auth/login",{replace:true})
        }

    },[isLoading,isLoggedIn])

    return(

        <div>
            <Navbar/>

            <h1>Redered some bs</h1>

            <Outlet/>


        </div>



    )



}
export default Pagelayout