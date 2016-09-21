import {post} from 'jquery'

import {
  LOGIN_URL,
  LOGIN_REQUEST,
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
