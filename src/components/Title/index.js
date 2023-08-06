import React from 'react';
import { Link } from 'react-router-dom';
import { IoChevronForward } from 'react-icons/io5';

import './styles.scss';

export const Title = ({ title, subtitle, style }) => {
    return (
        <div style={style} className="title title-header">
            <span  className="title-header__sub">{ subtitle }</span>
            <h1 className="title-header__big">{ title }</h1>
        </div>
    )
}

export const SectionTitle = ({ title, readMoreUrl="#", readMoreTitle, style }) => {
    return (
        <div className="title title-section" style={ style }>
            <h2 className="title-section__title">{ title }</h2>
            <Link className="title-section__read-more" to={ readMoreUrl }>
                { readMoreTitle }
                { readMoreUrl !== "#" && <IoChevronForward className="title-section__read-more__icon"/> }
            </Link>
        </div>
    )
}

export const PriceTitle = ({ price, currency }) => {
    return (
        <div className="title title-price">
            <span className="title-price__price">{ price }</span>
            <span className="title-price__currency">{ currency }</span>
        </div>
    )
}