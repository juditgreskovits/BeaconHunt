Loser = React.createClass({

  startAgain() {
    FlowRouter.go('Start');
  },
  
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 winner">
          <button type="submit" className="btn btn-hunt" onClick={this.startAgain}>Try Again</button>
        </div>
      </div>
    )
  }
});