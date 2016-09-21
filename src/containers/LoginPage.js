import * as userActions from '../actions/user'

import Snackbar from 'material-ui/Snackbar'
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import LinearProgress from 'material-ui/LinearProgress'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

const initState = {login: '', password: ''}

class LoginPage extends Component {
  constructor(props) {
    super(props)

    this.state = { ...initState }
  }

  getStyles() {
    return {
      rowStyle: {
        marginTop: 16,
      },
      cardStyle: {
        textAlign: 'justify',
      },
      cardHeaderStyle: {
        paddingBottom: 0,
      },
      cardTextStyle: {
        paddingTop: 0,
      },
      progressStyle: {
        borderRadius: 0,
      },
    }
  }

  handleOnClickLogin() {
    let { login, password } = this.state
    this.props.userActions.sendLogin(login, password)
  }

  handleChangeFields(event) {
    this.setState({...this.state, [event.target.name]: event.target.value})
  }

  render() {
    const {
      rowStyle,
      cardStyle,
      cardTextStyle,
      progressStyle,
      cardHeaderStyle,
    } = this.getStyles()

    const Progress = <div style={{height: 16}}>{
      this.props.user.request
        ? <LinearProgress mode="indeterminate" style={progressStyle} />
        : null
    }</div>

    // Variables
    const { message } = this.props.user

    // Actions
    const { clearRequestMessage } = this.props.userActions

    return (<div>
      { Progress }
      <div className="row center-xs" style={rowStyle}>
        <div className="col-xs-6">
          <Card style={cardStyle} className="fadeInRight">
            <CardHeader title="Вход" style={cardHeaderStyle} />
            <CardText style={cardTextStyle}>
            <TextField
              name="login"
              onChange={::this.handleChangeFields}
              fullWidth={true}
              floatingLabelText="Логин"
            />
            <TextField
              name="password"
              type="password"
              onChange={::this.handleChangeFields}
              fullWidth={true}
              floatingLabelText="Пароль"
            />
            </CardText>
            <CardActions>
              <FlatButton
                label="Войти"
                primary={true}
                onClick={::this.handleOnClickLogin}
              />
            </CardActions>
          </Card>
        </div>
      </div>

      <Snackbar
        open={message}
        message={message}
        autoHideDuration={4000}
        onRequestClose={clearRequestMessage}
      />
    </div>)
  }
}

let mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
