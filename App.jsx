var gameId;
/*Meteor.startup(function(){
  
  Meteor.call('createGame', (error, result) => {
    gameId = result;
  });
});*/

App = React.createClass({

        startHunt() {
            Meteor.call('createGame','testUser', (error, result) => {
                const gameId = result;
            });
            FlowRouter.go('Hunt');
        },

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
