let mongoose =  require('mongoose')



//create match model 
let matchModel = mongoose.Schema({
    firstPlayer: {
        name: String,
        phoneNumber: String
    },
    secondPlayer: {
        name: String,
        phoneNumber: String
    },
    winner: {
        name: String,
        phoneNumber: String
    },
    acive: Boolean,
    tournamentId: String,
    level: Number,
    order: Number
}, {
    collection: "matches"
}, {strict: false})

module.exports = mongoose.model('match', matchModel)
