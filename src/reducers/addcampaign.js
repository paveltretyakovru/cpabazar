import {
  UPDATE_NAME,
  UPDATE_DESC,
  UPDATE_MALE,
  UPDATE_PRICE,
  UPDATE_AGETO,
  UPDATE_FAMALE,
  UPDATE_APPROVE,
  UPDATE_AGEFROM,
  UPDATE_CATEGORY,
  UPDATE_LONGDESC,
  UPDATE_LENDINGS,
  UPDATE_RECCOMMENT,
  UPDATE_CALLTIMETO,
  UPDATE_COMMISSIONS,
  UPDATE_CALLTIMEFROM,
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
  category: 0,
  longdesc: '',
  lendings: [],
  reccomment: '',
  calltimeto: '',
  commissions: [],
  calltimefrom: '',
}

export default function(state = initState, action) {
  switch (action.type) {

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
    case UPDATE_FAMALE:
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

    default:
      return state
  }
}
