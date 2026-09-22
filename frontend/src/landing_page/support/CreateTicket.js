import React from 'react';

function CreateTicket() {
    return (
        <div className='container'>
            <div className='row p-5 mt-5 mb-5'>
                <h1 className='fs-2 text-center'>To Create a ticket, select a relevant topic.</h1>
                <div className='col-4 p-5 mt-5 mb-5'>
                    <h4 className='fs-5'><i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;Account Opening</h4>
                    <a href='#help' style={{ textDecoration: "none", lineHeight: "2.5" }}>Online Account Opening</a><br />
                    <a href='#help' style={{ textDecoration: "none", lineHeight: "2.5" }}>Offline Account Opening</a><br />
                    <a href='#help' style={{ textDecoration: "none", lineHeight: "2.5" }}>Company, Partnership and HUF Account</a><br />
                    <a href='#help' style={{ textDecoration: "none", lineHeight: "2.5" }}>NRI Account Opening</a><br />
                    <a href='#help' style={{ textDecoration: "none", lineHeight: "2.5" }}>Charges at Stockly</a><br />
                    <a href='#help' style={{ textDecoration: "none", lineHeight: "2.5" }}>Stockly IDFC FIRST Bank 3-in-1 Account</a><br />
                </div>
                <div className='col-4 p-5 mt-5 mb-5'>
                    <h4 className='fs-5'><i className="fa fa-user" aria-hidden="true"></i>
                        &nbsp;Your Stockly Account</h4>
                    <a href='#help' style={{ textDecoration: "none", lineHeight: "2.5" }}>Login Credentials</a><br />
                    <a href='#help' style={{ textDecoration: "none", lineHeight: "2.5" }}>Account Modification & Segment Addition</a><br />
                    <a href='#help' style={{ textDecoration: "none", lineHeight: "2.5" }}>DP ID and Bank details</a><br />
                    <a href='#help' style={{ textDecoration: "none", lineHeight: "2.5" }}>Your Profile</a><br />
                    <a href='#help' style={{ textDecoration: "none", lineHeight: "2.5" }}>Transfer and Conversion of shares</a><br />
                </div>
                <div className='col-4 p-5 mt-5 mb-5'>
                    <h4 className='fs-5'><i className="fa fa-line-chart" aria-hidden="true"></i>
                        &nbsp;Your Stockly Account</h4>
                    <a href='#help' style={{ textDecoration: "none", lineHeight: "2.5" }}>Margin/leverage, Product and Order types</a><br />
                    <a href='#help' style={{ textDecoration: "none", lineHeight: "2.5" }}>Stockly Web and Mobile</a><br />
                    <a href='#help' style={{ textDecoration: "none", lineHeight: "2.5" }}>Trading FAQs</a><br />
                    <a href='#help' style={{ textDecoration: "none", lineHeight: "2.5" }}>Corporate Actions</a><br />
                    <a href='#help' style={{ textDecoration: "none", lineHeight: "2.5" }}>Sentinel</a><br />
                    <a href='#help' style={{ textDecoration: "none", lineHeight: "2.5" }}>Kite API</a><br />
                    <a href='#help' style={{ textDecoration: "none", lineHeight: "2.5" }}>PI And other platforms</a><br />
                </div>
            </div>
        </div>
    );
}

export default CreateTicket;