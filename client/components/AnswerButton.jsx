AnswerButton = React.createClass({

  checkAnswer() {
    if (this.props.question.options[this.props.buttonNumber].correct) {
      this.props.goodAnswer();
    } else {
      this.props.badAnswer();
    }
  },

  buttonNumberToLetter(buttonNumber) {
    let buttonLetter = 'A';

    if (buttonNumber>0)
        buttonLetter = 'B'
    if (buttonNumber>1)
      buttonLetter = 'C'

    return buttonLetter;
  },

  render() {
    let buttonLetter = this.buttonNumberToLetter(this.props.buttonNumber);

    if (this.props.buttonNumber>0)
        buttonLetter = 'B'
    if (this.props.buttonNumber>1)
      buttonLetter = 'C'
    return (
      <div className="row answer-button">
        <div className="col-xs-12">
          <button className="btn btn-hunt" onClick={ this.checkAnswer }>
            { buttonLetter } 
          </button>
          <h3>{ this.props.question.options[this.props.buttonNumber].answer }</h3>
        </div>
      </div>      
    )
  }
})
  