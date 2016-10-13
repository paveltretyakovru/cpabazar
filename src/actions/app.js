import {
  LOGIN_URL,
  FETCH_APP,
  SET_MESSAGE,
  FETCH_APP_URL,
  CLEAR_MESSAGE,
  FETCH_APP_FAIL,
  FETCH_APP_SUCCESS,
  SEND_LOGIN_REQUEST,
  ADD_CAMPAIGN_TO_COLLECTION,

// ================= PROFFERS ==================================================
  PROFFERS_FETCH_REQUEST,
  PROFFERS_FETCH_REQUEST_URL,
  PROFFERS_FETCH_REQUEST_FAIL,
  PROFFERS_FETCH_REQUEST_SUCCESS,
} from '../constants/app'
import {post} from 'jquery'
import fetch from 'isomorphic-fetch'
import {push} from 'react-router-redux'

// -----------------------------------------------------------------------------

export function fetchPage() {
  return (dispatch) => {
    dispatch({type: FETCH_APP})

    return new Promise(function(resolve, reject) {
      fetch(FETCH_APP_URL, {credentials: 'include'})
      .then((res) => {
        if(res.status >= 400) {

          // Выполняем акшион АПП
          dispatch({
            type: FETCH_APP_FAIL,
            payload: res,
          })

          // Выполняем метод обещания
          return reject(res)
        }
        return res.json()
      })
      .then((result) => {
        console.log('Fetch finished', result);

        // Выполняет акшион АПП
        dispatch({
          type: FETCH_APP_SUCCESS,
          payload: result,
        })

        // Выполняем метод обещания
        return resolve(result)
      })
    })
  }
}

// -----------------------------------------------------------------------------
/**
 * Переход на главную страницу
 * @return {Object} в любом случае возвращает диспатч
 */
export function routeToIndex() {
  return dispatch => dispatch(push('/'))
}

// -----------------------------------------------------------------------------
/**
 * Переход на страницу аутентификации
 * @return {Object} в любом случае возвращает диспатч
 */
export function routeToLogin() {
  return dispatch => dispatch(push('/login'))
}

// -----------------------------------------------------------------------------
/**
 * Переход на страницу с добавлени якампании
 * @return {Object} в любом случае возвращает диспатч
 */
export function routeToAddCampaign() {
  console.log('Action route to add campaign');
  return dispatch => dispatch(push('/addCampaign'))
}

// -----------------------------------------------------------------------------
/**
 * Переход на страницу с редактирования кампании
 * @return {Object} в любом случае возвращает диспатч
 */
export function routeToEditCampaign(id) {
  return dispatch => dispatch(push(`/editCampaign/${id}`))
}

// -----------------------------------------------------------------------------
/**
 * Переход на страницу с предложениями
 * @return {Object} в любом случае возвращает диспатч
 */
export function routeToProffersList() {
  return dispatch => dispatch(push('/proffers'))
}

// -----------------------------------------------------------------------------
/**
 * Загрузка предложений с сервера
 * @return {Object} в любом случае возвращает диспатч
 */
export function fetchProffers() {
  return dispatch => {
    dispatch({type: PROFFERS_FETCH_REQUEST})

    console.log('FEEEEEEEEEETCHING!!!!');

    return new Promise(function(resolve, reject) {
      fetch(PROFFERS_FETCH_REQUEST_URL, {credentials: 'include'})
        .then((res) => {
          if(res.status >= 400) {
            dispatch({ type: PROFFERS_FETCH_REQUEST_FAIL, payload: res})
            return reject(res)
          }
          return res.json()
        })
        .then((res) => {
          dispatch({type: PROFFERS_FETCH_REQUEST_SUCCESS, payload: res})
          return resolve(res)
        })
    })
  }
}


// -----------------------------------------------------------------------------
export function sendLogin(login, password) {
  console.log(LOGIN_URL, SEND_LOGIN_REQUEST)
  return dispatch => {
    dispatch({type: SEND_LOGIN_REQUEST})

    post(LOGIN_URL, { login: login, password: password })
      .then(res => {
        console.log('Response result! :)', res);
      })
  }
}

// -----------------------------------------------------------------------------
export function setMessage(message) {
  return {
    type: SET_MESSAGE,
    payload: message,
  }
}

// -----------------------------------------------------------------------------
export function clearMessage() {
  return { type: CLEAR_MESSAGE }
}

export function addCampaignToCollection(res) {
  return { type: ADD_CAMPAIGN_TO_COLLECTION, payload: res.campaign }
}
