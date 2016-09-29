import React, {Component} from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import TimePicker from 'material-ui/TimePicker'
import Slider from 'material-ui/Slider'

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

  render() {

    let {
      // textFieldStyle,
      wrapperStyle,
      // checkboxStyle,
      // sliderWrapper,
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
        name: 'agefrom',
      },
      {
        title: 'Возраст до',
        name: 'ageto',
      },
    ]

    let timeFields = [
      { title: 'Call-центр работает с:', name: 'callfrom' },
      { title: 'Call-центр работает до:', name: 'callto' },
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
                textFields.map( field => {
                  return (
                    <div className="col-xs-12 col-md-6">
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
            {/* </div> */}

            {/* <div className="row" style={wrapperStyle}> */}

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

              <div className="col-xs-12">
                {/* <Divider /> */}
              </div>
            {/* </div> */}

            {/*  =========== ВОЗРАСТ ============ */}
            {/* <div className="row"> */}
              {
                ageFields.map( field => {
                  return (
                    <div className="col-md-6 col-xs-12">
                      <strong style={{fontWeight: 700}}>{field.title}</strong>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        name={field.name}
                        defaultValue={25}
                        style={{margin:0, padding:0}}
                      />
                    </div>
                  )
                })
              }
              <div className="col-xs-12">
                {/* <Divider /> */}
              </div>
            {/* </div> */}

            {/*  =========== ПОЛОВАЯ ПРЕНАДЛЕЖНОСТЬ ============ */}
            {/* <div className="row" style={wrapperStyle}> */}
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
              <div className="col-xs-12" style={{marginTop: 16}}>
                {/* <Divider /> */}
              </div>
            {/* </div> */}

            {/*  =========== Режим работы CALLCENTER ============ */}
            {/* <div className="row" style={{marginTop:24}}> */}
              {
                timeFields.map( field => {
                  return (
                    <div
                      className="col-md-6 col-xs-12"
                      style={{
                        display:'flex', alignItems: 'center', fontWeight: 700}}
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
// -----------------------------------------------------------------------------
export default EditCampaign
