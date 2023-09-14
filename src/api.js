import React, { useState, useEffect } from 'react';

const [data, setData] = useState(null);
useEffect(() => {
     const apiUrl = 'https://api.example.com/data';

     // Fetch data using the fetch API
     fetch(apiUrl)
       .then((response) => response.json())
       .then((result) => {
         setData(result);
       })
       .catch((error) => {
         console.error('Error fetching data:', error);
       });
   }, []); 
// Empty dependency array means this effect runs once on component mount


// ------------------------------------------------------------------------------



// import axios from "axios";


// export const api = async (url, method, token, body, username, password) => {
//   try {
//     let authorization = "";

//     authorization = `"Bearer " + ${token}`;

//     const options = {
//       url: url,
//       method: method,
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json;charset=UTF-8",
//         Authorization: authorization,
//       },

//       data: body,
//     };

//     const response = await axios(options);
  
//     return response.data;
//   } catch (e) {
//     console.log(e);
//   }
// };
