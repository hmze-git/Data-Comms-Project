import React from "react"
import { Link } from "react-router-dom";

const Navbar=()=>{





    return(

    <div className="header">
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="header__logo">
                        <a href="./index.html">
                            <b>Priavate media</b>
                        </a>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="header__nav">
                        <nav className="header__menu mobile-menu">
                            <ul>
                                <li > <Link to="/" >Home</Link></li>
                                <li> <Link to="/upload/Video" >Upload Video</Link></li>                              
                                <li><Link to="/streams/active">Streaming</Link></li>
                               
        
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="col-lg-2">
                    <div className="header__right">
                        <a href="#" className="search-switch"><span className="icon_search"></span></a>
                        <a href="./login.html"><span className="icon_profile"></span></a>
                    </div>
                </div>
            </div>
            <div id="mobile-menu-wrap"></div>
        </div>
    </div>
   

    );
};

export default  Navbar