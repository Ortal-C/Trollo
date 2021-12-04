export const boardData = {
    "_id": "b101",
    "title": "Sprint 4",
    "createdAt": Date.now(),
    "createdBy": {
        "_id": "u101",
        "fullname": "Lihi Sered",
        "imgUrl": "http://some-img"
    },
    "isStarred": true,
    "style": {},
    "labels": [
        {
            "id": "l101",
            "title": "Copy Request",
            "color": "#61bd4f"
        },
        {
            "id": "l102",
            "title": "One more step",
            "color": "#61bd4f"
        },
        {
            "id": "l103",
            "title": "Priority",
            "color": "#61bd4f"
        },
        {
            "id": "l104",
            "title": "Design team",
            "color": "#61bd4f"
        },
        {
            "id": "l105",
            "title": "Product marketing",
            "color": "#61bd4f"
        },
        {
            "id": "l106",
            "title": "Waiting for feedback",
            "color": "#61bd4f"
        },
        {
            "id": "l107",
            "title": "Halp",
            "color": "#61bd4f"
        },
        {
            "id": "l108",
            "title": "Important",
            "color": "#61bd4f"
        },
    ],
    "members": [
        {
            "_id": "u407",
            "fullname": "Lihi Sered",
            "imgUrl": "https://ca.slack-edge.com/T0284CDCCBB-U02CJQ59YJJ-fc6afe05f449-512"
        },
        {
            "_id": "u123",
            "fullname": "Michal Ozeri",
            "imgUrl": "https://ca.slack-edge.com/T0284CDCCBB-U02CRNGHZJ7-fb378d29c936-512"
        },
        {
            "_id": "u245",
            "fullname": "Ortal Cohen",
            "imgUrl": "https://ca.slack-edge.com/T0284CDCCBB-U02AL3BDQ3E-56466cdcd6e4-512"
        }
    ],
    "groups": [
        {
            "id": "g101",
            "title": "Backlog",
            "cards": [
                {
                    "id": "c101",
                    "title": "Data structure planning"
                },
                {
                    "id": "c102",
                    "title": "Finish project definition"
                },
                {
                    "id": "c103",
                    "title": "Add Facebook / Google login features"
                },
                {
                    "id": "c104",
                    "title": "Insert demo-data"
                }
            ],
            "style": {}
        },
        {
            "id": "g102",
            "title": "In development",
            "cards": [
                {
                    "id": "c201",
                    "title": "Meeting with team-leader"
                },
                {
                    "id": "c202",
                    "title": "Help me",
                    "description": "description",
                    "comments": [
                        {
                            "id": "ZdPnm",
                            "txt": "also @yaronb please CR this",
                            "createdAt": 1590999817436,
                            "byMember": {
                                "_id": "u407",
                                "fullname": "Lihi Sered",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        }
                    ],
                    "checklists": [
                        {
                            "id": "YEhmF",
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": "212jX",
                                    "title": "To Do 1",
                                    "isDone": false
                                },
                                {
                                    "id": "212jXsda",
                                    "title": "To Do 2",
                                    "isDone": true
                                }
                            ]
                        }
                    ],
                    "members": [
                        {
                            "_id": "u101",
                            "username": "Lihi",
                            "fullname": "Lihi Sered",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        }
                    ],
                    "labelIds": ["l101", "l102"],
                    "createdAt": 1590999730348,
                    "dueDate": 16156215211,
                    "byMember": {
                        "_id": "u101",
                        "username": "Ortal",
                        "fullname": "Ortal Cohen",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                    "style": {
                        "bgColor": "#26de81"
                    }
                }
            ],
            "style": {}
        },
        {
            "id": "g103",
            "title": "Done",
            "cards": [
                {
                    "id": "c301",
                    "title": "Do that"
                },
                {
                    "id": "c302",
                    "title": "Sort cards",
                    "description": "Please EZRA",
                    "comments": [
                        {
                            "id": "ZdPnm",
                            "txt": "shoko moko",
                            "createdAt": 154555436,
                            "byMember": {
                                "_id": "u101",
                                "fullname": "Michal Ozeri",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        }
                    ],
                    "members": [
                        {
                            "_id": "u101",
                            "username": "Michal",
                            "fullname": "Michal Ozeri",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        }
                    ],
                    "labelIds": ["l105", "l109"],
                    "createdAt": 1590988930348,
                    "dueDate": 16156215211,
                    "byMember": {
                        "_id": "u101",
                        "username": "Lihi",
                        "fullname": "Lihi Sered",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                    "style": {
                        "bgColor": "#2d2d2d"
                    }
                }
            ],
            "style": {}
        },
    ],
    "activities": [
        {
            "id": "a101",
            "txt": "Changed Color",
            "createdAt": Date.now(),
            "byMember": {
                "_id": "u101",
                "fullname": "Michal Ozeri",
                "imgUrl": "https://ca.slack-edge.com/T0284CDCCBB-U02CRNGHZJ7-fb378d29c936-512"
            },
            "card": {
                "id": "c101",
                "title": "Data structure planning"
            }
        },
        {
            "id": "a102",
            "txt": "Changed Title",
            "createdAt": Date.now(),
            "byMember": {
                "_id": "u407",
                "fullname": "Lihi Sered",
                "imgUrl": "https://ca.slack-edge.com/T0284CDCCBB-U02CJQ59YJJ-fc6afe05f449-512"
            },
            "card": {
                "id": "c103",
                "title": "Backend"
            }
        }
    ]
}