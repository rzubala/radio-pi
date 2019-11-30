import { MPC } from 'mpc-js'
import express from 'express';

const mpc = new MPC()
mpc.connectTCP('192.168.0.3', 6600)

const app = express();
app.listen(3000, () => {
    console.log("Media Player Daemon REST Server running on port 3000");
});

app.get("/play", (req, res, next) => {
    mpc.playback.play()
    res.json("Play")
})

app.get("/stop", (req, res, next) => {
    mpc.playback.stop()
    res.json("Stop")
})
