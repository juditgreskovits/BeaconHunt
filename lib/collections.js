FakeBeacons = new Mongo.Collection('fakebeacons');
Beacons = new Mongo.Collection('beacons');
Questions = new Mongo.Collection('questions');
Games = new Mongo.Collection('games');


Meteor.methods({

  'createGame': function (name) {

    return Games.insert({ score : 0, name : name});
  },
  'updateName': function (gameId, name) {

    return Games.update({ _id : gameId},{ $set : { name : name }});
  },
  'updateScore': function (gameId, inc) {
    console.log('updateScore inc = ' + inc);
    return Games.update({ _id : gameId}, { $inc : { score : inc }});
  }
});
