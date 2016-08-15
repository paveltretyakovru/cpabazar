import AppBar from 'material-ui/AppBar'
import { connect } from 'react-redux'
import LinearProgress from 'material-ui/LinearProgress'
import * as appActions from '../actions/app'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import injectTapEventPlugin from 'react-tap-event-plugin'

// Import CSS
import '../styles/app.css';

class App extends Component {
  constructor(props) {
    super(props)
    injectTapEventPlugin()
  }

  render() {
    return(
      <MuiThemeProvider>
        <div>
          <AppBar title="Megalead" showMenuIconButton={false} />
          <div>
            {/* Fetch page loader */}
            {(() => {
              if(this.props.fetching) {
                return <div style={{textAlign:'center'}} mode="indeterminate">
                  <LinearProgress />
                </div>
              } else {
                return this.props.children
              }
            })()}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }

  componentWillMount() {
    console.log('componentWillMount', this.props.appActions.fetchPage)
    this.props.appActions.fetchPage()
  }
}

function mapStateToProps (state) {
  return {
    fetching: state.app.fetching,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
