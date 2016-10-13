import React, {Component} from 'react'
import {List, ListItem} from 'material-ui/List'
import Paper from 'material-ui/Paper'

class Proffer extends Component {
  render() {
    const proffer = this.props.proffer

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
      </Paper>
    </div>)
  }
}

export default Proffer
