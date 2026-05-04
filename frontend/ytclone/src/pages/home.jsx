import React from "react";



const Home = ()=>{

    
return(
    <div className="product spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <div className="trending__product">
                        <div className="row">
                            <div className="col-lg-8 col-md-8 col-sm-8">
                                <div className="section-title">
                                    <h4>Trending Now</h4>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4">
                                <div className="btn__all">
                                    <a href="#" className="primary-btn">View All <span className="arrow_right"></span></a>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="product__item">
                                    <div className="product__item__pic set-bg" data-setbg="img/trending/trend-1.jpg">
                                        <div className="ep">18 / 18</div>
                                        <div className="comment"><i className="fa fa-comments"></i> 11</div>
                                        <div className="view"><i className="fa fa-eye"></i> 9141</div>
                                    </div>
                                    <div className="product__item__text">
                                        <ul>
                                            <li>Active</li>
                                            <li>Movie</li>
                                        </ul>
                                        <h5><a href="#">The Seven Deadly Sins: Wrath of the Gods</a></h5>
                                    </div>
                                </div>
                            </div>               
                        </div>
                    </div>            
                </div>
            
            </div>
        </div>
    </div>

    
)

};
export default Home;