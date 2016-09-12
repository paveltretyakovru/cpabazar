import {Link} from 'react-router'
import AppBar from 'material-ui/AppBar'
import { connect } from 'react-redux'
import LinearProgress from 'material-ui/LinearProgress'
import * as appActions from '../actions/app'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import injectTapEventPlugin from 'react-tap-event-plugin'

import FlatButton from 'material-ui/FlatButton'
import ActionInput from 'material-ui/svg-icons/action/input'

// Import CSS
import '../styles/app.css';

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    injectTapEventPlugin()
  }

  getStyles() {
    return {
      menuTitleStyle: {
        textDecoration: 'none',
        color: '#fff',
      },
    }
  }

  render() {
    let { menuTitleStyle } = this.getStyles()
    let { routeToLogin } = this.props.appActions

    return(
      <MuiThemeProvider>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <AppBar
                title={<Link style={menuTitleStyle} to="/">Megalead</Link>}
                showMenuIconButton={false}
                iconElementRight={<FlatButton
                  icon={<ActionInput />}
                  onTouchTap={routeToLogin}
                />}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              {/* Fetch page loader */}
              {(() => {
                if(this.props.fetching) {
                  return <LinearProgress mode="indeterminate" style={{borderRadius: 0}} />
                } else {
                  return this.props.children
                }
              })()}
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }

  componentDidMount() {
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
