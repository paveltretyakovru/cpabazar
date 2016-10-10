import $ from 'jquery'

import {
  SWITCH_DIALOG,
  REMOVE_COMMISSION,
  SEND_PROFFER_DATA,
  ADD_EMPTY_COMMISSION,
  SEND_PROFFER_DATA_URL,
  SEND_PROFFER_DATA_FAIL,
  SEND_PROFFER_DATA_SUCCESS,

  UPDATE_LENDING,
  REMOVE_LENDING,
  ADD_EMPTY_LENDING,

  UPDATE_MALE,
  UPDATE_PRICE,
  UPDATE_AGETO,
  UPDATE_FEMALE,
  UPDATE_AGEFROM,
  UPDATE_APPROVE,
  UPDATE_COMMISSION,

// ======================== NEW_CAMPAIGN CONSTANTS =============================
  NEW_CAMPAIGN_REQUEST,
  NEW_CAMPAIGN_REQUEST_URL,
  NEW_CAMPAIGN_REQUEST_FAIL,
  NEW_CAMPAIGN_REQUEST_SUCCESS,

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

export function updateCalltime(type, value) {
  return { type: type, payload: value }
}
export function updateMale(event, value) {
  return { type: UPDATE_MALE, payload: value }
}

export function updateFemale(event, value) {
  return { type: UPDATE_FEMALE, payload: value }
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

export function addEmptyCommission() {
  return {type: ADD_EMPTY_COMMISSION}
}

export function removeCommission(index) {
  return {type: REMOVE_COMMISSION, payload: index}
}

export function updateCommission(event, index) {
  return {
    type: UPDATE_COMMISSION,
    payload: {
      index: index,
      value: event.target.value,
    },
  }
}

export function addEmptyLending() {
  return {type: ADD_EMPTY_LENDING}
}

export function removeLending(index) {
  return {type: REMOVE_LENDING, payload: index}
}

export function updateLending(event, index) {
  console.log('Update lending!', event.target.name);
  return {
    type: UPDATE_LENDING,
    payload: {
      name: event.target.name,
      index: index,
      value: event.target.value,
    },
  }
}

export function addCampaign(addstate) {
  return (dispatch) => {
    console.log('addCampaign method')

    dispatch({ type: NEW_CAMPAIGN_REQUEST })

    return $.post(NEW_CAMPAIGN_REQUEST_URL, addstate)
      .done( res => {
        dispatch({ type: NEW_CAMPAIGN_REQUEST_SUCCESS, payload: res })
      })
      .fail( res => {
        dispatch({ type: NEW_CAMPAIGN_REQUEST_FAIL, payload: res })
      })
  }
}
