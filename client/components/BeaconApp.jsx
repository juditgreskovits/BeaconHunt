BeaconApp = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {

    const beaconSubHandle = Meteor.subscribe('beacons');
    const loading = !beaconSubHandle.ready();

    let beaconsDetected;
    let beacons;

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

    console.log('beaconsDetected = ', beaconsDetected);

    if(beaconsDetected && !loading) {
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
        _.each(beaconIndices, function(index){
          beacons.push({
            proximity: 0,
            beaconIndex: index
          });
        });
      }

      beacons = _.sortBy(beacons, function(beacon){ return beacon.beaconIndex; });
    }

    console.log('beacons = ', beacons);

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
      return proximities[beaconIndex-1];
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

    const beacons = this.data.beacons;

    return (
      <Hunt beacons={beacons} />
    );
  }
});
