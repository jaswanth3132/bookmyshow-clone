import { useParams, Link } from 'react-router-dom';
import { getMovieById } from '../data/movies';
import './MovieDetailsPage.css';

const MovieDetailsPage = () => {
    const { id } = useParams();
    const movie = getMovieById(id);

    if (!movie) {
        return (
            <div className="movie-not-found">
                <div className="container">
                    <h2>Movie not found</h2>
                    <Link to="/movies" className="btn btn-primary">Browse Movies</Link>
                </div>
            </div>
        );
    }

    const {
        title, poster, rating, votes, genres, language, format,
        certification, duration, releaseDate, synopsis, director, cast
    } = movie;

    const formattedDate = new Date(releaseDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="movie-details-page">
            {/* Hero Section */}
            <div className="movie-hero">
                <div className="movie-hero-bg" style={{ backgroundImage: `url(${poster})` }} />
                <div className="movie-hero-overlay" />

                <div className="container">
                    <div className="movie-hero-content">
                        {/* Poster */}
                        <div className="movie-poster">
                            <img src={poster} alt={title} />
                            <div className="poster-badge">In Cinemas</div>
                        </div>

                        {/* Info */}
                        <div className="movie-info">
                            <h1 className="movie-title">{title}</h1>

                            {/* Rating */}
                            <div className="movie-rating">
                                <div className="rating-score">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                    <span className="score">{rating}/10</span>
                                    <span className="votes">({votes} Votes)</span>
                                </div>
                                <button className="rate-btn">Rate now</button>
                            </div>

                            {/* Meta Info */}
                            <div className="movie-meta">
                                <span className="meta-item format-badges">
                                    {format.map((f, i) => (
                                        <span key={i} className="format-badge">{f}</span>
                                    ))}
                                </span>
                                <span className="meta-item">{language}</span>
                                <span className="meta-item">{duration}</span>
                                <span className="meta-item">{genres.join(', ')}</span>
                                <span className="meta-item certification">{certification}</span>
                                <span className="meta-item">{formattedDate}</span>
                            </div>

                            {/* Book Button */}
                            <Link to={`/movie/${id}/theaters`} className="btn btn-primary btn-lg book-btn">
                                Book Tickets
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="movie-about">
                <div className="container">
                    <h2 className="section-title">About the movie</h2>
                    <p className="movie-synopsis">{synopsis}</p>
                </div>
            </div>

            {/* Cast & Crew */}
            <div className="movie-cast">
                <div className="container">
                    <h2 className="section-title">Cast</h2>
                    <div className="cast-grid">
                        {cast.map((actor, index) => (
                            <div key={index} className="cast-card">
                                <div className="cast-avatar">
                                    {actor.charAt(0)}
                                </div>
                                <span className="cast-name">{actor}</span>
                            </div>
                        ))}
                    </div>

                    <h2 className="section-title mt-8">Crew</h2>
                    <div className="cast-grid">
                        <div className="cast-card">
                            <div className="cast-avatar director">
                                {director.charAt(0)}
                            </div>
                            <span className="cast-name">{director}</span>
                            <span className="cast-role">Director</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="movie-reviews">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Top reviews</h2>
                        <span className="reviews-count">2.5K reviews</span>
                    </div>

                    <div className="reviews-summary">
                        <div className="summary-score">
                            <span className="big-score">{rating}</span>
                            <span className="out-of">/10</span>
                        </div>
                        <div className="summary-bars">
                            <div className="bar-row">
                                <span>5</span>
                                <div className="bar"><div className="bar-fill" style={{ width: '75%' }} /></div>
                            </div>
                            <div className="bar-row">
                                <span>4</span>
                                <div className="bar"><div className="bar-fill" style={{ width: '55%' }} /></div>
                            </div>
                            <div className="bar-row">
                                <span>3</span>
                                <div className="bar"><div className="bar-fill" style={{ width: '30%' }} /></div>
                            </div>
                            <div className="bar-row">
                                <span>2</span>
                                <div className="bar"><div className="bar-fill" style={{ width: '15%' }} /></div>
                            </div>
                            <div className="bar-row">
                                <span>1</span>
                                <div className="bar"><div className="bar-fill" style={{ width: '8%' }} /></div>
                            </div>
                        </div>
                    </div>

                    {/* Sample Reviews */}
                    <div className="reviews-list">
                        <div className="review-card">
                            <div className="review-header">
                                <div className="reviewer-avatar">R</div>
                                <div className="reviewer-info">
                                    <span className="reviewer-name">Rahul Sharma</span>
                                    <span className="review-date">2 days ago</span>
                                </div>
                                <div className="review-rating">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                    9/10
                                </div>
                            </div>
                            <p className="review-text">
                                Absolutely loved this movie! The performances were top-notch and the direction was brilliant.
                                A must-watch for everyone who appreciates quality cinema.
                            </p>
                        </div>

                        <div className="review-card">
                            <div className="review-header">
                                <div className="reviewer-avatar">P</div>
                                <div className="reviewer-info">
                                    <span className="reviewer-name">Priya Patel</span>
                                    <span className="review-date">5 days ago</span>
                                </div>
                                <div className="review-rating">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                    8/10
                                </div>
                            </div>
                            <p className="review-text">
                                Great movie with stunning visuals. The storyline keeps you engaged throughout.
                                Highly recommend watching it in IMAX for the best experience!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsPage;
