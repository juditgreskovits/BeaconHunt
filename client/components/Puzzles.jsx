Puzzles = React.createClass({
  render() {
    return (
      <div className="row puzzles">
        <div className="col-xs-12">

          <div className="row questions">
            <div className="col-xs-12">
              <h1>Questions</h1>
              <p>Bla bla bla?</p>
            </div>
          </div>


          <div className="row answers">
            <div className="col-xs-12">
              <h1>Anwers</h1>
              <form role="form" onSubmit={ this.submitAnswer }>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    ref="answer"
                    placeholder="Answer"
                    onChange={ this.onNameChange }
                  />
                </div>

                <button type="submit" id="submitButton" className="btn btn-hunt">Go!</button>

              </form>
            </div>
          </div>

        </div>
      </div>
    )
  }
})
  
