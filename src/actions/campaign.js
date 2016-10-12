import $ from 'jquery'

import {
  SWITCH_DIALOG,
  REMOVE_COMMISSION,
  SEND_PROFFER_DATA,
  ADD_EMPTY_COMMISSION,
  SEND_PROFFER_DATA_URL,
  SEND_PROFFER_DATA_FAIL,
  SEND_PROFFER_DATA_SUCCESS,

  UPDATE_LANDING,
  REMOVE_LANDING,
  ADD_EMPTY_LANDING,

  UPDATE_MALE,
  UPDATE_PRICE,
  UPDATE_AGETO,
  UPDATE_FEMALE,
  UPDATE_AGEFROM,
  UPDATE_APPROVE,
  UPDATE_COMMISSION,
  UPDATE_COMMISSION_COUNTRY,

// ======================== NEW_CAMPAIGN CONSTANTS =============================
  NEW_CAMPAIGN_REQUEST,
  NEW_CAMPAIGN_REQUEST_URL,
  NEW_CAMPAIGN_REQUEST_FAIL,
  NEW_CAMPAIGN_REQUEST_SUCCESS,

// ============== КОНСТАНТЫ ДЛЯ РЕДАКТИРОВАНИЯ КАМПАНИИ ========================
  PUT_CAMPAIGN_REQUEST,
  PUT_CAMPAIGN_REQUEST_URL,
  PUT_CAMPAIGN_REQUEST_FAIL,
  PUT_CAMPAIGN_REQUEST_SUCCESS,
  MOVE_CAMPAIGN_TO_ADDCAMPAIGN,

} from '../constants/campaign'

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
export function updateCommissionCountry(index, value) {
  return {
    type: UPDATE_COMMISSION_COUNTRY,
    payload: {
      index: index,
      country: value,
    },
  }
}

export function addEmptyLanding() {
  return {type: ADD_EMPTY_LANDING}
}

export function removeLanding(index) {
  return {type: REMOVE_LANDING, payload: index}
}

export function updateLanding(event, index) {
  console.log('Update lending!', event.target.name);
  return {
    type: UPDATE_LANDING,
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

/**
 * Метод вызывает редьюсер заполнения редактора кампании готовыми данными
 * @param  {Object} data объект с данными редактируемой кампании
 * @return {Object}      dispatch типа MOVE_CAMPAIGN_TO_ADDCAMPAIGN
 */
export function moveCampaignDataToAddCampaign(data) {
  console.log('MOVE CAMPAIGN');
  return { type:MOVE_CAMPAIGN_TO_ADDCAMPAIGN, payload: data }
}

/**
 * Метод отправляет объект обновленной кампании для сохранения
 * @param  {Object} data state.addcampaign
 * @return {Promise}      Возвращает обещания выполнено запроса PUT на сервер
 */
export function putCampaignRequest(data) {
  return (dispatch) => {
    dispatch({type: PUT_CAMPAIGN_REQUEST})

    return $.ajax({
      url: PUT_CAMPAIGN_REQUEST_URL,
      type: 'PUT',
      data: data,
    })
      .done(res => dispatch({type: PUT_CAMPAIGN_REQUEST_SUCCESS, payload: res}))
      .fail(res => dispatch({type: PUT_CAMPAIGN_REQUEST_FAIL, payload: res}))
  }
}
