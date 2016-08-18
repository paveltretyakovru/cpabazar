import {
  SWITCH_DIALOG,
} from '../constants/campaign'

const initState = {
  openProfferModal: false,
}

export default function(state = initState, action) {
  switch (action.type) {
    case SWITCH_DIALOG:
      return {...state, openProfferModal: !state.openProfferModal}

    default:
      return state
  }
}
