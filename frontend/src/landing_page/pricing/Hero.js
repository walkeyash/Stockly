import React from 'react';

function Hero() {
    return (
        <div className='container'>
            <div className='row p-5 mt-5 mb-5'>
                <h1 className='fs-2 text-center' >Charges</h1>
                <h3 className='text-center text-muted'>List of all charges and taxes.</h3>
            </div>
            <div className='row p-5 mt-5 border-top text-muted' style={{ lineHeight: "1.8", fontSize: "19px" }}>
                <div className='col p-5'>
                    <img src='media/images/pricingMF.svg'></img>
                    <h3>Free equity delivery</h3>
                    <p>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
                </div>
                <div className='col p-5'>
                    <img src='media/images/intradayTrades.svg'></img>
                    <h3>Intraday and F&O trades</h3>
                    <p>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
                </div>
                <div className='col p-5'>
                    <img src='media/images/pricingMF.svg'></img>
                    <h3 className='text-center'>Free direct MF</h3>
                    <p>All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
                </div>

            </div>

        </div>
    );
}

export default Hero;