import React, {Component} from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
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
    }
  }

  render() {
    let {rowStyle, cardStyle} = this.getStyles()

    return (<div className="row center-xs" style={rowStyle}>
      <div className="col-xs-6">
        <Card style={cardStyle} className="fadeInRight">
          <CardHeader title="Вход" />
          <CardText>
          <TextField
            onBlur={() => console.log('Change input :)')}
            fullWidth={true}
            floatingLabelText="Логин"
          />
          <TextField
            type="password"
            fullWidth={true}
            floatingLabelText="Пароль"
          />
          </CardText>
          <CardActions>
          <FlatButton primary={true} label="Войти" />
          </CardActions>
        </Card>
      </div>
    </div>)
  }
}

export default LoginPage
