import { Link } from "react-router-dom";
import "./index.css";

const MovieCard = (props) => {
  const { movieData } = props;
  const { posterPath, title, rating } = movieData;

  return (
    <Link to={`/movies/`} className="link-item">
      <li className="movie-item">
        <img
          src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
          alt="movie"
          className="poster"
        />
        <h1 className="title">{title}</h1>
        <p className="rating">Rating: {rating}</p>
      </li>
    </Link>
  );
};
export default MovieCard;
