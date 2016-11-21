// ===================== DEVELOP REQUIRES =====================================
const notifier = require('node-notifier'),
      bodyParser = require('body-parser'),
      cors = require('cors')
// ----------------------------------------------------------------------------

// ===================== SELF FUNCTIONS REQUIRES ==============================
// const getIpAddr = require('./app/modules/helpers/getIpAddr'),
const loadUser = require('./app/modules/loadUser')
// ----------------------------------------------------------------------------

// ===================== SELF EXPRESS APP REQURIES ============================
const userRoute = require('./app/routes/user/userRoute'),
      proffersRoute = require('./app/routes/proffers/proffersRoute'),
      campaignRoute = require('./app/routes/campaign/campaignRoute'),
      fetchpageRoute = require('./app/routes/fetchpage/fetchpageRoute'),
      postprofferRoute = require('./app/routes/postproffer/postprofferRoute')
// ----------------------------------------------------------------------------

// ==================== REQUIRE DB DEPENDS ====================================
const mongoose = require('mongoose'),
      session = require('express-session'),
      cookieParser = require('cookie-parser')
// ----------------------------------------------------------------------------

// ==================== INIT EXPRESS APPLICATION ==============================

const app = new (require('express'))()

// ==================== SET GLOBAL VARIABLES ==================================
app.set('port', process.env.PORT || 3002)
app.set('host', process.env.SERVER_HOST || '192.168.16.106')
app.set('frontHost', process.env.FRONT_HOST || '192.168.16.106:8080')
// ----------------------------------------------------------------------------

app.use(cookieParser())
app.use(session({
  secret : 's3Cur3',
  resave: true,
  saveUninitialized: true,
  cookie: {
    path: '/',
    maxAge: null,
    secure: false,
    // httpOnly: true,
  },
}))
app.use(cors({credentials: true, origin: app.get('frontHost')}))
app.use(bodyParser())
// ----------------------------------------------------------------------------

// ==================== CONNECT TO MONGODB ====================================
mongoose.connect('mongodb://localhost/bazar')
mongoose.connection.once('open', () => console.log('Подключено к mongodb'))
// ----------------------------------------------------------------------------

// ==================== INIT MIDDLEWARES ======================================
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// ----------------------------------------------------------------------------

// ==================== INIT ROUTES ===========================================
app.use('/user', userRoute)
app.use('/campaign', campaignRoute)
app.use('/proffers', loadUser, proffersRoute)
app.use('/fetchpage', fetchpageRoute)
app.use('/postproffer', postprofferRoute)
app.get('/', (req,res) => {res.sendFile(`${__dirname}/public/index.html`)})
app.get('/public/bundle.js', (req,res) => {res.sendFile(`${__dirname}/public/bundle.js`)})

app.get('/test', (req, res) => {
  console.log('Fetching page', req.session);
  console.log('Cookies: --->>>>', req.cookies);
  res.json(req.session)
})
// ----------------------------------------------------------------------------

// ==================== INIT SERVER ===========================================
app.listen(app.get('port'), app.get('host'), error => {
  let mess = (error) ? error : `Server: ${app.get('host')}:${app.get('port')}/`
  if (!error) notifier.notify(`${mess}`)
})
// ----------------------------------------------------------------------------
