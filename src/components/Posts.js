// component for POSTs

import React, { useState, useEffect } from "react";
import { fetchPosts } from "../api";


export const renderAllPosts = async (props) => {
    const postList = props.postList
    const setPostList = props.setPostList

    console.log('posts: ', posts);

    useEffect(() => {
        Promise.all(fetchPosts())
        .then((posts) => {
          setPostList(posts);

        })
        .catch((error) => {
          console.error("uh oh", error);
        });
    }, [])

    return(
        <>
        <h1>Posts</h1>
                <div key={post.id}>
                <h3>{post.title}</h3>
                <div>{post.description}</div>
                <div>{post.price}</div>
                <div>{post.location}</div>
                <div>{post.willDeliver}</div>
                </div>
        </>
    );
}

export default renderAllPosts;



















//     useEffect(() => {
//         Promise.all([fetchPosts()])
//             await
//   try {
//     const posts = await fetchPosts();
//     if (!posts || posts.length === 0) {
//       posts;
//     }
//   } catch (error) {}
};
