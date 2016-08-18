'use strict'
const os = require('os')
const _ = require('lodash')

const getIpAddr = () => {
  return _.find(os.networkInterfaces().eth0, {family: 'IPv4'}).address
}

module.exports = getIpAddr;
