const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGODB_URI)

    .then(() => {
        console.log("Database connected successfully");
    }   ).catch((err) => {
        console.error("Database connection error:", err);
    });
}

module.exports = connectDB;

// mongodb://localhost:27017/zomato-reels


// mongodb+srv://trash2cash:Trash12345!@collage-mid-term.nmobvwr.mongodb.net/mern-auth-app?appName=Collage-Mid-Term