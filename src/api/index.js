/**
 * This file features and exports all of our calls to the API
 */

export const COHORT_NAME = "2303-FTB-ET-WEB-PT";
export const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
export const TOKEN = "fill in token process here";

// POST SECTION

// fetching POSTs to show the data on the page
export const fetchPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const result = await response.json();
    console.log("result: ", result);
    return result;
  } catch (err) {
    console.log("No Posts Available", err);
  }
};

// // Creating or making a new post and sending the data to the server
// const makePost = async () => {
//   try {
//     const response = await fetch(`${BASE_URL}/posts`, {
//       method: "POST",
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

// //editing a post if you have authored it

// const updatePost = async () => {
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

/* EVERYTHING BELOW THIS LINE IS EXAMPLE CODE FROM THE ART COLLECTOR WE CAN USE*/

/**
 * This will make a call to the API for a single term and value (e.g. "person", and "unknown"), and return the result
 */

// export async function fetchQueryResultsFromTermAndValue(term, value) {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/object?${KEY}&${term}=${encodeURI(
//         value.split("-").join("|")
//       )}`
//     );
//     const data = await response.json();

//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

/**
 * This will make a call to the API for a preformed url (useful for previous and next buttons), and return the result
 */

// export async function fetchQueryResultsFromURL(url) {
//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

/**
 * Requires an object { century: '', classification: '', queryString: '' } to be passed in as an argument
 *
 * Then makes a call to the API, and returns the first page of results
 */

// export async function fetchQueryResults({
//   century = "",
//   classification = "",
//   queryString = "",
// }) {
//   const url = `${BASE_URL}/object?${KEY}&classification=${classification}&century=${century}&keyword=${queryString}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

/**
 * This returns early if there are centuries stored in localStorage, or fetches them from the API and stores them in localStorage if not
 */

// export async function fetchAllCenturies() {
//   if (localStorage.getItem("centuries")) {
//     return JSON.parse(localStorage.getItem("centuries"));
//   }

//   const url = `${BASE_URL}/century?${KEY}&size=100&sort=temporalorder`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     const records = data.records;

//     localStorage.setItem("centuries", JSON.stringify(records));

//     return records;
//   } catch (error) {
//     throw error;
//   }
// }

/**
 * This returns early if there are classifications stored in localStorage, or fetches them from the API and stores them in localStorage if not
 */

// export async function fetchAllClassifications() {
//   if (localStorage.getItem("classifications")) {
//     return JSON.parse(localStorage.getItem("classifications"));
//   }

//   const url = `${BASE_URL}/classification?${KEY}&size=100&sort=name`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     const records = data.records;

//     localStorage.setItem("classifications", JSON.stringify(records));

//     return records;
//   } catch (error) {
//     throw error;
//   }
// }
