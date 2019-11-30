import { MPC } from 'mpc-js'

var express = require("express");
var app = express();
app.listen(3000, () => {
 console.log("Media Player Daemon REST Server running on port 3000");
});

app.get("/url", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});

var mpc = new MPC()

mpc.connectTCP('192.168.0.3', 6600)

//mpc.playback.play()
mpc.playback.stop()

