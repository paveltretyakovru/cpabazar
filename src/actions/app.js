import {
  LOGIN_URL,
  FETCH_APP,
  SET_MESSAGE,
  FETCH_APP_URL,
  CLEAR_MESSAGE,
  FETCH_APP_FAIL,
  FETCH_APP_SUCCESS,
  SEND_LOGIN_REQUEST,
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
export function routeToLogin() {
  return dispatch => dispatch(push('/login'))
}

// -----------------------------------------------------------------------------
export function routeToAddCampaign() {
  console.log('Action route to add campaign');
  return dispatch => dispatch(push('/addCampaign'))
}

// -----------------------------------------------------------------------------
export function routeToEditCampaign(id) {
  return dispatch => dispatch(push(`/editCampaign/${id}`))
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
