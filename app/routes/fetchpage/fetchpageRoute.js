'use strict';
const express = require('express');
const router = express.Router();
const Campaign = require('../../CampaignRemote');
const CommissionPap = require('../../CommissionPap');
const Promise = require('promise');
const _ = require('lodash');
const RequestPromise = require('request-promise');

const offersStatUrl = 'http://megalead.ru/api/statistic?dateStart=2015-08-17&notDefault=1&notLanding=1&guest=1'

/* GET home page. */
router.get('/', (req, res) => {
  // Создаем обещание загрузки кампаний с зависимостями
  let Campaigns = new Promise(function(resolve, reject) {

    // campaigns - collection
    new Campaign()
      .where({'display' : '1'})
      .fetchAll()
      .then(campaigns => {
        campaigns.load(['pap', 'banners', 'commissiontypes'])
          .then(campaigns => {
            return resolve(campaigns);
          })
          .catch(err => { return reject(err) });
      });
  });

  function getCountrycodes(commissiontypes) {
    let result = [];

    if(commissiontypes) {
      commissiontypes.map(commission => {
        let countrycodes = commission.countrycodes
        if(countrycodes !== '' && countrycodes !== null) {
          result.push({
            commtypeid: commission.commtypeid,
            countries: commission.countrycodes.split(','),
          });
        }
      });
    }

    return result;
  }

  function getCountryCommission(geos) {
    let promises = geos.map(geo => {
      return CommissionPap.where('commtypeid', geo.commtypeid).fetch()
    })

    return promises
  }

  Promise.all([Campaigns, RequestPromise(offersStatUrl)]).then(values => {
    // Сохраняем полученные обещания
    let campaigns = values[0].toArray();
    let offersStatistic = JSON.parse(values[1]).offer;

    let result = campaigns.map(element => {
      let campaign = element.toJSON();
      let geo = getCountrycodes(campaign.commissiontypes);
      let statistic = _.find(offersStatistic, {'id': campaign.pap.campaignid})
      let approve = (statistic) ? statistic.response.approve : 0

      // Формируем резульатат запроса
      return {
        id: campaign.id,
        geo: geo,
        hot: campaign.hot,
        new: campaign.new,
        pap: campaign.pap,
        male: campaign.male,
        price: campaign.price,
        ageto: campaign.ageto,
        mobile: campaign.mobile,
        famale: campaign.famale,
        callto: campaign.callto,
        approve: approve,
        banners: campaign.banners,
        agefrom: campaign.agefrom,
        comment: campaign.comment,
        callfrom: campaign.callfrom,
        interests: campaign.interests,
        campaignid: campaign.pap.campaignid,
        avgcommission: campaign.avgcommission,
      }
    });

    let geoCommissionsPromises = [];

    _.forEach(result, resEl => {
      geoCommissionsPromises = _.concat(geoCommissionsPromises, getCountryCommission(resEl.geo))
    })

    Promise.all(geoCommissionsPromises).then(commissionsModels => {
      commissionsModels.map((commissionModel => {
        let commission = commissionModel.toJSON()

        _.forEach(result, resEl => {
          let resGeo = _.find(resEl.geo, {commtypeid: commission.commtypeid})
          if(resGeo) {
            resGeo.value = commission.commissionvalue
          }
        })
      }))

      result = result.map(resCampaign => {
        return {
          id: resCampaign.id,
          hot: resCampaign.hot,
          new: resCampaign.new,
          name: resCampaign.pap.name,
          price: resCampaign.price,
          mobile: resCampaign.mobile,
          approve: resCampaign.approve,
          logourl: resCampaign.pap.logourl,
          campaignid: resCampaign.pap.campaignid,
          commissions: resCampaign.geo,
          description: resCampaign.pap.description,
          avgcommission: resCampaign.avgcommission,
          longdescription: resCampaign.pap.longdescription,

          male: resCampaign.male,
          ageto: resCampaign.ageto,
          famale: resCampaign.famale,
          callto: resCampaign.callto,
          agefrom: resCampaign.agefrom,
          comment: resCampaign.comment,
          callfrom: resCampaign.callfrom,
          interests: resCampaign.interests,

          landings: resCampaign.banners.map(banner => {
            return {
              id: banner.bannerid,
              name: banner.name,
              description: banner.description,
              dateinserted: banner.dateinserted,
              destinationurl: banner.destinationurl,
            }
          }),

        }
      })

      console.log('Fetching route =====>>>>', req.session);

      res.json({campaigns: result, auth: req.session.user_id ? true : false})

    });

  });

});

module.exports = router;
