import React from 'react';
import { View, Ticket, ActionsGroup, AppBar } from '@components';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import * as Icon from 'react-icons/io5';

import "./styles.scss";

export const TicketInformation = ({ title, id }) => {
    return (
        <View overlay layoutId={`card-container-${id}`} style={{backgroundColor: '#f5f5f5'}}>
            <AppBar.AppBar 
                leading={
                    <AppBar.ActionBack />
                }
                title={"Thông tin Ticket"}
            />
            <motion.div className="card-content" style={{width: '100%'}} animate>
                <motion.div
                    className="card-image-container"
                    layoutId={`card-image-container-${id}`}
                    style={{
                        background: 'gray'
                    }}
                >
                </motion.div>
                <motion.div
                    className="title-container"
                    layoutId={`title-container-${id}`}
                >
                    <span className="category"></span>
                    <h2>{title}</h2>
                </motion.div>
                <motion.div className="content-container" animate>
                    <ActionsGroup.Group>
                        <ActionsGroup.Button name="Send" icon={<Icon.IoSendOutline/>}/>
                        <ActionsGroup.Button name="Save" icon={<Icon.IoBookmarkOutline/>}/>
                        <ActionsGroup.Button name="Star" icon={<Icon.IoStarOutline/>}/>
                        <ActionsGroup.Button name="Share" icon={<Icon.IoShareOutline/>}/>
                    </ActionsGroup.Group>
                    <Ticket/>
                </motion.div>
            </motion.div>
        </View>
    )
}