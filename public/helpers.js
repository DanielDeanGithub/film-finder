const likedMovies = [];
const dislikedMovies = [];

// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
    const select = document.getElementById('genres')

    for (const genre of genres) {
        let option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
    const selectedGenre = document.getElementById('genres').value;
    return selectedGenre;
};

// Displays the like and dislike buttons on the page
const showBtns = () => {
    const btnDiv = document.getElementById('likeOrDislikeBtns');
    btnDiv.removeAttribute('hidden');
};

// Clear the current movie from the screen
const clearCurrentMovie = () => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieReleaseDiv = document.getElementById('movieRelease');
    const movieTextDiv = document.getElementById('movieText');

    const movieDetails = [moviePosterDiv, movieReleaseDiv, movieTextDiv];
    movieDetails.forEach(e => e.innerHTML = '');
};

const refreshLists = () => {
    const likedMovieList = likedMovies.map(e => `<li id=${e.id}>${e.title}</li>`).join('');    
    document.getElementById('likedList').innerHTML = likedMovieList; 

    const dislikedMovieList = dislikedMovies.map(e => `<li id=${e.id}>${e.title}</li>`).join('');    
    document.getElementById('dislikedList').innerHTML = dislikedMovieList;
};

// After liking a movie, clears the current movie from the screen and gets another random movie
const likeMovie = ({title, id}) => {
    clearCurrentMovie();
    showRandomMovie();
    document.getElementById('liked').removeAttribute('hidden');

    // If movie has been liked previously remove it from liked list
    if(dislikedMovies.find(e => e.id === id)) {
        dislikedMovies.splice(e => e.id === id);
        refreshLists();       
    }


    likedMovies.push({
        title: title, 
        id: id
    });
    refreshLists();
};

// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = ({title, id}) => {
    clearCurrentMovie();
    showRandomMovie();
    document.getElementById('disliked').removeAttribute('hidden');

    // If movie has been liked previously remove it from liked list
    if(likedMovies.find(e => e.id === id)) {
        likedMovies.splice(e => e.id === id);
        refreshLists();       
    }

    // If movie has already been dislike then return
    if(dislikedMovies.find(e => e.id === id)) return;
    dislikedMovies.push({
        title: title, 
        id: id
    });
    refreshLists();
};

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', moviePosterUrl);
    posterImg.setAttribute('id', 'moviePoster');
  
    return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
    const titleHeader = document.createElement('h1');
    titleHeader.setAttribute('id', 'movieTitle');
    titleHeader.innerHTML = title;
  
    return titleHeader;
};

// Create HTML for movie overview
const createMovieOverview = (overview) => {
    const overviewParagraph = document.createElement('p');
    overviewParagraph.setAttribute('id', 'movieOverview');
    overviewParagraph.innerHTML = overview;
  
    return overviewParagraph;
};

// Create HTML for movie overview
const createMovieRelease = (overview) => {
    const releaseInfo = document.createElement('p');
    releaseInfo.setAttribute('id', 'movieReleaseDate');
    releaseInfo.innerHTML = "Release date: " + overview;
  
    return releaseInfo;
};

// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return randomMovie;
};

// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo) => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieReleaseDiv = document.getElementById('movieRelease');
    const movieTextDiv = document.getElementById('movieText');
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
  
    // Create HTML content containing movie info
    const moviePoster = createMoviePoster(movieInfo.poster_path);
    const movieRelease = createMovieRelease(movieInfo.release_date);
    const titleHeader = createMovieTitle(movieInfo.title);
    const overviewText = createMovieOverview(movieInfo.overview);
  
    // Append title, poster, and overview to page
    moviePosterDiv.appendChild(moviePoster);
    movieReleaseDiv.appendChild(movieRelease);
    movieTextDiv.appendChild(titleHeader);
    movieTextDiv.appendChild(overviewText);
  
    showBtns();
    likeBtn.onclick = () => likeMovie(movieInfo);
    dislikeBtn.onclick = () => dislikeMovie(movieInfo);
};