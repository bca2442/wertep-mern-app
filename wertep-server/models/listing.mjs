// wertep-server/models/Listing.js
const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    user: { // Links listing to the User (RS3)
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    priceTokens: { // Suggested price in Skill-Tokens (RS6)
        type: Number,
        required: true,
        default: 0
    },
    type: { // Resource or Skill
        type: String,
        required: true,
        enum: ['Resource', 'Skill'] 
    },
    category: {
        type: String,
        default: 'General'
    },
    // Moderation Status (RS13)
    status: {
        type: String,
        enum: ['Pending', 'Active', 'Rejected'],
        default: 'Pending' 
    },
    location: { // Inherited from User's profile (RS2, RS4)
        type: String, 
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Listing', ListingSchema);