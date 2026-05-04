import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

const Pagelayout = ()=>{



    return(

        <div>
            <Navbar/>

            <h1>Redered some bs</h1>

            <Outlet/>


        </div>



    )



}
export default Pagelayout