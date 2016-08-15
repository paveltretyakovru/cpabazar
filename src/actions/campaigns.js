import { push } from 'react-router-redux'

export function routeToCampaign(link) {
  return (dispatch) => {
    return dispatch(push(link))
  }
}
