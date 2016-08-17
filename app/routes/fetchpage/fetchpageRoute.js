'use strict';
const express = require('express');
const router = express.Router();
const Campaign = require('../../Campaign');
const CommissionPap = require('../../CommissionPap');
const Promise = require('promise');
const _ = require('lodash');

/* GET home page. */
router.get('/', (req, res) => {

  // Создаем обещание загрузки кампаний с зависимостями
  let Campaigns = new Promise(function(resolve, reject) {
    // campaigns - collection
    Campaign.fetchAll().then(campaigns => {
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

  setTimeout(function(){
    Promise.all([Campaigns]).then(values => {
      // Сохраняем полученные обещания
      let campaigns = values[0].toArray();

      let result = campaigns.map(element => {
        let campaign = element.toJSON();
        let geo = getCountrycodes(campaign.commissiontypes);

        // Формируем резульатат запроса
        return {
          id: campaign.id,
          geo: geo,
          hot: campaign.hot,
          new: campaign.new,
          mobile: campaign.mobile,
          pap: campaign.pap,
          price: campaign.price,
          banners: campaign.banners,
          male: campaign.male,
          famale: campaign.famale,
          agefrom: campaign.agefrom,
          ageto: campaign.ageto,
          callfrom: campaign.callfrom,
          callto: campaign.callto,
          interests: campaign.interests,
          comment: campaign.comment,
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
            logourl: resCampaign.pap.logourl,
            commissions: resCampaign.geo,
            description: resCampaign.pap.description,
            longdescription: resCampaign.pap.longdescription,

            male: resCampaign.male,
            famale: resCampaign.famale,
            agefrom: resCampaign.agefrom,
            ageto: resCampaign.ageto,
            callfrom: resCampaign.callfrom,
            callto: resCampaign.callto,
            interests: resCampaign.interests,
            comment: resCampaign.comment,

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

        res.json({campaigns: result});
      });

    });
  }, 1000);

});

module.exports = router;
