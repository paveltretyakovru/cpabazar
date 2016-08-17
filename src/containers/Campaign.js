import * as campaignActions from '../actions/campaign'

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
import Subheader from 'material-ui/Subheader'
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
      cardStyle: {
        marginTop: 24,
      },
      imgStyle: {
        marginTop: 24,
      },
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
      cardStyle,
      imgStyle,
      chipWrapperStyle,
      chipStyle,
      titlePStyle,
    } = this.getStyles()

    let {
      male,
      title,
      price,
      ageto,
      callto,
      famale,
      logourl,
      approve,
      agefrom,
      landings,
      callfrom,
      interests,
      description,
      commissions,
      longdescription,
      // comment,
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
      <Card className="col-xs-12 fadeInRight" style={cardStyle}>
        <CardMedia
          style={imgStyle}
          overlay={<CardTitle title={title} subtitle={description} />}
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

              <Chip style={chipStyle}>
                <Avatar icon={<RowingIcon />} />
                {interests}
              </Chip>

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
            <p style={{marginBottom: 24}}>{longdescription}</p>
          </div>
          <div className="row col-xs-12">
            <List className="col-xs-6">
              <Subheader>Лендинги</Subheader>
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

            <List className="col-xs-6">
              <Subheader>Лендинги</Subheader>
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
          open={this.props.campaign.openProfferModal}
          switchDialog={::this.props.campaignActions.switchDialog}
          avgcommission={this.props.data.avgcommission}
          profferFormData={this.props.campaign.profferFormData}
          updateFormData={::this.props.campaignActions.updateProfferFormData}
        />


      </Card>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    campaign: state.campaign,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    campaignActions: bindActionCreators(campaignActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campaign)
