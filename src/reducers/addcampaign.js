import {
  UPDATE_NAME,
  UPDATE_DESC,
  UPDATE_MALE,
  UPDATE_PRICE,
  UPDATE_AGETO,
  UPDATE_FEMALE,
  UPDATE_APPROVE,
  UPDATE_AGEFROM,
  UPDATE_CATEGORY,
  UPDATE_LONGDESC,
  UPDATE_LENDINGS,
  REMOVE_COMMISSION,
  UPDATE_RECCOMMENT,
  UPDATE_CALLTIMETO,
  UPDATE_COMMISSION,
  UPDATE_COMMISSIONS,
  UPDATE_CALLTIMEFROM,
  ADD_EMPTY_COMMISSION,
  ADD_EMPTY_LENDING,
  UPDATE_LENDING,
  REMOVE_LENDING,

// ========================== NEW_CAMPAIGN CONSTANTS ===========================
  NEW_CAMPAIGN_REQUEST,
  NEW_CAMPAIGN_REQUEST_FAIL,
  NEW_CAMPAIGN_REQUEST_SUCCESS,

} from '../constants/campaign'

const initState = {
  name: '',
  desc: '',
  male: false,
  price: 0,
  ageto: 45,
  famale: false,
  approve:0,
  agefrom: 24,
  category: '',
  longdesc: '',
  lendings: [{title: 'Гугле', url: 'http://google.com'}],
  reccomment: '',
  calltimeto: '',
  commissions: [{price: 345}],
  calltimefrom: '',
  addCampaignRequest: false,
}

export default function(state = initState, action) {
  var commissions = state.commissions.slice()
  var lendings = state.lendings.slice()
  var payload = action.payload

  switch (action.type) {

    case UPDATE_COMMISSION:
      commissions[action.payload.index].price = action.payload.value
      return { ...state, commissions: commissions }
    case REMOVE_COMMISSION:
      commissions.splice(action.payload, 1)
      return { ...state, commissions: commissions }
    case ADD_EMPTY_COMMISSION:
      commissions.push({price: 0})
      return {...state, commissions: commissions}

    case ADD_EMPTY_LENDING:
      lendings.push({title: 'Гугле', url: 'http://google.com'})
      return {...state, lendings: lendings}
    case REMOVE_LENDING:
      lendings.splice(action.payload, 1)
      return { ...state, lendings: lendings }
    case UPDATE_LENDING:
      lendings[payload.index][payload.name] = payload.value
      return { ...state, lendings: lendings }

    case UPDATE_NAME:
      return { ...state, name: action.payload }

    case UPDATE_DESC:
      return { ...state, desc: action.payload }

    case UPDATE_MALE:
      return { ...state, male: action.payload }

    case UPDATE_PRICE:
      return { ...state, price: action.payload }

    case UPDATE_AGETO:
      return { ...state, ageto: action.payload }

    case UPDATE_FEMALE:
      return { ...state, famale: action.payload }

    case UPDATE_APPROVE:
      return { ...state, approve: action.payload }

    case UPDATE_AGEFROM:
      return { ...state, agefrom: action.payload }

    case UPDATE_CATEGORY:
      return { ...state, category: action.payload }

    case UPDATE_LONGDESC:
      return { ...state, longdesc: action.payload }

    case UPDATE_LENDINGS:
      return { ...state, lendings: action.payload }

    case UPDATE_RECCOMMENT:
      return { ...state, reccomment: action.payload }

    case UPDATE_CALLTIMETO:
      return { ...state, calltimeto: action.payload }

    case UPDATE_COMMISSIONS:
      return { ...state, commissions: action.payload }

    case UPDATE_CALLTIMEFROM:
      return { ...state, calltimefrom: action.payload }

// =============== NEW_CAMPAIGN REDUCERS =======================================
    case NEW_CAMPAIGN_REQUEST:
      return { ...state, addCampaignRequest: true }
    case NEW_CAMPAIGN_REQUEST_FAIL:
      return { ...state, addCampaignRequest: false }
    case NEW_CAMPAIGN_REQUEST_SUCCESS:
      return { ...state, addCampaignRequest: false }

    default:
      return state
  }
}
