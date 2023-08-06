import React from 'react';
import { randomStr } from '@utils';
import { Link } from 'react-router-dom';
import { IoChevronForward } from 'react-icons/io5';

import "./styles.scss";

export const GridView = ({ style, gap, items, itemCount = 2, horizontal }) => {
    const gridKey = randomStr(5);

    return (
        <div className="grid-view" style={
            {
                ...style,
                gridTemplateColumns: `repeat(${horizontal ? items.length : itemCount}, 1fr)`,
                gridGap: `${gap}`
            }
        }>
            { items.map((item, index) => {
                return item
            } ) }
        </div>
    )
}

const InformationGroups = ({ style, children }) => {
    return (
        <div className="information-group" style={style}>
            { children }
        </div>
    )
}

const InformationItem = ({ style, title, value, image, subtitle, to="#" }) => {
    return (
        <Link to={to} className="information-group__information-item" style={style}>
            {
                image ?
                (
                    <>
                        <div className="information-group__information-item__image" style={{ backgroundImage: `url(${image})` }}></div>
                        <div className="information-group__information-item__information">
                            <span className="information-group__information-item__information__title">{ title }</span>
                            <span className="information-group__information-item__information__subtitle">{ subtitle }</span>
                        </div>
                        <IoChevronForward className="information-group__information-item__action-icon"/>
                    </>
                ) : (
                    <>
                        <span className="information-group__information-item__title">{ title }</span>
                        <span className="information-group__information-item__value">{ value }</span>
                    </>
                )
            }
        </Link>
    )
}

export const InformationGroup = {
    Group: InformationGroups,
    Item: InformationItem
}