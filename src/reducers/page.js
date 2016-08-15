'use strict';

import {FETCH_PAGE, FETCH_PAGE_SUCCESS} from '../constants/page';

const initialState = {
  fetching: false,
  campaigns: [],
}

const page = (state = initialState, action) => {

  switch (action.type) {
    case FETCH_PAGE:
      console.log('FETCH START :))))');
      return { ...state, fetching: true};

    case FETCH_PAGE_SUCCESS:
      console.log('Fetch result', action.payload);
      return { ...state, campaigns: action.payload.campaigns, fetching: false};

    default:
      return state;
  }
};

export default page;
