Header = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {

        const gamesSubHandle = Meteor.subscribe("games");
        const loading = !gamesSubHandle.ready();
        const currentGame = Games.findOne({_id: this.props.gameId});


        return {
            loading: loading,
            currentGame: currentGame
        }
    },
    handleChange: function (event) {
        //this.setState({value: event.target.value});
        const refInputName = ReactDOM.findDOMNode(this.refs.refInputName).value;

        Meteor.call('updateName', refInputName, (error, result) => {
        });
    },
    render() {
        var gameName = "Treasure Hunt";
        var gameScore = 0;
        if (!this.data.loading && this.data.currentGame) {
            gameName = this.data.currentGame.name;
            gameScore = this.data.currentGame.score;
        }


        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="container">
                        <div className="navbar-header">

                            <div className="userContainer floatLeft">
                                <div className="userItem"><input id="inputName" ref="refInputName" type="text"
                                                                 className="input-name" onFocusOut={this.handleChange}
                                                                 placeholder={gameName}/></div>
                            </div>
                            <div className="floatRight">
                                <div className="userItem label-name score">Score: {gameScore}</div>
                            </div>
                            <span className="separator floatRight">|</span>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }


});
