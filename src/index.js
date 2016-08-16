import React from 'react'
import Store from './Store'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { App, Campaigns } from './containers'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, Store, {
  adjustUrlOnReplay: false,
})

// console.log('TEST STORE', Store.getState());

function Test() {
  return (
    <div>Test route</div>
  )
}

ReactDOM.render(
  <Provider store={Store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={App}>
        {(() => {
          if(!Store.getState().app.fetching) {
            return(
              <div>
                <Route path="test" component={Test} />
                <IndexRedirect to="campaigns/0" />
                {/* <Route path="campaigns/0" component={Campaigns} /> */}
                <Route path="campaigns/:id" component={Campaigns} />
              </div>
            )
          }
        })()}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
