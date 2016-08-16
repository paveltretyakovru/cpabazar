import { connect } from 'react-redux'
import Campaign from './Campaign'
import IconButton from 'material-ui/IconButton';
import ContentLink from 'material-ui/svg-icons/content/link'
import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import { bindActionCreators } from 'redux'
import * as campaignsActions from '../actions/campaigns'

class Campaigns extends React.Component {

  get styles() {
    return {
      gridList: {
        marginTop: 24,
      },
      titlePrice: {
        fontWeight: 700,
      },
      gridTileImg: {
        cursor: 'pointer',
      },
    }
  }

  render() {
    let id = parseInt(this.props.params.id);

    return (
      <div className="container-fluid row">
        {
          (() => {
            if(id) {
              let findCampaign = this.props.campaigns.filter(el => {
                return id === el.id
              })
              let dataCampaigns = findCampaign[0]

              return <Campaign data={dataCampaigns} />
            } else {
              return (
                <GridList
                  style={this.styles.gridList}
                  className="col-xs-12 fadeInRight"
                >
                  {
                    (
                      () => {
                        return this.props.campaigns.map(campaign => {

                          let link = `/campaigns/${campaign.id}`

                          let title = (<span>
                            {campaign.pap.name} &nbsp;
                            <span style={this.styles.titlePrice}>
                              {campaign.price} &nbsp;
                              <del>P</del>
                            </span>
                          </span>)

                          return (
                            <GridTile
                              key={campaign.id}
                              title={title}
                              actionIcon={
                                <IconButton tooltip="Cайт">
                                  <ContentLink color="white" />
                                </IconButton>
                              }
                              actionPosition="right"
                              titlePosition="top"
                              subtitle={campaign.pap.description}
                            >
                              <img
                                src={campaign.pap.logourl}
                                style={this.styles.gridTileImg}
                                onClick={() => this.props.actions.routeToCampaign(link)}
                              />
                            </GridTile>
                          )
                        })
                      }
                    )()
                  }
                </GridList>
              )
            }
          })()
        }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    campaigns: state.app.campaigns,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(campaignsActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campaigns)
