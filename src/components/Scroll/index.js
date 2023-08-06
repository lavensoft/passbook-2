import React from 'react';

import "./styles.scss";

export const ScrollView = ({ style, children, horizontal }) => {
    return (
        <div className="scroll-view" style={ 
            {
                ...style,
                overflowX: horizontal ? 'scroll' : 'hidden',
            }
         }>
            { children }
        </div>
    )
}