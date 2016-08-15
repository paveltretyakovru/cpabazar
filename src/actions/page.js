'use strict';

import fetch from 'isomorphic-fetch';
import {
  FETCH_PAGE,
  FETCH_PAGE_URL,
  FETCH_PAGE_FAIL,
  FETCH_PAGE_SUCCESS,
} from '../constants/page';

export function fetchPage() {
  return (dispatch) => {
    dispatch({type: FETCH_PAGE});

    fetch(FETCH_PAGE_URL)
      .then((res) => {
        if(res.status >= 400) {
          return dispatch({
            type: FETCH_PAGE_FAIL,
            payload: res,
          });
        }

        return res.json();
      })
      .then((result) => {

        return dispatch({
          type: FETCH_PAGE_SUCCESS,
          payload: result,
        });
      });
  }
}
