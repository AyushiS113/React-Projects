import React from 'react';
import './Card.Module.css';

const Card = (props) => {
    return <div className={`card ${props.cssClass}`}>{props.children}</div>
}
export default Card;