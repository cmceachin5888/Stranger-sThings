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
    throw new Error("Trouble Logging In");
  }
  if (!result.success) {
    throw new Error(result.error.message);
  }

  return result.data;
};

// get user data when logged in

export const fetchUserData = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

// POST SECTION

// fetching POSTs to show the data on the page
export const fetchPosts = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "GET",
      headers: {
        "Content-type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    const posts = result.data.posts;

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
  location,
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
          location,
          willDeliver,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    return result.data;
  } catch (err) {
    console.error(err);
  }
};

// //editing a post if you have authored it
export const updatePost = async (
  postId,
  token,
  title,
  description,
  price,
  location,
  willDeliver
) => {
  let result;

  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
          willDeliver,
        },
      }),
    });
    result = await response.json();
    console.log(result);
  } catch (err) {
    throw new Error("Failed to update post");
  }
  console.log(result);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  return result.data;
};

// // Deleting a post component
export const deletePost = async (token, postId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      return result.data;
    } else {
      throw new Error("Failed to delete post");
    }
  } catch (error) {
    console.error(error);
  }
};
