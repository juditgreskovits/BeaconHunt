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
      points: 0,
      questionNumber: 0
    }
  },

  mixins: [ReactMeteorData],

  getMeteorData() {

    let questionsSub = Meteor.subscribe('questions');

    return {
      questionsReady:   questionsSub.ready(),
      questions:        Questions.find().fetch()
    }
  },

  increaseQuestionNumber() {
    this.setState( { questionNumber: this.state.questionNumber } );
  },

  shuffleArray(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
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

  indicatorColor( proximity )  {
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

  renderPuzzles() {
    return (
      <Puzzles 
        questions={ this.shuffleArray(this.data.questions) } 
        timeLeft={ this.state.timeLeft } 
        deductSecond={ this.deductSecond } 
        resetTimer={ this.resetTimer }
        increaseQuestionNumber={ this.increaseQuestionNumber }
        questionNumber={ this.state.questionNumber}
      />
    )
  },

  render() {
    let lockClasses = [
      this.state.locked1 ? "fa fa-lock" : "fa fa-unlock",
      this.state.locked2 ? "fa fa-lock" : "fa fa-unlock",
      this.state.locked3 ? "fa fa-lock" : "fa fa-unlock",   
    ]

    // replace numbers with this.props.beacons[0].proximity
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

              { this.data.questionsReady && ( this.state.locked1 ) ||
                ( this.props.beacons[1].proximity < 0.1 && this.state.locked2 && !this.state.locked1 ) ||
                ( this.props.beacons[2].proximity < 0.1 && this.state.locked3 && !this.state.locked1 && !this.state.locked2 ) ?

                this.renderPuzzles()
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
