Puzzles = React.createClass({

  // props: timeLeft
  //        deductSecond
  //        resetTimer

  componentDidMount() {
    this.props.resetTimer();
    setInterval( this.props.deductSecond, 1000 );
  },

  render() {
    return (
      <div className="row puzzles">
        <div className="col-xs-12">

          <div className="row questions">
            <div className="col-xs-12">
              <h1>Question - <span>Time Left: { this.props.timeLeft/1000 } seconds </span></h1>
              <p>Bla bla bla?</p>
            </div>
          </div>


          <div className="row answers">
            <div className="col-xs-12">
              <h1>Answers</h1>
                <AnswerButton answer={1} correctAnswer={2} />
                <AnswerButton answer={2} correctAnswer={2}/>
                <AnswerButton answer={3} correctAnswer={2}/>
            </div>
          </div>

        </div>
      </div>
    )
  }
})
  
