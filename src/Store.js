import * as reducers from './reducers'
import	thunk	from	'redux-thunk'
import createLogger from 'redux-logger'
import { hashHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware} from 'redux'
import { routerMiddleware, routerReducer } from 'react-router-redux'

const router = routerMiddleware(hashHistory)
const logger = createLogger()

// Add the reducer to your store on the `routing` key
const Store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer,
  }),
  applyMiddleware(logger, thunk, router)
)

export default Store
