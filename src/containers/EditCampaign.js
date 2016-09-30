import * as appActions from '../actions/app'
import * as campaignActions from '../actions/campaign'

import Slider from 'material-ui/Slider'
import Checkbox from 'material-ui/Checkbox'
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import TimePicker from 'material-ui/TimePicker'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

import {
  UPDATE_NAME,
  UPDATE_DESC,
  // UPDATE_MALE,
  // UPDATE_PRICE,
  UPDATE_AGETO,
  // UPDATE_FAMALE,
  // UPDATE_APPROVE,
  UPDATE_AGEFROM,
  // UPDATE_CATEGORY,
  UPDATE_LONGDESC,
  // UPDATE_LENDINGS,
  UPDATE_RECCOMMENT,
  UPDATE_CALLTIMETO,
  // UPDATE_COMMISSIONS,
  UPDATE_CALLTIMEFROM,
} from '../constants/campaign'

class EditCampaign extends Component {

  getStyle() {
    return {
      textFieldStyle: {
        marginLeft: 20,
      },
      wrapperStyle: {
        paddingTop: 16,
      },
      checkboxStyle: {
        margin: 20,
      },
      sliderWrapper: {
        margin: 20,

      },
    }
  }

  handleSliderChange(name, value) {
    console.log('Slider stop!', value, name)
    switch(name) {
      case UPDATE_AGEFROM:
        return this.props.campaignActions.updateAgeFrom(value)

      case UPDATE_AGETO:
        return this.props.campaignActions.updateAgeTo(value)
    }
  }

  handleTextFieldsChange(event) {
    let { name, value } = event.target
    return this.props.campaignActions.updateAddCampaignTextfields(
      name, value
    )
  }

  render() {

    let {
      wrapperStyle,
    } = this.getStyle()

    let textFields = [
      {
        title: 'Название',
        name: UPDATE_NAME,
      },
      {
        title: 'Краткое описание',
        name: UPDATE_DESC,
        textarea: true,
      },
      {
        title: 'Длинное описание',
        name: UPDATE_LONGDESC,
        textarea: true,
      },
      {
        title: 'Комментарий рекла',
        name: UPDATE_RECCOMMENT,
        textarea: true,
      },
    ]

    let ageFields = [
      {
        title: 'Возраст с',
        name: UPDATE_AGEFROM,
        value: this.props.addcampaign.agefrom,
      },
      {
        title: 'Возраст до',
        name: UPDATE_AGETO,
        value: this.props.addcampaign.ageto,
      },
    ]

    let timeFields = [
      { title: 'Call-центр работает с:', name: UPDATE_CALLTIMEFROM },
      { title: 'Call-центр работает до:', name: UPDATE_CALLTIMETO },
    ]

    return(
      <div style={ wrapperStyle } className="fadeInRight">
        <Card>
          <CardHeader
            title="Добавление кампании"
          />

          <CardText>
            <div className="row">
              {/*  =========== ТЕКСТОВЫЕ ПОЛЯ ============ */}
              {
                textFields.map( (field, index) => {
                  return (
                    <div className="col-xs-12 col-md-6" key={index}>
                      <TextField
                        name={field.name}
                        hintText={field.title}
                        fullWidth={true}
                        multiLine={field.textarea || false}
                        floatingLabelText={field.title}
                        onChange={::this.handleTextFieldsChange}
                      />
                      {/* <Divider /> */}
                    </div>
                  )
                })
              }

              {/*  =========== ЦЕНА ============ */}
              <div className="col-xs-12 col-md-6" style={{marginTop:16}}>
                <strong style={{fontWeight: 700}}>Цена</strong>:
                {this.props.addcampaign.price} {' '}
                <span style={{textDecoration: 'line-through'}}>Р</span>
                <Slider
                  min={0}
                  max={10000}
                  step={1}
                  defaultValue={75}
                  style={{margin:0, padding:0}}
                  onChange={ (event, value) => {
                    this.props.campaignActions.updateAddCampaignPrice(value)
                  }}
                />
              </div>

              {/*  =========== APPROVE ============ */}
              <div className="col-xs-12 col-md-6" style={{marginTop:16}}>
                <strong style={{fontWeight: 700}}>Approve</strong>:
                {this.props.addcampaign.approve} {' '} %
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  defaultValue={25}
                  style={{margin:0, padding:0}}
                  onChange={ (event, value) => {
                    this.props.campaignActions.updateAddCampaignApprove(value)
                  }}
                />
              </div>

              {/*  =========== ВОЗРАСТ ============ */}
              {
                ageFields.map( (field, index) => {
                  return (
                    <div className="col-md-6 col-xs-12" key={index}>
                      <strong style={{fontWeight: 700}}>
                        {field.title}: {field.value}
                      </strong>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        name={field.name}
                        defaultValue={25}
                        value={field.value}
                        style={{margin:0, padding:0}}
                        onChange={(event, value) => {
                          this.handleSliderChange(field.name, value)
                        }}
                      />
                    </div>
                  )
                })
              }

              {/*  =========== ПОЛОВАЯ ПРЕНАДЛЕЖНОСТЬ ============ */}
              <div className="col-xs-12 col-md-6">
                <Checkbox
                  label="Для мужчин"
                />
              </div>
              <div className="col-xs-12 col-md-6">
                <Checkbox
                  label="Для женщин"
                />
              </div>

              {/*  =========== Режим работы CALLCENTER ============ */}
              {
                timeFields.map( (field, index) => {
                  return (
                    <div
                      key={index}
                      className="col-md-6 col-xs-12"
                      style={{
                        display:'flex',
                        fontWeight: 700,
                        alignItems: 'center',
                        marginTop: 16,
                      }}
                    >
                      <span style={{marginRight: 8}}>{field.title}</span>
                      <TimePicker
                        format="24hr"
                        hintText="Укажите время"
                      />
                    </div>
                  )
                })
              }
            </div>
          </CardText>

          <CardActions>
            <FlatButton label="Добавить" primary={true} />
          </CardActions>
        </Card>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    addcampaign: state.addcampaign,
    fetching: state.app.fetching,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    campaignActions: bindActionCreators(campaignActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCampaign)
