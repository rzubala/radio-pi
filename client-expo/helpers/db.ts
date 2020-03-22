import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("tracks.db");

export const init = () => {
    const promise = new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS tracks (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, imageUri TEXT NOT NULL, streamUri TEXT NOT NULL);",
          [],
          () => {
              resolve()
          },
          (_, err) => {
              reject(err)
              return false
          }
        );
      });
    });
    return promise
  };

  export const insertTrack = (name: string, imageUri: string, streamUri: string) => {
    const promise = new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "INSERT INTO tracks (name, imageUri, streamUri) values (?, ?, ?);",
          [name, imageUri, streamUri],
          (_, result) => {
              resolve(result)
          },
          (_, err) => {
              reject(err)
              return false
          }
        );
      });
    });
    return promise
  };

  export const fetchTracks = () => {
    const promise = new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM tracks;",
          [],
          (_, result) => {
              resolve(result)
          },
          (_, err) => {
              reject(err)
              return false
          }
        );
      });
    });
    return promise
  };
  