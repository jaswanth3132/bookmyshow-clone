export const theaters = [
    {
        id: 1,
        name: "PVR Cinemas",
        location: "Phoenix Mall, Lower Parel",
        distance: "2.5 km",
        amenities: ["Parking", "Food Court", "Wheelchair Access", "Dolby Atmos"],
        showtimes: [
            { time: "09:30 AM", format: "2D", price: 250, available: true },
            { time: "12:45 PM", format: "2D", price: 280, available: true },
            { time: "03:30 PM", format: "IMAX", price: 450, available: true },
            { time: "06:45 PM", format: "2D", price: 320, available: false },
            { time: "10:00 PM", format: "IMAX", price: 480, available: true }
        ]
    },
    {
        id: 2,
        name: "INOX Megaplex",
        location: "R City Mall, Ghatkopar",
        distance: "5.2 km",
        amenities: ["Parking", "Food Court", "Recliner Seats"],
        showtimes: [
            { time: "10:00 AM", format: "2D", price: 220, available: true },
            { time: "01:15 PM", format: "3D", price: 350, available: true },
            { time: "04:30 PM", format: "2D", price: 280, available: true },
            { time: "07:45 PM", format: "3D", price: 380, available: true },
            { time: "11:00 PM", format: "2D", price: 250, available: true }
        ]
    },
    {
        id: 3,
        name: "Cinepolis",
        location: "Viviana Mall, Thane",
        distance: "8.0 km",
        amenities: ["Parking", "4DX", "VIP Lounge", "Food Court"],
        showtimes: [
            { time: "11:00 AM", format: "4DX", price: 550, available: true },
            { time: "02:15 PM", format: "2D", price: 260, available: true },
            { time: "05:30 PM", format: "4DX", price: 580, available: false },
            { time: "08:45 PM", format: "2D", price: 300, available: true }
        ]
    },
    {
        id: 4,
        name: "Carnival Cinemas",
        location: "Andheri West",
        distance: "3.8 km",
        amenities: ["Parking", "Food Court"],
        showtimes: [
            { time: "09:00 AM", format: "2D", price: 180, available: true },
            { time: "12:00 PM", format: "2D", price: 200, available: true },
            { time: "03:00 PM", format: "2D", price: 220, available: true },
            { time: "06:00 PM", format: "2D", price: 250, available: true },
            { time: "09:00 PM", format: "2D", price: 250, available: true }
        ]
    },
    {
        id: 5,
        name: "PVR ICON",
        location: "Oberoi Mall, Goregaon",
        distance: "6.5 km",
        amenities: ["Parking", "Luxury Recliners", "Gourmet Food", "Private Lounge"],
        showtimes: [
            { time: "10:30 AM", format: "IMAX", price: 500, available: true },
            { time: "01:45 PM", format: "IMAX", price: 520, available: true },
            { time: "05:00 PM", format: "2D", price: 380, available: true },
            { time: "08:15 PM", format: "IMAX", price: 550, available: true },
            { time: "11:30 PM", format: "2D", price: 350, available: true }
        ]
    }
];

export const seatLayout = {
    platinum: {
        name: "PLATINUM",
        price: 400,
        rows: ["A", "B"],
        seatsPerRow: 14
    },
    gold: {
        name: "GOLD",
        price: 300,
        rows: ["C", "D", "E", "F"],
        seatsPerRow: 16
    },
    silver: {
        name: "SILVER",
        price: 200,
        rows: ["G", "H", "I", "J"],
        seatsPerRow: 18
    }
};

// Generate random sold seats for demo
export const generateSoldSeats = () => {
    const soldSeats = [];
    const allRows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

    allRows.forEach(row => {
        const seatsPerRow = row <= "B" ? 14 : row <= "F" ? 16 : 18;
        const numSold = Math.floor(Math.random() * (seatsPerRow / 3));

        for (let i = 0; i < numSold; i++) {
            const seatNum = Math.floor(Math.random() * seatsPerRow) + 1;
            soldSeats.push(`${row}${seatNum}`);
        }
    });

    return [...new Set(soldSeats)];
};

export const cities = [
    "Mumbai",
    "Delhi-NCR",
    "Bengaluru",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow"
];
