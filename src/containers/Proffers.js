// Redux
import * as appActions from '../actions/app'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LinearProgress from 'material-ui/LinearProgress'

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

  getStyles() {return {
    progressStyle: {
      borderRadius: 0,
    },
  }}

  render() {
    let id = this.props.params.id || false
    let proffers = this.props.proffers.reverse()

    let proffer = proffers.find(el => {return el._id === id}) || false
    let {progressStyle} = this.getStyles()

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
    const tableProps = {fixedHeader: true, height: 500}
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
        this.props.proffersRequest || this.props.profferDeleteRequest
          ? <LinearProgress style={progressStyle} />
          : null
      }
      {
        (!id)
          // Если нет id отрисовываем таблицу со всеми предложеинями
          ? DataTable
          // Иначе отрисовываем старинцу с одним предложением
          : <Proffer
            proffer={proffer}
            deleteAction={this.props.appActions.deleteProffer}
          />
      }
    </div></div>)
  }
}

const mapStateToProps = state => {return {
  proffers: state.app.proffers,
  proffersRequest: state.app.proffersRequest,
  profferDeleteRequest: state.app.profferDeleteRequest,
}}

const mapDispatchToProps = dispatch => {return {
  appActions: bindActionCreators(appActions, dispatch),
}}

export default connect(mapStateToProps, mapDispatchToProps)(Proffers)
