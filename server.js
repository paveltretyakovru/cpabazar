var config = require('./webpack.config');
var webpack = require('webpack');
var bodyParser = require('body-parser');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var fetchpageRoute = require('./app/routes/fetchpage/fetchpageRoute');
const postprofferRoute = require('./app/routes/postproffer/postprofferRoute');

var app = new (require('express'))();
var port = 3000;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Init routes
app.use('/fetchpage', fetchpageRoute);
app.use('/postproffer', postprofferRoute);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ ',
      port,
      port
    );
  }
})
