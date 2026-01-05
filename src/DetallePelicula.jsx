import { useEffect, useState } from "react"
import imgCerradaFav from "./assets/img/PokeballCerrada.jpg"
import imgAbiertaFav from "./assets/img/favoritosPokeAbierta.webp"

function DetallePelicula({ imdbID, favoritos, setFavoritos, alCerrar }) {
    const [pelicula, setPelicula] = useState(null)

    useEffect(() => {
        fetch("https://www.omdbapi.com/?i=" + imdbID + "&apikey=a63cd6f3")
            .then(res => res.json())
            .then(setPelicula)
    }, [imdbID])

    // vemos si es favorita con un bucle
    let esFavorita = false
    if (pelicula) {
        for (const p of favoritos) {
            if (p.id == pelicula.imdbID) {
                esFavorita = true
            }
        }
    }
    let alternarFavorito = () => {
        if (pelicula) { // solo si hay pelis en fav
            if (esFavorita) {
                setFavoritos(favoritos.filter(p => p.id != pelicula.imdbID))
            } else {
                setFavoritos([...favoritos, {
                    id: pelicula.imdbID,
                    titulo: pelicula.Title,
                    imagen: pelicula.Poster
                }
                ])
            }
        }
    }


    return (
        <div
            id="modal-detalle"
            onClick={e => e.target.id == "modal-detalle" && alCerrar()}
        >
            <div className="detalle-contenido">
                {pelicula ? (
                    <>
                        <img src={pelicula.Poster} />
                        <h2>{pelicula.Title}</h2>
                        <p>{pelicula.Plot}</p>

                        <button onClick={alternarFavorito}>
                            <img
                                src={esFavorita ? imgAbiertaFav : imgCerradaFav}
                                style={{ width: "24px", height: "24px" }}
                            />
                        </button>


                        <button onClick={alCerrar}>Cerrar</button>
                    </>
                ) : (
                    <p>Cargando peli...</p>
                )}
            </div>
        </div>
    )
}

export default DetallePelicula
