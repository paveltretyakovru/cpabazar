'use strict';

// import div from 'material-ui/Paper';
import React, {Component, PropTypes} from 'react';
// import {browserHistory} from 'react-router'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as campaignsActions from '../actions/campaigns';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ContentLink from 'material-ui/svg-icons/content/link';
// import {push} from 'react-router-redux';

class Campaigns extends Component {
  constructor(props) {
    super(props);
  }

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

  handleClickCampaign(link) {
    this.props.goPage(link);
  }

  render() {
    return(
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
                  onClick={() => this.handleClickCampaign(link)}
                />
                </GridTile>
              })
            }
          </GridList>
        </div>
      </div>
    );
  }
}

Campaigns.propTypes = {
  campaigns:  PropTypes.array,
}

const mapStateToProps = (state) => {
  return {
    campaigns: state.page.campaigns,
  }
}

const mapDispatchToProps = (dispatch) => {
  const goPage = (page) => {
    console.log('Test action page', page);
  }

  return {
    goPage: goPage,
    campaignsActions: bindActionCreators(campaignsActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campaigns);
