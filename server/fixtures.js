Meteor.startup(function () {
  if (FakeBeacons.find().count() === 0) {
    var beacons = [
      {
          "identifier": "Beacon1",
          "uuid": "b9407f30-f5f8-466e-aff9-25556b57fe6d",
          "beacons": [
              /*{
                  "minor": 19403,
                  "rssi": -65,
                  "major": 9593,
                  "proximity": "ProximityImmediate",
                  "accuracy": 0.10,
                  "uuid": "F7826DA1-4FA2-4E97-8022-BC5B71E0893A"
              },*/
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
        beaconIndex: 2,
        beaconColour: "mint",
        major: 38832,
        minor: 57643
      },
      {
        beaconIndex: 1,
        beaconColour: "mint",
        major: 9593,
        minor: 19403
      },
      {
        beaconIndex: 3,
        beaconColour: "pink",
        major: 18420,
        minor: 11183
      }
    ];

    _.each(beacons, function (beacon) {
      Beacons.insert(beacon);
    });
  }

  if(Games.find().count() === 0) {
    var games =[
      {
        score: 100,
        name: "Matthew"
      },
      {
        score: 40,
        name: "Simon"
      },
      {
        score: 50,
        name: "Judas"
      },
      {
        score: 90,
        name: "Andrew"
      },
      {
        score: 20,
        name: "Bartholomew"
      }
    ];

    _.each(games, function (game) {
      Games.insert(game);
    });
  }

  if(Questions.find().count() === 0) {
    var qas = [
      {
        question: "How many large islands is in Canary Islands?",
        options: [
          {
            correct: false,
            answer: 6
          },
          {
            correct: true,
            answer: 7
          },
          {
            correct: false,
            answer: 8
          }
        ]
      },
      {
        question: "The capital city of Las Palmas de Gran Canaria was founded on year?",
        options: [
          {
            correct: true,
            answer: 1478
          },
          {
            correct: false,
            answer: 1587
          },
          {
            correct: false,
            answer: 1758
          }
        ]
      },
      {
        question: "What is the original name of Las Palmas de Gran Canaria?",
        options: [
          {
            correct: true,
            answer: "Real de Las Palmas"
          },
          {
            correct: false,
            answer: "Fake de Las Palmas"
          },
          {
            correct: false,
            answer: "Los Palmas"
          }
        ]
      },
      {
        question: "What year Christopher Columbus anchored in the Port of Las Palmas on his first trip to the Americas?",
        options: [
          {
            correct: true,
            answer: 1492
          },
          {
            correct: false,
            answer: 1497
          },
          {
            correct: false,
            answer: 1507
          }
        ]
      },
      {
        question: "Gran Canaria's surface area is in km²?",
        options: [
          {
            correct: true,
            answer: 1560
          },
          {
            correct: false,
            answer: 1650
          },
          {
            correct: false,
            answer: 1065
          }
        ]
      },
      {
        question: "Gran Canaria's maximum elevation is meters?",
        options: [
          {
            correct: true,
            answer: 1949
          },
          {
            correct: false,
            answer: 1494
          },
          {
            correct: false,
            answer: 1994
          }
        ]
      },
      {
        question: "Gran Canaria's highest point is called?",
        options: [
          {
            correct: true,
            answer: "Pico de Las Nieves"
          },
          {
            correct: false,
            answer: "Pico de Las Papas"
          },
          {
            correct: false,
            answer: "Pico de Las Mojos"
          }
        ]
      },
      {
        question: "What is approximately diameter of Gran Canarias in kilometers?",
        options: [
          {
            correct: true,
            answer: 50
          },
          {
            correct: false,
            answer: 54
          },
          {
            correct: false,
            answer: 47
          }
        ]
      },
      {
        question: "How long way is from Gran Canaria's off the northwestern coast of Africa in kilometers?",
        options: [
          {
            correct: true,
            answer: 150
          },
          {
            correct: false,
            answer: 120
          },
          {
            correct: false,
            answer: 180
          }
        ]
      },
      {
        question: "The capital city of Las Palmas de Gran Canaria was founded on month?",
        options: [
          {
            correct: true,
            answer: "June"
          },
          {
            correct: false,
            answer: "July"
          },
          {
            correct: false,
            answer: "May"
          }
        ]
      },
      {
        question: "The capital city of Las Palmas de Gran Canaria was founded on day?",
        options: [
          {
            correct: true,
            answer: 24
          },
          {
            correct: false,
            answer: 28
          },
          {
            correct: false,
            answer: 21
          }
        ]
      },
      {
        question: "How many years ago the last eruptions are held to have occurred?",
        options: [
          {
            correct: true,
            answer: 3500
          },
          {
            correct: false,
            answer: 1500
          },
          {
            correct: false,
            answer: 500
          }
        ]
      },
      {
        question: "How many percent of the island territory is under protection from the Canary Islands Network for Protected Natural Areas?",
        options: [
          {
            correct: true,
            answer: "42.7%"
          },
          {
            correct: false,
            answer: "47.2%"
          },
          {
            correct: false,
            answer: "27.4%"
          }
        ]
      },
      {
        question: "How many km² of the island territory is under protection from the Canary Islands Network for Protected Natural Areas?",
        options: [
          {
            correct: true,
            answer: 667
          },
          {
            correct: false,
            answer: 676
          },
          {
            correct: false,
            answer: 766
          }
        ]
      },
      {
        question: "How many protected sites under control of network in the Canary Islands archipelago?",
        options: [
          {
            correct: true,
            answer: 146
          },
          {
            correct: false,
            answer: 164
          },
          {
            correct: false,
            answer: 416
          }
        ]
      }
    ];

    _.each(qas, function (qa) {
      Questions.insert(qa);
    });
  }


});
