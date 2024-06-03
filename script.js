// Importar funciones del archivo de servicios
import { fetchPopularMovies, fetchTopRatedMovies } from "./services/services.js";

// Función para crear elementos HTML
const createElement = (tag, className, attributes = {}) => {
  const element = document.createElement(tag);
  if (className) {
    element.classList.add(className);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
};

// Función para crear una tarjeta de película
const createMovieCard = (movie) => {
  const cardPelicula = createElement("div", "card-pelicula", { name: "card-pelicula" });
  const img = createElement("img", "card-pelicula__imagen", {
    src: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
    alt: movie.title,
    decoding: "async",
    loading: "lazy",
    sizes:
      "(min-width: 1200px) 200px, (min-width: 810px) and (max-width: 1199px) 200px, (max-width: 809px) 199px",
  });
  const tituloPelicula = createElement("p", "card-pelicula__titulo");
  tituloPelicula.textContent = movie.title;

  cardPelicula.addEventListener("click", () => {
    window.location.href = `./pages/pelicula/pelicula.html?id=${movie.id}`;
  });

  cardPelicula.appendChild(img);
  cardPelicula.appendChild(tituloPelicula);

  return cardPelicula;
};

// Función para cargar películas en un contenedor dado
const loadMovies = async (fetchFunction, containerSelector, page = 1) => {
  const data = await fetchFunction(page);
  const movies = data.results;
  const container = document.querySelector(containerSelector);
  container.innerHTML = "";

  movies.forEach((movie) => {
    const cardPelicula = createMovieCard(movie);
    container.appendChild(cardPelicula);
  });

  if (containerSelector === "#listado-peliculas-tendencias") {
    container.setAttribute("data-page", page);
  }
};

// Función para manejar la navegación de páginas
const handlePagination = () => {
  document.querySelector("#boton-lista-anterior").addEventListener("click", () => {
    let currentPage = Number(
      document.querySelector("#listado-peliculas-tendencias").getAttribute("data-page")
    );
    if (currentPage > 1)
      loadMovies(fetchPopularMovies, "#listado-peliculas-tendencias", currentPage - 1);
  });

  document.querySelector("#boton-lista-siguiente").addEventListener("click", () => {
    let currentPage = Number(
      document.querySelector("#listado-peliculas-tendencias").getAttribute("data-page")
    );
    loadMovies(fetchPopularMovies, "#listado-peliculas-tendencias", currentPage + 1);
  });
};

// Inicializar la carga de películas y la navegación
document.addEventListener("DOMContentLoaded", () => {
  loadMovies(fetchPopularMovies, "#listado-peliculas-tendencias");
  loadMovies(fetchTopRatedMovies, "#listado-peliculas-aclamadas");
  handlePagination();
});

document.addEventListener("DOMContentLoaded", () => {
  const botonDesplegarMenu = document.getElementById("boton-desplegar-menu");
  const menuOpciones = document.getElementById("menu-opciones");

  botonDesplegarMenu.addEventListener("click", () => {
    menuOpciones.classList.toggle("activo");
  });
});
