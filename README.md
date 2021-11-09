
# BOLT-TOURNAMENT SERVICES

A place to create and manage tournaments.

# Services:

## Tournmament
### GET
    URL: https://bolt-tournament-s.herokuapp.com/tournament/

    response:

        [
            {
                "_id": "6189ef59396615b2136f6500",
                "name": "Copa America",
                "userId": "",
                "description": "Soccer Tournament",
                "status": "created",
                "playersList": [
                    {
                        "phoneNumber": "4658973426",
                        "name": "Adriana"
                    },
                    {
                        "phoneNumber": "4673873426",
                        "name": "Juan"
                    },
                    {
                        "phoneNumber": "4658998026",
                        "name": "Jack"
                    },
                    {
                        "phoneNumber": "5658943426",
                        "name": "Jane"
                    }
                ],
                "currentPlayersList": [
                    {
                        "phoneNumber": "4658973426",
                        "name": "Adriana"
                    },
                    {
                        "phoneNumber": "4673873426",
                        "name": "Juan"
                    },
                    {
                        "phoneNumber": "4658998026",
                        "name": "Jack"
                    },
                    {
                        "phoneNumber": "5658943426",
                        "name": "Jane"
                    }
                ],
                "startDate": "2021-12-04T00:00:00.000Z",
                "endDate": "2022-02-17T00:00:00.000Z",
                "level": 1,
                "__v": 0
            },
            {
                "_id": "6189ef80396615b2136f650e",
                "name": "Copa America",
                "userId": "",
                "description": "Soccer Tournament",
                "status": "created",
                "playersList": [
                    {
                        "phoneNumber": "4658973426",
                        "name": "Adriana"
                    },
                    {
                        "phoneNumber": "4673873426",
                        "name": "Juan"
                    },
                    {
                        "phoneNumber": "4658998026",
                        "name": "Jack"
                    },
                    {
                        "phoneNumber": "5658943426",
                        "name": "Jane"
                    }
                ],
                "currentPlayersList": [
                    {
                        "phoneNumber": "4658973426",
                        "name": "Adriana"
                    },
                    {
                        "phoneNumber": "4673873426",
                        "name": "Juan"
                    },
                    {
                        "phoneNumber": "4658998026",
                        "name": "Jack"
                    },
                    {
                        "phoneNumber": "5658943426",
                        "name": "Jane"
                    }
                ],
                "startDate": "2021-12-04T00:00:00.000Z",
                "endDate": "2022-02-17T00:00:00.000Z",
                "level": 1,
                "__v": 0
            },
            {
                "_id": "618a733c473ae1a2eee97730",
                "name": "Copa America",
                "userId": "",
                "description": "Soccer Tournament",
                "status": "created",
                "playersList": [
                    {
                        "phoneNumber": "4658973426",
                        "name": "Adriana"
                    },
                    {
                        "phoneNumber": "4673873426",
                        "name": "Juan"
                    },
                    {
                        "phoneNumber": "4658998026",
                        "name": "Jack"
                    },
                    {
                        "phoneNumber": "5658943426",
                        "name": "Jane"
                    }
                ],
                "currentPlayersList": [
                    {
                        "phoneNumber": "4658973426",
                        "name": "Adriana"
                    },
                    {
                        "phoneNumber": "4673873426",
                        "name": "Juan"
                    },
                    {
                        "phoneNumber": "4658998026",
                        "name": "Jack"
                    },
                    {
                        "phoneNumber": "5658943426",
                        "name": "Jane"
                    }
                ],
                "startDate": "2021-12-04T00:00:00.000Z",
                "endDate": "2022-02-17T00:00:00.000Z",
                "level": 1,
                "__v": 0
            }
        ]

### POST : Create

    URL: https://bolt-tournament-s.herokuapp.com/tournament/create

    body:
        {
            "name": "Copa America",
            "description": "Soccer Tournament",
            "startDate": "2021-12-04",
            "endDate": "2022-02-17",
            "players": [
                {"phoneNumber": "4658973426", 
                "name": "Adriana"}, 
                {"phoneNumber": "4673873426", 
                "name": "Juan"},
                {"phoneNumber": "4658998026", 
                "name": "Jack"},
                {"phoneNumber": "5658943426", 
                "name": "Jane"}
            ]
        }
    
    response:
        {
            "success": true,
            "msg": "New Tournament Successfully Created"
        }


