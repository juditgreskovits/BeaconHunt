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
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">Treasure Hunt</a>
            </div>

          </div>
        </div>
      </nav>
    )
  }


});
