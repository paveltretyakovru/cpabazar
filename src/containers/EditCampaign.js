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
  UPDATE_AGE_FROM,
  UPDATE_AGE_TO,
} from '../constants/campaign'

class EditCampaign extends Component {

  constructor() {
    super()
    this.state = {
      localAgeFrom: 0,
      localAgeTo: 0,
    }
  }

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

  handleSliderChange(event, value) {
    console.log('Slider stop!', value, event)
    // this.setState({...this.state, })
  }

  render() {

    let {
      wrapperStyle,
    } = this.getStyle()

    let textFields = [
      {
        title: 'Название',
        name: 'name',
      },
      {
        title: 'Краткое описание',
        name: 'desc',
        textarea: true,
      },
      {
        title: 'Длинное описание',
        name: 'longdesc',
        textarea: true,
      },
      {
        title: 'Комментарий рекла',
        name: 'reccomment',
        textarea: true,
      },
    ]

    let ageFields = [
      {
        title: 'Возраст с',
        name: UPDATE_AGE_FROM,
        value: this.props.addcampaign.agefrom,
      },
      {
        title: 'Возраст до',
        name: UPDATE_AGE_TO,
        value: this.props.addcampaign.ageto,
      },
    ]

    let timeFields = [
      { title: 'Call-центр работает с:', name: 'calltimefrom' },
      { title: 'Call-центр работает до:', name: 'calltimeto' },
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
                      />
                      {/* <Divider /> */}
                    </div>
                  )
                })
              }

              {/*  =========== ЦЕНА ============ */}
              <div className="col-xs-12 col-md-6" style={{marginTop:16}}>
                <strong style={{fontWeight: 700}}>Цена</strong>: 150 Р
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  defaultValue={75}
                  style={{margin:0, padding:0}}
                />
              </div>

              {/*  =========== APPROVE ============ */}
              <div className="col-xs-12 col-md-6" style={{marginTop:16}}>
                <strong style={{fontWeight: 700}}>Approve</strong>: 54%
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  defaultValue={25}
                  style={{margin:0, padding:0}}
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
                        onChange={::this.handleSliderChange}
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
