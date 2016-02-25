Hunt = React.createClass({

  getInitialState() {
    return {
      beaconIndex : 0,
      beaconsAnswered : [false, false, false],
      answer: "",
      timerStarted: Tools.getUnixTimestamp(),
      timerEnded: false,
      timeLeft:   40*1000,
      timerTotal: false,
      allUnlocked:      false,
      points: 0,
      questionNumber: 0,  // max 8
      questionsTried: 0,  // 1,2 or 3
      endOfGame: false,
      intervalId: 0
    }
  },

  mixins: [ReactMeteorData],

  getMeteorData() {

    const questionsSub = Meteor.subscribe('questions');
    const loading = !questionsSub.ready();

    let questions = [];

    // console.log('getMeteorData loading = ' + loading);
    if(!loading) {
      questions = Questions.find().fetch();
      // questions = _.shuffle(questions);

      // console.log('getMeteorData questions = ' + questions);
    }

    return {
      loading: loading,
      questions: questions
    }
  },

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
  },

  componentWillReceiveProps(nextProps) {
    const beaconIndex = this.state.beaconIndex;
    if(beaconIndex <= 3) {
      const beaconProximity = nextProps.beacons[beaconIndex].proximity;
      const prevBeaconAnswered = beaconIndex === 0 || this.state.beaconsAnswered[beaconIndex-1];
      console.log('Hunt.componentWillReceiveProps prevBeaconAnswered = ' + prevBeaconAnswered);
      console.log('Hunt.componentWillReceiveProps beaconProximity = ' + beaconProximity);
      if(prevBeaconAnswered && beaconProximity === 5) {
        this.setState({
          beaconIndex: beaconIndex + 1
        });
      }
    }
  },

  increaseQuestionNumber() {
    if (this.state.questionNumber < 8) {
      this.setState( { questionNumber: this.state.questionNumber + 1 } );
    } else {
      this.setState( { endOfGame: true } );
    }
  },

  componentDidMount() {

    // counts down the time - every 1 second decreases value of timeLeft
    // this.setState({questions : this.shuffleArray(this.data.questions)});
    let intervalId = setInterval( () => {
      if ( this.state.timeLeft > 0 ) {
        this.setState( { timeLeft: this.state.timeLeft - 1000 } );
      } else {
        this.checkAnswer(false);
      }
    }, 1000);
  },

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  },


  resetTimer() {
    this.setState( { timeLeft: 40*1000 } );
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

  increaseBeaconsAnswered() {

    const beaconIndex = this.state.beaconIndex;
    const beaconsAnswered = this.state.beaconsAnswered;
    beaconsAnswered[beaconIndex-1] = true;
    this.setState({beaconsAnswered : beaconsAnswered});
  },

  checkAnswer(correct) {

    this.increaseQuestionNumber();
    this.resetTimer();

    if (correct){
      const score = 5 - this.state.questionsTried;
      console.log('score = ' + score);
      Meteor.call('updateScore', this.props.gameId, score, (error, result) => {
        console.log('error = ' + error + ' result = ' + result);
      });

      this.increaseBeaconsAnswered();
      this.setState({ questionsTried: 0 });
      this.componentWillReceiveProps(this.props);
     }
    else {
      const questionsTried = this.state.questionsTried;
      let nextQuestionsTried = questionsTried + 1;
      if(questionsTried === 2) {
        this.increaseBeaconsAnswered();
        nextQuestionsTried = 0;
        this.componentWillReceiveProps(this.props);
      }
      this.setState({ questionsTried: nextQuestionsTried });
    }

    const beaconsAnswered = this.state.beaconsAnswered;
    if(beaconsAnswered[0] === true && beaconsAnswered[1] === true && beaconsAnswered[2] === true) {
      this.setState({ "timerEnded" : Tools.getUnixTimestamp() });
      this.setState({ "timerTotal" : (this.props.timerEnd - this.props.timerStarted)})
      FlowRouter.go('End');
    }
  },

  renderQuestion() {

    const beaconIndex = this.state.beaconIndex;

    // console.log('this.state.beaconsAnswered = ' + this.state.beaconsAnswered);
    // console.log('renderQuestion beaconIndex = ' + beaconIndex + ' this.state.beaconsAnswered[beaconIndex-1] = ' + this.state.beaconsAnswered[beaconIndex-1]);
    const doRender = !this.data.loading && beaconIndex > 0 && !this.state.beaconsAnswered[beaconIndex-1];
    // console.log('this.data.questions = ' + this.data.questions);
    if(doRender) {
      return (
        <div className="row seconds-left">
          <div className="col-xs-12">
            <h3>Time Left: { this.state.timeLeft/1000 } seconds </h3>
            <Puzzles
              question={ this.data.questions[this.state.questionNumber] }
              checkAnswer={ this.checkAnswer }
              questionsTried={ this.state.questionsTried }
              beaconIndex={ this.state.beaconIndex }
            />
          </div>
        </div>
      )
    }
    else {
      return (
        <h2>Find beacon {this.state.beaconIndex + 1}!</h2>
      )
    }
  },

  renderHunt() {

    let lockClasses = [];
    let indicatorsStyles = [];
    let i = 0;
    while(i < 3) {
      const lockStyle = i  < this.state.beaconIndex ? "fa fa-unlock" : "fa fa-lock";
      lockClasses.push(lockStyle);

      const indicatorProximity = i < this.state.beaconIndex ? 5 : this.props.beacons[i].proximity;
      indicatorsStyles.push({ background: this.indicatorColor( indicatorProximity ) })
      i++;
    }

      return (
        <div className="hunt-wrapper">

          <div className="row indicators">
            <div className="col-xs-12">

              <Indicators
                indicatorStyles={ indicatorsStyles }
                lockClasses={lockClasses}
              />

            </div>

          </div>

          {this.renderQuestion()}

        </div>
      )

  },

  render() {

    // console.log('Hunt render this.props.gameId = ' + this.props.gameId);

    return (
      <div className="container hunt">
        {this.renderHunt()}
      </div>
    )
  }
});
