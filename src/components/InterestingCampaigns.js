import React, {Component} from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import _ from 'lodash'

const initState = {
  interesting: {
    campaigns: {
      last:[],
      popular: {},
    },
  },
}

class interestingCampaigns extends Component {
  constructor(props) {
    super(props)

    this.state = { ...initState, proffercommission: this.props.avgcommission}
  }

  render() {
    <div>
      <span className="text-title">
        Вас так же может заинтересовать:
      </span>

      <GridList
        className="fadeInRight"
        cols={3}
      >
        {
          (
            () => {
              // Вычленяем популярные и последние кампании
              let last = this.state.interesting.campaigns.last;
              let popular = this.state.interesting.campaigns.popular;

              // Исключаем возможность повтора
              let interestingCampaigns = (_.find(last, {id: popular.id}))
                ? last
                : _.concat(last, [popular])

              return interestingCampaigns.map(campaign => {
                let link = `/campaigns/${campaign.id}`
                let dataCampaign = _.find(
                  this.props.campaigns,
                  {id: campaign.id}
                )

                return (
                  <GridTile
                    key={campaign.id}
                    title={campaign.name}
                    subtitle={<span>
                      {campaign.commission} <del>P</del>
                      {' '} Approve: {dataCampaign.approve}%
                    </span>}
                    titlePosition="bottom"
                  >
                    <img
                      src={campaign.image}
                      style={{cursor: 'pointer'}}
                      onClick={() => {
                        this.setState(initState)
                        this.props.routeToCampaign(link)
                        this.props.switchDialog()
                      }}
                    />
                  </GridTile>
                )
              })
            }
          )()
        }
      </GridList>
    </div>
  }
}

export default interestingCampaigns
