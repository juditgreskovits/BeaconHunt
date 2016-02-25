Puzzles = React.createClass({

  renderQuestion(question) {

    return (
      <div className="row questions">
        <div className="col-xs-12">
          <h1>Question { this.props.questionsTried + 1 } <span className="questions-tried">({ this.props.questionsTried + 1 } of 3)</span></h1>
          <h3>{question.question}</h3>
        </div>
      </div>
    )
  },

  checkAnswer(correct) {
    this.props.checkAnswer(correct);
  },

  render() {
    const question = this.props.question;

    return (
      <div className="row puzzles">
        <div className="col-xs-12">

          { this.renderQuestion(question) }

          <div className="row answers">
            <div className="col-xs-12">
              <h1>Answers</h1>
                <AnswerButton 
                  option={question.options[0] } 
                  letter={'A'}
                  checkAnswer={this.checkAnswer}
                />
                <AnswerButton 
                  option={ question.options[1] }
                  letter={'B'}
                  checkAnswer={this.checkAnswer}
                />
                <AnswerButton 
                  option={ question.options[2] } 
                  letter={'C'}
                  checkAnswer={this.checkAnswer}
                />
            </div>
          </div>

        </div>
      </div>
    )
  }
})
  
