const Proffer = require('../../Proffer')
const errorAction = require('../../modules/helpers/errorAction')

function postProfferLocal (req, res) {
	let proffer = new Proffer({
		name: req.body.name,
    email: req.body.email,
    skype: req.body.skype,
    message: req.body.message,
    campaign: req.body.campaign,
    proffercommission: req.body.proffercommission,
	})

	proffer.save(error => {
		return errorAction(error)
			.then(
				() => {
					let message = 'Предложение принято'
          return res.json({
            success: true,
            message: message,
            proffer: proffer.toObject(),
          })
				},

				(errorDump) => {
					res.status(422)
          return res.json({
            success: false,
            message: errorDump,
          })
				}
			)
	})
}

module.exports = postProfferLocal