'use strict';

const express = require('express');
const morgan = require('morgan');

const { 
    getChores,
    getChore,
    getList,
    addToList,
    addLogIn,
    createLogIn,
    updateList,
    addOrder,
    deleteList,
    getOrder,
    getUser,
    addUser
} = require("./handlers");

const PORT = 4000;

express()
  .use(morgan('tiny'))
  .use(express.json())

  .get("/api/chores", getChores)
  .get("/api/chores/:chore", getChore)
  .get("/api/login/:userId", getUser)
  .get("/api/list/:userId", getList)
  .get("/api/order/:missionId", getOrder)

  .post("/api/list/:userId", addToList)
  .post("/api/checkout", addOrder)
  .post("/api/login", addUser)
  
  .patch("/api/list/:userId", updateList)

  .delete("/api/list/:id", deleteList)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));