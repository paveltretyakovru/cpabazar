import * as appActions from '../actions/app'
import * as campaignActions from '../actions/campaign'

import Slider from 'material-ui/Slider'
import Checkbox from 'material-ui/Checkbox'
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import TimePicker from 'material-ui/TimePicker'
import LandingsEditor from '../components/LandingsEditor'
import LinearProgress from 'material-ui/LinearProgress'
import CommissionsEditor from '../components/CommissionsEditor'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

import {
  UPDATE_NAME,
  UPDATE_DESC,
  UPDATE_AGETO,
  UPDATE_PRICE,
  UPDATE_IMAGE,
  UPDATE_AGEFROM,
  UPDATE_CATEGORY,
  UPDATE_LONGDESC,
  UPDATE_RECCOMMENT,
  UPDATE_CALLTIMETO,
  UPDATE_CALLTIMEFROM,
} from '../constants/campaign'

/**
 * Флорма для создания / редактирования кампаний
 */

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
      progressStyle: {
        borderRadius: 0,
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

  handleNewCampaignRequest() {
    this.props.campaignActions.addCampaign(this.props.addcampaign)
      .done(res => {
        console.log('Запрос успешно выполнен', res)
        this.props.appActions.addCampaignToCollection(res)
        this.props.appActions.routeToIndex()
      })
      .fail(res => {
        let errMess = `Ошибка! ${res.responseJSON.message}`
        return this.props.appActions.setMessage(errMess)
      })
  }

  handlePutCampaignRequest() {
    this.props.campaignActions.putCampaignRequest(this.props.addcampaign)
    .done(res => {
      console.log('Запрос успешно выполнен', res)
      return this.props.appActions.setMessage('Сохранено')
    })
    .fail(res => {
      let errMess = `Ошибка! ${res.responseJSON.message}`
      return this.props.appActions.setMessage(errMess)
    })
  }

  componentWillMount() {
    if(this.props.params.id) {
      // Ещем кампанию которую необходимо передать в редактор
      let campaign = this.props.campaigns.find(element => {
        return element._id === this.props.params.id
      })

      // Передаем найденую кампанию в редактор
      this.props.campaignActions.moveCampaignDataToAddCampaign(campaign)
    }
  }

  render() {

    // Определяем добавляем ли кампанию или изменяем существующую
    const change = this.props.params.id ? true : false

    let { addCampaignRequest, putCampaignRequest } = this.props.addcampaign

    let {
      wrapperStyle,
      progressStyle,
    } = this.getStyle()

    let textFields = [
      {
        title: 'Название',
        name: UPDATE_NAME,
        value: this.props.addcampaign.name,
      },
      {
        title: 'Краткое описание',
        name: UPDATE_DESC,
        textarea: true,
        value: this.props.addcampaign.desc,
      },
      {
        title: 'Длинное описание',
        name: UPDATE_LONGDESC,
        textarea: true,
        value: this.props.addcampaign.longdesc,
      },
      {
        title: 'Комментарий рекла',
        name: UPDATE_RECCOMMENT,
        textarea: true,
        value: this.props.addcampaign.reccomment,
      },
      {
        title: 'Цена',
        name: UPDATE_PRICE,
        value: this.props.addcampaign.price,
      },
      {
        title: 'Категории',
        name: UPDATE_CATEGORY,
        value: this.props.addcampaign.category,
      },
      {
        title: 'Изображение',
        name: UPDATE_IMAGE,
        value: this.props.addcampaign.image,
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
      {
        name: UPDATE_CALLTIMEFROM,
        title: 'Call-центр работает с:',
        value: new Date(this.props.addcampaign.calltimefrom),
      },
      {
        name: UPDATE_CALLTIMETO,
        title: 'Call-центр работает до:',
        value: new Date(this.props.addcampaign.calltimeto),
      },
    ]

    const fullWidth = 'col-xs-12 col-md-6'
    const shortWidth = 'col-xs-12 col-md-12'

    return(

      <div>
        {
          addCampaignRequest || putCampaignRequest
            ? <LinearProgress mode="indeterminate" style={progressStyle} />
            : null
        }

        <div style={ wrapperStyle } className="fadeInRight">
          <Card>
            <CardHeader
              title="Добавление кампании"
            />

            <CardText>
              <div className="row">
                {/*  =========== ТЕКСТОВЫЕ ПОЛЯ ============ */}
                {
                  textFields.map( (field, index, fields) => {
                    return (
                        // Если поле последнее делаем его на всю длину
                        <div
                          className={
                            (index !== fields.length - 1)
                              ? fullWidth
                              : shortWidth
                          }
                          key={index}
                        >
                          <TextField
                            name={field.name}
                            value={field.value || ''}
                            hintText={field.title}
                            fullWidth={true}
                            multiLine={field.textarea || false}
                            floatingLabelText={field.title}
                            onChange={::this.handleTextFieldsChange}
                          />
                        </div>
                    )
                  })
                }

                {/*  =========== APPROVE ============ */}
                <div className="col-xs-12 col-md-12" style={{marginTop:16}}>
                <strong style={{fontWeight: 700}}>Approve</strong>:
                {this.props.addcampaign.approve} {' '} %
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  style={{margin:0, padding:0}}
                  defaultValue={this.props.addcampaign.approve}
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
                    checked={this.props.addcampaign.male || false}
                    onCheck={::this.props.campaignActions.updateMale}
                  />
                </div>
                <div className="col-xs-12 col-md-6">
                  <Checkbox
                    label="Для женщин"
                    checked={this.props.addcampaign.famale || false}
                    onCheck={::this.props.campaignActions.updateFemale}
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
                          marginTop: 16,
                        }}
                      >
                        <div className="row middle-md">
                          <span
                            style={{marginRight: 8, fontWeight: 700}}
                            className="col-md-4 col-xs-12"
                          >
                            {field.title}
                          </span>

                          <TimePicker
                            format="24hr"
                            value={field.value}
                            hintText="Укажите время"
                            className="col-md-6 col-xs-12"
                            onChange={ (event, value) => {
                              return this.props.campaignActions.updateCalltime(
                                field.name, value
                              )
                            }}
                          />
                        </div>
                      </div>
                    )
                  })
                }

                {/*  ================ РЕДАКТОР КОММИССИЙ =================== */}
                <div className="col-xs-12" style={{marginTop: 16}}>
                  <strong style={{fontWeight: 700}}>Коммиссии</strong>:
                  <CommissionsEditor
                    updateCommission={
                      this.props.campaignActions.updateCommission
                    }
                    removeCommission={
                      this.props.campaignActions.removeCommission
                    }
                    addEmptyCommission={
                      this.props.campaignActions.addEmptyCommission
                    }
                    updateCommissionCountry={
                      this.props.campaignActions.updateCommissionCountry
                    }
                    commissions={this.props.addcampaign.commissions}
                  />
                </div>

                {/*  ================ РЕДАКТОР ЛЕНДИНГОВ =================== */}
                <div className="col-xs-12" style={{marginTop: 16}}>
                  <strong style={{fontWeight: 700}}>Лендинги</strong>:
                  <LandingsEditor
                    updateLanding={
                      this.props.campaignActions.updateLanding
                    }
                    removeLanding={
                      this.props.campaignActions.removeLanding
                    }
                    addEmptyLanding={
                      this.props.campaignActions.addEmptyLanding
                    }
                    landings={this.props.addcampaign.landings}
                  />
                </div>
              </div>
            </CardText>

            <CardActions>
              <FlatButton
                label={ change ? 'Сохранить' : 'Добавить' }
                primary={true}
                disabled={addCampaignRequest || putCampaignRequest}
                onClick={
                  change
                    ? ::this.handlePutCampaignRequest
                    : ::this.handleNewCampaignRequest
                }
              />
            </CardActions>
          </Card>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    addcampaign: state.addcampaign,
    fetching: state.app.fetching,
    campaigns: state.app.campaigns,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    campaignActions: bindActionCreators(campaignActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCampaign)
