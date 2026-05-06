import React from "react";
import { Link } from "react-router";


const VidCard = ({ vidThumb, vidTitle, vidId, vidUpDate }) => {


    return (

        <Link>
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="product__item">
                <div className="product__item__pic set-bg" data-setbg="img/trending/trend-1.jpg">
                    <div className="comment"><i className="fa fa-comments"></i> 11</div>
                    <div className="view"><i className="fa fa-eye"></i> 9141</div>
                </div>
                <div className="product__item__text">
                    <ul>
                        <li>Active</li>
                        <li>Movie</li>
                    </ul>
                   <h5 style={{color:"white"}}><b>The Seven Deadly Sins: Wrath of the Gods</b></h5>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default VidCard;