import * as userActions from '../actions/user'

import {connect} from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import LinearProgress from 'material-ui/LinearProgress'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

class LoginPage extends Component {
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
    this.props.userActions.sendLogin()
  }

  render() {
    const {
      rowStyle,
      cardStyle,
      cardTextStyle,
      progressStyle,
      cardHeaderStyle,
    } = this.getStyles()

    const Progress = <div style={{height: 16}}>
      {
        this.props.user.request
          ? <LinearProgress mode="indeterminate" style={progressStyle} />
          : null
      }
    </div>

    return (<div>
      { Progress }
      <div className="row center-xs" style={rowStyle}>
        <div className="col-xs-6">
          <Card style={cardStyle} className="fadeInRight">
            <CardHeader title="Вход" style={cardHeaderStyle} />
            <CardText style={cardTextStyle}>
            <TextField
              id="login-input"
              onBlur={() => console.log('Change input :)')}
              fullWidth={true}
              floatingLabelText="Логин"
            />
            <TextField
              id="password-input"
              type="password"
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
