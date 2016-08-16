'use strict';
var express = require('express');
var router = express.Router();
var Campaign = require('../../Campaign');
var Promise = require('promise');

// Создаем обещание загрузки кампаний с зависимостями
let Campaigns = new Promise(function(resolve, reject) {
  Campaign.fetchAll().then(campaigns => {
    campaigns.load(['pap', 'banners', 'commissiontypes'])
      .then(campaigns => { return resolve(campaigns);})
      .catch(err => { return reject(err) });
  });
});

function getCountrycodes(commissiontypes) {
  let result = [];

  if(commissiontypes) {
    commissiontypes.map(commission => {
      let countrycodes = commission.countrycodes
      if(countrycodes !== '' && countrycodes !== null) {
        result.push(commission.countrycodes.split(','));
      }
    });
  }

  return result;
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
          commissiontypes: campaign.commissiontypes,
        }
      });

      res.json({campaigns: result});
    });
  }, 1000);

});

module.exports = router;
