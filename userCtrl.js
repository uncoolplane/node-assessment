// ```
// id: number
// first_name: string
// last_name: string
// email: string
// gender: string,
// language: string,
// age: number,
// city: string,
// state: string,
// type: string,
// favorites: array of strings
// ```

var users = require('./users');

module.exports = {
  readAll: function () {
    // console.log('readAll', users.find());
    return users.find();
  },
  findUserById : function (userId) {
    var user = users.findOne('id', userId);
    return user;
  },
  getAdmins : function () {
    var type='admin';
    var userlist = users.find('type', type);
    return userlist;
  },
  getNonAdmins : function () {
    var type='user';
    var userlist = users.find('type', type);
    return userlist;
  },
  getUsersByFavorite : function (favorite) {
    console.log('getUsersByFavorite', favorite);
    var userlist = users.find('favorites', favorite);
    return userlist;
  },
  getUsersByAgeLimit: function (age) {
    console.log('getUsersByAgeLimit', age);
    var userlist = users.find().filter((item) => {return item.age <= age});

    return userlist;
  },
  findUserByQuery : function (term, value) {
    //term, value
    console.log('findUserByQuery', term, value);
    var userlist;
    if(term == 'last_name') {//tolowercase
      userlist = users.find('last_name', value);
    } else if (term == 'email') {
      userlist = users.find('email', value);
    } else if (term == 'state') {
      userlist = users.find('state', value);
    }
    return userlist;
  },
  createUser: function (user) {
    console.log('createUser:before', user);
    var user = users.add(user);
    console.log('createUser:after', user);
    return user;
  },
  updateUser: function (userId, userData) {
    console.log('updateUser:userId', userId);
    console.log('updateUser:userData', userData);
    var user = users.update('id', userId, userData);
    var updatedUser = users.findOne('id', userId);
    return updatedUser;
  },
  removeUser: function (userId) {
    console.log('removeUser', userId);
    var user = users.remove('id', userId);
    return user;
  }
}
