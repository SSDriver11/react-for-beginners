import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovies] = useState([]);
  const { id } = useParams();
  const getMovie = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
    setLoading(false);
    setMovies(json.data.movie);
  }, [id]);
  useEffect(() => {
    getMovie();
  }, [getMovie]);
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.detail}>
          <div className={styles.detail_image}>
            <img
              className={styles.bg_image}
              src={movie.background_image_original}
              alt="background_image"
            ></img>
            <img
              src={movie.large_cover_image}
              alt="cover_image"
            ></img>
          </div>
          <div className={styles.detail_info}>
            <h1>
              {movie.title}, ({movie.year})
            </h1>
            <h3>Rating: {movie.rating}</h3>
            {movie.runtime === 0 ? "" : <h3>Runtime: {movie.runtime} (min)</h3>}
            <h3>Genres: </h3>
            <ul className={styles.detail_genres}>
              {movie.genres.map((genre) => (
                <li key={genre}>{genre}</li>
              ))}
            </ul>
            <p className={styles.detail_description}>
            <h3>Description</h3>
              {movie.description_intro}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
