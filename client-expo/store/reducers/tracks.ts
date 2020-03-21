import { Tracks } from '../../data/initial_data'

import { FETCH_TRACKS } from '../actions/tracks'

const initialState = {
    tracks: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACKS:
            return {
                ...state,
                tracks: Tracks
            }
    }
    return state
}