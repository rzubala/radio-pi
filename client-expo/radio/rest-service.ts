export const restart = (radioUrl: string) => {
  return getToRadio(radioUrl, "restart");
};

export const shutdown = (radioUrl: string) => {
  return getToRadio(radioUrl, "shutdown");
};

export const play = async (radioUrl: string) => {
  return getToRadio(radioUrl, "play");
};

export const stop = async (radioUrl: string) => {
  return getToRadio(radioUrl, "stop");
};

export const addToPlaylist = async (
  radioUrl: string,
  streamUrl: string,
  streamId: string
) => {
  const data = {
    track: streamUrl,
    streamId: streamId
  };
  postToRadio(radioUrl, "add", data);
};

export const setVolume = (radioUrl: string, volume: number) => {
  const data = {
    volume: volume
  };
  return postToRadio(radioUrl, "volume", data);
};

export const ping = async (radioUrl: string) => {
  return getToRadio(radioUrl, "ping");
};

const getToRadio = async (radioUrl: string, method: string) => {
  try {
    const response = await fetch(`${radioUrl}/${method}`, {
      method: "GET"
    });
    if (!response.ok) {
      const errorResData = await response.json();
      console.log("error!");
      console.log(errorResData);
    } else {
      const resData = await response.json();
      //console.log(resData);
      return resData;
    }
  } catch (err) {
    throw new Error("something went wrong");
  }
};

const postToRadio = async (
  radioUrl: string,
  method: string,
  paramsData: any
) => {
  try {
    const headers = {
      "Content-Type": "application/json"
    };
    const data = JSON.stringify(paramsData);
    const response = await fetch(`${radioUrl}/${method}`, {
      method: "POST",
      headers: headers,
      body: data
    });
    if (!response.ok) {
      const errorResData = await response.json();
      console.log("error!");
      console.log(errorResData);
    } else {
      const resData = await response.json();
      //console.log(resData);
      return resData;
    }
  } catch (err) {
    throw new Error("something went wrong");
  }
};
