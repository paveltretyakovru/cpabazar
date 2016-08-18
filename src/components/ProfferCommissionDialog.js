import Slider from 'material-ui/Slider'
import Dialog from 'material-ui/Dialog'
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { blue500 } from 'material-ui/styles/colors'
import LinearProgress from 'material-ui/LinearProgress'
import React, { Component, PropTypes } from 'react'

const defaultProps = {
  fullWidth: true,
}

class ProfferCommissionForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      proffcommission: this.props.avgcommission,
      name: '',
      skype: '',
      email: '',
      message: '',
      requesting: false,
      failSendProfferData: false,
      successSendProfferData: false,
    }
  }

  getStyles() {return {
    yourProfferTextStyle: {
      marginTop: 24,
    },
    proffcommissionWrapperStyle: {
      fontWeight: 700,
      color: blue500,
    },
  }}

  handleChangeFields(event) {
    this.setState({...this.state, [event.target.name]: event.target.value})
  }

  handleChangeSlider(event, value) {
    this.setState({...this.state, proffcommission: value})
  }

  handleSendProfferData() {
    this.setState({...this.state, requesting: true})

    let promise = this.props.sendProfferData(this.state)

    promise
      .fail(res => {
        console.error('Error send proffer data', res)
        this.setState({
          ...this.state,
          requesting: false,
          failSendProfferData: true,
        })
      })
      .done(res => {
        console.info('Предложение успешно отправлено', res)
        this.setState({
          ...this.state,
          requesting: false,
          successSendProfferData: true,
        })
      })
  }

  handleFailSnackbarSendProfferData() {
    this.setState({ ...this.state, failSendProfferData: false })
  }

  render() {
    const {
      yourProfferTextStyle,
      proffcommissionWrapperStyle,
    } = this.getStyles();

    const textFieldsData = [
      {name: 'name', key: 'name', hintText: 'Наприме: Иван', floatingLabelText: 'Имя'},
      {name: 'skype', key: 'skype', hintText: 'Наприме: myskypelogin', floatingLabelText: 'Skype/ICQ'},
      {name: 'email', key: 'email', hintText: 'Наприме: mynick@gmail.com', floatingLabelText: 'Электронная почта'},
      {name: 'message', key: 'message', rows: 2, multiLine: true, floatingLabelText: 'Сообщение для рекла'},
    ]

    const textFields = textFieldsData.map(field => {
      return(
        <TextField
          {...defaultProps}
          {...field}
          value={this.state[field.name]}
          onChange={::this.handleChangeFields}
        />
      )
    })

    const dialogActions = [
      <FlatButton
        label="Отмена"
        primary={true}
        onTouchTap={::this.props.switchDialog}
      />,
      <FlatButton
        label="Отправить"
        primary={true}
        onTouchTap={::this.handleSendProfferData}
      />,
    ]

    const failSnackbarSendProfferData = <Snackbar
      open={this.state.failSendProfferData}
      message="Произошла ошибка во время выполнения запроса"
      autoHideDuration={4000}
      onRequestClose={::this.handleFailSnackbarSendProfferData}
    />

    return(
      <Dialog
        open={this.props.open}
        title={`Предложить коммиссию для товара "${this.props.name}"`}
        actions={dialogActions}
      >

        {
          this.state.requesting ? <LinearProgress mode="indeterminate" /> : null
        }

        {textFields}

        <p style={yourProfferTextStyle}>
          Ваше предложение: {' '}
          <span style={proffcommissionWrapperStyle}>
            {this.state.proffcommission} <del>P</del>
          </span>
        </p>

        <Slider
          min={0}
          max={1750}
          step={5}
          value={this.state.proffcommission}
          onChange={::this.handleChangeSlider}
        />

        {/* Оповещающие сообщенрия */}
        {failSnackbarSendProfferData}

      </Dialog>
    )
  }
}

ProfferCommissionForm.propTypes = {
  name: PropTypes.string.isRequired,
  avgcommission: PropTypes.number.isRequired,
}

export default ProfferCommissionForm;
