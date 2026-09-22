import React from 'react';

function Universe() {
    return (
        <div className='container mt-5'>
            <div className='row text-center'>
                <h1>The Stockly Universe</h1>
                <p>Extend your trading and investment experience even further with our partner platforms</p>
                <div className='col-4 p-3 mt-5'>
                    <img src="media/images/smallcaseLogo.png" alt="smallcase" style={{ width: "120px" }} />
                    <p className='text-small text-muted mt-3'>Thematic Investment Platform</p>
                </div>
                <div className='col-4 p-3 mt-5'>
                    <img src="media/images/streakLogo.png" alt="Streak" style={{ width: "120px" }} />
                    <p className='text-small text-muted mt-3'>Algo & Strategy Platform</p>
                </div>
                <div className='col-4 p-3 mt-5'>
                    <img src="media/images/sensibullLogo.svg" alt="Sensibull" style={{ width: "120px" }} />
                    <p className='text-small text-muted mt-3'>Options trading platform</p>
                </div>
                <div className='col-4 p-3 mt-5'>
                    <img src="media/images/zerodhaFundhouse.png" alt="Fundhouse" style={{ width: "120px" }} />
                    <p className='text-small text-muted mt-3'>Asset Management</p>
                </div>
                <div className='col-4 p-3 mt-5'>
                    <img src="media/images/goldenpiLogo.png" alt="GoldenPi" style={{ width: "120px" }} />
                    <p className='text-small text-muted mt-3'>Bonds Trading Platform</p>
                </div>
                <div className='col-4 p-3 mt-5'>
                    <img src="media/images/dittoLogo.png" alt="Ditto" style={{ width: "120px" }} />
                    <p className='text-small text-muted mt-3'>Insurance</p>
                </div>
                <button className='p-2 btn btn-primary fs-5 mb-5 text-center' style={{ width: "20%", margin: "0 auto" }}>Sign up Now</button>
            </div>
        </div>
    );
}

export default Universe;