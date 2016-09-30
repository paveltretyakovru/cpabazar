import $ from 'jquery'

import {
  SWITCH_DIALOG,
  SEND_PROFFER_DATA,
  SEND_PROFFER_DATA_URL,
  SEND_PROFFER_DATA_FAIL,
  SEND_PROFFER_DATA_SUCCESS,

  UPDATE_PRICE,
  UPDATE_AGETO,
  UPDATE_AGEFROM,
  UPDATE_APPROVE,
} from '../constants/campaign';

export function switchDialog() {
  return {
    type: SWITCH_DIALOG,
  }
}

export function sendProfferData(data) {
  return (dispatch) => {

    dispatch({
      type: SEND_PROFFER_DATA,
    })

    return $.post(SEND_PROFFER_DATA_URL, data)
      .done(res => {
        console.log('Success send', res);
        dispatch({
          type: SEND_PROFFER_DATA_SUCCESS,
        })
      })
      .fail(res => {
        console.log('Error send', res);
        dispatch({
          type: SEND_PROFFER_DATA_FAIL,
        })
      })
  }
}

export function updateAgeFrom(value) {
  return { type: UPDATE_AGEFROM, payload: value }
}

export function updateAgeTo(value) {
  return { type: UPDATE_AGETO, payload: value }
}

export function updateAddCampaignTextfields(type, value) {
  return {type: type, payload: value}
}

export function updateAddCampaignPrice(value) {
  return {type: UPDATE_PRICE, payload: value }
}

export function updateAddCampaignApprove(value) {
  return {type: UPDATE_APPROVE, payload: value }
}
