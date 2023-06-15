/* This file features and exports all of our calls to the API*/

export const COHORT_NAME = "2303-FTB-ET-WEB-PT";
export const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

// LOGIN AND REGISTER SECTION

// Creating a new User and sending it to the server for a token
export const registerUser = async (username, password) => {
  const minLength = 8;
  const specChar = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?!]+/;
  const uppercaseChar = /[A-Z]/;

  if (password.length < minLength) {
    throw new Error(`Password must be at least ${minLength} characters long.`);
  }
  if (!specChar.test(password)) {
    throw new Error(`Password must contain at least ONE special character.`);
  }
  if (!uppercaseChar.test(password)) {
    throw new Error(`Password must contain at least ONE Uppercase Letter.`);
  }

  let result;

  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    result = await response.json();
  } catch (err) {
    throw new Error("Register User API down");
  }
  // You can log ▲▲▲ the result
  // here ▼▼▼ to view the json object before returning it
  console.log(result);
  if (!result.success) {
    throw new Error(result.error.message);
  }

  return result.data;
};

// How to login when you have access and a token
export const loginUser = async (username, password) => {
  let result;

  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    result = await response.json();
    console.log(result);
  } catch (err) {
    throw new Error("Trouble Loggin In");
  }
  if (!result.success) {
    throw new Error(result.error.message);
  }

  return result.data;
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

// POST SECTION

// fetching POSTs to show the data on the page
export const fetchPosts = async () => {
  // setIsLoading(true);
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "GET",
      headers: {
        "Content-type": "Application/json",
      },
    });
    const result = await response.json();

    const posts = result.data.posts;
    console.log(result);
    return posts;
  } catch (err) {
    console.log("No Posts Available", err);
  }
};

// // Creating or making a new post and sending the data to the server
export const makePost = async (
  token,
  title,
  description,
  price,
  willDeliver
) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          willDeliver,
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

// //editing a post if you have authored it
// export const updatePost = async () => {
//   try {
//     // You will need to insert a variable into the fetch template literal
//     // in order to make the POST_ID dynamic.
//     // 5e8d1bd48829fb0017d2233b is just for demonstration.
//     const response = await fetch(`${BASE_URL}/posts/5e8d1bd48829fb0017d2233b`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${TOKEN_STRING_HERE}`,
//       },
//       body: JSON.stringify({
//         post: {
//           title: "My favorite stuffed animal",
//           description:
//             "This is a pooh doll from 1973. It has been carefully taken care of since I first got it.",
//           price: "$480.00",
//           location: "New York, NY",
//           willDeliver: true,
//         },
//       }),
//     });
//     const result = await response.json();
//     console.log(result);
//     return result;
//   } catch (err) {
//     console.error(err);
//   }
// };

// // Deleting a post component
// const deletePost = async () => {
//   try {
//     const response = await fetch(`${BASE_URL}/posts/5e8d1bd48829fb0017d2233b`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${TOKEN_STRING_HERE}`,
//       },
//     });
//     const result = await response.json();
//     console.log(result);
//     return result;
//   } catch (err) {
//     console.error(err);
//   }
// };
