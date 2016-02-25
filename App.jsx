var gameId;
Meteor.startup(function(){

  Meteor.call('createGame', (error, result) => {
    gameId = result;
  });
});

App = React.createClass({

  getPropsWithChildren () {

    var childrenWithProps = React.Children.map(this.props.content, (child) => {
        return React.cloneElement(child, { gameId : gameId});
    });

    return childrenWithProps;
  },

  render() {

    return (
      <div>
        <Header />
        { this.getPropsWithChildren() }
      </div>
    )
  }
});
