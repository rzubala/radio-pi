import { Tracks as InitialTracks } from '../../data/initial_data'
import Track from '../../models/track'

import { FETCH_TRACKS } from '../actions/tracks'

const initialState = {
    tracks: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACKS:
            let dbTracks: Track[] = action.tracks
            if (!dbTracks || dbTracks.length === 0) {
                dbTracks = InitialTracks
            }
            return {
                ...state,
                tracks: dbTracks
            }
    }
    return state
}