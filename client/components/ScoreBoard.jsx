Scoreboard = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        const gamesSubHandle = Meteor.subscribe("games");
        const loading = !gamesSubHandle.ready();

        let games = Games.find().fetch();
        let gameWithHighestScore = Games.find().sort({score:-1}).limit(1);
        return {
            games: this.gamesWithPercentages(games, gameWithHighestScore),
            loading: loading
        };
    },
    gamesWithPercentages(games, gamesWithPercentages) {
        let divider = gameWithHighestScore / 100;

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
            return <div>{name} - {score}</div>;
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
