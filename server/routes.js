import * as player from './player'
import * as system from './system'

export default function routes(app) {
    app.route('/play').get(player.play)

    app.route('/stop').get(player.stop)

    app.route('/shutdown').get(system.shutdown)
}