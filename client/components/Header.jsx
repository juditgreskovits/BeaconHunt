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

    },
    render() {
        var gameName = "Treasure Hunt";
        var gameScore = 0;
        if (!this.data.loading && this.data.currentGame) {
            gameName = this.data.currentGame.name;
            gameScore = this.data.currentGame.score;
        }

        console.log("header" + this.gameId);
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="container">
                        <div className="navbar-header">
                            <div className="floatLeft">
                            <a className="navbar-brand appTitle" href="/">Treasure Hunt</a>
                            <div className="userItem label-name score">Score: {gameScore}</div>
                            </div>
                            <span className="separator floatLeft">|</span>
                            <div className="userContainer floatLeft">
                                <div className="userItem"><label for="inputName" className="label-name">Name</label><input id="inputName" type="text" className="input-name" onChange={this.handleChange} placeholder={gameName}/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }


});
