AnswerButton = React.createClass({

  checkAnswer() {
    this.props.checkAnswer(this.props.option.correct)
  },

  render() {

    return (
      <div className="row answer-button">
        <div className="col-xs-12">
          <button className="btn btn-hunt" onClick={ this.checkAnswer }>
            { this.props.letter } 
          </button>
          <h3>{ this.props.option.answer }</h3>
        </div>
      </div>      
    )
  }
})
  