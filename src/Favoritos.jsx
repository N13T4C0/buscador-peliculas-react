function Favoritos({ favoritos, alCerrar, alSeleccionar }) {
    return (
        <div
            id="peli-detalle"
            onClick={e => e.target.id == "peli-detalle" && alCerrar()}
        >
            <div className="detalle-peli-contenido">
                <h2>Películas favoritas</h2>

                {favoritos.length == 0 ? (
                    <p>No tienes pels favoritas aun</p>
                ) : <p>Pelis favs</p>}


                {favoritos.map(p => (
                    <img
                        key={p.id}
                        src={p.imagen}
                        onClick={() => alSeleccionar({ imdbID: p.id })}
                    />
                ))}

                <button onClick={alCerrar}>Cerrar</button>
            </div>
        </div>
    )
}
export default Favoritos