'use strict';
var megaleadAdmin = require('./modules/connections').megaleadAdmin;
var CampaignPap = require('./CampaignPap');
var BannerPap = require('./BannerPap');
var CommissiontypePap = require('./CommissiontypePap');

var Campaign = megaleadAdmin.Model.extend({
  tableName: 'campaigns',
  hasTimestamps: true,
  idAttribute: 'campaign_id',

  pap: function() {
    return this.belongsTo(CampaignPap, 'campaign_id')
  },

  banners: function() {
    return this.hasMany(BannerPap, 'campaignid')
  },

  commissiontypes: function() {
    return this.hasMany(CommissiontypePap, 'campaignid')
  },
});

module.exports = Campaign;
