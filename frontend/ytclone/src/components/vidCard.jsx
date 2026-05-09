import React from "react";
import { Link } from "react-router";
import {MEDIA_URL} from "../services/mediaURL"


const VidCard = ({ vidThumb, vidTitle, vidId, vidUpDate }) => {


    return (

   
        <div className="col-lg-5 col-md-8 col-sm-6">
                 <Link to={`/VidPlayer/${vidId}`} state={{vId:vidId,vidTitle:vidTitle,vidUpDate:vidUpDate}}>
            <div className="product__item">
                <div className="product__item__pic set-bg" >
                    <img  
                    src={`${MEDIA_URL}/${vidThumb}`}
                    alt="Video Thumbnail"
                
                    />
                    <div className="comment"><i className="fa fa-comments"></i> 11</div>
                    <div className="view"><i className="fa fa-eye"></i> 9141</div>
                </div>
                <div className="product__item__text">
                    <ul>
                        <li>{vidUpDate}</li>
      
                    </ul>
                   <h5 style={{color:"white"}}><b>{vidTitle}</b></h5>
                </div>
            </div>
                    </Link>
        </div>

    )
}

export default VidCard;