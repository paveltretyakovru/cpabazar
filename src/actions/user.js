import {post} from 'jquery'

import {
  LOGIN_URL,
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_SUCCESS,
} from '../constants/user'

export function sendLogin(login, password) {
  return dispatch => {
    dispatch({type: LOGIN_REQUEST})

    post(LOGIN_URL, { login: login, password: password })
      .done(res => {
        setTimeout(
          () => dispatch({type: LOGIN_REQUEST_SUCCESS, payload: res}),
          1000
        )
      })
      .fail(res => {
        setTimeout(
          () => dispatch({type: LOGIN_REQUEST_FAIL, payload: res}),
          1000
        )
      })
  }
}
