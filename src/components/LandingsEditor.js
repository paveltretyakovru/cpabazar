import React, {Component} from 'react'
import TextField from 'material-ui/TextField'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'

class LandingsEditor extends Component {

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
          this.props.lendings.map((lending, index, lendings) => {
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
                    name="title"
                    onChange={event => this.props.updateLending(event, index)}
                    underlineShow={false}
                    floatingLabelText="Заголовок"
                    value={lending.title || 'Гугле'}
                    hintText="Заголовок"
                  />
                </div>

                <div className="col-md-4 col-xs-4">
                  <TextField
                    name="url"
                    underlineShow={false}
                    value={lending.url || 'http://google.com'}
                    hintText="URL"
                    onChange={event => this.props.updateLending(event, index)}
                    floatingLabelText="URL"
                  />
                </div>

                <div className="col-md-2 col-xs-4">
                  {
                    (index == lendings.length - 1)
                      ? (<FlatButton
                          label="Добавить"
                          primary={true}
                          icon={<ContentAdd />}
                          onTouchTap={::this.props.addEmptyLending}
                        />
                      )
                      : (
                        <FlatButton
                          icon={<ContentRemove />}
                          label="Удалить"
                          secondary={true}
                          onTouchTap={() => {
                            this.props.removeLending(index)
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

export default LandingsEditor
