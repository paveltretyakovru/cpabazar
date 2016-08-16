import React, { Component } from 'react'
import Subheader from 'material-ui/Subheader'
import FlatButton from 'material-ui/FlatButton'
import {List, ListItem} from 'material-ui/List'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'

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
    let title = this.props.data.pap.name
    let price = this.props.data.price
    let imgurl = this.props.data.pap.logourl
    let subtitle = this.props.data.pap.description
    let longdescription = this.props.data.pap.longdescription

    return (
      <Card className="col-xs-12 fadeInRight" style={cardStyle}>
        <CardMedia
          style={imgStyle}
          overlay={<CardTitle title={title} subtitle={subtitle} />}
        >
          <img src={imgurl} />
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
          <div className="col-xs-12 row">{longdescription}</div>
          <div className="row col-xs-12">
            <List className="col-xs-6">
              <Subheader>Лендинги</Subheader>
              {
                this.props.data.banners.map(banner => {
                  return <ListItem key={banner.bannerid}>
                    {banner.destinationurl}
                  </ListItem>
                })
              }
            </List>
            <div className="col-xs-6">123</div>
          </div>
        </CardText>
        <CardActions>
          <FlatButton primary={true} label="Предложить комиссию" />
        </CardActions>
      </Card>
    )
  }
}

// Campaign.defaultProps = {
//   data: {
//     price: 0,
//
//     pap: {
//       name: '',
//       logourl: '',
//       description: '',
//
//     },
//   },
// }

export default Campaign
