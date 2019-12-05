import { spawn } from 'child_process';

export function shutdown(req, res) {
    const s = spawn('bash');
    s.stdin.end(`sudo shutdown -h -t 3`);
    s.once('exit', code => {
        console.log(`Shutdown ${code}`)
    }); 
    res.json("Shutdown")
}
