import {ROUTE_TO_CAMPAIGN} from '../constants/campaigns';

export function routeToCampaign(id) {
  console.log('ROUTE TO CAMPAIGN', id);

  return {
    type: ROUTE_TO_CAMPAIGN,
    payload: id,
  };
}
