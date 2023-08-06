import React from 'react';

import "./styles.scss";

export const Badge = ({ children, active, onClick }) => {
    return (
        <div className={`tab-badge-group__tab-badge ${ active && 'active' }`} onClick={ onClick }>
            <span className="tab-badge-group__tab-badge__content">
                { children }
            </span>
        </div>
    )
}

export const Group = ({ children }) => {
    return (
        <div className="tab-badge-group">
            { children }
        </div>
    )
}