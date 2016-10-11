import React, {Component} from 'react'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'

class CommissionsEditor extends Component {

  set styles(styles) {
    this._styles = styles
  }

  get styles() {return {
    wrapper: {
      marginTop: 16,
      alignItems: 'center',
    },
    addbutton: {
      textAlign: 'right',
    },
  }}

  handleChangeCountry(index, value) {
    this.props.updateCommissionCountry(index,value)
  }

  render() {

    return (
      <div>
        {
          this.props.commissions.map((commission, index, commissions) => {
            return (
              <div
                style={this.styles.wrapper}
                className="row"
                key={index}
              >
                {
                  (index !== 0)
                    ? <div className="col-xs-12"><Divider /></div>
                    : null
                }

                <div className="col-md-4 col-xs-4">
                  <TextField
                    onChange={(event) => {
                      this.props.updateCommission(event, index)
                    }}
                    underlineShow={false}
                    floatingLabelText="Цена"
                    value={commission.price || 0}
                    hintText="Цена"
                  />
                </div>

                <div className="col-md-4 col-xs-4">
                  <SelectField
                    maxHeight={200}
                    value={commission.country || 'RU'}
                    floatingLabelText="Страна"
                    floatingLabelFixed={true}
                    fullWidth={true}
                    onChange={(event, i, value) => {
                      this.handleChangeCountry(index, value)
                    }}
                  >
                    <MenuItem primaryText="Россия" value="RU" />
                  </SelectField>
                </div>

                <div className="col-md-2 col-xs-4">
                  {
                    (index == commissions.length - 1)
                      ? (<FlatButton
                          label="Добавить"
                          primary={true}
                          icon={<ContentAdd />}
                          onTouchTap={::this.props.addEmptyCommission}
                        />
                      )
                      : (
                        <FlatButton
                          icon={<ContentRemove />}
                          label="Удалить"
                          secondary={true}
                          onTouchTap={() => {
                            this.props.removeCommission(index)
                          }}
                        />
                      )
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default CommissionsEditor
