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
      textFieldStyle,
      wrapperStyle,
      checkboxStyle,
      sliderWrapper,
    } = this.getStyle()

    let fieldTemplate = {
      textarea: false,
      type: 'textfield',
      min: 0,
      max: 150,
    }
    const fields = [
      {
        ...fieldTemplate,
        title: 'Название',
        name: 'name',
      },
      {
        ...fieldTemplate,
        title: 'Краткое описание',
        name: 'desc',
        textarea: true,
      },
      {
        ...fieldTemplate,
        title: 'Длинное описание',
        name: 'longdesc',
        textarea: true,
      },
      {
        ...fieldTemplate,
        title: 'Комментарий рекла',
        name: 'reccomment',
        textarea: true,
      },
      {
        ...fieldTemplate,
        title: 'Callcenter работает с',
        name: 'callfrom',
        type: 'time',
      },
      {
        ...fieldTemplate,
        title: 'Callcenter работает до',
        name: 'callto',
        type: 'time',
      },
      {
        ...fieldTemplate,
        title: 'Для мужчин',
        name: 'male',
        type: 'checkbox',
      },
      {
        ...fieldTemplate,
        title: 'Для женщин',
        name: 'famale',
        type: 'checkbox',
      },
      {
        ...fieldTemplate,
        title: 'Цена',
        name: 'price',
        type: 'slider',
        max: 5000,
      },
      {
        ...fieldTemplate,
        title: 'Возраст от',
        name: 'agefrom',
        type: 'slider',
      },
      {
        ...fieldTemplate,
        title: 'Возраст до',
        name: 'ageto',
        type: 'slider',
      },

      {
        ...fieldTemplate,
        title: 'Approve',
        name: 'age',
        type: 'slider',
        max: 100,
      },
    ]

    return(
      <div style={ wrapperStyle } className="fadeInRight">
        <Card>
          <CardHeader
            title="Добавление кампании"
          />

          <CardText>
            {fields.map(field => {
              return (
                <div>
                  {(() => {
                    switch (field.type) {
                      case 'checkbox':
                        return (<Checkbox
                          label={field.title}
                          style={checkboxStyle}
                        />)

                      case 'time':
                        return (<TimePicker
                          format="24hr"
                          style={textFieldStyle}
                          hintText={field.title}
                        />)

                      case 'slider':
                        return(<div style={sliderWrapper}>
                          {field.title}:
                          <Slider
                            min={field.min}
                            max={field.max}
                            step={1}
                            defaultValue={Math.ceil(field.max / 2)}
                            style={{margin:0, padding:0}}
                          />
                          {/* <Divider /> */}
                        </div>)

                      default:
                        return (<div><TextField
                          name={field.name}
                          rows={field.textarea ? 2 : 1}
                          style={textFieldStyle}
                          hintText={field.title}
                          multiLine={field.textarea}
                          underlineShow={false}
                        /><Divider /></div>)
                    }
                  })()}
                </div>
              )
            })}
          </CardText>

          <CardActions>
            <FlatButton label="Добавить" primary={true} />
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default EditCampaign
