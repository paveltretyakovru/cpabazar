import * as appActions from '../actions/app'
import * as userActions from '../actions/user'

import {Link} from 'react-router'
import AppBar from 'material-ui/AppBar'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import LinearProgress from 'material-ui/LinearProgress'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import injectTapEventPlugin from 'react-tap-event-plugin'

import FlatButton from 'material-ui/FlatButton'
import ActionInput from 'material-ui/svg-icons/action/input'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

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

  handleSendLogout() {
    let { sendLogout} = this.props.userActions
    let { setMessage } = this.props.appActions

    sendLogout()
      .then(res => {
        console.log('Send logout result :)) ============>', res)
        setMessage(res.message || 'Запрос успешно выполнен')
      })
  }

  render() {
    let { message } = this.props.app
    let { auth } = this.props.user
    let { menuTitleStyle } = this.getStyles()
    let { routeToLogin, clearMessage } = this.props.appActions

    const iconLogin = <FlatButton
      icon={<ActionInput />}
      onTouchTap={routeToLogin}
    />

    const iconClose = <FlatButton
      icon={<NavigationClose />}
      onTouchTap={::this.handleSendLogout}
    />

    return(
      <MuiThemeProvider>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <AppBar
                title={<Link style={menuTitleStyle} to="/">Megalead</Link>}
                showMenuIconButton={false}
                iconElementRight={ auth ? iconClose : iconLogin }
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

          <Snackbar
            open={message !== false}
            message={message}
            autoHideDuration={4000}
            onRequestClose={ clearMessage }
          />

        </div>
      </MuiThemeProvider>
    )
  }

  componentDidMount() {
    // Загружаем начальные данные страницы
    this.props.appActions.fetchPage()
      // Выполняем дополнительные действия после загрузки начальных данных
      .then(result => {
        this.props.userActions.setAuth(result)
      })
  }
}

function mapStateToProps (state) {
  return {
    app: state.app,
    user: state.user,
    fetching: state.app.fetching,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
