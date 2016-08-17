import Slider from 'material-ui/Slider'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { blue500 } from 'material-ui/styles/colors'
import React, { Component, PropTypes } from 'react'

const defaultProps = {
  fullWidth: true,
}

class ProfferCommissionForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      proffcommission: this.props.avgcommission,
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
    this.props.updateFormData(event.target.name, event.target.value)
  }

  handleChangeSlider(event, value) {
    this.props.updateFormData('proffcommission', value)
  }

  render() {
    let {
      yourProfferTextStyle,
      proffcommissionWrapperStyle,
    } = this.getStyles();

    let textFieldsData = [
      {name: 'name', key: 'name', hintText: 'Наприме: Иван', floatingLabelText: 'Имя'},
      {name: 'skype', key: 'skype', hintText: 'Наприме: myskypelogin', floatingLabelText: 'Skype/ICQ'},
      {name: 'email', key: 'email', hintText: 'Наприме: mynick@gmail.com', floatingLabelText: 'Электронная почта'},
      {name: 'message', key: 'message', rows: 2, multiLine: true, floatingLabelText: 'Сообщение для рекла'},
    ]

    let textFields = textFieldsData.map(field => {
      return(
        <TextField
          {...defaultProps}
          {...field}
          onChange={::this.handleChangeFields}
        />
      )
    })

    let dialogActions = [
      <FlatButton
        label="Отмена"
        primary={true}
        onTouchTap={::this.props.switchDialog}
      />,
      <FlatButton
        label="Отправить"
        primary={true}
        onTouchTap={::this.props.switchDialog}
      />,
    ]

    return(
      <Dialog
        open={this.props.open}
        title="Предложить коммиссию"
        actions={dialogActions}
      >
        {textFields}

        <p style={yourProfferTextStyle}>
          Ваше предложение: {' '}
          <span style={proffcommissionWrapperStyle}>
            {this.props.profferFormData.proffcommission} <del>P</del>
          </span>
        </p>

        <Slider
          min={0}
          max={1750}
          step={5}
          defaultValue={this.props.avgcommission}
          onChange={::this.handleChangeSlider}
        />
      </Dialog>
    )
  }
}

ProfferCommissionForm.propTypes = {
  avgcommission: PropTypes.number.isRequired,
}

export default ProfferCommissionForm;
