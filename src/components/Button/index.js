import React from 'react';
import { Link } from 'react-router-dom';

import "./styles.scss";

export const Button = ({ children, to="#", onClick, style }) => {
    return (
        <button className="button--primary" onClick={onClick} style={style}>
            <Link className="button--primary__link" to={to}>
                {children}
            </Link>
        </button>
    )
}