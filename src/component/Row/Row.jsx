import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import './row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';


const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    
    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        (async () => {
            try {
                // console.log(fetchUrl);
                const request = await axios.get(fetchUrl);
                // console.log(request);
                setMovies(request.data.results);
            } catch (error) {
                console.log('error', error);
            }
        })();
    }, [fetchUrl]);

    // console.table(movies);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
		if (trailerUrl) {
			setTrailerUrl(""); /*ifsets the trailerUrl empty, i.e. if a video is already opened it closes it first before it plays the clicked new poster */
		} else {
			movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
				.then((url) => {
                    // console.log(url);
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get("v"));
				})
				.catch((error) => console.log(error));
		}
	};

    return (
      <div className="row">
        <h2>{title}</h2>

        <div className="row_posters_container">

          {/* we'll put several row posters here */}
          {movies?.map(
            (movie, i) =>
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                <img
                  key={i}
                  onClick={() => handleClick(movie)}
                  className={`row_poster ${isLargeRow && "row_poster_large"}`}
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
              )
          )}

        </div>

        <div className="row_youtube">
          {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
      </div>
    );
}

export default Row