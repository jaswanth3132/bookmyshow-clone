// Event images
import eventConcert from '../assets/images/event_concert_1770145942699.png';
import eventComedy from '../assets/images/event_comedy_1770145955709.png';
import eventSports from '../assets/images/event_sports_1770145972507.png';
import eventTheater from '../assets/images/event_theater_1770145988820.png';

export const events = [
    {
        id: 1,
        title: "Aurora Music Festival 2024",
        image: eventConcert,
        category: "Music",
        date: "Oct 26-28, 2024",
        venue: "Desert Valley, CA",
        price: "₹2,999 onwards",
        description: "The biggest music festival of the year featuring top international artists.",
        interested: "45K"
    },
    {
        id: 2,
        title: "Stand-Up Live! Comedy Night",
        image: eventComedy,
        category: "Comedy",
        date: "Nov 16, 2024",
        venue: "The Comedy Cellar, Mumbai",
        price: "₹799 onwards",
        description: "An evening of non-stop laughter with the best stand-up comedians.",
        interested: "12K"
    },
    {
        id: 3,
        title: "IPL 2024: MI vs CSK",
        image: eventSports,
        category: "Sports",
        date: "May 12, 2024",
        venue: "Wankhede Stadium, Mumbai",
        price: "₹1,499 onwards",
        description: "The ultimate cricket rivalry - Mumbai Indians vs Chennai Super Kings.",
        interested: "89K"
    },
    {
        id: 4,
        title: "The Grand Performance",
        image: eventTheater,
        category: "Theater",
        date: "Oct 26-30, 2024",
        venue: "Royal Opera House, Mumbai",
        price: "₹1,999 onwards",
        description: "A spectacular theatrical production with world-class performers.",
        interested: "8K"
    }
];

export const eventCategories = [
    { id: 1, name: "Music", icon: "🎵" },
    { id: 2, name: "Comedy", icon: "😂" },
    { id: 3, name: "Sports", icon: "🏏" },
    { id: 4, name: "Theater", icon: "🎭" },
    { id: 5, name: "Workshops", icon: "🎨" },
    { id: 6, name: "Kids", icon: "👶" }
];

export const getEventsByCategory = (category) => {
    if (!category || category === 'all') return events;
    return events.filter(event => event.category.toLowerCase() === category.toLowerCase());
};

export const getEventById = (id) => events.find(event => event.id === parseInt(id));
