import React, {Component} from 'react'
import {List, ListItem} from 'material-ui/List'
import Paper from 'material-ui/Paper'

// Buttons
import FlatButton from 'material-ui/FlatButton'
import DeleteSVG from 'material-ui/svg-icons/action/delete'

class Proffer extends Component {

  getStyles() {
    return {
      deleteButtonStyle: {
        margin: 24,
      },
    }
  }

  handleTouchDelete(id) {
    return this.props.deleteAction(id)
  }

  render() {
    const proffer = this.props.proffer

    const { deleteButtonStyle } = this.getStyles()

    return(<div className="fadeInRight">
      <Paper>
        <List>
          <ListItem primaryText={proffer._id} secondaryText="ID" />
          <ListItem primaryText={proffer.campaign} secondaryText="Кампания" />
          <ListItem primaryText={proffer.name} secondaryText="Имя" />
          <ListItem primaryText={proffer.email} secondaryText="Email" />
          <ListItem primaryText={proffer.skype} secondaryText="Skype/ICQ" />
          <ListItem primaryText={proffer.message} secondaryText="Сообщение" />
          <ListItem
            primaryText={proffer.proffercommission}
            secondaryText="Предложенная коммиссия"
          />
        </List>

        <FlatButton
          icon={<DeleteSVG />}
          style={deleteButtonStyle}
          secondary={true}
          onTouchTap={() => this.handleTouchDelete(proffer._id)}
        />
      </Paper>
    </div>)
  }
}

export default Proffer
