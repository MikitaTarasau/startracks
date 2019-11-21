import React from 'react';

function Card(props) {
        return (
            <li className="card">
                <h3 className="hero-name">
                    {props.name}
                    <span className="remove-btn" onClick={props.onClick}>x</span>
                </h3>
            </li>
        );
}

export default Card; 