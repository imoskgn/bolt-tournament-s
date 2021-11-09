let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let User = require('../models/user');
let Tournament = require('../models/tournament');


/* GET Tournament list */
module.exports.displayTournamentList = (req, res, next) => {
    Tournament.find().exec((err, tournamentList) => {
        console.log("Tenemos informacion")
        if (err) {
            return console.error(err);
        }
        else {
            res.json(tournamentList);
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
        console.log(player.phoneNumber);
        await checkUser(phoneNumber, player)
    });

    async function checkUser(phoneNumber, player){
        User.find({ phoneNumber: phoneNumber }).exec((err, user) => {
            if (err) {
                return console.error(err);
            }
            else {
                if (!user.length) {
                    console.log("creatiiiiing user")
                    let newUser = User({
                        "name": player.name,
                        "phoneNumber": phoneNumber,
                        "register": false,
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


    // Add new Object to the Database
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