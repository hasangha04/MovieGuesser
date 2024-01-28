const apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=18a4345bbfcdfbec6b425563892c8916';
const moviesContainer = document.getElementById("movies");

async function getMovies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        data.results.forEach(media => {
            const movieElement = document.createMovieElement(media);
            moviesContainer.appendChild(movieElement);
        });
    } catch (error) {
        console.log("Error fetching data: ", error);
    }
}

function createMovieElement(media) {
    const {title, name, backdrop_path, release_date} = media;

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie_item")

    movieElement.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${backdrop_path}"
        <div class="title">${title}</div>
    `;
    return movieElement;
}

getMovies();