Start = React.createClass({

    startHunt(){
        this.props.startHunt();
    },

    render() {
        return (
            <div className="home-page">
                <div className="container">

                    <div className="col-xs-10 col-xs-offset-1 welcome">
                        <h1>Treasure Hunt</h1>
                        <p>
                            En octubre de 1949, con una selección de los mejores jugadores de los clubes fundadores,
                            comenzó a participar en competiciones oficiales. En sólo dos años logró subir a la Primera
                            división. No obstante, tras su debut en la temporada 1951-52 retornó a Segunda.2 Tras dos
                            nuevas campañas en Segunda volvió a ascender, abriéndose un periodo de seis temporadas en la
                            máxima categoría. La campaña 1959-60 finalizó con un nuevo descenso.
                        </p>

                        <button type="submit" className="btn btn-hunt" onClick={this.startHunt}>Hunt</button>

                    </div>

                </div>
            </div>
        )
    }
})
