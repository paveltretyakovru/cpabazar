import * as appActions from '../actions/app'
import * as campaignsActions from '../actions/campaigns'

import ContentLink from 'material-ui/svg-icons/content/link'
import IconButton from 'material-ui/IconButton';
import LinearProgress from 'material-ui/LinearProgress'
import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'

import Campaign from './Campaign'

class Campaigns extends React.Component {

  get styles() {
    return {
      gridList: {
        marginTop: 8,
      },
      titlePrice: {
        fontWeight: 700,
      },
      gridTileImg: {
        cursor: 'pointer',
      },
      floatButton: {
        right: '5%',
        bottom: '5%',
        position: 'absolute',
      },
    }
  }

  render() {

    const AddCampaignButton = <FloatingActionButton
      secondary={true}
      style={ this.styles.floatButton }
      onClick={::this.props.appActions.routeToAddCampaign}
    >
      <ContentAdd />
    </FloatingActionButton>

    return (
          (() => {
            if(this.props.campaigns.length) {
              let id = this.props.params.id
              if(id) {
                let findCampaign = this.props.campaigns.filter(el => {
                  return id === el._id
                })
                let dataCampaigns = findCampaign[0]

                return <Campaign data={dataCampaigns} user={this.props.user} />
              } else {
                return (
                    <div>
                      <GridList
                      cols={1}
                      style={this.styles.gridList}
                      className="fadeInRight"
                      >
                      {
                        (
                          () => {
                            return this.props.campaigns.map(campaign => {

                              let link = `/campaigns/${campaign._id}`

                              let title = (<span>
                                {campaign.name} &nbsp;
                                <span style={this.styles.titlePrice}>
                                {campaign.price} &nbsp;
                                <del>P</del>
                                </span>
                                </span>)

                                return (
                                  <GridTile
                                  key={campaign._id}
                                  title={title}
                                  actionIcon={
                                    <IconButton tooltip="Cайт" tooltipPosition="top-left">
                                    <ContentLink color="white" />
                                    </IconButton>
                                  }
                                  actionPosition="right"
                                  titlePosition="bottom"
                                  subtitle={campaign.description}
                                  >
                                  <img
                                  src={campaign.logourl || campaign.image}
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

                        {/* Кнопка добавления */}
                        {
                          this.props.user.auth
                            ? AddCampaignButton
                            : null
                        }
                    </div>
                )
              }

            // if this.props.campaigns
          } else {
            return (<div>
              <div style={{textAlign:'center'}} mode="indeterminate">
                <LinearProgress />
              </div>
              { AddCampaignButton }
            </div>)
          }

          })()
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user,
    campaigns: state.app.campaigns,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(campaignsActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campaigns)
