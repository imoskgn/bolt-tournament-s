let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let User = require('../models/user');
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
    let newTournament = Tournament({
        "name": req.body.name,
        "userId": "",
        "description": req.body.description,
        "status": "created",
        "startDate": req.body.startDate,
        "endDate": req.body.endDate,
        "playersList": req.body.players,
        "currentPlayersList": req.body.players,
        "level": 1
    });

    let playersList = req.body.players

    playersList.forEach(async (player) => {
        phoneNumber = player.phoneNumber;
        await checkUser(phoneNumber, player)
    });

    /* Creating users if not exist in the database */
    async function checkUser(phoneNumber, player){
        User.find({ phoneNumber: phoneNumber }).exec((err, user) => {
            if (err) {
                return console.error(err);
            }
            else {
                if (!user.length) {
                    let newUser = User({
                        "name": player.name,
                        "phoneNumber": phoneNumber,
                        "registered": false,
                        "email": "",
                        "registerAt": "1999-01-01"
                    })
                    createUser(newUser).catch(e => {
                        console.log('There has been a problem: ' + e.message);
                      })
                }
            }
        });
    }

    async function createUser(newUser){
        await User.create(newUser, (err, User) => {
            if (err) {
                console.log(err);
                res.end(err);
            }
            else {
                console.log("User created")
            }
        });
        return
    }


    // Add new Tournament to the Database
    Tournament.create(newTournament, (err, Order) => {
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
module.exports.updateTournament = (req, res, next) => {
    let id = req.params.id
    updatedInfo = {
        "name": req.body.name,
        "description": req.body.description,
        "startDate": req.body.startDate,
        "endDate": req.body.endDate,
        "playersList": req.body.playersList
    }

    Tournament.findByIdAndUpdate(id, updatedInfo, (err) => {
        if(err)
        {
            console.log(err);
            res.json(err);
        }
        else
        {
            res.json({ success: true, msg: 'Tournament Successfully Updated' });
        }
    })
}



/* Delete tournament by id */
module.exports.deleteTournament = (req, res, next) => {
    let id = req.params.id;
    Tournament.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.json({ success: true, msg: 'Tournament Successfully Deleted' });
        }
    })
}

