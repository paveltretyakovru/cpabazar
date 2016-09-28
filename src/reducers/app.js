import {
  FETCH_APP,
  SET_MESSAGE,
  CLEAR_MESSAGE,
  FETCH_APP_FAIL,
  FETCH_APP_SUCCESS,
} from '../constants/app'

const initState = {
  campaigns: [],
  fetching: false,
  message: false,
}

export default function(state = initState, action) {
  switch (action.type) {
    case FETCH_APP:
      return { ...state, fetching: true }

    case FETCH_APP_FAIL:
      return { ...state, fetching: false }

    case FETCH_APP_SUCCESS:
      return { ...state, campaigns: action.payload.campaigns, fetching: false }

    case SET_MESSAGE:
      return { ...state, message: action.payload }

    case CLEAR_MESSAGE:
      return { ...state, message: false }

    default:
      return state
  }
}
