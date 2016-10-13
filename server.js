// ===================== DEVELOP REQUIRES =====================================
const notifier = require('node-notifier')
const bodyParser = require('body-parser')
// -----------------------------------------------------------------------------

// ===================== SELF FUNCTIONS REQUIRES ==============================
const getIpAddr = require('./app/modules/helpers/getIpAddr')
// -----------------------------------------------------------------------------

// ===================== SELF EXPRESS APP REQURIES ============================
const userRoute = require('./app/routes/user/userRoute')
const proffersRoute = require('./app/routes/proffers/proffersRoute')
const campaignRoute = require('./app/routes/campaign/campaignRoute')
const fetchpageRoute = require('./app/routes/fetchpage/fetchpageRoute')
const postprofferRoute = require('./app/routes/postproffer/postprofferRoute')
// -----------------------------------------------------------------------------

// ==================== REQUIRE DB DEPENDS ====================================
const mongoose = require('mongoose')
const session = require('express-session')
const cookieParser = require('cookie-parser')
// -----------------------------------------------------------------------------

// ==================== INIT EXPRESS APPLICATION ==============================
const app = new (require('express'))()
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
app.use(bodyParser())
// -----------------------------------------------------------------------------

// ==================== SET GLOBAL VARIABLES ==================================
app.set('port', process.env.PORT || 3000)
app.set('host', process.env.HOST || getIpAddr())
// -----------------------------------------------------------------------------

// ==================== CONNECT TO MONGODB ====================================
mongoose.connect('mongodb://localhost/bazar')
mongoose.connection.once('open', () => console.log('Подключено к mongodb'))
// -----------------------------------------------------------------------------

// ==================== INIT MIDDLEWARES ======================================
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

// -----------------------------------------------------------------------------

// ==================== INIT ROUTES ===========================================
app.use('/user', userRoute)
app.use('/campaign', campaignRoute)
app.use('/proffers', proffersRoute)
app.use('/fetchpage', fetchpageRoute)
app.use('/postproffer', postprofferRoute)
app.get('/', (req,res) => {res.sendFile(`${__dirname}/public/index.html`)})
app.get('/public/bundle.js', (req,res) => {res.sendFile(`${__dirname}/dist/bundle.js`)})

app.get('/test', (req, res) => {
  console.log('Fetching page', req.session);
  console.log('Cookies: --->>>>', req.cookies);
  res.json(req.session)
})
// -----------------------------------------------------------------------------

// ==================== INIT SERVER ===========================================
app.listen(app.get('port'), app.get('host'), error => {
  let mess = (error) ? error : `Server: ${app.get('host')}:${app.get('port')}/`
  if (!error) notifier.notify(`${mess}`)
})
// -----------------------------------------------------------------------------
