// Task component - represents a single beacon
Beacon = React.createClass({
    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        beacon: React.PropTypes.object.isRequired
    },
    render() {
        return (
        <div className="row">
                <div className="col s10 offset-s1">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Beacon UUID</span>
                            <p>Index: {this.props.beacon.beaconIndex} - {this.props.beacon.beaconColour}</p>
                            <p>{this.props.beacon.uuid}</p>
                        </div>
                        <div className="card-action blue-grey lighten-3">
                            <ul>
                                <li>major: {this.props.beacon.major}</li>
                                <li>minor: {this.props.beacon.minor}</li>
                                <li>proximity: {this.props.beacon.proximity}</li>
                                <li>accuracy: {this.props.beacon.accuracy}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
