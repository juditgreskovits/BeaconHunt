QuestionsOld = React.createClass({

  renderBeacons() {

    if(!this.props.beacons) {
      return <p>Meow</p>
    }

    return this.props.beacons.beacons.map((beacon) => {
      return <Beacon key={beacon.uuid + beacon.major + beacon.minor} beacon={beacon} />;
    });
  },

  render() {

    return (
      <div>
        {this.renderBeacons()}
      </div>
    );
  }
});
