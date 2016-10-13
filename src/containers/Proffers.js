import React, {Component} from 'react'

import FlatButton from 'material-ui/FlatButton'
import DeleteSVG from 'material-ui/svg-icons/action/delete'

import {
  Table,
  TableRow,
  TableBody,
  TableHeader,
  TableRowColumn,
  TableHeaderColumn,
} from 'material-ui/Table';

class Proffers extends Component {
  render() {
    const tableHeaders = [
      'ID',
      'Кампания',
      'Имя',
      'Email',
      'Skype',
      'Сообщение',
      'Предложение',
      'Действие',
    ]

    const tableData = [
      {id: 1, name: 'water',email: 'water',skype: 'water',message: 'water',campaign: 'water',proffercommission: 350},
      {id: 2, name: 'water',email: 'water',skype: 'water',message: 'water',campaign: 'water',proffercommission: 350},
      {id: 3, name: 'water',email: 'water',skype: 'water',message: 'water',campaign: 'water',proffercommission: 350},
      {id: 4, name: 'water',email: 'water',skype: 'water',message: 'water',campaign: 'water',proffercommission: 350},
      {id: 5, name: 'water',email: 'water',skype: 'water',message: 'water',campaign: 'water',proffercommission: 350},
      {id: 6, name: 'water',email: 'water',skype: 'water',message: 'water',campaign: 'water',proffercommission: 350},
      {id: 7, name: 'water',email: 'water',skype: 'water',message: 'water',campaign: 'water',proffercommission: 350},
      {id: 8, name: 'water',email: 'water',skype: 'water',message: 'water',campaign: 'water',proffercommission: 350},
      {id: 9, name: 'water',email: 'water',skype: 'water',message: 'water',campaign: 'water',proffercommission: 350},
      {id: 10, name: 'water',email: 'water',skype: 'water',message: 'water',campaign: 'water',proffercommission: 350},
      {id: 11, name: 'water',email: 'water',skype: 'water',message: 'water',campaign: 'water',proffercommission: 350},
      {id: 12, name: 'water',email: 'water',skype: 'water',message: 'water',campaign: 'water',proffercommission: 350},
      {id: 13, name: 'water',email: 'water',skype: 'water',message: 'water',campaign: 'water',proffercommission: 350},
      {id: 14, name: 'water',email: 'water',skype: 'water',message: 'water',campaign: 'water',proffercommission: 350},
      {id: 15, name: 'water',email: 'water',skype: 'water',message: 'water',campaign: 'water',proffercommission: 350},
      {id: 16, name: 'water',email: 'water',skype: 'water',message: 'water',campaign: 'water',proffercommission: 350},
      {id: 17, name: 'water',email: 'water',skype: 'water',message: 'water',campaign: 'water',proffercommission: 350},
      {id: 18, name: 'water',email: 'water',skype: 'water',message: 'water',campaign: 'water',proffercommission: 350},
    ]

    const iconDelete = <FlatButton
      secondary={true}
      icon={<DeleteSVG />}
      // onTouchTap={}
    />

    return(<div className="row fadeInRight"><div className="col-xs-12">
      <Table fixedHeader={true} height={300}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow displayRowCheckbox={false}>
            {tableHeaders.map((el, index) => {
              return(
                <TableHeaderColumn key={index} style={{paddingTop:40}}>
                  {el}
                </TableHeaderColumn>
              )
            })}
          </TableRow>
        </TableHeader>
        <TableBody showRowHover={true} displayRowCheckbox={false}>
          {tableData.map(el => {
            return(<TableRow key={el.id}>
              <TableRowColumn>{el.id}</TableRowColumn>
              <TableRowColumn>{el.campaign}</TableRowColumn>
              <TableRowColumn>{el.name}</TableRowColumn>
              <TableRowColumn>{el.email}</TableRowColumn>
              <TableRowColumn>{el.skype}</TableRowColumn>
              <TableRowColumn>{el.message}</TableRowColumn>
              <TableRowColumn>{el.proffercommission}</TableRowColumn>
              <TableRowColumn>{iconDelete}</TableRowColumn>
            </TableRow>)
          })}
        </TableBody>
      </Table>
    </div></div>)
  }
}

export default Proffers
