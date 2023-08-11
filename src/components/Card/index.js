import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { SelectBox  } from "@components";
import { Config } from "@config";

import "./styles.scss";

export const FeatureCard = ({ style, onClick, id, to="#", image }) => {
    return (
        <motion.div className="card--feature" style={ style } onClick={onClick} layoutId={id && `card-container-${id}`}>
            <Link to={to}>
                <motion.div className="card--feature-image" layoutId={id && `card-image-container-${id}`} style={{ backgroundImage: `url(${ image })` }}></motion.div>
            </Link>
        </motion.div>
    )
}

export const SquareCard = ({ style, onClick, id, to="#", title, overlay, image }) => {
    return (
        <motion.div className="card--square" style={ style } onClick={onClick} layoutId={id && `card-container-${id}`}>
            <Link to={to}>
                <motion.div style={{ backgroundImage: `url(${image})` }} className={`card--square-image ${ overlay ? "overlay" : "" }`} layoutId={id && `card-image-container-${id}`}>
                    <motion.span className="card--square__title">{ title }</motion.span>
                </motion.div>
            </Link>
        </motion.div>
    )
}

export const ProductCard = ({ style, onClick, id, to="#", title, owner, price, image }) => {
    return (
        <motion.div className="card--product" style={ style } onClick={onClick} layoutId={id && `card-container-${id}`}>
            <Link to={to}>
                <motion.div className="card--product__image" layoutId={id && `card-image-container-${id}`} style={{ backgroundImage: `url(${image})` }}></motion.div>
                <div className="card--product__content">
                    <motion.span className="card--product__content__owner" layoutId={id && `card-content-owner-${id}`}>{ owner }</motion.span>
                    <motion.span className="card--product__content__title" layoutId={id && `card-content-title-${id}`}>{ title }</motion.span>
                    <motion.span className="card--product__content__price" layoutId={id && `card-content-price-${id}`}>{ price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") } { Config.TOKEN.SYMBOL }</motion.span>
                </div>
            </Link>
        </motion.div>
    )
}

export const CollectionCard = ({ style, onClick, id, to="#", title, subtitle, images }) => {
    return (
        <motion.div className="card--collection" style={ style } onClick={onClick} layoutId={id && `card-container-${id}`}>
            <Link to={to}>
                <motion.div className="card--collection__image" layoutId={id && `card-image-container-${id}`}>
                    <div className="card--collection__image__front" style={{ backgroundImage: `url(${ images[0] })` }}></div>
                    <div className="card--collection__image__back"  style={{ backgroundImage: `url(${ images[1] })` }}></div>
                    <div className="card--collection__image__back"  style={{ backgroundImage: `url(${ images[2] })` }}></div>
                </motion.div>

                <div className="card--collection__content">
                    <motion.span className="card--collection__content__owner" layoutId={id && `card-content-owner-${id}`}>{ subtitle }</motion.span>
                    <motion.span className="card--collection__content__title" layoutId={id && `card-content-title-${id}`}>{ title }</motion.span>
                </div>
            </Link>
        </motion.div>
    )
}

export const BalanceCard = ({ style, onClick, to="#", balance }) => {
    return (
        <div className="card--balance" style={ style } onClick={onClick}>
            <Link to={to}>
                <div className="card--balance__content">
                    <span className="card--balance__content__title">Balance</span>
                    
                    <div className="card--balance__content__balance-container">
                        <span className="card--balance__content__balance-container__balance">{ balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") } {Config.TOKEN.SYMBOL}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export const CreatorCard = ({ style, onClick, to="#", name, image }) => {
    return (
        <div className="card--creator" style={ style } onClick={onClick}>
            <Link to={to} className="card--creator__container">
                <div className="card--creator__container__avatar" style={{backgroundImage: `url(${image})`}}></div>
                <div className="card--creator__container__content">
                    <span className="card--creator__container__content__subtitle">Creator</span>
                    <span className="card--creator__container__content__title">{ name }</span>
                </div>
            </Link>
        </div>
    )
}

export const UserCard = ({ style, onClick, id, to="#", title, overlay, image, permission }) => {
    return (
        <motion.div className="card--user" style={ style } onClick={onClick} layoutId={id && `card-container-${id}`}>
            <Link to={to}>
                <motion.div style={{ backgroundImage: `url(${image})` }} className={`card--user-image ${ overlay ? "overlay" : "" }`} layoutId={id && `card-image-container-${id}`}>
                    <motion.span className="card--user__title">{ title }</motion.span>
                    <motion.span className="card--user__permission">{ permission }</motion.span>
                </motion.div>
            </Link>
        </motion.div>
    )
}

export const UserCardDetail = ({ style, onClick, id, to="#", title, overlay, image, permission }) => {
    return (
        <motion.div className="card--detail" style={ style } onClick={onClick} layoutId={id && `card-container-${id}`}>
            <Link to={to}>
                <motion.div style={{ backgroundImage: `url(${image})` }} className={`card--detail-image ${ overlay ? "overlay" : "" }`} layoutId={id && `card-image-container-${id}`}>
                <motion.span className="card--detail__title">{ title }</motion.span>
                </motion.div>
                <motion.div style={{ 
                    bottom: '100px',
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                }}>
                    <SelectBox style={{ width: "80%" }} className="card--detail__select-box" options={[ { value: "1", label: "Admin" }, { value: "0", label: "User"} ]}/>
                    <motion.button className="card--detail-button">Save</motion.button>
                </motion.div>
            </Link>
            
        </motion.div>
    )
}