Scoreboard = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        const gamesSubHandle = Meteor.subscribe("games");
        const loading = !gamesSubHandle.ready();
        let gamesWithPercentages =  [];


        if(!loading) {
            let games = Games.find({}, {sort: {score: -1}}).fetch();
            let gameWithHighestScore = Games.find({}, {sort: {score: -1}}).fetch()[0];
            gamesWithPercentages = this.getGamesWithPercentages(games, gameWithHighestScore.score);
        }
        //let gameWithHighestScore = Games.find().sort({score:-1}).limit(1);
        return {
            games: gamesWithPercentages,
            loading: loading
        };
    },
    getGamesWithPercentages(games, highestScore) {
        let divider = highestScore / 100;
        let gamesWithPercentages = [];

        for (let game of games) {
            gamesWithPercentages.push({
                name: game.name,
                score: game.score / divider //calculate score percentages
            });
        }

        return gamesWithPercentages;
    },
    renderScoreboard() {

        return this.data.games.map((game) => {

            //return <div> {game.name} {game.score} </div>
            let myStyle={width:game.score +"%"};
        return  <div className="scoreWrapper"><div className="scoreContents"><div className="scoreInner" style={myStyle}>{game.name} {game.score}</div></div></div>
    });
    },
    render() {
        const loading = this.data.loading;

        if(loading)
        {
            return <div>Loading...</div>
        }
        return (
            <div>
                {this.renderScoreboard()}
            </div>
        );
    }
});
