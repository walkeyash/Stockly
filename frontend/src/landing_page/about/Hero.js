import React from 'react';

function Hero() {
    return (
        <div className='container'>
            <div className='row p-5 mt-5 mb-5'>
                <h1 className='fs-2 text-center' >Making the stock market simpler,<br />
                    smarter and accessible.</h1>
            </div>
            <div className='row p-5 mt-5 border-top text-muted' style={{ lineHeight: "1.8", fontSize: "19px" }}>
                <div className='col p-5'>
                    <p>Stockly is a modern stock market platform built to bring market information, portfolio tracking, and investment insights together in one simple experience.</p>

                    <p>We believe that understanding the market shouldn't require navigating through multiple platforms, complicated interfaces, or overwhelming amounts of information.</p>

                    <p>Stockly is designed around a simple idea: give users the information they need, in a way they can actually understand.</p>
                </div>
                <div className='col p-5'>
                    <p>The stock market generates an enormous amount of information every day prices change, companies release results, markets move, and portfolios evolve.</p>

                    <p>Stockly brings these pieces together into a clean and intuitive platform where users can explore stocks, monitor markets, build watchlists, and keep track of their portfolios.</p>

                    <p>Instead of making investing feel complicated, Stockly focuses on making the experience simple, informative, and transparent.</p>
                </div>

            </div>

        </div>
    );
}

export default Hero;