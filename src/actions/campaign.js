import {

  SWITCH_DIALOG,
  UPDATE_PROFFER_FORM_DATA,

} from '../constants/campaign';

export function switchDialog() {
  return {
    type: SWITCH_DIALOG,
  }
}

export function updateProfferFormData(key, value) {
  return {
    type: UPDATE_PROFFER_FORM_DATA,
    payload: { key: key, value: value},
  }
}
