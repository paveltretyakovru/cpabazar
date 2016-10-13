// Redux
import * as appActions from '../actions/app'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// React
import React, {Component} from 'react'

// Table
import {
  Table,
  TableRow,
  TableBody,
  TableHeader,
  TableRowColumn,
  TableHeaderColumn,
} from 'material-ui/Table'

// Components
import Proffer from '../components/Proffer'

class Proffers extends Component {

  componentDidMount() {
    this.props.appActions.fetchProffers()
  }

  handleTouchRow(id) {
    this.props.appActions.routeToProffer(id)
  }

  render() {
    let id = this.props.params.id || false
    let proffers = this.props.proffers

    const tableHeaders = [
      'ID',
      'Кампания',
      'Имя',
      'Email',
      'Skype',
      'Сообщение',
      'Предложение',
    ]

    // =============================== ПАРАМЕТРЫ КОМПОНЕНТОВ ===================
    const tableProps = {fixedHeader: true, height: 300}
    const tableBodyProps = {showRowHover:true, displayRowCheckbox:false}
    const tableHeaderProps = {adjustForCheckbox: false, displaySelectAll: false}

    // =============================== ТАБЛИЦА С ДАННЫМИ =======================
    const DataTable = <Table className="fadeInRight" {...tableProps}>
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
        {proffers.map(el => {return(
          <TableRow key={el.id} onTouchTap={()=> this.handleTouchRow(el._id)}>
            <TableRowColumn>{el._id}</TableRowColumn>
            <TableRowColumn>{el.campaign}</TableRowColumn>
            <TableRowColumn>{el.name}</TableRowColumn>
            <TableRowColumn>{el.email}</TableRowColumn>
            <TableRowColumn>{el.skype}</TableRowColumn>
            <TableRowColumn>{el.message}</TableRowColumn>
            <TableRowColumn>{el.proffercommission}</TableRowColumn>
          </TableRow>
        )})}
      </TableBody>
    </Table>

    // ============================== ИТОГОВЫЙ РЕЗУЛЬТАТ РЕНДЕРА ===============
    return(<div className="row"><div className="col-xs-12">
      {
        (!id)
          ? DataTable
          : <Proffer
            proffer={proffers.find(el => {return el._id === id})}
            deleteAction={this.props.appActions.deleteProffer}
          />
      }
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
