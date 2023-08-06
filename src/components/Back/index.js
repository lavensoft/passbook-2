import React from "react";
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from "react-router-dom";

export const Back = ({ to = "/" }) => {
    return (
        <Link to={to}>
            <div className="button-back">
                <IoIosArrowBack size={22} />
            </div>
        </Link>
    )
}