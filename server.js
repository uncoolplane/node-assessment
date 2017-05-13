var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
// var usersCtrl = require('./userCtrl');

var app = express();
var port = process.env.PORT || 7778;
var corsOptions = {
    origin: 'http://localhost:' + port
};

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors(corsOptions));

var usersCtrl = require('./userCtrl');

app.get('/api/users', function(req, res, next) {
    res.send(usersCtrl.readAll())
});
app.get('/api/users/favorites/:favorite', function(req, res, next) {
    var favorite = req.params.favorite;
    res.send(usersCtrl.getUsersByFavorite(favorite));
});
app.get('/api/users/age/:age', function(req, res, next) {
    var age = req.params.age;
    res.send(usersCtrl.getUsersByAgeLimit(age))
});
app.get('/api/users/query', function(req, res, next) {
    var term = req.query.term;
    var value = req.query.value;
    res.send(usersCtrl.findUserByQuery(term, value))
});

app.get('/api/users/:userId', function(req, res, next) {
    var userId = req.params.userId;
    console.log('findUserById', req.params, userId);
    res.send(usersCtrl.findUserById(userId));
});
app.get('/api/admins', function(req, res, next) {
    res.send(usersCtrl.getAdmins())
});
app.get('/api/nonadmins', function(req, res, next) {
    res.send(usersCtrl.getNonAdmins())
});

app.put('/api/users', function(req, res, next) {
    var user = req.body;
    res.send(usersCtrl.createUser(user));
});
app.post('/api/users/:userId', function(req, res, next) {
    var userId, userData;
    userId = req.params.userId;
    userData = req.body;
    res.send(usersCtrl.updateUser(userId, userData));
});
app.delete('/api/users/:userId', function(req, res, next) {
    var userId = res.params.userId;
    res.send(usersCtrl.removeUser(userId));
});
// 
// app.listen(port, function() {
//     console.log('Listening on port', port, 'for aliens');
// })

module.exports = app;
