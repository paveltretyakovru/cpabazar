import {
  FETCH_APP,
  SET_MESSAGE,
  CLEAR_MESSAGE,
  FETCH_APP_FAIL,
  FETCH_APP_SUCCESS,
  ADD_CAMPAIGN_TO_COLLECTION,
} from '../constants/app'

const initState = {
  campaigns: [],
  proffers: [],
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

    case ADD_CAMPAIGN_TO_COLLECTION:
      var campaigns = state.campaigns.slice()
      campaigns.push(action.payload)
      return { ...state, campaigns: campaigns }

    default:
      return state
  }
}
