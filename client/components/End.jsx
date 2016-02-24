End = React.createClass({
  
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 winner">
          <img src="/images/winner.png"/>
          <h2>Points: {this.props.points}</h2>
          <h1>You Won!</h1>
        </div>
      </div>
    )
  }
});
