
/*Meteor.startup(function(){
  
  Meteor.call('createGame', (error, result) => {
    gameId = result;
  });
});*/

App = React.createClass({
        getInitialState() {
          return {
              gameId : ""
          }
        },

        startHunt() {
            Meteor.call('createGame','testUser', (error, result) => {
                this.setState({gameId :result });
                console.log(result);
                //FlowRouter.go('Hunt');
            });

        },

  getPropsWithChildren () {

    var childrenWithProps = React.Children.map(this.props.content, (child) => {
        return React.cloneElement(child, { gameId : this.state.gameId, startHunt : this.startHunt});
    });
    return childrenWithProps;
  },

  render() {

    return (
      <div>
        <Header gameId={this.state.gameId}/>
        { this.getPropsWithChildren() }
      </div>
    )
  }
});
