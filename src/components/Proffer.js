import React, {Component} from 'react'
import {List, ListItem} from 'material-ui/List'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

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

  /**
   * Событие отрабатывает при клике на кнопку удалить
   */
  handleTouchDelete(id) {
    return this.props.deleteAction(id)
  }

  render() {
    const proffer = this.props.proffer
    const { deleteButtonStyle } = this.getStyles()

    return(<div className="fadeInRight">
      <Card>
        <CardHeader title="Просмотр предложения" />
        <CardText>
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
        </CardText>
        <CardActions>
          <FlatButton
            label="Удалить"
            icon={<DeleteSVG />}
            style={deleteButtonStyle}
            secondary={true}
            onTouchTap={() => this.handleTouchDelete(proffer._id)}
          />
        </CardActions>
      </Card>
    </div>)
  }
}

export default Proffer
