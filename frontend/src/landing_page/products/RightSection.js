import React from 'react';

function RightSection({ imageUrl, productName, productDescription, learnMore }) {
    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-6 p-5 mt-5'>
                    <h1>{productName}</h1>
                    <p>{productDescription}</p>
                    <div>
                        <a href={learnMore || "#more"} style={{ textDecoration: "none" }}>Learn More <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    </div>

                </div>
                <div className='col-6'>
                    <img src={imageUrl} alt={productName} />
                </div>
            </div>
        </div>
    );
}

export default RightSection;