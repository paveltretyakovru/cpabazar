'use strict';

export default function MiddlewareFetch({dispatch, getState}) {
  return next => action =>
    typeof action === 'function' ?
      action(dispatch, getState) :
      next(action);
}
