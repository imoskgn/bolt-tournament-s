const { match } = require('assert');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Match = require('../models/match');
let Tournament = require('../models/tournament')
let User = require('../models/user')

/* GET match list */
module.exports.displayMatches = (req, res, next) => {
    Match.find().exec((err, matchList) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.json(matchList);
        }
    });
};

/* GET match by Tournament Id */
module.exports.displayMatchesByTournament = (req, res, next) => {
    let id = req.params.id;
    Match.find({ tournamentId: id }).exec((err, matchList) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.json(matchList);
        }
    });
};

/* GET match by Id */
module.exports.displayMatch = (req, res, next) => {
    let id = req.params.id;
    Match.findById(id, (err, match) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.json(match);
        }
    });
};

/* CREATE Tournament */
module.exports.createMatchesPerTournament = (req, res, next) => {
    let id = req.params.id;
    Tournament.findById(id, (err, tournament) => {
        if (!tournament) {
            return res.json({ success: false, msg: 'Tournament with id: ' + id + "not found" });
        }

        if (err) {
            return console.error(err);
        }
        else {
            currentPlayersList = tournament.currentPlayersList
            for (let i = 0; i < (currentPlayersList.length - 1); i = i + 2) {
                let newMatch = Match({
                    "firstPlayerPhone": currentPlayersList[i].phoneNumber,
                    "secondPlayerPhone": currentPlayersList[i + 1].phoneNumber,
                    "winnerPhone": "",
                    "acive": true,
                    "tournamentId": tournament._id,
                    "level": tournament.level
                });
                createMatch(newMatch)
            }

        }
        res.json({ success: true, msg: 'Matches Succesfully Created' });
    })

    async function createMatch(newMatch) {
        await Match.create(newMatch, (err, User) => {
            if (err) {
                console.log(err);
                res.end(err);
            }
            else {
                console.log("Match created")
            }
        });
        return
    }
}

/* UPDATE match by Id*/
module.exports.updateMatch = (req, res, next) => {
    let id = req.params.id
    updatedInfo = {
        "acive": false,
        "winnerPhone": req.body.winnerPhone
    }
    Match.findByIdAndUpdate(id, updatedInfo, (err) => {
        if (err) {
            console.log(err);
            res.json(err);
        }
        else {
            res.json({ success: true, msg: 'Match Successfully Updated' });
        }
    })
}
