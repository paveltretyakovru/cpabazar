import * as appActions from '../actions/app'

import {connect} from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
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
    }
  }

  handleOnClickLogin() {
    this.props.appActions.sendLogin()
  }

  render() {
    let {rowStyle, cardStyle, cardHeaderStyle, cardTextStyle} = this.getStyles()

    return (<div className="row center-xs" style={rowStyle}>
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
    appActions: bindActionCreators(appActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
