import React from 'react';

function LeftSection({ imageUrl, productName, productDescription, tryDemo, learnMore, googlePlay, appStore }) {
    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-6'>
                    <img src={imageUrl} alt={productName} />
                </div>
                <div className='col-6 p-5 mt-5'>
                    <h1>{productName}</h1>
                    <p>{productDescription}</p>
                    <div>
                        <a href={tryDemo || "#demo"} style={{ textDecoration: "none" }}>Try Demo <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                        <a href={learnMore || "#more"} style={{ marginLeft: "50px", textDecoration: "none" }}>Learn More <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    </div>
                    <div className='mt-3'>
                        <a href={googlePlay || "#store"}><img src='media/images/googlePlayBadge.svg' alt="Google Play" /></a>
                        <a href={appStore || "#store"} style={{ marginLeft: "50px" }}><img src='media/images/appStoreBadge.svg' alt="App Store" /></a>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default LeftSection;