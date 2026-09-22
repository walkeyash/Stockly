import React from 'react';

function Brokerage() {
    return (
        <div className='container'>
            <div className='row p-5 mt-5 text-center border-top'>
                <div className='col-8 p-4'>
                    <a href='' style={{ textDecoration: "none", color: "green" }}><h3 className='fs-5'>Brokerage Calculator</h3></a>
                    <ul className="text-muted" style={{
                        textAlign: "left",
                        lineHeight: "2.5",
                        fontSize: "13px",
                    }}>
                        <li>Call & Trade / RMS Auto-Squareoff: ₹50 + GST per order extra.</li>
                        <li> Digital Contract Notes: Sent via email at no extra charge.</li>
                        <li>Physical Contract Notes: ₹20 per note plus courier charges.</li>
                        <li>NRI Account (Non-PIS): 0.5% or ₹100 per executed equity order (whichever is lower).</li>
                        <li>NRI Account (PIS): 0.5% or ₹200 per executed equity order (whichever is lower).</li>
                        <li>Debit Balance Penalty: Orders cost ₹40 instead of ₹20 if the account is in a negative/debit balance.</li>
                    </ul>
                </div>
                <div className='col-4 p-4'>
                    <a href='' style={{ textDecoration: "none", color: "green" }}><h3 className='fs-5' >List of charges</h3></a>

                </div>

            </div>

        </div>
    );
}

export default Brokerage;