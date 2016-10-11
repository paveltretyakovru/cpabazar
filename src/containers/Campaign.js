import * as campaignActions from '../actions/campaign'
import * as campaignsActions from '../actions/campaigns'
import {routeToEditCampaign} from '../actions/app'

import Avatar from 'material-ui/Avatar'
import CakeVariantIcon from 'mdi-react/CakeVariantIcon'
import Chip from 'material-ui/Chip'
import ContentLink from 'material-ui/svg-icons/content/link'
import FlatButton from 'material-ui/FlatButton'
import GenderFemaleIcon from 'mdi-react/GenderFemaleIcon'
import GenderMaleIcon from 'mdi-react/GenderMaleIcon'
import IconButton from 'material-ui/IconButton'
import PhoneClassicIcon from 'mdi-react/PhoneClassicIcon'
import RowingIcon from 'mdi-react/RowingIcon'
// import Subheader from 'material-ui/Subheader'
import React, { Component } from 'react'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import {blue500} from 'material-ui/styles/colors'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ProfferCommissionDialog from '../components/ProfferCommissionDialog'

// Buttons
import ContentEdit from 'material-ui/svg-icons/content/create'
import FloatingActionButton from 'material-ui/FloatingActionButton'

class Campaign extends Component {

  getStyles() {
    return {
      chipWrapperStyle: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chipStyle: {
        margin: 4,
      },
      titlePStyle: {
        marginRight: 24,
      },
      floatButtonStyle: {
        right: '20px',
        top: '-25px',
        position: 'absolute',
      },
    }
  }

  render() {
    console.log('Campaign render', this.props.data);

    let {
      imgStyle,
      chipStyle,
      titlePStyle,
      chipWrapperStyle,
      floatButtonStyle,
    } = this.getStyles()

    let {
      _id,
      male,
      name,
      price,
      ageto,
      image,
      famale,
      approve,
      comment,
      agefrom,
      landings,
      longdesc,
      category,
      calltimeto,
      description,
      commissions,
      calltimefrom,
    } = this.props.data

    const MaleChip = <Chip style={chipStyle}>
      <Avatar icon={<GenderMaleIcon />} />
      M
    </Chip>

    const FamaleChip = <Chip style={chipStyle}>
      <Avatar icon={<GenderFemaleIcon />} />
      Ж
    </Chip>

    const EditCampaignButton = <FloatingActionButton
      secondary={true}
      style={ floatButtonStyle }
      onClick={() => {
        console.log('Click on button', _id)
        this.props.routeToEditCampaign(_id)
      }}
    >
      <ContentEdit />
    </FloatingActionButton>

    return (
      <div className="row fadeInRight">
        <div className="col-xs-12 col-md-9">
          <div className="row" style={{marginTop: 8}}>
            <div className="col-xs-12">
              <Card >
                <CardMedia
                  style={imgStyle}
                  overlay={<CardTitle title={name} subtitle={description} />}
                >
                  <img src={image} />
                </CardMedia>
                <CardTitle
                  title={
                    <div style={chipWrapperStyle}>
                      { EditCampaignButton }
                      {price}
                      {' '}
                      <del style={titlePStyle}>P</del>

                      {
                        male ? MaleChip : null
                      }

                      {
                        famale ? FamaleChip : null
                      }

                      <Chip style={chipStyle}>
                        <Avatar icon={<CakeVariantIcon />} />
                        {agefrom}-{ageto}
                      </Chip>

                      {
                        category ? <Chip style={chipStyle}>
                          <Avatar icon={<RowingIcon />} />
                          {category}
                        </Chip> : null
                      }

                      <Chip style={chipStyle}>
                        <Avatar icon={<PhoneClassicIcon />} />
                        {`${calltimefrom} - ${calltimeto}`}
                      </Chip>

                      <Chip style={chipStyle}>
                        <Avatar size={32}>{approve}%</Avatar>
                        Approve
                      </Chip>

                    </div>
                  }
                />
                <CardText className="row">
                  <div className="col-xs-12 row">
                    <p style={{margin: '24px 0'}}>{longdesc}</p>
                  </div>
                </CardText>
                <CardActions>
                  <FlatButton
                    label="Предложить комиссию"
                    primary={true}
                    onTouchTap={::this.props.campaignActions.switchDialog}
                  />
                </CardActions>

                <ProfferCommissionDialog
                  name={name}
                  open={this.props.campaign.openProfferModal}
                  campaigns={this.props.campaigns}
                  switchDialog={::this.props.campaignActions.switchDialog}
                  avgcommission={this.props.data.avgcommission}
                  routeToCampaign={this.props.campaignsActions.routeToCampaign}
                  sendProfferData={::this.props.campaignActions.sendProfferData}
                />
              </Card>
            </div> {/* col-xs-12 */}
          </div> {/* row */}


          {
            comment ? <div className="row" style={{marginTop: 8}}><div className="col-xs-12"><Card>
                <CardTitle title={comment} subtitle="Комментарий рекла" />
              </Card></div></div> : null
          }

        </div> {/* col-xs-6 */}

        <div className="col-xs-12 col-md-3">
          <div className="row" style={{marginTop: 8}}>
            <div className="col-xs-12">
              <Card>
                <CardTitle title="Лендинги" />
                <CardText>
                  <List>
                    {/* <Subheader>Лендинги</Subheader> */}
                    {
                      landings.map(landing => {
                        return <ListItem
                          key={landing.id || landing._id}
                          primaryText={landing.name || landing.title}
                          rightIcon={
                            <IconButton
                              // tooltipPosition="top"
                              tooltip={landing.destinationurl || landing.url}
                              style={{padding: 0}}
                              tooltipPosition="top-left"
                              onClick={
                                () => window.open(landing.url, '_blank')
                              }
                            >
                              <ContentLink color={blue500} />
                            </IconButton>
                          }
                        >
                        </ListItem>
                      })
                    }
                  </List>
                </CardText>
              </Card>
            </div>
          </div>

          <div className="row" style={{marginTop: 8}}>
            <div className="col-xs-12">
              <Card>
                <CardTitle title="Цена" />
                <CardText>
                  <List>
                    {
                      commissions.map(commission => {
                        let countrycodes = '',
                            firstcountry = '',
                            value = 0,
                            id = 0
                        if(commission.countries) {
                          id = commission.commtypeid
                          value = commission.value
                          countrycodes = commission.countries.join()
                          firstcountry = commission.countries[0].toLowerCase()
                        } else {
                          id = commission._id
                          value = commission.price
                          countrycodes = commission.country
                          firstcountry = commission.country.toLowerCase()
                        }

                        let flagurl = `https://lipis.github.io/flag-icon-css/flags/4x3/${firstcountry}.svg`
                        return <ListItem
                          key={id}
                          primaryText={<span>{value} <del>P</del></span>}
                          secondaryText={countrycodes}
                          rightAvatar={<Avatar src={flagurl}/>}
                        />
                      })
                    }
                  </List>
                </CardText>
              </Card>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    campaign: state.campaign,
    campaigns: state.app.campaigns,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    campaignActions: bindActionCreators(campaignActions, dispatch),
    campaignsActions: bindActionCreators(campaignsActions, dispatch),
    routeToEditCampaign: bindActionCreators(routeToEditCampaign, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campaign)
