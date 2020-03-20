import * as player from './player'
import * as system from './system'

export default function routes(app) {
    app.route('/add').post(player.addToPlaylist)

    app.route('/play').get(player.play)

    app.route('/stop').get(player.stop)

    app.route('/shutdown').get(system.shutdown)
    
    app.route('/restart').get(system.restart)
}
