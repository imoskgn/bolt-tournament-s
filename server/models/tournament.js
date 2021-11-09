let mongoose =  require('mongoose')

//create business contact model
let tournamentModel = mongoose.Schema({
    name: String,
    userId: String,
    description: String,
    status: String,
    playersList: Array,
    currentPlayersList: Array,
    startDate: Date,
    endDate: Date,
    level: Number
}, {
    collection: "tournaments"
})

module.exports = mongoose.model('tournament', tournamentModel)
