import Slider from 'material-ui/Slider'
import Dialog from 'material-ui/Dialog'
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { blue500, red300 } from 'material-ui/styles/colors'
import LinearProgress from 'material-ui/LinearProgress'
import React, { Component, PropTypes } from 'react'

const defaultProps = {
  fullWidth: true,
}

class ProfferCommissionForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      proffercommission: this.props.avgcommission,
      name: '',
      skype: '',
      email: '',
      message: '',
      validation: true,
      requesting: false,
      failSendProfferData: false,
      successSendProfferData: false,
    }
  }

  getStyles() {return {
    yourProfferTextStyle: {
      marginTop: 24,
    },
    proffercommissionWrapperStyle: {
      fontWeight: 700,
      color: blue500,
    },
  }}

  handleChangeFields(event) {
    this.setState({...this.state, [event.target.name]: event.target.value})
  }

  handleChangeSlider(event, value) {
    this.setState({...this.state, proffercommission: value})
  }

  handleSendProfferData() {
    let data = {}

    this.setState({...this.state, requesting: true})

    try {
      data = {
        name: this.state.name,
        email: this.state.email,
        skype: this.state.skype,
        message: this.state.message,
        proffercommission: this.state.proffercommission,
      }

      for (var prop in data) {
        if (data[prop] === '') throw new Error()
      }

      let promise = this.props.sendProfferData(data)

      promise
        .fail(res => {
          console.error('Error send proffer data', res)
          this.setState({
            ...this.state,
            validation: true,
            requesting: false,
            failSendProfferData: true,
          })
        })
        .done(res => {
          console.info('Предложение успешно отправлено', res)
          this.setState({
            ...this.state,
            validation: true,
            requesting: false,
            successSendProfferData: true,
          })
        })

    } catch (e) {
      this.setState({...this.state, validation: false})
    }

  }

  handleFailSnackbarSendProfferData() {
    this.setState({ ...this.state, failSendProfferData: false })
  }

  render() {
    const {
      yourProfferTextStyle,
      proffercommissionWrapperStyle,
    } = this.getStyles();

    const textFieldsData = [
      {name: 'name', key: 'name', hintText: 'Наприме: Иван', floatingLabelText: 'Имя'},
      {name: 'skype', key: 'skype', hintText: 'Наприме: myskypelogin', floatingLabelText: 'Skype/ICQ'},
      {name: 'email', key: 'email', hintText: 'Наприме: mynick@gmail.com', floatingLabelText: 'Электронная почта', type: 'email'},
      {
        key: 'message',
        name: 'message',
        rows: 2,
        hintText: 'Опишите от куда трафик и какие объёмы вы ' +
                  'готовы предоставить - это существенно увеличит ' +
                  'шансы получения положительного ответа',
        multiLine: true,
        floatingLabelText: 'Сообщение для рекла',
      },
    ]

    const textFields = textFieldsData.map(field => {
      return(
        <TextField
          {...defaultProps}
          {...field}
          errorText={
            (!this.state.validation && this.state[field.key] === '') ?
              'Обязательное поле' : null
          }
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

        {/* Загрузчик */}
        {
          (this.state.requesting) ? <LinearProgress mode="indeterminate" /> : null
        }

        <span className="text-caption" style={{color: red300}}>
          Все поля обязательны
        </span>

        {textFields}

        <p style={yourProfferTextStyle}>
          Ваше предложение: {' '}
          <span style={proffercommissionWrapperStyle}>
            {this.state.proffercommission} <del>P</del>
          </span>
        </p>

        <span className="text-caption">
          Передвигайте ползунок слайдера для изменения суммы
        </span>

        <Slider
          min={0}
          max={1750}
          step={5}
          value={this.state.proffercommission}
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
