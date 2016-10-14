import {post} from 'jquery'
import fetch from 'isomorphic-fetch'

import {
  SET_AUTH,
  LOGIN_URL,
  LOGOUT_URL,
  LOGIN_REQUEST,
  SET_AUTH_FALSE,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_SUCCESS,
  CLEAR_REQUEST_MESSAGE,
} from '../constants/user'

const loadTimeout = callback => setTimeout(callback, 1000)

export function sendLogin(login, password) {
  return dispatch => {
    dispatch({type: LOGIN_REQUEST})

    post(LOGIN_URL, { login: login, password: password })
      .done(res => {
        console.log('Result', res)
        loadTimeout(() => dispatch({type: LOGIN_REQUEST_SUCCESS, payload: res}))
      })
      .fail(res => {
        console.log('Result', res)
        loadTimeout(() => dispatch({type: LOGIN_REQUEST_FAIL, payload: res}))
      })
  }
}

export function clearRequestMessage() {
  return { type: CLEAR_REQUEST_MESSAGE }
}

export function setAuth(result) {
  console.log('SET AUTH RESULT', result);
  return { type: SET_AUTH, payload: result.auth || false}
}

export function sendLogout() {
  return (dispatch) => {
    return new Promise(function(resolve, reject) {
      fetch(LOGOUT_URL, {credentials: 'include'})
        .then(res => {
          if(res.status >= 400) {
            console.error('Ошибка запроса :(', res)
            return reject(res)
          }
          return res.json()
        })
        .then(res => {
          dispatch({type: SET_AUTH_FALSE})

          // Выполняем метод обещания
          return resolve(res)
        })
    })
  }
}
