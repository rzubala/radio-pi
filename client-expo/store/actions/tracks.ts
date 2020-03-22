export const FETCH_TRACKS = "FETCH_TRACKS";

import { init, insertTrack, fetchTracks } from "../../helpers/db";

export const loadTracks = () => {
  return async dispatch => {
    try {
      const initResult = await init();
      const dbResult = await fetchTracks();
      console.log(dbResult);
      dispatch({ type: FETCH_TRACKS, tracks: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
