QuestionsOld = React.createClass({

  renderBeacons() {

    return this.props.beacons.map((beacon) => {
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
