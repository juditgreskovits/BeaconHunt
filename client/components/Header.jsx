Header = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
    }
  },

  render() {

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="container">

            <div className="navbar-header">
            
              <a className="navbar-brand" href="/">Treasure Hunt</a>
            </div>

          </div>
        </div>
      </nav>
    )
  }


});
