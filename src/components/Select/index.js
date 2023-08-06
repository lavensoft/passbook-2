import React, { useState } from 'react';

import "./styles.scss";

export const SelectBox = ({ options, placeholder, onChange, defaultValue }) => {
    return (
        <div className="select-box">
            <select className="select-box__box" onChange={ onChange }>
                { placeholder && <option disabled selected>{ placeholder }</option> }
                {
                    options.map((item, index) => {
                        return (
                            <option id="optionBox" selected={defaultValue == item.value} className="select-box__box__option" value={item.value} key={`${item.value}-${index}`}>{ item.label }</option>
                        )
                    })
                }
            </select>
        </div>
    )
}