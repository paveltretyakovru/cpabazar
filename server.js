// ===================== DEVELOP REQUIRES ======================================
const notifier = require('node-notifier')
const bodyParser = require('body-parser')
// -----------------------------------------------------------------------------

// ===================== SELF FUNCTIONS REQUIRES ===============================
const getIpAddr = require('./app/modules/helpers/getIpAddr')
// -----------------------------------------------------------------------------

// ===================== SELF EXPRESS APP REQURIES =============================
const userRoute = require('./app/routes/user/userRoute')
const fetchpageRoute = require('./app/routes/fetchpage/fetchpageRoute')
const postprofferRoute = require('./app/routes/postproffer/postprofferRoute')
// -----------------------------------------------------------------------------

// ==================== REQUIRE DB DEPENDS =====================================
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
// -----------------------------------------------------------------------------

// ==================== INIT EXPRESS APPLICATION ===============================
const app = new (require('express'))()
// -----------------------------------------------------------------------------

// ==================== SET GLOBAL VARIABLES ===================================
app.set('port', process.env.PORT || 3000)
app.set('host', process.env.HOST || getIpAddr())
// -----------------------------------------------------------------------------

// ==================== CONNECT TO MONGODB =====================================
mongoose.connect('mongodb://localhost/bazar')
const db = mongoose.connection
const mongostore = new MongoStore({ mongooseConnection: mongoose.connection })
db.once('open', () => console.log('Сервер подключен к mongodb'))
// -----------------------------------------------------------------------------

// ==================== INIT MIDDLEWARES =======================================
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({store: mongostore}))
// -----------------------------------------------------------------------------

// ==================== INIT ROUTES ============================================
app.use('/user', userRoute)
app.use('/fetchpage', fetchpageRoute)
app.use('/postproffer', postprofferRoute)
app.get('/', (req, res) => {res.sendFile(__dirname + '/public/index.html')})
// -----------------------------------------------------------------------------

// ==================== INIT SERVER ============================================
app.listen(app.get('port'), app.get('host'), error => {
  let mess = (error) ? error : ` Server: ${app.get('host')}:${app.get('port')}/`
  if (!error) notifier.notify(`${mess}`)
})
// -----------------------------------------------------------------------------
