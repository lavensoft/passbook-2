import React from 'react';
import QRCode from "react-qr-code";

import "./styles.scss";

export const Ticket = ({ title, description, place, date, time, section, seat, price, preorder, qrValue, supplies, checkin, category }) => {
    return (
        <div className="ticket">
            <div className="ticket__head">
                <div className="ticket__head__logo">
                    <img className="ticket__head__logo__image" src="https://lavenes.com/favicon.png"/>
                </div>
                { category && <div className="ticket__head__badge">
                    <span className="ticket__head__badge__title">{ category }</span>
                </div> }
                {/* <div className="ticket__head__actions">
                    <button className="ticket__head__actions__button">
                        <Icon.IoShareOutline/>
                    </button>
                </div> */}
            </div>

            <h1 className="ticket__title">{ title }</h1>
            <p className="ticket__description">{ description }</p>
            
            <div className="ticket__divide--line"></div>

            <div className="ticket__content">
                <div className="ticket__content__row">
                    <div className="ticket__content__row__col">
                        <span className="ticket__content__title">Địa điểm</span>
                        <span className="ticket__content__value">{ place }</span>
                    </div>
                </div>

                <div className="ticket__content__row">
                    <div className="ticket__content__row__col">
                        <span className="ticket__content__title">Ngày diễn ra</span>
                        <span className="ticket__content__value">{ date }</span>
                    </div>
                    <div className="ticket__content__row__col">
                        <span className="ticket__content__title">Giờ</span>
                        <span className="ticket__content__value__feature">{ time }</span>
                    </div>
                </div>
                
                <div className="ticket__content__row">
                    <div className="ticket__content__row__col">
                        <span className="ticket__content__title">Giá</span>
                        <span className="ticket__content__value">{ price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }</span>
                    </div>
                    { preorder && <div className="ticket__content__row__col">
                        <span className="ticket__content__title">Ngày phát hành</span>
                        <span className="ticket__content__value">{ preorder }</span>
                    </div> }
                </div>
                
                <div className="ticket__content__row">
                    { supplies && <div className="ticket__content__row__col">
                        <span className="ticket__content__title">Số lượng</span>
                        <span className="ticket__content__value">{ supplies }</span>
                    </div> }
                    <div className="ticket__content__row__col">
                        <span className="ticket__content__title">Checkin</span>
                        <span className="ticket__content__value">{ checkin ? 'Đã sử dụng' : 'Chưa sử dụng' }</span>
                    </div>
                </div>
            </div>

            { qrValue && <div className="ticket__divide"></div> }

            { qrValue && <div className="ticket__content">
                <div className="ticket__content__row">
                    <div className="ticket__content__row__col">
                        <span className="ticket__content__title">QR Code</span>
                        <div className="ticket__content__qr-code">
                            <QRCode value={ qrValue } level='L'/>
                        </div>
                    </div>
                </div>
            </div> }
        </div>
    )
}