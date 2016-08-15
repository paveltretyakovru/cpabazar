import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton';
import ContentLink from 'material-ui/svg-icons/content/link'
import React, { Component } from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import { bindActionCreators } from 'redux'
import * as campaignsActions from '../actions/campaigns'

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
    return (
      <div className="container-fluid row">
        <div className="col-xs-12 fadeInRight" style={{marginTop: 24}}>
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
                  onClick={() => this.props.actions.routeToCampaign(link)}
                />
                </GridTile>
              })
            }
          </GridList>
        </div>
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
