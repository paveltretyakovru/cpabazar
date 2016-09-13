import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_SUCCESS,
} from '../constants/user'

const initState = {
  request: false,
}

export default function(state = initState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, request: true }

    case LOGIN_REQUEST_FAIL:
      return { ...state, request: false }

    case LOGIN_REQUEST_SUCCESS:
      return { ...state, request: false }

    default:
      return state
  }
}
