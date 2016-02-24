Meteor.startup(function () {
  if (FakeBeacons.find().count() === 0) {
    var beacons = [
      {
          "identifier": "Beacon1",
          "uuid": "b9407f30-f5f8-466e-aff9-25556b57fe6d",
          "beacons": [
              {
                  "minor": 19403,
                  "rssi": -65,
                  "major": 9593,
                  "proximity": "ProximityImmediate",
                  "accuracy": 0.10,
                  "uuid": "F7826DA1-4FA2-4E97-8022-BC5B71E0893A"
              },
              {
                  "minor": 57643,
                  "rssi": -65,
                  "major": 38832,
                  "proximity": "ProximityImmediate",
                  "accuracy": 0.10,
                  "uuid": "F7826DA1-4FA2-4E97-8022-BC5B71E0893A"
              },
              {
                  "minor": 11183,
                  "rssi": -65,
                  "major": 18420,
                  "proximity": "ProximityImmediate",
                  "accuracy": 0.10,
                  "uuid": "F7826DA1-4FA2-4E97-8022-BC5B71E0893A"
              }
          ],
          "inRegion": true
      }
    ];

    _.each(beacons, function (beacon) {
      FakeBeacons.insert(beacon);
    });
  }

  if (Beacons.find().count() === 0) {
    var beacons = [
      {
        beaconIndex: 1,
        beaconColour: "mint",
        major: 9593,
        minor: 19403
      },
      {
        beaconIndex: 2,
        beaconColour: "mint",
        major: 38832,
        minor: 57643
      },
      {
        beaconIndex: 3,
        beaconColour: "pink",
        major: 18420,
        minor: 11183
      },
    ];

    _.each(beacons, function (beacon) {
      Beacons.insert(beacon);
    });
  }
});
