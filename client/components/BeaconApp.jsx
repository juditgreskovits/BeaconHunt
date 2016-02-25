var reactiveBeaconRegion;

Meteor.startup(function(){
    if (Meteor.isCordova) {
        reactiveBeaconRegion = new ReactiveBeaconRegion({uuid: "D0D3FA86-CA76-45EC-9BD9-6AF4CECCAF51", identifier: "beacondemo"});
    }
})

BeaconApp = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {

    const beaconsSubHandle = Meteor.subscribe('beacons');
    const questionsSubHandle = Meteor.subscribe('questions');
    var loading = !beaconsSubHandle.ready(); // || !questionsSubHandle.ready();

    let beaconsDetected;
    let beacons;
    let questions;

    if (Meteor.isCordova) {
      if (reactiveBeaconRegion != null) {
        beaconsDetected = reactiveBeaconRegion.getBeaconRegion().beacons;
        beaconsDetected = _.sortBy(beaconsDetected, function(beacon){ return beacon.proximity; });
      }
    }
    else {
      const fakeBeaconsSubHandle = Meteor.subscribe('fakebeacons');
      loading = loading && !fakeBeaconsSubHandle.ready();
      console.log('!fakeBeaconsSubHandle.ready() = ' + !fakeBeaconsSubHandle.ready() + ' loading = ' + loading);
      if(fakeBeaconsSubHandle.ready()) {
        beaconsDetected = FakeBeacons.findOne({}).beacons;
        console.log('FakeBeacons.findOne({}) = ' + FakeBeacons.findOne({}));
      }
    }

    if(beaconsDetected && !loading) {
      beacons = this.getBeacons(beaconsDetected);
      console.log('beacons = ', beacons);
    }

    console.log('loading = ' + loading);

    return {
      beacons: beacons,
      loading: loading
    }
  },

  removeFromArrayByValue(array, value) {
    var index = array.indexOf(value);
    if (index >= 0) {
      array.splice( index, 1 );
    }
  },

  getProximity(beaconIndex, proximity) {

    if(this.props.proximities) {
      const proximities = this.props.proximities.split('|');
      const index = Number([beaconIndex-1]);
      return Number(proximities[index]);
    }

    switch (proximity) {
      case 'ProximityImmediate':
        return 5;
      case 'ProximityNear':
        return 4;
      case 'ProximitySomethingElse':
        return 3;
      default:
        return 0;
    }
  },

  getBeacons(beaconsDetected) {
    let beaconIndices = [1, 2, 3];
    beacons = beaconsDetected.map((beacon) => {
      const beaconData = Beacons.findOne({ major: beacon.major, minor: beacon.minor });
      const beaconIndex = beaconData.beaconIndex;
      const proximity = this.getProximity(beaconIndex, beacon.proximity);
      this.removeFromArrayByValue(beaconIndices, beaconIndex);
      return {
        proximity: proximity,
        accuracy: beacon.accuracy,
        uuid: beacon.uuid,
        major: beacon.major,
        minor: beacon.minor,
        beaconIndex: beaconIndex,
        beaconColour: beaconData.beaconColour
      }
    });

    if(beaconIndices.length) {
      let i = 0;
      while(i < beaconIndices.length) {
        const index = beaconIndices[i++];
        const proximity = this.getProximity(index, 0);
        beacons.push({
          proximity: proximity,
          beaconIndex: index
        });
      }
    }

    beacons = _.sortBy(beacons, function(beacon){ return beacon.beaconIndex; });
    return beacons;
  },

  render() {

    const loading = this.data.loading;
    const beacons = this.data.beacons;

    if(loading || !beacons) {
        return <p>Loading...</p>
    }

    return (
      <Hunt beacons={beacons} />
    );
  }
});
