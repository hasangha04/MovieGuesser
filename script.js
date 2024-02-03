const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGE0MzQ1YmJmY2RmYmVjNmI0MjU1NjM4OTJjODkxNiIsInN1YiI6IjY1YjU2ZjM1ZjY1OTZmMDE0OWZlMTI1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jdYM_1YApryb3TXt18Lai08nDYKfGct2R_6tpaP1wcs'
    }
  };
  
let movieDataArray = []; // Declare an array to store the response data
let currentPage = 1; // Initialize the current page

function fetchMovies(page) {
  fetch(`https://api.themoviedb.org/3/trending/person/day?language=en-US&page=${page}`, options)
    .then(response => response.json())
    .then(response => {
      const currentMovies = response.results.filter(movie => 
        movie.known_for_department === "Acting" && 
        movie.known_for.length > 0 && 
        movie.known_for[0].original_language === "en"
      );

      movieDataArray = [...movieDataArray, ...currentMovies];

      // Print out the 'name' property for each movie on the current page
      currentMovies.forEach(movie => {
        console.log(movie.name);
      });

      // Fetch the next page if available
      if (page < response.total_pages) {
        fetchMovies(page + 1);
      }
    })
    .catch(err => console.error(err));
}

// Start fetching movies from the first page
fetchMovies(currentPage);