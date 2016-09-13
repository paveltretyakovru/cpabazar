const notifier = require('node-notifier')
const getIpAddr = require('./app/modules/helpers/getIpAddr')
const userRoute = require('./app/routes/user/userRoute')
const bodyParser = require('body-parser')
const fetchpageRoute = require('./app/routes/fetchpage/fetchpageRoute')
const postprofferRoute = require('./app/routes/postproffer/postprofferRoute')

const app = new (require('express'))()

app.set('port', process.env.PORT || 3000)
app.set('host', process.env.HOST || getIpAddr())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Init routes
app.use('/user', userRoute)
app.use('/fetchpage', fetchpageRoute)
app.use('/postproffer', postprofferRoute)

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(app.get('port'), app.get('host') , (error) => {
  if (error) {
    console.error(error)
  } else {
    notifier.notify('Сервер перезапущен')
    console.info(`==> 🌎  Open up http://${app.get('host')}:${app.get('port')}/`)
  }
})
