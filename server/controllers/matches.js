const { match } = require('assert');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Match = require('../models/match');
let Tournament = require('../models/tournament')
let User = require('../models/user')
const lodash = require('lodash');

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
    Match.find({ tournamentId: id }).sort({ level: 1, order: 1 }).exec((err, matchList) => {
        if (err) {
            return console.error(err);
        }
        else {
            matchList = lodash.chain(matchList)
            // Group the elements of Array based on `color` property
            .groupBy("level").values()
            // `key` is group's name (color), `value` is the array of objects
            
            res.status(200).json(matchList);
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

/* CREATE matches when the tournament start  */
module.exports.createMatchesPerTournament = (req, res, next) => {
    let id = req.params.tournamentId;
    Tournament.findById(id, (err, tournament) => {
        console.log("CREATE matches when the tournament start" ,tournament)
        if (!tournament) {
            return res.json({ success: false, msg: 'Tournament with id: ' + id + "not found" });
        }
        if (tournament.status != "created") {
            return res.json({ succres: false, msg: "Tournament have already started" })
        }
        if (err) {
            return console.error(err);
        }
        else if (tournament.userId == req.user._id){
            playersList = tournament.playersList
            let order = 1;
            for (let i = 0; i < (playersList.length - 1); i = i + 2) {
                let newMatch = Match({
                    "firstPlayer": playersList[i],
                    "secondPlayer": playersList[i + 1],
                    "winner": "",
                    "acive": true,
                    "tournamentId": tournament._id,
                    "level": tournament.level,
                    "order": order
                });
                createMatch(newMatch)
                order++;
            }
        } else {
            return res.json({ success: false, msg: 'Only the owner of the tournament can make changes here' });
        }

        tournament.status = "started";
        tournament.save();
        createEmptyMatches(id)
        return res.json({ success: true, msg: 'Matches Succesfully Created & Tournament Started' });
    })
}

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

async function createEmptyMatches(id) {
    let orders = 2
    for (let level = 2; level < 4; level++) {
        for (let order = 1; order <= orders; order++) {
            let newMatch = Match({
                "firstPlayer": "",
                "secondPlayer": "",
                "winner": "",
                "acive": true,
                "tournamentId": id,
                "level": level,
                "order": order
            });
            await createMatch(newMatch)
        }
        orders = orders / 2;
    }
}



module.exports.updateMatchByTournamentId = async (req, res, next) => {
    let id = req.params.tournamentId;
    let order = req.body.order
    let level = req.body.level
    let tournament = await Tournament.findById(id);
    let newMatch = {
        "firstPlayer": req.body.firstPlayer ? req.body.firstPlayer : "",
        "secondPlayer": req.body.secondPlayer ? req.body.secondPlayer : "",
        "winner": "",
        "acive": true,
        "tournamentId": id,
        "level": level,
        "order": order
    };
    
   if (tournament.userId == req.user._id){ Match.findOneAndUpdate(
        {
            tournamentId: id,
            level: level,
            order: order
        }, newMatch, (err, match) => {
            if (err) {
                return console.error(err);
            }
            else {
                res.json({ success: true, msg: 'Matches Succesfully updated' });
            }
        })} else {
            res.json({ success: true, msg: 'Only the owner of the tournament can make changes' });
        }

    tournament.level = level;
    tournament.save();
}



/* UPDATE match by Id*/
module.exports.updateMatch = (req, res, next) => {
    let id = req.params.id
    updatedInfo = {
        "acive": false,
        "winner": req.body.winner
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
