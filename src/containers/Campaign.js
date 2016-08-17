import ContentLink from 'material-ui/svg-icons/content/link'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import {blue500} from 'material-ui/styles/colors'

class Campaign extends Component {

  getStyles() {
    return {
      cardStyle: {
        marginTop: 24,
      },
      imgStyle: {
        marginTop: 24,
      },
    }
  }

  render() {
    console.log('Campaign render', this.props.data);

    let { cardStyle, imgStyle } = this.getStyles()
    let {
      title, price, logourl, landings, description, longdescription,  commissions,
    } = this.props.data

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
            <span>
              {price}
              {' '}
              <del>P</del>
            </span>
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
          <FlatButton primary={true} label="Предложить комиссию" />
        </CardActions>
      </Card>
    )
  }
}

export default Campaign
