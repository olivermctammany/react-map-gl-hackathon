/* eslint-disable */
// Example POST method implementation:
export const postData = async (url = "", data = {}, jwt) => {
    // Default options are marked with *
    const req = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: "no-cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        // "Content-Type": "application/json",
        "JWT": jwt,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: "follow", // manual, *follow, error
      // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    }
    // console.log("req", req, JSON.stringify(req));
    const response = await fetch(url, req);
    return response && response.body ? response.json() : null; // parses JSON response into native JavaScript objects
  }; 
  