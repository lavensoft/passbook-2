import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-scanner'
import { AppBar, View, Title, FeatureCard, SectionTitle, SquareCard, GridView, ScrollView, ListView, BalanceCard } from '@components';
import API from '@api';
import Swal from 'sweetalert2';

import "./styles.scss";

export const QRScanScreen = () => {
    const [scanSuccess, setScanSuccess] = useState(false);

    const handleScan = async (data) => {
        if(data?.text) {
            setScanSuccess(true);

            try {
                let ticketVerify = await API.NFT.checkinTicket(data.text);

                console.log(ticketVerify);

                Swal.fire(
                    'Vé hợp lệ!',
                    '',
                    'success'
                ).then(e => setScanSuccess(false));
            }catch(e) {
                console.log(e);
                Swal.fire(
                    'Vé không hợp lệ!',
                    '',
                    'error'
                ).then(e => setScanSuccess(false));
            }
        };
    }

    const handleErr = (err) => {
        console.log(err);
    }

    return (
        <View>
            <h1>Ticket Scan</h1>
            
            {
                !scanSuccess && (
                    <QrReader
                        delay={ 100 }
                        style={{
                            width: '100%',
                        }}
                        onError={ handleErr }
                        onScan={ handleScan }
                    />
                )
            }
        </View>
    )
}