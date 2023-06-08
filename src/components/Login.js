// Login Component to either register or access

// Creating a new User and sending it to the server for a token
const registerUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: "superman27",
          password: "krypt0n0rbust",
        },
      }),
    });
    const result = await response.json();
    // You can log ▲▲▲ the result
    // here ▼▼▼ to view the json object before returning it
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

// How to login when you have access and a token
const login = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: "superman27",
          password: "krypt0n0rbust",
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

// Sample Result of if it worked:
//   {
//     "success": true,
//     "error": null,
//     "data": {
//       "token": "xyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTg5MDY2ZGQ0MzkxNjAwTc1NTNlMDUiLCJ1c2VybmFtZSI6Im1hdHQiLCJpYXQiOjE1ODYwMzgzODF9.CTj4owBl0PB-G6G4E_1l6DS6_cVc0iKcMzBIWFUYM1p",
//       "message": "Thanks for signing up for our service."
//     }
//   }

//example:
//   // example of token authorization if you are a logged in user
// const someFunction = async (token) => {
//     try {
//       const response = await fetch(`${BASE_URL}/someEndPoint`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           /* whatever things you need to send to the API */
//         }),
//       });
//       const result = await response.json();
//       console.log(result);
//       return result;
//     } catch (err) {
//       console.error(err);
//     }
//   };

// If token isn't working, response below:
// {
//     "success": false,
//     "error": {
//         "type": "InvalidToken",
//         "message": "Invalid token, please sign up or log in"
//     },
//     "data": null
// }
