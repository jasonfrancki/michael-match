import React from 'react';
import './Card.css';

const Card = ({ meme, handleChoice, flipped }) => {
    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img src={meme.src} alt="card front" className="front" />
                <img src="/img/card-back.jpg"
                    alt="card back"
                    className="back"
                    onClick={() => handleChoice(meme)} />
            </div>
        </div>
    )
}

export default Card
