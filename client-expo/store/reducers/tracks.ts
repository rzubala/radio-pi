import Track from "../../models/track";

import { FETCH_TRACKS, DELETE_TRACK, CREATE_DEFAULTS } from "../actions/tracks";

const initialState = {
  tracks: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRACKS:
      let dbTracks: Track[] = action.tracks.map(
        item =>
          new Track(
            item.id.toString(),
            item.name,
            item.streamUri,
            item.imageUri
          )
      );
      return {
        ...state,
        tracks: dbTracks
      };
    case DELETE_TRACK:
      return {
        ...state,
        tracks: state.tracks.filter(t => t.id !== action.tid)
      };
    case CREATE_DEFAULTS:
      return {
        ...state,
        tracks: action.tracks
      }
  }
  return state;
};
