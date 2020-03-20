export const play = async radioUrl => {
  sendToRadio(radioUrl, "core.playback.play", null);
};

export const stop = async radioUrl => {
  sendToRadio(radioUrl, "core.playback.stop", null);
};

export const clearPlaylist = async radioUrl => {
  sendToRadio(radioUrl, "core.tracklist.clear", null);
};

export const addToPlaylist = async (radioUrl, streamUrl) => {
  sendToRadio(radioUrl, "core.tracklist.add", {
    tracks: null,
    at_position: null,
    uri: streamUrl
  });
};

const sendToRadio = async (radioUrl, method, paramsData) => {
  const response = await fetch(`${radioUrl}/mopidy/rpc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      method: method,
      jsonrpc: "2.0",
      params: paramsData,
      id: 1
    })
  });
  if (!response.ok) {
    const errorResData = await response.json();
    console.log("error!");
    console.log(errorResData);
  } else {
    const resData = await response.json();
    //console.log(resData);
  }
};
