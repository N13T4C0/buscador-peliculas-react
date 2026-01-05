import { useEffect, useState } from "react"
import Landing from "./Landing"
import BarraBusqueda from "./BarraBusqueda"
import ListaPeliculas from "./ListaPeliculas"
import DetallePelicula from "./DetallePelicula"
import Favoritos from "./Favoritos"

function App() {
  const [mostrarLanding, setMostrarLanding] = useState(true)
  const [peliculas, setPeliculas] = useState([])
  const [pagina, setPagina] = useState(1)
  const [cargando, setCargando] = useState(false)
  const [textoBusqueda, setTextoBusqueda] = useState("star")
  const [tipoBusqueda, setTipoBusqueda] = useState("")
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null)
  const [peliculasFavoritas, setPeliculasFavoritas] = useState(
    JSON.parse(localStorage.getItem("listaPelis")) || []
  )
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false)

  const cargarPeliculas = (pagina = 1, reiniciar = false) => {
    if (!cargando) {
      setCargando(true)

      fetch(
        "https://www.omdbapi.com/?s=" + textoBusqueda + tipoBusqueda + "&apikey=a63cd6f3&page=" + pagina)
        .then(res => res.json())
        .then(datos => {
          if (datos.Search) {
            setPeliculas(prev =>
              reiniciar ? datos.Search : [...prev, ...datos.Search]
            )
          }
          setCargando(false)
        })
    }
  }



  useEffect(() => {
    cargarPeliculas(1, true)
    setPagina(2)
  }, [textoBusqueda, tipoBusqueda])

  useEffect(() => {
    let detectarScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 800) {
        cargarPeliculas(pagina)
        setPagina(p => p + 1)
      }
    }

    window.addEventListener("scroll", detectarScroll)
    //  return para limpiar el eventListener y evitar multiples scroll

    return () => window.removeEventListener("scroll", detectarScroll)
  }, [pagina, cargando])

  useEffect(() => {
    localStorage.setItem("listaPelis", JSON.stringify(peliculasFavoritas))
  }, [peliculasFavoritas])

  return (
    <>
      {mostrarLanding ? (
        <Landing alEntrar={() => setMostrarLanding(false)} />
      ) : (
        <>
          <BarraBusqueda
            alBuscar={setTextoBusqueda}
            alCambiarTipo={setTipoBusqueda}
            alAbrirFavoritos={() => setMostrarFavoritos(true)}
          />
          <ListaPeliculas
            peliculas={peliculas}
            alSeleccionar={setPeliculaSeleccionada}
          />
        </>
      )}

      {peliculaSeleccionada ? (
        <DetallePelicula
          imdbID={peliculaSeleccionada.imdbID}
          favoritos={peliculasFavoritas}
          setFavoritos={setPeliculasFavoritas}
          alCerrar={() => setPeliculaSeleccionada(null)}
        />
      ) : null}

      {mostrarFavoritos ? (
        <Favoritos
          favoritos={peliculasFavoritas}
           alCerrar={() => setMostrarFavoritos(false)}
          alSeleccionar={setPeliculaSeleccionada}
        />
      ) : null}

    </>
  )
}

export default App