const express = require("express");
let slack = require("../controllers/slack");

let router = express.Router();

router.post("/hello", function (req, res) {
    slack.hello(req, res)
});

module.exports = router;