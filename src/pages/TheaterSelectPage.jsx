import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieById } from '../data/movies';
import { theaters } from '../data/theaters';
import './TheaterSelectPage.css';

const TheaterSelectPage = () => {
    const { id } = useParams();
    const movie = getMovieById(id);

    // Generate next 7 days for date selector
    const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
            day: date.toLocaleDateString('en-IN', { weekday: 'short' }),
            date: date.getDate(),
            month: date.toLocaleDateString('en-IN', { month: 'short' }),
            full: date.toISOString().split('T')[0]
        };
    });

    const [selectedDate, setSelectedDate] = useState(dates[0].full);
    const [selectedFormat, setSelectedFormat] = useState('all');

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

    const formats = ['all', ...movie.format];

    return (
        <div className="theater-select-page">
            {/* Movie Header */}
            <div className="theater-header">
                <div className="container">
                    <div className="theater-header-content">
                        <div className="movie-brief">
                            <h1 className="movie-title">{movie.title}</h1>
                            <div className="movie-tags">
                                <span className="tag">{movie.certification}</span>
                                <span className="tag">{movie.language}</span>
                                {movie.format.map((f, i) => (
                                    <span key={i} className="tag format">{f}</span>
                                ))}
                                <span className="tag">{movie.genres.join(', ')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Date Selector */}
            <div className="date-selector">
                <div className="container">
                    <div className="date-selector-content">
                        <div className="dates-scroll">
                            {dates.map(d => (
                                <button
                                    key={d.full}
                                    className={`date-btn ${selectedDate === d.full ? 'active' : ''}`}
                                    onClick={() => setSelectedDate(d.full)}
                                >
                                    <span className="date-day">{d.day}</span>
                                    <span className="date-num">{d.date}</span>
                                    <span className="date-month">{d.month}</span>
                                </button>
                            ))}
                        </div>

                        <div className="format-filter">
                            {formats.map(f => (
                                <button
                                    key={f}
                                    className={`format-btn ${selectedFormat === f ? 'active' : ''}`}
                                    onClick={() => setSelectedFormat(f)}
                                >
                                    {f === 'all' ? 'All Formats' : f}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Theater List */}
            <div className="theaters-list">
                <div className="container">
                    {theaters.map(theater => {
                        const filteredShowtimes = selectedFormat === 'all'
                            ? theater.showtimes
                            : theater.showtimes.filter(s => s.format === selectedFormat);

                        if (filteredShowtimes.length === 0) return null;

                        return (
                            <div key={theater.id} className="theater-card">
                                <div className="theater-info">
                                    <div className="theater-main">
                                        <h3 className="theater-name">{theater.name}</h3>
                                        <p className="theater-location">{theater.location}</p>
                                    </div>
                                    <div className="theater-amenities">
                                        {theater.amenities.slice(0, 3).map((amenity, i) => (
                                            <span key={i} className="amenity-badge">{amenity}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="showtimes-grid">
                                    {filteredShowtimes.map((show, i) => (
                                        <Link
                                            key={i}
                                            to={`/movie/${id}/seats?theater=${theater.id}&showtime=${i}&date=${selectedDate}`}
                                            className={`showtime-btn ${!show.available ? 'sold-out' : ''}`}
                                        >
                                            <span className="showtime-time">{show.time}</span>
                                            <span className="showtime-format">{show.format}</span>
                                            <span className="showtime-price">₹{show.price}</span>
                                            {!show.available && <span className="sold-out-badge">Sold Out</span>}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TheaterSelectPage;
