export const play = radioUrl => {
  sendToRadio(radioUrl, "play");
};

export const stop = radioUrl => {
  sendToRadio(radioUrl, "stop");
};

const sendToRadio = async (radioUrl, method) => {
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
