'use strict';
const express = require('express');
const router = express.Router();
const Campaign = require('../../Campaign');
const CommissionPap = require('../../CommissionPap');
const Promise = require('promise');
const _ = require('lodash');

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
          code: commission.countrycodes.split(','),
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

/* GET home page. */
router.get('/', (req, res) => {

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
          pap: campaign.pap,
          price: campaign.price,
          banners: campaign.banners,
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
              resGeo.commissionvalue = commission.commissionvalue
            }
          })
        }))

        res.json({campaigns: result});
      });

    });
  }, 1000);

});

module.exports = router;
