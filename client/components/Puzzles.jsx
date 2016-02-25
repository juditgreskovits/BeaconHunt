Puzzles = React.createClass({

  // props: timeLeft
  //        deductSecond
  //        resetTimer
  //        questions array

  componentDidMount() {
    this.props.resetTimer(); 
    // setInterval( this.props.deductSecond, 1000 );
  },

  renderQuestions() {
    console.log(this.props.questions);
    return (
      <div className="row questions">
        <div className="col-xs-12">
          <h1>Question - <span>Time Left: { this.props.timeLeft/1000 } seconds </span></h1>
          <p>Bla bla bla?</p>
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
  
