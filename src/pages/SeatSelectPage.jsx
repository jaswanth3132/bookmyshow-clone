import { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { getMovieById } from '../data/movies';
import { theaters, seatLayout, generateSoldSeats } from '../data/theaters';
import './SeatSelectPage.css';

const SeatSelectPage = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const movie = getMovieById(id);

    const theaterId = searchParams.get('theater');
    const showtimeIndex = searchParams.get('showtime');
    const dateStr = searchParams.get('date');

    const theater = theaters.find(t => t.id === parseInt(theaterId));
    const showtime = theater?.showtimes[parseInt(showtimeIndex)];

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showBookingModal, setShowBookingModal] = useState(false);

    // Generate sold seats once
    const soldSeats = useMemo(() => generateSoldSeats(), []);

    if (!movie || !theater || !showtime) {
        return (
            <div className="movie-not-found">
                <div className="container">
                    <h2>Invalid booking details</h2>
                    <Link to="/movies" className="btn btn-primary">Browse Movies</Link>
                </div>
            </div>
        );
    }

    const getSeatPrice = (row) => {
        if (['A', 'B'].includes(row)) return seatLayout.platinum.price;
        if (['C', 'D', 'E', 'F'].includes(row)) return seatLayout.gold.price;
        return seatLayout.silver.price;
    };

    const getSeatCategory = (row) => {
        if (['A', 'B'].includes(row)) return 'platinum';
        if (['C', 'D', 'E', 'F'].includes(row)) return 'gold';
        return 'silver';
    };

    const getSeatsPerRow = (row) => {
        if (['A', 'B'].includes(row)) return seatLayout.platinum.seatsPerRow;
        if (['C', 'D', 'E', 'F'].includes(row)) return seatLayout.gold.seatsPerRow;
        return seatLayout.silver.seatsPerRow;
    };

    const toggleSeat = (seatId) => {
        if (soldSeats.includes(seatId)) return;

        setSelectedSeats(prev =>
            prev.includes(seatId)
                ? prev.filter(s => s !== seatId)
                : prev.length < 10 ? [...prev, seatId] : prev
        );
    };

    const totalPrice = selectedSeats.reduce((sum, seat) => {
        const row = seat.charAt(0);
        return sum + getSeatPrice(row);
    }, 0);

    const handleProceed = () => {
        if (selectedSeats.length > 0) {
            setShowBookingModal(true);
        }
    };

    const renderSeatSection = (category, rows, price) => (
        <div className={`seat-section ${category}`}>
            <div className="section-label">
                <span className="section-name">{category.toUpperCase()}</span>
                <span className="section-price">₹{price}</span>
            </div>
            <div className="seat-rows">
                {rows.map(row => {
                    const seatsInRow = getSeatsPerRow(row);
                    return (
                        <div key={row} className="seat-row">
                            <span className="row-label">{row}</span>
                            <div className="seats">
                                {Array.from({ length: seatsInRow }, (_, i) => {
                                    const seatNum = i + 1;
                                    const seatId = `${row}${seatNum}`;
                                    const isSold = soldSeats.includes(seatId);
                                    const isSelected = selectedSeats.includes(seatId);

                                    // Add gap in middle
                                    const hasGap = seatNum === Math.floor(seatsInRow / 2);

                                    return (
                                        <button
                                            key={seatId}
                                            className={`seat ${isSold ? 'sold' : ''} ${isSelected ? 'selected' : ''}`}
                                            style={hasGap ? { marginRight: '20px' } : {}}
                                            onClick={() => toggleSeat(seatId)}
                                            disabled={isSold}
                                            title={seatId}
                                        >
                                            {seatNum}
                                        </button>
                                    );
                                })}
                            </div>
                            <span className="row-label">{row}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="seat-select-page">
            {/* Header */}
            <div className="seat-header">
                <div className="container">
                    <div className="seat-header-content">
                        <div className="movie-brief">
                            <h1>{movie.title}</h1>
                            <p>{theater.name} | {new Date(dateStr).toLocaleDateString('en-IN', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short'
                            })}, {showtime.time}</p>
                        </div>
                        <Link to={`/movie/${id}/theaters`} className="change-btn">
                            Change
                        </Link>
                    </div>
                </div>
            </div>

            {/* Seat Map */}
            <div className="seat-map-container">
                <div className="container">
                    {/* Screen */}
                    <div className="screen-container">
                        <div className="screen">
                            <span>All eyes this way please!</span>
                        </div>
                        <div className="screen-label">SCREEN</div>
                    </div>

                    {/* Seat Sections */}
                    <div className="seat-map">
                        {renderSeatSection('platinum', seatLayout.platinum.rows, seatLayout.platinum.price)}
                        {renderSeatSection('gold', seatLayout.gold.rows, seatLayout.gold.price)}
                        {renderSeatSection('silver', seatLayout.silver.rows, seatLayout.silver.price)}
                    </div>

                    {/* Legend */}
                    <div className="seat-legend">
                        <div className="legend-item">
                            <div className="legend-seat available"></div>
                            <span>Available</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-seat selected"></div>
                            <span>Selected</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-seat sold"></div>
                            <span>Sold</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Summary */}
            {selectedSeats.length > 0 && (
                <div className="booking-bar">
                    <div className="container">
                        <div className="booking-bar-content">
                            <div className="booking-info">
                                <span className="seats-selected">
                                    {selectedSeats.length} Ticket{selectedSeats.length > 1 ? 's' : ''}
                                </span>
                                <span className="seats-list">
                                    {selectedSeats.sort().join(', ')}
                                </span>
                            </div>
                            <div className="booking-action">
                                <span className="total-price">₹{totalPrice}</span>
                                <button className="btn btn-primary btn-lg" onClick={handleProceed}>
                                    Proceed
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Booking Confirmation Modal */}
            {showBookingModal && (
                <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Booking Confirmation</h2>
                            <button className="close-btn" onClick={() => setShowBookingModal(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="confirmation-icon">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                            </div>
                            <h3>Booking Successful!</h3>
                            <div className="booking-details">
                                <div className="detail-row">
                                    <span className="label">Movie</span>
                                    <span className="value">{movie.title}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Theater</span>
                                    <span className="value">{theater.name}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Date & Time</span>
                                    <span className="value">
                                        {new Date(dateStr).toLocaleDateString('en-IN', {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'long'
                                        })}, {showtime.time}
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Seats</span>
                                    <span className="value">{selectedSeats.sort().join(', ')}</span>
                                </div>
                                <div className="detail-row total">
                                    <span className="label">Total Amount</span>
                                    <span className="value">₹{totalPrice}</span>
                                </div>
                            </div>
                            <p className="confirmation-note">
                                🎉 This is a demo booking. In a real application, you would proceed to payment.
                            </p>
                            <Link to="/" className="btn btn-primary btn-lg">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeatSelectPage;
