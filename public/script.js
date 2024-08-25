const tmdbKey = config.API_KEY;
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = "/genre/movie/list";
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      //console.log(jsonResponse);
      const genres = jsonResponse['genres'];
      //console.log(genres);
      return genres;
    };
  } catch (error) {
    console.log(error);
  };
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = "/discover/movie";
  const randomPage = Math.floor(Math.random() * 500); // 500 is the limit for page numbers
  const requestParams = `?api_key=${tmdbKey}&with_genres${selectedGenre}&page=${randomPage}`;
  const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      //console.log(jsonResponse);
      const movies = jsonResponse['results'];
      //console.log(movies);
      return movies;
    }
  } catch (error) {
    console.log(error);
  };
};

const getMovieInfo = async (movie) => {
  const movieId = movie['id'];
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const movieInfo = await response.json();
      // return movieInfo;

      return {
        "adult": false,
        "backdrop_path": "/fUHuBNqTFGCohCuHDEqHs1pDPj7.jpg",
        "belongs_to_collection": {
            "id": 39199,
            "name": "Detective Conan Collection",
            "poster_path": "/bV6EHK0Q65hHKSoVDeACbc960jQ.jpg",
            "backdrop_path": "/mwz7lYimh8da0zZHOI41xNd86yH.jpg"
        },
        "budget": 0,
        "genres": [
            {
                "id": 12,
                "name": "Adventure"
            },
            {
                "id": 9648,
                "name": "Mystery"
            },
            {
                "id": 16,
                "name": "Animation"
            }
        ],
        "homepage": "https://www.tms-e.co.jp/global/alltitles/conan/087301.html",
        "id": 21422,
        "imdb_id": "tt0131479",
        "origin_country": [
            "JP"
        ],
        "original_language": "ja",
        "original_title": "名探偵コナン 時計じかけの摩天楼",
        "overview": "Detective Shinichi Kudo was once a brilliant teenage detective until he was given a poison that reverted him to a 4 year old. He's taken the name Conan Edogawa so no one (except an eccentric inventor) will know the truth. Now he's got to solve a series of bombings before his loved ones become victims. Who is this madman and why is he doing this? Only the young genius can save the day but will even he be up to the task?",
        "popularity": 25.868,
        "poster_path": "/5RB171WScK3nh4PqoRn8bj3iNLa.jpg",
        "production_companies": [
            {
                "id": 882,
                "logo_path": "/fRSWWjquvzcHjACbtF53utZFIll.png",
                "name": "TOHO",
                "origin_country": "JP"
            },
            {
                "id": 160520,
                "logo_path": null,
                "name": "Kyokuichi-Tokyo Movie",
                "origin_country": "JP"
            },
            {
                "id": 9149,
                "logo_path": "/isLUpud9N56ifftJZ4XvzwBBpoG.png",
                "name": "Shogakukan",
                "origin_country": "JP"
            },
            {
                "id": 11727,
                "logo_path": "/cIMyE9cw1W4kMFGxmC17HKTnVz9.png",
                "name": "Yomiuri Telecasting Corporation",
                "origin_country": "JP"
            }
        ],
        "production_countries": [
            {
                "iso_3166_1": "JP",
                "name": "Japan"
            }
        ],
        "release_date": "1997-04-19",
        "revenue": 9107390,
        "runtime": 95,
        "spoken_languages": [
            {
                "english_name": "Japanese",
                "iso_639_1": "ja",
                "name": "日本語"
            }
        ],
        "status": "Released",
        "tagline": "",
        "title": "Case Closed: The Time Bombed Skyscraper",
        "video": false,
        "vote_average": 7.367,
        "vote_count": 222
    }



    }    
  } catch (error) {
    console.log(error);
  };
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };

  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;