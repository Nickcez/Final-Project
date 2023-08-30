'use strict';

const express = require('express');
const morgan = require('morgan');

const { 
    getChores,
    getChore,
    getList,
    addToList,
    addLogIn,
    createLogIn
} = require("./handlers");

const PORT = 4000;

express()
  .use(morgan('tiny'))
  .use(express.json())

  .get("/api/chores", getChores)
  .get("/api/chores/:chore", getChore)
  .get("/api/list", getList)

  .post("/api/list", addToList)
  .post("/api/login", addLogIn)
  .post("/api/createlogin", createLogIn)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));