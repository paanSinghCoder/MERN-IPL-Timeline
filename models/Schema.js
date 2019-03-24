const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
let Data = new Schema({
    year: {
        type: Number
    },
    data_name: {//used in server.js 54
        type: String,
        // required: true
    },
    data_latitude: {
        type: Number
    },
    data_longitude: {
        type: Number
    },
    data_coverImgUrl: {
        type: String
    },
    data_dpImgUrl: {
        type: String
    },
    data_location: {
        type: String
    },
    data_capacity: {
        type: Number,
        // default: Date.now
    },
    data_summary: {
        type: String
    },
    data_matchDate: {
        type: String
    },
    data_team1: {
        type: String
    },
    data_team2: {
        type: String
    },
    data_winner: {
        type: String
    },
    data_comments: [{
        author: { type: String, required: true },
        avatar: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRieuoK9cN6W9kS8cJFyMJhUmVOOqNrluh0PvOGy_cz7EDtj21rOw" },
        content: { type: String, required: true }
    }]
    
});

// let Data = new Schema({
//     data_description: {//used in server.js 54
//         type: String,
//         // required: true
//     },
//     data_responsible: {
//         type: String
//     },
//     data_date: {
//         type: Date,
//         default: Date.now
//     },
//     data_priority: {
//         type: String
//     },
//     data_completed: {
//         type: Boolean
//     }
    
// });

module.exports = mongoose.model('Data', Data);
