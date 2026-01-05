function BarraBusqueda({alBuscar,alCambiarTipo,alAbrirFavoritos}) {
  return (
    <div>
      <input
        id="busqueda"
        placeholder="Buscar"
        onKeyDown={e => {
          if (e.key == "Enter") {
            alBuscar(e.target.value || "star")
          }
        }}
      />

      <select
        id="tipoBusqueda"
        onChange={e => {
          if (e.target.value == "peliculas") 
            alCambiarTipo("&type=movie")
          else if 
            (e.target.value == "series") alCambiarTipo("&type=series")
          else 
            alCambiarTipo("")
        }}
      >
        <option value="todos">Todos</option>
        <option value="peliculas">Películas</option>
        <option value="series">Series</option>
      </select>

      <button onClick={alAbrirFavoritos}>Favoritos</button>
    </div>
  )
}
export default BarraBusqueda