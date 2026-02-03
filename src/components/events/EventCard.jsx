import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ event }) => {
    const { id, title, image, category, date, venue, price, interested } = event;

    return (
        <Link to={`/event/${id}`} className="event-card">
            <div className="event-card-image">
                <img src={image} alt={title} />
                <span className="event-card-category">{category}</span>
            </div>

            <div className="event-card-content">
                <h3 className="event-card-title">{title}</h3>
                <p className="event-card-date">{date}</p>
                <p className="event-card-venue">{venue}</p>
                <div className="event-card-footer">
                    <span className="event-card-price">{price}</span>
                    <span className="event-card-interested">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        {interested} interested
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default EventCard;
