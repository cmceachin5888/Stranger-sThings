// import React, { useState, useEffect } from "react";

// export const searchFunc = ({ posts, isLoggedIn, setIsLoggedIn }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const postMatches = (post, text) => {
//     return (
//       post.title.includes(text) ||
//       post.description.includes(text) ||
//       post.author.username ||
//       post.price ||
//       post.location
//     );
//   };

//   const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
//   const postsToDisplay = searchTerm.length ? filteredPosts : posts;

//   return (
//     <div>
//       <input
//         type="text"
//         name="Search"
//         value={searchTerm}
//         onChange={(event) => setSearchTerm(event.target.value)}
//       />

//       {/* {postsToDisplay.map((post) => (
//         <div className="posts" key={post._id}>
//           <h3>{post.title}</h3>
//           <div>{post.author?.username || "Unknown User"}</div>
//           <div>Description: {post.description}</div>
//           <div>Price: {post.price}</div>
//           <div>Location: {post.location}</div>
//           <div>
//             Will Deliver?:{" "}
//             {post.willDeliver ? "Will Deliver" : "Will NOT deliver"}
//           </div>
//           {isLoggedIn && (
//             <button onClick={() => handleViewPost(post._id)}>View Post</button>
//           )}
//         </div>
//       ))} */}
//     </div>
//   );
// };

// export default searchFunc;
