import axios from "axios";


export const api = async (url, method, token, body, username, password) => {
  try {
    let authorization = "";

    authorization = `"Bearer " + ${token}`;

    const options = {
      url: url,
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: authorization,
      },

      data: body,
    };

    const response = await axios(options);
  
    return response.data;
  } catch (e) {
    console.log(e);
  }
};