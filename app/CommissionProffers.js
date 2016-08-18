'use strict';
var megaleadAdmin = require('./modules/connections').megaleadAdmin;

var CommissionProffers = megaleadAdmin.Model.extend({
  tableName: 'commission_proffers',
  hasTimestamps: true,
});

module.exports = CommissionProffers;
