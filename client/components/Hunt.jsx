Hunt = React.createClass({

  getInitialState() {
    return {
      locked1:          true,
      locked2:          true,
      locked3:          true,
      answer: "",
      timerStarted: Tools.getUnixTimestamp(),
      timerEnded: false,
      timeLeft:   60*1000,
      timerTotal: false,
      allUnlocked:      false,
      points: 0
    }
  },

  submitAnswer(e) {
    e.preventDefault();
    this.setState({ answer: this.refs.answer })

    // Logic what happens when user answers
  },

  resetTimer() {
    this.setState( { timeLeft: 60*1000 } );
  },

  deductSecond() {
    if ( this.state.timeLeft > 0 ) {
      this.setState( { timeLeft: this.state.timeLeft - 1000 } );
    }
  },

  indicatorColor( proximity)  {
    if ( proximity === 5 ) {
      return '#bfff00';
    } else if ( proximity === 4 ) {
      return '#ffff00';
    } else if ( proximity === 3) {
      return '#ffbf00';
    } else if ( proximity === 2) {
      return '#ff8000';
    } else if ( proximity === 1 ) {
      return '#ff4000';
    }
  },

  render() {
    let lockClasses = [
      this.state.locked1 ? "fa fa-lock" : "fa fa-unlock",
      this.state.locked2 ? "fa fa-lock" : "fa fa-unlock",
      this.state.locked3 ? "fa fa-lock" : "fa fa-unlock",   
    ]

    let indicatorsStyles = [
      { background: this.indicatorColor( this.props.beacons[0].proximity ) },
      { background: this.indicatorColor( this.props.beacons[1].proximity ) },
      { background: this.indicatorColor( this.props.beacons[2].proximity ) }
    ]

    return (
      <div>

        <div className="container hunt">
          { this.state.allUnlocked ?
            <Winner points={ this.state.points }/>
          : 
            <div className="hunt-wrapper">

              <div className="row indicators">
                <div className="col-xs-12">

                  <Indicators 
                    indicatorStyles={ indicatorsStyles }
                    lockClasses={lockClasses}
                  />

                </div>

              </div>

              { ( this.props.beacons[0].proximity < 0.1 && this.state.locked1 ) ||
                ( this.props.beacons[1].proximity < 0.1 && this.state.locked2 && !this.state.locked1 ) ||
                ( this.props.beacons[2].proximity < 0.1 && this.state.locked3 && !this.state.locked1 && !this.state.locked2 ) ?

                <Puzzles timeLeft={ this.state.timeLeft } deductSecond={ this.deductSecond } resetTimer={ this.resetTimer }/>
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
