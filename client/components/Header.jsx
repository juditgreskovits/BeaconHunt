Header = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {

    const gamesSubHandle = Meteor.subscribe("games");
    const loading = !gamesSubHandle.ready();



    return {
    }
  },
  handleChange: function(event) {
    //this.setState({value: event.target.value});

  },
  render() {

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">Treasure Hunt</a>
              <span className="separator">|</span>
              <label for="inputName" className="label-name">Name</label>
              <input id="inputName" type="text" className="input-name" onChange={this.handleChange}/>
            </div>
          </div>
        </div>
      </nav>
    )
  }


});
