import { MPC } from 'mpc-js'

const port = process.env.MPC_PORT || 6600
const mpc = new MPC()
mpc.connectTCP('192.168.0.3', port)

export function addToPlaylist(req, res) {
    const track = req.body.track
    mpc.currentPlaylist.clear();
    mpc.currentPlaylist.add(track)
    .then(out => {
        console.log('add', track)
    })
    .catch(err => {
        console.log('error', err)
    })
    res.json("ADD: " + track)
    //mpc.currentPlaylist.add('http://stream4.nadaje.com:8002/muzo');
    //mpc.currentPlaylist.add('http://redir.atmcdn.pl/sc/o2/Eurozet/live/meloradio.livx');
}

export function stop(req, res) {    
    mpc.playback.stop()
    .then(out => {
        console.log('STOP')
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
