export const play = async (radioUrl: string) => {
  getToRadio(radioUrl, "play");
};

export const stop = async (radioUrl: string) => {
  getToRadio(radioUrl, "stop");
};

export const addToPlaylist = async (radioUrl: string, streamUrl: string, streamId: string) => {
  postToRadio(radioUrl, "add", streamUrl, streamId);
};

export const ping = async (radioUrl: string) => {
  return getToRadio(radioUrl, "ping")
}

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
      return resData
    }
  } catch (err) {
    throw new Error("something went wrong");
  }
};

const postToRadio = async (
  radioUrl: string,
  method: string,
  paramsData: string,
  streamId: string
) => {
  const headers = {
    "Content-Type": "application/json"
  };
  const data = JSON.stringify({
    "track": paramsData,
    "streamId": streamId
  });
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
    return resData
  }
};
