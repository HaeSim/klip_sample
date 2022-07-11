import React, { useCallback } from 'react'
import {  useSelector, useDispatch } from 'react-redux'
import { QRCodeCanvas } from 'qrcode.react';

import { prepareKlip } from '../redux/actions/wallet';
import Timer from './Timer';

const WalletKlip = () => {
    const {isLoggedIn, klipInfo} = useSelector(state => state.wallet);
    const dispatch = useDispatch();

    const onClickConnect = useCallback(async () => {
        if(isLoggedIn) {
            alert('이미 로그인되어있습니다.')
            return false;
        }
        dispatch(prepareKlip());

    }, [dispatch, isLoggedIn]);

    return (
        <div style={{
            border: '1px solid black',
            margin: '2px',
            textAlign: 'center'
        }}>
            <h2>Klip Wallet Connect</h2>
            {isLoggedIn ? null : <button onClick={() => onClickConnect()}> 연결</button>}
            <h4>| status |</h4>
            <h5>{klipInfo.status}</h5>
            {isLoggedIn ? null : <h4>| request_key |</h4>}
            {isLoggedIn ? null : <h5>{klipInfo.request_key}</h5>}
            {isLoggedIn ? null : (klipInfo.request_key  ? (<a href={`https://klipwallet.com/?target=/a2a?request_key=${klipInfo.request_key}`} target="_blank" rel="noreferrer"><QRCodeCanvas value={`https://klipwallet.com/?target=/a2a?request_key=${klipInfo.request_key}`}/></a>) : (<></>))}
            {isLoggedIn ? null : (klipInfo.request_key  ? <h5>click QRcode</h5> :(<></>))}
            {isLoggedIn ? null : <h4>| Expiration time |</h4>}
            {isLoggedIn ? null : (klipInfo.expiration_time === null ? null : (<Timer time={klipInfo.expiration_time}/>))}
        </div>
    )
}

export default WalletKlip