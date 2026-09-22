import React from 'react';

function Hero() {
    return (
        <section className='container-fluid' id="supportHero">
            <div className='p-3' id="supportWrapper">
                <h4>Support Portal</h4>
                <a href='' style={{ color: "white" }}>Track Tickets</a>
            </div>
            <div className='row p-5 mx-5'>
                <div className='col-6 p-3 '>
                    <h1 className='fs-3'>Search for the answer of browse help topics to create a ticket</h1>
                    <input placeholder='E.g. How do I activate F&O'></input><br></br><br></br>
                    <a href='' >Track Account Opening</a>&nbsp;&nbsp;
                    <a href='' >Track Segment Activation</a>&nbsp;&nbsp;
                    <a href='' >Intraday Margins</a>&nbsp;&nbsp;
                    <a href='' >Kite user manuals</a>&nbsp;&nbsp;
                </div>
                <div className='col-6 p-5'>
                    <h1 className='fs-3'>Featured</h1>
                    <ol>
                        <li><a href=''>Current Tackovers and Delisting</a>
                        </li><br></br>
                        <li><a href=''>Intraday Leverages</a>&nbsp;&nbsp;</li>
                    </ol>

                </div>

            </div>
        </section>
    );
}

export default Hero;