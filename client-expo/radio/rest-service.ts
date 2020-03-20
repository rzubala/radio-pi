export const play = async (radioUrl: string) => {
  getToRadio(radioUrl, "play");
};

export const stop = (radioUrl: string) => {
  getToRadio(radioUrl, "stop");
};

export const addToPlaylist = async (radioUrl: string, streamUrl: string) => {
  postToRadio(radioUrl, "add", streamUrl);
};

const getToRadio = async (radioUrl: string, method: string) => {
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
