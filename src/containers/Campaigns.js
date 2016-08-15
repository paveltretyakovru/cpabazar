import { connect } from 'react-redux'
import Campaign from './Campaign'
import IconButton from 'material-ui/IconButton';
import ContentLink from 'material-ui/svg-icons/content/link'
import React, { Component } from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import { bindActionCreators } from 'redux'
import * as campaignsActions from '../actions/campaigns'
import { push } from 'react-router-redux'

class Campaigns extends Component {

  get styles() {
    return {
      titlePrice: {
        fontWeight: 700,
      },
      gridTileImg: {
        cursor: 'pointer',
      },
    }
  }

  render() {
    let campaign = false;

    if(this.props.params.id) {
      campaign = this.props.campaigns.filter((element) => {
        return element.id === parseInt(this.props.params.id)
      })
      campaign = campaign[0]
    }

    return (
      <div className="container-fluid row">
        {(() => {
          if(!campaign) {
            return(<div className="col-xs-12 fadeInRight" style={{marginTop: 24}}>
              <GridList
                cols={2}
                cellHeight={250}
                padding={1}
              >
                {
                  this.props.campaigns.map((campaign) => {

                    // Формирование заголовка для карточки
                    let title = <span>
                      {campaign.pap.name} &nbsp;
                      <span style={this.styles.titlePrice}>
                        {campaign.price} &nbsp;
                        <del>P</del>
                      </span>
                    </span>;

                    let link = `campaigns/${campaign.id}`;

                    return <GridTile
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
                      onClick={
                        () => this.props.goToRoute(link)
                      }
                    />
                    </GridTile>
                  })
                }
              </GridList>
            </div>)
          } else {
            return (
              <div className="col-xs-12 fadeInRight" style={{marginTop: 24}}>
                <Campaign data={campaign} />
              </div>
            )
          }
        })()}
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
  function goToRoute(link) {
    dispatch(push(link));
  }
  return {
    goToRoute: goToRoute,
    actions: bindActionCreators(campaignsActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campaigns)
