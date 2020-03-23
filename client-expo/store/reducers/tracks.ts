import Track from '../../models/track'

import { FETCH_TRACKS } from '../actions/tracks'

const initialState = {
    tracks: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACKS:
            let dbTracks: Track[] = action.tracks.map(item => new Track(item.id.toString(), item.name, item.streamUri, item.imageUri))
            return {
                ...state,
                tracks: dbTracks
            }
    }
    return state
}