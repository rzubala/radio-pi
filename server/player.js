import { MPC } from 'mpc-js'

const port = process.env.MPC_PORT || 6600
const mpc = new MPC()
mpc.connectTCP('192.168.0.3', port)

export let streamId = null

export function addToPlaylist(req, res) {
    const track = req.body.track    
    mpc.currentPlaylist.clear();
    mpc.currentPlaylist.add(track)
    .then(out => {
        console.log('add', track)
        streamId = req.body.streamId
    })
    .catch(err => {
        console.log('error', err)
    })
    res.json("ADD: " + track)
}

export function setVolume(req, res) {
    const volume = req.body.volume  
    mpc.playbackOptions.setVolume(volume)
    .then(out => {
        console.log('volume', volume)
    })
    .catch(err => {
        console.log('error', err)
    })
    res.json("VOLUME: " + volume)
}

export function stop(req, res) {    
    mpc.playback.stop()
    .then(out => {
        console.log('STOP')
        streamId = null
    })
    .catch(err => {
        console.log('error', err)
    })
    res.json("Stop")
}

export function play(req, res) {
    mpc.playback.play()
    .then(out => {
        console.log('PLAY')
    })
    .catch(err => {
        console.log('error', err)
    })
    res.json("Start")
}
