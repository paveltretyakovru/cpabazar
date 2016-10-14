import {
  FETCH_APP,
  SET_MESSAGE,
  CLEAR_MESSAGE,
  FETCH_APP_FAIL,
  FETCH_APP_SUCCESS,
  ADD_CAMPAIGN_TO_COLLECTION,

// ================= PROFFERS ==================================================
  PROFFERS_FETCH_REQUEST,
  PROFFERS_FETCH_REQUEST_FAIL,
  PROFFERS_FETCH_REQUEST_SUCCESS,

// ================= PRFFER ====================================================
  DELETE_PROFFER_REQUEST,
  DELETE_PROFFER_REQUEST_FAIL,
  DELETE_PROFFER_REQUEST_SUCCESS,
} from '../constants/app'

const initState = {
  campaigns: [],
  proffers: [],
  fetching: false,
  message: false,
  proffersRequest:false,
  profferDeleteRequest: false,
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

// ================= PROFFERS ==================================================
    case PROFFERS_FETCH_REQUEST:
      return {...state, proffersRequest: true}
    case PROFFERS_FETCH_REQUEST_FAIL:
      return {...state, proffersRequest: false}
    case PROFFERS_FETCH_REQUEST_SUCCESS:
      return {...state, proffers: action.payload, proffersRequest: false}

// ================== PROFFER ==================================================
    case DELETE_PROFFER_REQUEST:
      return {...state, profferDeleteRequest: true}
    case DELETE_PROFFER_REQUEST_FAIL:
      return {...state, profferDeleteRequest: false}
    case DELETE_PROFFER_REQUEST_SUCCESS:
      var proffers = state.proffers.slice()
      for (var i = 0; i < proffers.length; i++) {
        if(proffers[i]._id === action.payload) {
          proffers.splice(i, 1)
          break
        }
      }
      return {...state, profferDeleteRequest: false, proffers: proffers}

    default:
      return state
  }
}
