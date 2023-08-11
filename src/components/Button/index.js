import React from 'react';
import { Link } from 'react-router-dom';

import "./styles.scss";
import { Oval } from 'react-loader-spinner';

export const Button = ({ children, to="#", onClick, style, loading=false }) => {
    return (
        <button className="button--primary" onClick={onClick} style={style}>
            <Link className="button--primary__link" to={to}>
                {children}
            </Link>
            <div style={{
               marginLeft: 6
            }}>
               {
                  loading &&
                  <Oval
                     height={15}
                     width={15}
                     color="white"
                     wrapperStyle={{}}
                     wrapperClass=""
                     visible={true}
                     ariaLabel='oval-loading'
                     secondaryColor="rgba(255,255,255,.3)"
                     strokeWidth={3}
                     strokeWidthSecondary={3}
                     />
               }
            </div>
        </button>
    )
}