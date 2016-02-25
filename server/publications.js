Beacons.publicFields = {

};

FakeBeacons.publicFields = {

};

// function instead of () => to keep the this context. Eg. this.userId
Meteor.publish('beacons', function() {
  return Beacons.find({}, {
    fields: Beacons.publicFields
  });
});

Meteor.publish('fakebeacons', function() {
  return FakeBeacons.find({}, {
    fields: FakeBeacons.publicFields
  });
});

Meteor.publish('questions', function(){
  return Questions.find({});
});

Meteor.publish('games', function(){
  return Games.find({});
});
