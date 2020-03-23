export const FETCH_TRACKS = "FETCH_TRACKS";

import {
  init,
  insertTrack as insertTrackDb,
  updateTrack as updateTrackDb,
  fetchTracks,
  deleteTracks
} from "../../helpers/db";
import { Tracks as InitialTracks } from "../../data/initial_data";
import Track from "../../models/track";

export const loadTracks = () => {
  return async dispatch => {
    try {
      const initResult = await init();
      //await deleteTracks()
      let dbResult = await fetchTracks();
      let dbTracks: Track[] = dbResult.rows._array;
      if (!dbTracks || dbTracks.length === 0) {
        console.log("create defaults");
        await createDefaults();
        dbResult = await fetchTracks();
        dbTracks = dbResult.rows._array;
      }

      dispatch({ type: FETCH_TRACKS, tracks: dbTracks });
    } catch (err) {
      throw err;
    }
  };
};

const createDefaults = async () => {
  for (const track of InitialTracks) {
    console.log("create default", track.url);
    await insertTrack(track.name, track.logoUrl, track.url);
  }
};

export const insertTrack = async (name, logo, stream) => {
  try {
    const dbResult = await insertTrackDb(name, logo, stream);
    console.log("insert", stream);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateTrack = async (id, name, logo, stream) => {
  try {
    const dbResult = await updateTrackDb(id, name, logo, stream);
    console.log("update", dbResult, stream);
  } catch (err) {
    throw err;
  }
};
