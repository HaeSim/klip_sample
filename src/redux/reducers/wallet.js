import { createReducer } from '@reduxjs/toolkit';

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
} from '../actions/actionTypes'

const initialState = {
  isLoading: false,
  isLoggedIn: !!sessionStorage.getItem('walletInstance'),
  type: null,
  info: { name:null, address:null, balance:null, expire:null, network: null},
  klipInfo:{ expiration_time: null, request_key: null, status: null, cards : [], isCardLoading : false},
  error: null,
}
const walletReducer = createReducer(initialState, {
  [PREPARE_KLIP_REQUEST] : (state) => {
      state.isLoading = true;
  },
  [PREPARE_KLIP_SUCCESS] : (state, action) => {
      state.isLoading = false;
      state.type = 'klip';
      state.klipInfo = action.payload
  },
  [PREPARE_KLIP_FAILURE] : (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
  },
  [GET_RESULT_KLIP_REQUEST] : (state) => {
      state.isLoading = true;
  },
  [GET_RESULT_KLIP_SUCCESS] : (state,action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.type = 'klip';
      state.klipInfo.status = action.payload.status;
      state.info.address = action.payload.address;
  },
  [GET_RESULT_KLIP_FAILURE] : (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
  },
  [GET_CARD_KLIP_REQUEST] : (state) => {
      state.klipInfo.isCardLoading = true;
  },
  [GET_CARD_KLIP_SUCCESS] : (state,action) => {
      state.klipInfo.isCardLoading = false;
      state.klipInfo.cards = action.payload;
  },
  [GET_CARD_KLIP_FAILURE] : (state, action) => {
      state.klipInfo.isCardLoading = false;
      state.error = action.payload;
  },
})  

export default walletReducer
