"use strict";

const express = require("express");
const res = require("express/lib/response");

const app = express();

const SERVER_ERROR = 
    "Something went wrong with the server. Please try again later.";

const CLIENT_ERROR_CODE = 400;
const SERVER_ERROR_CODE = 500;

app.get("/teamusabasketballmerch", (req, res) => {
    try {
        res.type("json");
        res.send({"message": "Hi. You are currently looking at all the Team USA Basketball Merch."});
    } catch (err) {
        res.status(500);
        err.message = SERVER_ERROR;
    }
});

app.get("/:name", (req, res) => {
    try {
        res.type("json");
        res.send({"message": "Hello. You are looking at " + req.params["name"]});
    } catch (err) {
        res.status(400).send({"Error": "Please double-check your request."});
    }
});

app.get("/:price", (req, res) => {
    try {
        res.type("json");
        res.send({"message": "Hi. You are looking at a merchandise that cost" 
        + req.params["price"]});
    } catch (err) {
        res.status(400).send({"Error": "Please double-check your request."});
    }
});


