Scoreboard = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            games: () => {
                const gamesSubHandle = Meteor.subscribe('games');
                //const loading = !gamesSubHandle.ready();

                let gamesWithPercentages = [],
                    gameWithHighestScore = Games.find().sort({score:-1}).limit(1),
                    games = Games.find().fetch(),
                    divider = gameWithHighestScore / 100;


                for (let game of games) {
                    gamesWithPercentages.push({
                        name : game.name,
                        score: game.score /divider //calculate score percentages
                    });
                }

                return gamesWithPercentages;
            }
        }
    },
    renderScoreboard() {
        return this.data.games.map((game) => {
            return <div>{name} - {score}</div>;
        });
    },
    render() {
        return (
            <div>
                {this.renderScoreboard()}
            </div>
        );
    }
});
