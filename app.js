// jshint esversion:6
const express = require('express');
const handlebars = require('express-handlebars');
var Handlebars = require('handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('sequelize');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var History = require('./models/historymodel.js');
var User = require('./models/usermodel.js');
var html = require('html');
var flash = require('connect-flash');
var mysql = require('mysql');


const app = express();
app.disable('etag');
app.use(bodyParser.json());
let router = express.Router();
var morgan = require('morgan');
app.use(morgan('dev'));
app.use(cookieParser());

// use css and other static files
app.use(express.static('assets'));
app.use(express.static(process.cwd() + '/assets'));
app.use(express.static(process.cwd() + '/registration'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(express.static(path.join(__dirname, '/')));

global.__basedir = __dirname;

// session
app.use(session({
    key: 'user_sid',
    secret: 'topsecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// root
app.get('/home', function(req, res) {
  res.sendFile('index.html', {'root': __dirname});
});
// registration
app.get('/register',function(req, res){
	res.sendFile('register.html', {'root': __dirname + '/registration'});
});
// nowshowing
app.get('/nowshowing',function(req, res){
	res.sendFile('nowshowing.html', {'root': __dirname + '/Nowshowing'});
});
app.get('/nowshowingmovies',function(req, res){
	res.sendFile('nowshowing1.html', {'root': __dirname + '/Nowshowing'});
});
app.get('/Nowshowingmovie',function(req, res){
	res.sendFile('nowshowing2.html', {'root': __dirname + '/Nowshowing'});
});
// upcoming
app.get('/upcoming',function(req, res){
	res.sendFile('upcoming.html', {'root': __dirname + '/Upcoming'});
});
app.get('/upcomingmovies',function(req, res){
	res.sendFile('upcoming1.html', {'root': __dirname + '/Upcoming'});
});
app.get('/upcomingmovie',function(req, res){
	res.sendFile('upcoming2.html', {'root': __dirname + '/Upcoming'});
});
// pricelist
app.get('/pricelist',function(req, res){
	res.sendFile('pricelist.html', {'root': __dirname + '/Pricelist'});
});
app.get('/tickets',function(req, res){
	res.sendFile('pricelist1.html', {'root': __dirname + '/Pricelist'});
});
app.get('/ticket',function(req, res){
	res.sendFile('pricelist2.html', {'root': __dirname + '/Pricelist'});
});
// basket
app.get('/basket',function(req, res){
	res.sendFile('basket.html', {'root': __dirname + '/Basket'});
});
app.get('/cart',function(req, res){
	res.sendFile('basket1.html', {'root': __dirname + '/Basket'});
});
// profile
app.get('/profile',function(req, res){
  var id = req.session.user.id;
  User.findOne({
    where: { id: id }
  }).then(data => {
    History.findAll({
      where: { iduser: id }
    }).then(history => {
        res.render('profilemain', {layout: 'profile', data: data, history: history});
      });
    });
});

app.post('/profile', (req, res) => {
 User.update({
   name: req.body.name,
   surname: req.body.surname,
   username: req.body.username,
   password: req.body.password,
   birth: req.body.birth,
   address: req.body.address,
   usertype: 'user'
 }, {returning: true, where: {id: req.session.user.id}}
)
.then(data => {
  res.redirect('/dashboard');
});
});
// for admin
app.get('/panel', (req, res) => {
		res.render('main3', {layout: 'panel', user: req.session.user});
});

app.get('/adminprofile',function(req, res){
  var id = req.session.user.id;
  User.findOne({
    where: { id: id }
  }).then(data => {
    History.findAll({
      where: { iduser: id }
    }).then(history => {
        res.render('adminmain', {layout: 'adminprofile', data: data, history: history});
      });
    });
});

// edit users
var {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars({
	layoutsDir: __dirname + '/Editusers',
	handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.get('/editusers', (req, res) => {
//Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
	 	User.findAll().then(function (data) {
	 	res.render('main', { layout: 'index', data: data});
			 });
});

app.get('/dashboard', (req, res) => {
		res.render('main2', {layout: 'index', user: req.session.user});
});

app.route('/edit/:id').get((req, res) => {
	 const id = req.params.id;
	 User.findOne({
		 where: { id: id }
	 })
		 .then(data => {
			 res.render('main1', {layout: 'index1', data: data});
		 });
 });

 app.post('/edit/:id', (req, res) => {
	User.update({
		name: req.body.first_name,
	  surname: req.body.last_name,
	  username: req.body.username,
	  password: "jesuscrist",
	  birth: req.body.date,
	  address: req.body.address,
		usertype: 'user'
	}, {returning: true, where: {id: req.params.id}}
 )
 .then(data => {
	 res.redirect('/home');
 });
});

// save cookie, will be saved if exit browser
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

// check log-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/home');
    } else {
        next();
    }
};

// insert new user
app.route('/register').get(sessionChecker, (req, res) => function(req, res) {
	res.sendFile('register.html', {'root': __dirname + '/registration'});
}).post((req, res) => {
	User.create({
  name: req.body.first_name,
  surname: req.body.last_name,
  username: req.body.username,
  password: req.body.password,
  birth: req.body.date.slice(0, 10),
  address: req.body.address,
  usertype: 'user'
}).then(user => {
	req.session.user = user.dataValues;
	res.redirect('/home');
});
});

// user Login
app.post('/home', (req, res) => {
        var username = req.body.username,
            password = req.body.password;

      		User.findOne({ where: { username: username, password: password } }).then(
					user => {
							req.session.loggedin = true;
							req.session.username = username;
              req.session.user = user;
              req.session.user.dataValues.id = user.id;
							if(req.session.user.dataValues.usertype === 'user')
							{
              	res.redirect('/dashboard');
							}
							else
							{
								res.redirect('/panel');
							}
        });
    });

// route for user logout
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/home');
			}
});

app.post('/basket', (req, res) => {
  id = req.session.user.id;
  title = req.body.title;
  quantity = req.body.quantity;
  ticket = req.body.tickets;
  time = req.body.time;
  var data = [];
  for (var i = 0; i < title.length; i++) {
    data[i] = [
    id, title[i], quantity[i], new Date(), ticket[i], time[i]
  ];
}
  var conn = mysql.createConnection({
    host: 'database-1.cg9cbkr2hza5.us-east-1.rds.amazonaws.com',
    user: 'nedazal',
    password: 'weboprojektas',
    database: 'web'
  });

  conn.connect(function(err) {
    if (err) throw err;
  });

  var sql = "INSERT INTO History (iduser, title, quantity, date, ticket, time) VALUES ?";
  conn.query(sql, [data], function(err) {
    if (err) throw err;
    conn.end();
  });

  res.redirect('/dashboard');
});

// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('server started on port ' + PORT));
