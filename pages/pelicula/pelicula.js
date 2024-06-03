// main.js

import { fetchMovieDetails } from "../../services/services.js";

// Función para obtener la ID de la URL
function getMovieIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id"); // Suponiendo que el parámetro en la URL se llama "id"
}

// Función para generar el HTML de los detalles de la película
function generateMovieDetailsHTML(movie) {
  // Filtrar los directores y escritores

  //modificar el tittle de la pagina
  document.title = `CAC-MOVIES ${movie.title}`;

  const directorsAndWriters = movie.credits.crew.filter(
    (crewMember) => crewMember.job === "Director" || crewMember.job === "Writer"
  );

  const trailerVideoKey = getTrailerVideoKey(movie.videos);

  // Generar HTML para los detalles de la película
  const originalLanguage = movie.spoken_languages.find(
    (language) => language.iso_639_1 === movie.original_language
  );
  const originalLanguageName = originalLanguage ? originalLanguage.name : "English";

  return `
    <section class="detalle aos-init aos-animate" data-aos="zoom-in" style="--url-imagen-pelicula: url('https://image.tmdb.org/t/p/original/${
      movie.backdrop_path
    }')">
      <div class="contenedorDetalle">
        <div class="imgDetalle">
          <img src="https://image.tmdb.org/t/p/w342/${movie.poster_path}" alt="${movie.title}" />
        </div>
        <div class="textoDetalle">
          <h1>${movie.title} (${movie.release_date.split("-")[0]})</h1>
          <p>${movie.release_date.split("-")[0]} • ${movie.genres
    .map((genre) => genre.name)
    .join(", ")} • ${movie.runtime}m</p>
          <h2>Overview</h2>
          <p>${movie.overview}</p>
          <div class="contenedorCreditos">
            ${directorsAndWriters
              .map(
                (crewMember) => `
                  <div>
                    <h3>${crewMember.name}</h3>
                    <p>${crewMember.job}</p>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      </div>
    </section>
    <section class="trailer aos-init" data-aos="fade-up" data-aos-offset="400" data-aos-delay="50" data-aos-duration="1000">
      <div class="contenedorTrailer">
        <h2>Ver trailer</h2>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailerVideoKey}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
      <div class="contenedorInfo">
        <div class="redes">
          <ul>
            <li>
              <a href="https://www.facebook.com/${
                movie.external_ids.facebook_id
              }" target="_blank"><i class="fa-brands fa-facebook"></i></a>
            </li>
            <li>
              <a href="https://twitter.com/${
                movie.external_ids.twitter_id
              }" target="_blank"><i class="fa-brands fa-twitter"></i></a>
            </li>
            <li>
              <a href="https://instagram.com/${
                movie.instagram_id
              }" target="_blank"><i class="fa-brands fa-instagram"></i></a>
            </li>
            <li>
              <a href="https://www.imdb.com/title/${movie.external_ids.imdb_id}" target="_blank">
                <i class="fa-brands fa-imdb"></i>              
              </a>
            </li>
            <li>
              <a href="https://www.wikidata.org/wiki/${
                movie.external_ids.wikidata_id
              }" target="_blank">
                <i class="fa-brands fa-wikipedia-w"></i>
              </a>
            </li>
          </ul>
        </div>
        <div class="info">
          <table>
            <thead>
              <tr>
                <th colspan="2">Info</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Status</strong></td>
                <td>${movie.status}</td>
              </tr>
              <tr>
                <td><strong>Original Language</strong></td>
                <td>${originalLanguageName}</td>
              </tr>
              <tr>
                <td><strong>Budget</strong></td>
                <td>${formatCurrency(movie.budget)}</td>
              </tr>
              <tr>
                <td><strong>Revenue</strong></td>
                <td>${formatCurrency(movie.revenue)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;

  function formatCurrency(amount) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return formatter.format(amount);
  }
}

// Función para obtener el enlace del video del trailer
function getTrailerVideoKey(videos) {
  // Buscar el primer video que tenga el tipo "Trailer"
  const trailerVideo = videos.results.find((video) => video.type === "Trailer");
  // Si se encuentra un video de trailer, devolver su clave
  if (trailerVideo) {
    return trailerVideo.key;
  }
  // Si no se encuentra un video de trailer, devolver null
  return null;
}

// Función para cargar los detalles de la película
async function loadMovieDetails() {
  const movieId = getMovieIdFromURL(); // Obtener la ID de la película de la URL
  if (movieId) {
    try {
      // Obtener los detalles de la película usando la ID
      const movie = await fetchMovieDetails(movieId);

      // Generar el HTML de los detalles de la película
      const movieDetailsHTML = generateMovieDetailsHTML(movie);

      // Insertar HTML generado en el DOM
      document.getElementById("mainDetalle").innerHTML = movieDetailsHTML;
    } catch (error) {
      console.error("Error al cargar los detalles de la película:", error);
    }
  }
}

// Ejecutar la función loadMovieDetails al cargar la página
document.addEventListener("DOMContentLoaded", loadMovieDetails);

document.addEventListener("DOMContentLoaded", () => {
  const botonDesplegarMenu = document.getElementById("boton-desplegar-menu");
  const menuOpciones = document.getElementById("menu-opciones");

  botonDesplegarMenu.addEventListener("click", () => {
    menuOpciones.classList.toggle("activo");
  });
});
