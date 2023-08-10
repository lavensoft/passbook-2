import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import "./styles.scss";

export const AppBar = ({ title, actions, leading, fixed, black }) => {
    const navigate = useNavigate();
    
    return (
        <header className={`appbar ${fixed && "fixed"} ${black && "black"}`}>
            <div className="appbar__leading">
                { leading }
            </div>
            <div className="appbar__title" onClick={() => navigate(-1)}>
                <span className="appbar__title__title">{ title }</span>
            </div>
            <div className="appbar__actions">
                { actions }
            </div>
        </header>
    )
}

export const ActionButton = ({ icon, onClick, to="#" }) => {
    return (
        <Link to={ to } className="appbar__action-btn" onClick={onClick}>
            { icon }
        </Link>
    )
};

export const ActionBack = ({color}) => {
    const navigate = useNavigate();

    return <ActionButton icon={<IoChevronBack color={color}/>} onClick={() => navigate(-1)}/>
}

export const AvatarImage = ({ image }) => {
    return (
        <button onClick={() => {
         localStorage.clear();
         window.location.reload();
        }} className="appbar__avatar-image" style={{background: `url(${image}) no-repeat center center / cover`}}>
        
        </button>
    )
};