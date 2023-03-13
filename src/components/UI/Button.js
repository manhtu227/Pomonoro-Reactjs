import React from "react";
import './Button.css';

const Button = (props) => {
    const handleClick = () => {
        if (props.ButtonClick) {
            props.ButtonClick(props.type, props.timer);
        }
        else {
            props.onClick()
        }
    };
    return (
        <button
            className={`btn ${props.className}`}
            onClick={handleClick}
        >
            {props.children}
        </button>
    )
}
export default Button
