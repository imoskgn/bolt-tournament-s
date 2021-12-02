let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Tournament = require('../models/tournament');


/* GET Tournament list */
module.exports.displayTournamentList = (req, res, next) => {
    Tournament.find().exec((err, tournamentList) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.json(tournamentList);
        }
    });
};

/* GET Tournament by Id */
module.exports.displayTournament = (req, res, next) => {
    let id = req.params.id
    Tournament.findById(id).exec((err, tournament) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.json(tournament);
        }
    });
};

/* CREATE Tournament */
module.exports.createNewTournament = (req, res, next) => {
    console.log(req.user)
    let newTournament = Tournament({
        "name": req.body.name,
        "userId": req.user._id,
        "userPhone" : req.user.phoneNumber,
        "description": req.body.description,
        "status": "created",
        "startDate": req.body.startDate,
        "endDate": req.body.endDate,
        "playersList": req.body.players,
        "level": 1
    });
    // Add new Tournament to the Database
    Tournament.create(newTournament, (err, Tournament) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.json({ success: true, msg: 'New Tournament Successfully Created' });
        }
    });
}

/* UPDATE Tournament by Id*/
module.exports.updateTournament = async (req, res, next) => {
    let id = req.params.id
    let tournament = await Tournament.findById(id)

  

    if (!tournament) {
        res.json(tournament);
    }
    else if ((tournament.status == "created") && (req.user_id == tournament.userId)) {
        tournament.name = req.body.name,
        tournament.description = req.body.description,
        tournament.startDate = req.body.startDate,
        tournament.endDate = req.body.endDate,
        tournament.playersList = req.body.playersList,
        tournament.status = req.body.status
        tournament.save()
        res.json({ status: true, msg: "Tournament succesfully updated" })
    }
    else if (req.user_id != tournament.userId) {
        res.json({ status: false, msg: "You don't have authorization to make this change" })
    }
    else if (tournament.status == "started") {
        res.json({ status: false, msg: "Tournament have already started can not be updated" })
    } else {
        res.json({ status: false, msg: "" })
    }
}


/* Delete tournament by id */
module.exports.deleteTournament = async (req, res, next) => {

    let id = req.params.id;
    let tournament = await Tournament.findById(id)

   console.log("Tournament :", tournament)

    if (tournament.userId == req.user._id){
        Tournament.deleteOne({ _id: id }, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                res.json({ success: true, msg: 'Tournament Successfully Deleted' });
            }
        })
    } else {
        res.json({success : false, msg:'you are not authorized to make this change'});
    }

   
}

