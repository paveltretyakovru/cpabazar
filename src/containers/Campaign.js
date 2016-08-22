import * as campaignActions from '../actions/campaign'
import * as campaignsActions from '../actions/campaigns'

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
    }
  }

  render() {
    console.log('Campaign render', this.props.data);

    let {
      // cardStyle,
      imgStyle,
      chipWrapperStyle,
      chipStyle,
      titlePStyle,
    } = this.getStyles()

    let {
      male,
      name,
      price,
      ageto,
      callto,
      famale,
      logourl,
      approve,
      comment,
      agefrom,
      landings,
      callfrom,
      interests,
      description,
      commissions,
      longdescription,
    } = this.props.data

    const MaleChip = <Chip style={chipStyle}>
      <Avatar icon={<GenderMaleIcon />} />
      M
    </Chip>

    const FamaleChip = <Chip style={chipStyle}>
      <Avatar icon={<GenderFemaleIcon />} />
      Ж
    </Chip>

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
                  <img src={logourl} />
                </CardMedia>
                <CardTitle
                  title={
                    <div style={chipWrapperStyle}>
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
                        interests ? <Chip style={chipStyle}>
                          <Avatar icon={<RowingIcon />} />
                          {interests}
                        </Chip> : null
                      }

                      <Chip style={chipStyle}>
                        <Avatar icon={<PhoneClassicIcon />} />
                        {`${callfrom} - ${callto}`}
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
                    <p style={{margin: '24px 0'}}>{longdescription}</p>
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
                          key={landing.id}
                          primaryText={landing.name}
                          rightIcon={
                            <IconButton
                              tooltipPosition="top"
                              tooltip={landing.destinationurl}
                              style={{padding: 0}}
                              tooltipPosition="top-right"
                              onClick={
                                () => window.open(landing.destinationurl, '_blank')
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
                        let countrycodes = commission.countries.join()
                        let firstcountry = commission.countries[0].toLowerCase()
                        let flagurl = `https://lipis.github.io/flag-icon-css/flags/4x3/${firstcountry}.svg`
                        return <ListItem
                          key={commission.commtypeid}
                          primaryText={<span>{commission.value} <del>P</del></span>}
                          secondaryText={countrycodes}
                          rightAvatar={<Avatar src={flagurl}/>}
                        >
                        </ListItem>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campaign)
