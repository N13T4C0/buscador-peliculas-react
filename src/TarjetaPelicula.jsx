import fallbackImg from "./assets/img/homelo.webp";

function TarjetaPelicula({ pelicula, alSeleccionar }) {
    return (
        <div style={{ textAlign: "center", margin: 10 }}>
            {/* <img
        src={pelicula.Poster}
        alt={pelicula.Title}
        style={{ width: 160, cursor: "pointer" }}
        onError={e => (e.target.src = "/assets/img/homelo.webp")}
        onClick={() => alSeleccionar(pelicula)}
      />  */}

            {/* prueba cn el fallback */}
            <img
                src={pelicula.Poster || fallbackImg}
                alt={pelicula.Title}
                style={{ width: 160, cursor: "pointer" }}
                onError={e => {
                    e.target.onerror = null;
                    e.target.src = fallbackImg;
                }}
                onClick={() => alSeleccionar(pelicula)}
            />

            <p>{pelicula.Title}</p>
        </div>
    )
}
export default TarjetaPelicula