import React, {Component} from 'react'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'

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

                <div className="col-md-4 col-xs-12">
                  <TextField
                    onChange={(event) => {
                      this.props.updateCommission(event, index)
                    }}
                    value={commission.price || 0}
                    hintText="Цена"
                  />
                </div>

                <div className="col-md-4 col-xs-12">
                  <SelectField maxHeight={200}>
                    <MenuItem primaryText="Россия" />
                  </SelectField>
                </div>

                <div className="col-md-1 col-xs-12">
                  {
                    (index == commissions.length - 1)
                      ? (
                        <FloatingActionButton
                          mini={true}
                          onTouchTap={::this.props.addEmptyCommission}
                        >
                          <ContentAdd />
                        </FloatingActionButton>
                      )
                      : (
                        <FloatingActionButton
                          mini={true}
                          onTouchTap={() => {
                            this.props.removeCommission(index)
                          }}
                        >
                          <ContentRemove />
                        </FloatingActionButton>
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
