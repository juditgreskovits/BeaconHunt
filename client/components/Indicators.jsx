Indicators = React.createClass({
  render() {
    return (
      <ul>
        <li className="indicator-1 indicator" style={this.props.indicatorStyles[0]}><i className={this.props.lockClasses[0]}></i></li>
        <li className="indicator-2 indicator" style={this.props.indicatorStyles[1]}><i className={this.props.lockClasses[1]}></i></li>
        <li className="indicator-3 indicator" style={this.props.indicatorStyles[2]}><i className={this.props.lockClasses[2]}></i></li>
      </ul>
    )
  }
})
  