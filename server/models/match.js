let mongoose =  require('mongoose')



//create business contact model
let matchModel = mongoose.Schema({
    firstPlayerPhone: String,
    secondPlayerPhone: String,
    winnerPhone: String,
    acive: Boolean,
    tournamentId: String,
    level: Number
}, {
    collection: "matches"
})

module.exports = mongoose.model('match', matchModel)
