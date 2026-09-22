import React from 'react';

function CreateTicket() {
    return (
        <div className='container'>
            <div className='row p-5 mt-5 mb-5'>
                <h1 className='fs-2 text-center' >To Create a ticket, select a relevant topic.</h1>
                <div className='col-4 p-5 mt-5 mb-5'>
                    <h4 className='fs-5' ><i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;Account Opening</h4>
                    <a href='' style={{ textDecoration: "none", lineHeight: "2.5" }}>Online Account Opening</a><br></br>
                    <a href='' style={{ textDecoration: "none", lineHeight: "2.5" }}>Offline Account Opening</a><br></br>
                    <a href='' style={{ textDecoration: "none", lineHeight: "2.5" }}>Company, Partnership and HUF Account</a><br></br>
                    <a href='' style={{ textDecoration: "none", lineHeight: "2.5" }}>NRI Account Opening</a><br></br>
                    <a href='' style={{ textDecoration: "none", lineHeight: "2.5" }}>Charges at Stockly</a><br></br>
                    <a href='' style={{ textDecoration: "none", lineHeight: "2.5" }}>Stockly IDFC FIRST Bank 3-in-1 Account</a><br></br>
                </div>
                <div className='col-4 p-5 mt-5 mb-5'>
                    <h4 className='fs-5' ><i class="fa fa-user" aria-hidden="true"></i>
                        &nbsp;Your Stockly Account</h4>
                    <a href='' style={{ textDecoration: "none", lineHeight: "2.5" }}>Login Credentials</a><br></br>
                    <a href='' style={{ textDecoration: "none", lineHeight: "2.5" }}>Account Modification & Segment Addition</a><br></br>
                    <a href='' style={{ textDecoration: "none", lineHeight: "2.5" }}>DP ID and Bank details</a><br></br>
                    <a href='' style={{ textDecoration: "none", lineHeight: "2.5" }}>Your Profile</a><br></br>
                    <a href='' style={{ textDecoration: "none", lineHeight: "2.5" }}>Transfer and Conversion of shares</a><br></br>
                </div>
                <div className='col-4 p-5 mt-5 mb-5'>
                    <h4 className='fs-5' ><i class="fa fa-line-chart" aria-hidden="true"></i>
                        &nbsp;Your Stockly Account</h4>
                    <a href='' style={{ textDecoration: "none", lineHeight: "2.5" }}>Margin/leverage, Product and Order types</a><br></br>
                    <a href='' style={{ textDecoration: "none", lineHeight: "2.5" }}>Stockly Web and Mobile</a><br></br>
                    <a href='' style={{ textDecoration: "none", lineHeight: "2.5" }}>Trading FAQs</a><br></br>
                    <a href='' style={{ textDecoration: "none", lineHeight: "2.5" }}>Corporate Actions</a><br></br>
                    <a href='' style={{ textDecoration: "none", lineHeight: "2.5" }}>Sentinel</a><br></br>
                    <a href='' style={{ textDecoration: "none", lineHeight: "2.5" }}>Kite API</a><br></br>
                    <a href='' style={{ textDecoration: "none", lineHeight: "2.5" }}>PI And other platforms</a><br></br>
                </div>
            </div>
        </div>
    );
}

export default CreateTicket;