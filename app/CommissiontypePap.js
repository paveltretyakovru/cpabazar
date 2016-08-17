'use strict';
var megalead = require('./modules/connections').megalead;
const CommissionPap = require('./CommissionPap');

 module.exports = megalead.Model.extend({
  tableName: 'qu_pap_commissiontypes',
  // idAttribute: 'bannerid',

  commission: function() {
    return this.hasOne(CommissionPap, 'commtypeid')
  },
});
