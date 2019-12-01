import { MPC } from 'mpc-js'

const port = process.env.MPC_PORT || 6600
const mpc = new MPC()
mpc.connectTCP('192.168.0.3', port)

export function stop(req, res) {
    mpc.playback.stop()
    res.json("Stop")
}

export function play(req, res) {
    mpc.playback.play()
    res.json("Start")
}
