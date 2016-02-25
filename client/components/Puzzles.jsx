Puzzles = React.createClass({

  // props: timeLeft
  //        deductSecond
  //        resetTimer
  //        questions array

  getInitialState() {
    return {
      questionsTried:    0,
    }
  },

  componentDidMount() {
    this.props.resetTimer(); 
    // setInterval( this.props.deductSecond, 1000 );
  },

  increaseQuestionsTried() {
    this.setState( { questionsTried: this.state.questionsTried + 1 } );
  },

  renderQuestions() {
    let question = this.props.questions[this.props.questionNumber].question;
    return (
      <div className="row questions">
        <div className="col-xs-12">
          <h1>Question {this.state.questionsTried + 1} - <span>Time Left: { this.props.timeLeft/1000 } seconds </span></h1>
          <h3>{question}</h3>
        </div>
      </div>
    )
  },

  render() {
    return (
      <div className="row puzzles">
        <div className="col-xs-12">

          { this.renderQuestions() }

          <div className="row answers">
            <div className="col-xs-12">
              <h1>Answers</h1>
                <AnswerButton />
                <AnswerButton />
                <AnswerButton />
            </div>
          </div>

        </div>
      </div>
    )
  }
})
  
