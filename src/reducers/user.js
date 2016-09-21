import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_SUCCESS,
  CLEAR_REQUEST_MESSAGE,
} from '../constants/user'

const initState = {
  auth: false,
  request: false,
  message: '',
}

export default function(state = initState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, request: true }

    case LOGIN_REQUEST_FAIL:
      return { ...state, request: false }

    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        auth: action.payload.success || false,
        message: action.payload.message || '',
        request: false,
      }

    case CLEAR_REQUEST_MESSAGE:
      return { ...state, message: false }

    default:
      return state
  }
}
