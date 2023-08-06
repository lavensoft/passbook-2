import React from 'react';

import "./styles.scss";

export const TextInput = ({ icon, placeholder, type="text", onChange, ref, disabled = false, defaultValue }) => {
    return (
        <div className="text-input">
            {
                icon && <div className="text-input__icon">{ icon }</div>
            }

            <input defaultValue={defaultValue} className="text-input__input" type={ type } disabled={disabled} onChange={ onChange } ref={ ref } placeholder={ placeholder } />
        </div>
    )
}

export const TextArea = ({ placeholder, defaultValue, style, onChange, ref }) => {
    return (
        <textarea style={{
            ...style,
            height: 150,
            paddingTop: 12
        }} className="text-input" placeholder={ placeholder } onChange={ onChange } ref={ ref }>{ defaultValue }</textarea>
    )
}