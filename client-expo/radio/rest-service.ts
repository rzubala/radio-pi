export const play = async (radioUrl: string) => {
  getToRadio(radioUrl, "play");
};

export const stop = (radioUrl: string) => {
  getToRadio(radioUrl, "stop");
};

export const addToPlaylist = async (radioUrl: string, streamUrl: string) => {
  postToRadio(radioUrl, "add", streamUrl);
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
  paramsData: string
) => {
  const headers = {
    "Content-Type": "application/json"
  };
  const data = JSON.stringify({
    "track": paramsData
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
  }
};
