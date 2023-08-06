import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

import "./styles.scss";
import { randomStr } from '@utils';

export const List = ({ style, items, gap, horizontal }) => {
    const listKey = randomStr(5);

    return (
        <div className="list-view" style={
            {
                ...style,
                flexDirection: horizontal ? "row" : "column",
                gap: `${gap}`
            }
        }>
            { items.map((item, index) => {
                return item
            } ) }
        </div>
    )
}

export const ListTile = ({ style, leading, title, subtitle, onClick, id, to="#" }) => {
    return (
        <motion.div to={to} className="list-view__item__tile" style={style} onClick={onClick} layoutId={`card-container-${id}`}>
            <Link className="list-view__item__tile__link" to={to}>
                <div className="list-view__item__tile__link__leading">
                    { leading }
                </div>
                <div className="list-view__item__tile__link__content">
                    <span className="list-view__item__tile__link__content__title">
                        { title }
                    </span>
                    <span className="list-view__item__tile__link__content__subtitle">
                        { subtitle }
                    </span>
                </div>
            </Link>
        </motion.div>
    )
}

export const ListTileImage = ({ style, src, id}) => {
    return (
        <motion.div layoutId={`card-image-container-${id}`} className="list-view__item__tile__link__leading__image" style={{
            ...style,
            backgroundImage: `url(${src})`
        }}></motion.div>
    )
}