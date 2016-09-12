import {
  LOGIN_URL,
  FETCH_APP,
  FETCH_APP_URL,
  FETCH_APP_FAIL,
  FETCH_APP_SUCCESS,
  SEND_LOGIN_REQUEST,
} from '../constants/app'
import {post} from 'jquery'
import fetch from 'isomorphic-fetch';
import {push} from 'react-router-redux'

export function fetchPage() {
  return (dispatch) => {
    dispatch({type: FETCH_APP})
    fetch(FETCH_APP_URL)
      .then((res) => {
        if(res.status >= 400) {
          return dispatch({
            type: FETCH_APP_FAIL,
            payload: res,
          })
        }
        return res.json()
      })
      .then((result) => {
        dispatch({
          type: FETCH_APP_SUCCESS,
          payload: result,
        })
      })
  }
}

export function routeToLogin() {
  return dispatch => dispatch(push('/login'))
}

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
