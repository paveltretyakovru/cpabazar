import {
  FETCH_APP,
  FETCH_APP_URL,
  FETCH_APP_FAIL,
  FETCH_APP_SUCCESS,
} from '../constants/app'
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
        return dispatch({
          type: FETCH_APP_SUCCESS,
          payload: result,
        })
      })
  }
}

export function routeToLogin() {
  return dispatch => dispatch(push('/login'))
}
