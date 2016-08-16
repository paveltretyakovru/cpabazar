'use strict';
var express = require('express');
var router = express.Router();
var Campaign = require('../../Campaign');

/* GET home page. */
router.get('/', (req, res) => {

  Campaign.fetchAll().then(campaigns => {
    setTimeout(function(){

      // Загружаем зависимости
      campaigns.load(['pap', 'banners', 'commissiontypes']).then(campaigns => {
        campaigns = campaigns.toArray();

        let result = campaigns.map(campaign => {
          campaign = campaign.toJSON();

          // let geo = campaign.commissiontypes.map(commission => {
          //   if(commission.countrycodes !== '') {
          //     return commission.countrycodes.split(',');
          //   }
          // });

          // Формируем резульатат запроса
          return {
            id: campaign.id,
            // geo: geo,
            pap: campaign.pap,
            price: campaign.price,
            banners: campaign.banners,
            commissiontypes: campaign.commissiontypes,
          }
        });

        res.json({campaigns: result});
      });
    }, 1000)
  });
});

module.exports = router;
