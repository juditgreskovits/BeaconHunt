AnswerButton = React.createClass({
  checkAnswer() {
    if ( this.props.answer === this.props.correctAnswer ) {
      this.props.correctAnswer()
    } else {
      this.props.incorrectAnswer()
    }
  },

  render() {
    return (
      <button className="btn btn-hunt" onClick={this.checkAnswer}>Hunt!</button>
    )
  }
})
  