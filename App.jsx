var reactiveBeaconRegion;
Meteor.startup(function(){

  Meteor.call('createGame', (error, result) => {
    const gameId = result;
  });

  if (Meteor.isCordova) {
    reactiveBeaconRegion = new ReactiveBeaconRegion({uuid: "b9407f30-f5f8-466e-aff9-25556b57fe6d", identifier: "beaconhunt"});
  }
});

App = React.createClass({

  render() {

    return (
      <div>
        <Header />
        { this.props.content }
      </div>
    )
  }
});
