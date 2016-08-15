'use strict';
var megaleadAdmin = require('./modules/connections').megaleadAdmin;
var CampaignPap = require('./CampaignPap');

var Campaign = megaleadAdmin.Model.extend({
  tableName: 'campaigns',
  hasTimestamps: true,

  pap: function() {
    return this.belongsTo(CampaignPap, 'campaign_id')
  },
});

module.exports = Campaign;
