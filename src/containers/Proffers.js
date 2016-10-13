import * as appActions from '../actions/app'

import { connect } from 'react-redux'
import React, {Component} from 'react'
import { bindActionCreators } from 'redux'

// Buttons
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

  componentDidMount() {
    this.props.appActions.fetchProffers()
  }

  render() {
    const iconDelete = <FlatButton secondary={true} icon={<DeleteSVG />} />
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

    const tableProps = {fixedHeader: true, height: 300}
    const tableBodyProps = {showRowHover:true, displayRowCheckbox:false}
    const tableHeaderProps = {adjustForCheckbox: false, displaySelectAll: false}

    return(<div className="row fadeInRight"><div className="col-xs-12">
      <Table {...tableProps}>
        <TableHeader {...tableHeaderProps}>
          <TableRow>
            {tableHeaders.map((el, index) => {return(
              <TableHeaderColumn key={index} >
                {el}
              </TableHeaderColumn>
            )})}
          </TableRow>
        </TableHeader>
        <TableBody {...tableBodyProps}>
          {this.props.proffers.map(el => {return(
            <TableRow key={el.id}>
              <TableRowColumn>{el._id}</TableRowColumn>
              <TableRowColumn>{el.campaign}</TableRowColumn>
              <TableRowColumn>{el.name}</TableRowColumn>
              <TableRowColumn>{el.email}</TableRowColumn>
              <TableRowColumn>{el.skype}</TableRowColumn>
              <TableRowColumn>{el.message}</TableRowColumn>
              <TableRowColumn>{el.proffercommission}</TableRowColumn>
              <TableRowColumn>{iconDelete}</TableRowColumn>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </div></div>)
  }
}

const mapStateToProps = state => {return {
  proffers: state.app.proffers,
}}

const mapDispatchToProps = dispatch => {return {
  appActions: bindActionCreators(appActions, dispatch),
}}

export default connect(mapStateToProps, mapDispatchToProps)(Proffers)
