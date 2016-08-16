import React, { Component } from 'react'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
// CardHeader,
import FlatButton from 'material-ui/FlatButton'

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
        {/* <CardHeader
          title={title}
          subtitle={subtitle}
        /> */}
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
        <CardText>{longdescription}</CardText>
        <CardActions>
          <FlatButton label="Предложить комиссию" />
        </CardActions>
      </Card>
    )
  }
}

export default Campaign
