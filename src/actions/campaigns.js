import { push } from 'react-router-redux'

export function routeToCampaign(link) {
  return (dispatch) => {
    console.log('DISPATCH ROUTE TO CAMPAIGN');
    dispatch(push(link))
  }
}
