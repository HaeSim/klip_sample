import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getResultKlip } from '../redux/actions/wallet';
import { useSelector } from 'react-redux';

const Timer = ({ time }) => {
    const [_time, setTime] = useState(Math.floor((time * 1000 - (new Date()).getTime()) / 1000));
    const { klipInfo, isLoggedIn} = useSelector(state => state.wallet)
    const dispatch = useDispatch();
    const min = Math.floor(Math.floor((time * 1000 - (new Date()).getTime()) / 1000) / 60);
    const sec = Math.floor((time * 1000 - (new Date()).getTime()) / 1000) % 60;
    
    useEffect(() => {
        if ((min*60 + sec <= 0) || (isLoggedIn) ) return;
        const timeout = setTimeout(() => {
            dispatch(getResultKlip(klipInfo.request_key));
            setTime(_time - 1);
        }, 1000);
        
        return ()=> clearTimeout(timeout);
    }, [dispatch, _time, min, sec, isLoggedIn, klipInfo.request_key]);


    return <div>{`${min} : ${sec}`}</div>;
};

export default Timer;
