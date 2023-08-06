import React from 'react';
import { Link } from 'react-router-dom';

import "./styles.scss";

export const Group = ({ children }) => {
    return (
        <div className="action-group">
            <div className="action-group__group">
                { children }
            </div>
        </div>
    )
}

export const Button = ({ icon, name, onClick }) => {
    return (
        <div onClick={onClick} className="action-group__group__button">
            <div className="action-group__group__button__icon">
                {icon}
            </div>
            <span className="action-group__group__button__name">{ name }</span>
        </div>
    )
}