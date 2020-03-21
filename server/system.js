import { spawn } from 'child_process';

export function shutdown(req, res) {
    const s = spawn('bash');
    s.stdin.end(`sudo shutdown -h 0`);
    s.once('exit', code => {
        console.log(`Shutdown ${code}`)
    }); 
    res.json("Shutdown")
}

export function restart(req, res) {
    const s = spawn('bash');
    s.stdin.end(`sudo service mpd restart && sudo service mopidy restart`);
    s.once('exit', code => {
        console.log(`Restart ${code}`)
    }); 
    res.json("Restart")
}

export function ping(req, res) {
    res.json("OK")
}
