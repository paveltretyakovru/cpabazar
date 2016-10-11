const CampaignLocal = require('../../CampaignLocal')

const localFetch = (req, res) => {
	return CampaignLocal.find().lean().exec((err, campaigns) => {
		campaigns = campaigns.map(campaign => {
			campaign.avgcommission = 345
			return campaign
		})

		console.log('CAMAPGINS --->', campaigns)

    res.json({
    	campaigns: campaigns || [],
    	auth: req.session.user_id ? true : false
    })
  })
}

module.exports = localFetch