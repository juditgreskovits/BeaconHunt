Hunt = React.createClass({

  getInitialState() {
    return {
      proximityBeacon1: this.props.beacons[0].proximity, 
      proximityBeacon2: this.props.beacons[1].proximity, 
      proximityBeacon3: this.props.beacons[2].proximity,
      locked1:          true,
      locked2:          true,
      locked3:          true,
      answer: "",
      timerStarted: Tools.getUnixTimestamp(),
      timerEnded: false,
      timeLeft:   3*60*1000,
      timerTotal: false,
      allUnlocked:      false,
      points: 0
    }
  },

  componentDidMount() {
    // counts down the time - every 1 second decreases value of timeLeft

    setInterval( () => {
      if ( this.state.timeLeft > 0 ) {
        this.setState( { timeLeft: this.state.timeLeft - 1000 } );
      }
    }, 1000);
  },

  submitAnswer(e) {
    e.preventDefault();
    this.setState({ answer: this.refs.answer })

    // Logic what happens when user answers
  },

  indicatorColor( proximity)  {
    if ( proximity > 0 && proximity < 0.5 ) {
      return '#bfff00';
    } else if ( proximity >= 0.5 && proximity < 1 ) {
      return '#ffff00';
    } else if ( proximity >= 1 && proximity < 2 ) {
      return '#ffbf00';
    } else if ( proximity >= 2 && proximity < 5 ) {
      return '#ff8000';
    } else if ( proximity >= 5 ) {
      return '#ff4000';
    }
  },

  render() {
    let lockClass1 = this.state.locked1 ? "fa fa-lock" : "fa fa-unlock",
        lockClass2 = this.state.locked2 ? "fa fa-lock" : "fa fa-unlock",
        lockClass3 = this.state.locked3 ? "fa fa-lock" : "fa fa-unlock";

    let indicator1Style = {
      background: this.indicatorColor( this.state.proximityBeacon1 )
    }

    let indicator2Style = {
      background: this.indicatorColor( this.state.proximityBeacon2 )
    }

    let indicator3Style = {
      background: this.indicatorColor( this.state.proximityBeacon3 )
    }

    return (
      <div>
      
        <div className="container hunt">
          { this.state.allUnlocked ?
            <Winner points={ this.state.points }/>
          : 
            <div className="hunt-wrapper">

              <div className="row indicators">
                <div className="col-xs-12">

                  <ul>
                    <li className="indicator-1 indicator" style={indicator1Style}><i className={lockClass1}></i></li>
                    <li className="indicator-2 indicator" style={indicator2Style}><i className={lockClass2}></i></li>
                    <li className="indicator-3 indicator" style={indicator3Style}><i className={lockClass3}></i></li>
                  </ul>

                  <h2>{this.state.timeLeft/1000} seconds</h2>
                </div>
              </div>

              { ( this.state.proximityBeacon1 < 0.1 && this.state.locked1 ) ||
                ( this.state.proximityBeacon2 < 0.1 && this.state.locked2 && !this.state.locked1 ) ||
                ( this.state.proximityBeacon3 < 0.1 && this.state.locked3 && !this.state.locked1 && !this.state.locked2 ) ?

                <Puzzles />
              :
                ""
              }


            </div>
          }
        </div>
      </div>
    )
  }
});
