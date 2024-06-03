// Definimos la URL base de la API de The Movie DB
const API_SERVER = "https://api.themoviedb.org/3"; // Esto se cambiará por una API propia que tenga las películas en la base de MySQL

// Opciones para las peticiones fetch a la API
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8",
  },
};

// Función para obtener películas populares
const fetchPopularMovies = async (page = 1) => {
  const response = await fetch(`${API_SERVER}/movie/popular?language=es-MX&page=${page}`, options);
  return response.json();
};

// Función para obtener películas más aclamadas
const fetchTopRatedMovies = async () => {
  const response = await fetch(`${API_SERVER}/movie/top_rated?language=es-MX`, options);
  return response.json();
};

export { fetchPopularMovies, fetchTopRatedMovies };

// Funcion para optener una pelicula por su id
const fetchMovieById = async (id) => {
  const response = await fetch(`${API_SERVER}/movie/${id}?language=es-MX`, options);
  return response.json();
};

// service.js

export async function fetchMovieDetails(id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Y2UzYTgyMjE1OWU1M2E5MTU1OTQ3OTAzOTcxNDkzMCIsInN1YiI6IjY2MmM1NDg2MjRmMmNlMDEyOTI5ZmIzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pnRG15_KCo5-6fnNn9nAhx-RJxb8ngBwQqEVe8WWF8I",
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?append_to_response=external_ids%2Ccredits%2Cvideos&language=es-MX`,
    options
  );
  return response.json();
}
