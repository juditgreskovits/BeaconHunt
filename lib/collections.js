FakeBeacons = new Mongo.Collection('fakebeacons');
Beacons = new Mongo.Collection('beacons');
<<<<<<< HEAD
Questions = new Mongo.Collection('questions');
=======

Games = new Mongo.Collection('games');


Meteor.methods({

  'createGame': function () {

    return Games.insert({ score : 0});
  },

  'updateScore': function (gameId, inc) {

    return Games.update({ _id : gameId}, { $inc : { score : inc }});
  }
});
>>>>>>> origin/master
