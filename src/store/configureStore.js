import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import MiddlewareFetch from '../middlewares/MiddlewareFetch';
import {routerMiddleware} from 'react-router-redux'

export default function configureStore() {
  const logger = createLogger();
  const store = createStore(
    rootReducer,
    applyMiddleware(logger, MiddlewareFetch, routerMiddleware)
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  // store.dispatch(push('/'));

  return store
}
