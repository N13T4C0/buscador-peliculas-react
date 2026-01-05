import TarjetaPelicula from "./TarjetaPelicula"

function ListaPeliculas({ peliculas, alSeleccionar }) {
  return (
    <div id="contenedor">
      {peliculas.map(pelicula => (
        <TarjetaPelicula
          key={pelicula.imdbID}
          pelicula={pelicula}
          alSeleccionar={alSeleccionar}
        />
      ))}
    </div>
  )
}
export default ListaPeliculas