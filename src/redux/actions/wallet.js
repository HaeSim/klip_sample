// import caver from '../../klaytn/caver'
import { getResult, prepare, getCardList } from 'klip-sdk';
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';

import {
  PREPARE_KLIP_REQUEST,
  PREPARE_KLIP_SUCCESS,
  PREPARE_KLIP_FAILURE,
  GET_RESULT_KLIP_REQUEST,
  GET_RESULT_KLIP_SUCCESS,
  GET_RESULT_KLIP_FAILURE,
  GET_CARD_KLIP_REQUEST,
  GET_CARD_KLIP_SUCCESS,
  GET_CARD_KLIP_FAILURE,
} from './actionTypes'

export const prepareKlipRequest = createAction(PREPARE_KLIP_REQUEST);
export const prepareKlipSuccess = createAction(PREPARE_KLIP_SUCCESS);
export const prepareKlipFailure = createAction(PREPARE_KLIP_FAILURE);

export const getResultKlipRequest = createAction(GET_RESULT_KLIP_REQUEST);
export const getResultKlipSuccess = createAction(GET_RESULT_KLIP_SUCCESS);
export const getResultKlipFailure = createAction(GET_RESULT_KLIP_FAILURE);

export const getCardKlipRequest = createAction(GET_CARD_KLIP_REQUEST);
export const getCardKlipSuccess = createAction(GET_CARD_KLIP_SUCCESS);
export const getCardKlipFailure = createAction(GET_CARD_KLIP_FAILURE);


const prepareKlipAuth = async () => {
  const bappName = 'Klaytn_DEAN';
  const successLink = '#';
  const failLink = '#';
  try {
    const res = await prepare.auth({ bappName, successLink, failLink });
    if (res.err) {
      throw new Error('prepare Error');
    }
    return res;
  } catch (error) {
    throw new Error(error);
  }
  
}

export const prepareKlip = () => {
  return dispatch => {
    dispatch(prepareKlipRequest());
    prepareKlipAuth().then((result) => {
    dispatch(prepareKlipSuccess(result));
    })
    .catch((error) => {
      console.log(error);
      dispatch(prepareKlipFailure(error));
    });
  }
}

const getResultKlipAuth = async (request_key) => {
  try {
    const res = await getResult(request_key);
    if (res.status !== "completed") {
        throw new Error('인증이 완료되지 않았습니다.');
    } 
    const address = res.result?.klaytn_address;

    sessionStorage.setItem('address', JSON.stringify(res.result.klaytn_address))
    return {address, status: res.status};
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
  
}

export const getResultKlip = (request_key) => {
  return dispatch => {
    dispatch(getResultKlipRequest());
    getResultKlipAuth(request_key).then((result) => {
      dispatch(getResultKlipSuccess(result));
    })
    .catch((error) => {
      console.log(error);
      dispatch(getResultKlipFailure(error));
    });
  }
}

const getCardKlipList = async (address) => {
  const info = {eoa : address,
           contract : '0x0f13a3fd2861646df38c77db4ff34d2941e6848e',
             cursor : ''} 
  let list = [];
  await getCardList(info).then(async (res)=> {
    for(let i=0; i<res.cards.length; i++) {
      await axios.get(res.cards[i].card_uri).then((res)=> {
        list.push({name : res.data.name,
                  image : res.data.image,
                  description: res.data.description,
                  external_link: res.data.external_link});
      }).catch((err)=> {
        console.log(err);
      })
    }
  }).catch((err)=> {
    console.log('err : ', err);
    alert('getResult error!! : ', err.message);
  });

  return list;
}

export const getCardKlip = (address) => {
  return async dispatch => {
    dispatch(getCardKlipRequest());
    try {
      const result = await getCardKlipList(address);
      dispatch(getCardKlipSuccess(result));

    } catch (error) {
      console.log(error);
      dispatch(getCardKlipFailure(error))
    }
  }
}

const loginKlipAuth = async () => {
  const bappName = 'Klaytn_DEAN';
  const successLink = '#';
  const failLink = '#';
  try {
    const res = await prepare.auth({ bappName, successLink, failLink });
    if (res.err) {
      throw new Error('prepare Error');
    }
    return res;
  } catch (error) {
    throw new Error(error);
  }
  
}

export const loginKlip = () => {
  return dispatch => {
    loginKlipAuth().then((result) => {
    dispatch(prepareKlipSuccess(result));
    })
    .catch((error) => {
      console.log(error);
      dispatch(prepareKlipFailure(error));
    });
  }
}