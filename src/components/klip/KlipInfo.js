import React, { useCallback } from 'react'
import {  useSelector, useDispatch } from 'react-redux'
import { getCardKlip } from '../../redux/actions/wallet';
import styled from 'styled-components';
import Card from './Card';

const CardListWrapper = styled.div`
  display: ${props => props.load ? 'block' : 'flex'};
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const KlipInfo = () => {
    const {isLoggedIn, klipInfo, info, type} = useSelector(state => state.wallet);
    const dispatch = useDispatch();


    const cardList = klipInfo.isCardLoading ? (<progress/>) : klipInfo.cards?.map((card, key) => (<Card key={key} card={card}/>))

    const onClickCard = useCallback(() => {
        if(!isLoggedIn) {
            alert('plz login....')
            return false;
        }
        if(type !== 'klip') {
            alert('plz login.. by klip wallet.')
            return false;
        }
        dispatch(getCardKlip(info.address));
    }, [dispatch, isLoggedIn, type, info.address ]);

    return (
        <div style={{
            border: '1px solid black',
            margin: '2px',
            textAlign: 'center'
        }}>
            <h2>Klip Card List</h2>
            <button onClick={() => onClickCard()}> Load Card</button>
            <h4>| card Info |</h4>
            <CardListWrapper load={klipInfo.isCardLoading}>
                {cardList}
            </CardListWrapper>
        </div>
    )
}

export default KlipInfo