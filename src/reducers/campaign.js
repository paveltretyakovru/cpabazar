import {
  SWITCH_DIALOG,
  UPDATE_PROFFER_FORM_DATA,
} from '../constants/campaign'

const initState = {
  openProfferModal: false,
  profferFormData: {
    proffcommission: 0,
  },
}

export default function(state = initState, action) {
  switch (action.type) {
    case SWITCH_DIALOG:
      return {...state, openProfferModal: !state.openProfferModal}

    case UPDATE_PROFFER_FORM_DATA:
      return {...state, profferFormData: { ...state.profferFormData, [action.payload.key] : action.payload.value}}

    default:
      return state
  }
}
