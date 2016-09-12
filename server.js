// var config = require('./webpack.config');
// var webpack = require('webpack');
var bodyParser = require('body-parser');
// var webpackDevMiddleware = require('webpack-dev-middleware');
// var webpackHotMiddleware = require('webpack-hot-middleware');
var fetchpageRoute = require('./app/routes/fetchpage/fetchpageRoute');
var getIpAddr = require('./app/modules/helpers/getIpAddr');
const postprofferRoute = require('./app/routes/postproffer/postprofferRoute');

var app = new (require('express'))();
var port = 3000;
var host = getIpAddr();

// var compiler = webpack(config);
// app.use(webpackDevMiddleware(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath,
// }));
// app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Init routes
app.use('/fetchpage', fetchpageRoute);
app.use('/postproffer', postprofferRoute);

app.get('/createuser', (req, res) => {
  return res.send('test goole :)')
})

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});-

app.post('/login', (req, res) => {
  return res.json({test: 'here'})
})

app.listen(port, host, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Open up http://${host}:${port}/ `);
  }
})
