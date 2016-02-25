BeaconApp = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {

    const beaconsSubHandle = Meteor.subscribe('beacons');
    const questionsSubHandle = Meteor.subscribe('questions');
    const loading = !beaconsSubHandle.ready(); // || !questionsSubHandle.ready();

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
      const fakeBeaconSubHandle = Meteor.subscribe('fakebeacons');
      const loading = loading && !fakeBeaconSubHandle.ready();

      beaconsDetected = FakeBeacons.findOne({});
    }

    if(beaconsDetected && !loading) {
      beacons = this.getBeacons(beaconsDetected);
      console.log('beacons = ', beacons);
    }

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
    beacons = beaconsDetected.beacons.map((beacon) => {
      const beaconData = Beacons.findOne({ major: beacon.major, minor: beacon.minor });
      const proximity = this.getProximity(beaconData.beaconIndex, beacon.proximity);
      const beaconIndex = beaconData.beaconIndex;
      this.removeFromArrayByValue(beaconIndices, beaconIndex);
      return {
        proximity: proximity,
        accuracy: beacon.accuracy,
        uuid: beacon.uuid,
        major: beacon.major,
        minor: beacon.minor,
        beaconIndex: beaconData.beaconIndex,
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

  /*renderBeacons() {

    const loading = this.data.loading;

    if(loading) {
      return <p>Loading...</p>
    }

    return this.data.beacons.map((beacon) => {
      return <Beacon key={beacon.uuid + beacon.major + beacon.minor} beacon={beacon} />;
    });
  },*/

  render() {

    const loading = this.data.loading;

    if(loading) {
      return <p>Loading...</p>
    }

    const beacons = this.data.games;

    return (
        <Hunt beacons={beacons} />
    );
  }
});
