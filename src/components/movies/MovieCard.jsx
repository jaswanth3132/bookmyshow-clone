import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
    const { id, title, poster, rating, votes, genres, language, format, certification } = movie;

    return (
        <Link to={`/movie/${id}`} className="movie-card">
            <div className="movie-card-poster">
                <img src={poster} alt={title} />

                {/* Rating Badge */}
                <div className="movie-card-rating">
                    <svg className="star-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span>{rating}/10</span>
                    <span className="votes">{votes} Votes</span>
                </div>

                {/* Format Badges */}
                <div className="movie-card-formats">
                    {format.map((f, index) => (
                        <span key={index} className="format-badge">{f}</span>
                    ))}
                </div>

                {/* Hover Overlay */}
                <div className="movie-card-overlay">
                    <button className="btn btn-primary">Book Tickets</button>
                </div>
            </div>

            <div className="movie-card-info">
                <h3 className="movie-card-title">{title}</h3>
                <p className="movie-card-meta">
                    {certification} • {language}
                </p>
                <p className="movie-card-genres">
                    {genres.slice(0, 3).join('/')}
                </p>
            </div>
        </Link>
    );
};

export default MovieCard;
