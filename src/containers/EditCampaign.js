import React, {Component} from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'

class EditCampaign extends Component {

  getStyle() {
    return {
      textFieldStyle: {
        marginLeft: 20,
      },
      wrapperStyle: {
        paddingTop: 16,
      },
    }
  }

  render() {

    let { textFieldStyle, wrapperStyle } = this.getStyle()

    return(
      <div style={ wrapperStyle } className="fadeInRight">
        <Card>
          <CardHeader
          title="Добавление кампании"
          />

          <CardText>
          <TextField hintText="First name" style={textFieldStyle} underlineShow={false} />
          <Divider />
          <TextField hintText="Middle name" style={textFieldStyle} underlineShow={false} />
          <Divider />
          <TextField hintText="Last name" style={textFieldStyle} underlineShow={false} />
          <Divider />
          <TextField hintText="Email address" style={textFieldStyle} underlineShow={false} />
          <Divider />
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
