import * as player from './player'

export default function routes(app) {
    app.route('/play').get(player.play)

    app.route('/stop').get(player.stop)
}