import {
  FETCH_APP,
  FETCH_APP_FAIL,
  FETCH_APP_SUCCESS,
} from '../constants/app'

const initState = {
  campaigns: [],
  fetching: false,
}

export default function(state = initState, action) {
  switch (action.type) {
    case FETCH_APP:
      return { ...state, fetching: true }

    case FETCH_APP_FAIL:
      return { ...state, fetching: false }

    case FETCH_APP_SUCCESS:
      return { ...state, campaigns: action.payload.campaigns, fetching: false }

    default:
      return state
  }
}
