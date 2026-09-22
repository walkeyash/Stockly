import React from 'react';

function Team() {
    return (
        <div className='container'>
            <div className='row p-5 border-top '>
                <h1 className='text-center ' >The Builder</h1>
            </div>
            <div className='row p-5  text-muted' style={{ lineHeight: "1.8", fontSize: "19px" }}>
                <div
                    className='col p-5'
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <img
                        src='media/images/Yash.jpeg'
                        alt='Yash Walke'
                        style={{
                            borderRadius: "50%",
                            width: "250px",
                            height: "250px",
                            objectFit: "cover",
                        }}
                    />
                    <h4 style={{ marginTop: "15px", marginBottom: "0" }}>Yash Walke</h4>
                    <h6>Developer</h6>
                </div>
                <div className='col p-5'>
                    <p>I'm Yash Walke, the developer behind Stockly. I built the platform from the ground up, bringing together my interests in software development and financial markets.</p>

                    <p>What started as a project has become an opportunity to learn, experiment, and build something that can make complex financial information easier to explore.</p>

                    <p>Stockly is still evolving. And I'm just getting started.</p>

                    <p>Connect on:&nbsp;&nbsp;<a style={{ textDecoration: "none" }} href='https://www.linkedin.com/in/yash-a-walke/'>LinkedIn</a></p>

                </div>


            </div>

        </div>
    );
}

export default Team;