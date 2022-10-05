import React, { useState } from "react";
import Constants from "./utilities/Constants";
import PostCreateForm from "./components/PostCreateForm";
import PostUpdateForm from "./components/PostUpdateForm";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [showingCreateNewPostForm, setShowingCreateNewPostForm] = useState(false);
  const [postCurrentlyBeingUpdated, setPostCurrentlyBeingUpdated] = useState(null);

  function showsPostsCount() {
    console.log('Si anda pasando por aqui');
    return (<p> Posts ({posts.length}) </p>);
  }

  function getPosts() {
    const url = Constants.API_URL_GET_ALL_POSTS;  // 'https://localhost:7100/get-all-posts';
    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(postsFromServer => {
        //console.log(postsFromServer);
        setPosts(postsFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function deletePost(postId){
    const url = `${Constants.API_URL_DELETE_POST_BY_ID}/${postId}`;  
    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer)
        onPostDeleted(postId);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

  }

  function renderPostsTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">PostId (PK)</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">CRUD Operation</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.postId}>
                <th scope="row">{post.postId}</th>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>
                  <button onClick={() => setPostCurrentlyBeingUpdated(post)} className="btn btn-dark btn-lg mx-3 my-3">Update</button>
                  <button onClick={() => {if(window.confirm(`Are you sure ? title:"${post.title}"`)) deletePost(post.postId)}} className="btn btn-secondary btn-lg ">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setPosts([])} className="btn btn-dark btn-lg w-100">Empty React posts array</button>
      </div>
    );
  }

  function onPostCreated(createdPost) {
    setShowingCreateNewPostForm(false);
    if (createdPost === null) {
      return;
    }

    alert(`Post succesfully created "${createdPost.title}" id: "${createdPost.postId}"  will show`);

    getPosts();
  }

  
  function onPostUpdated(updatedPost) {
    setPostCurrentlyBeingUpdated(null);
    if (updatedPost === null) {
      return;
    }

    let postsCopy = [...posts];

    const index = postsCopy.findIndex((postsCopyPost) => {
      if (postsCopyPost.postId === updatedPost.postId) {
        return true;
      }
    });

    if (index !== -1) {
      postsCopy[index] = updatedPost;
    }

    setPosts(postsCopy);
    alert(`Post successfuly updated. "${updatedPost.title}"`);
  }

  function onPostDeleted(deletedPostId) {
    let postsCopy = [...posts];

    const index = postsCopy.findIndex((postsCopyPost) => {
      if (postsCopyPost.postId === deletedPostId) {
        return true;
      }
    });

    if (index !== -1) {
      postsCopy.splice(index, 1);
    }

    setPosts(postsCopy);
    alert('Post successfuly deleted');
  }


  return (
    <div className="container" >
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {(showingCreateNewPostForm === false && postCurrentlyBeingUpdated === null) && (
            <div>
              <h1>ASP.NET - React </h1>
              <div className="mt-5">
                <button onClick={getPosts} className="btn btn-dark btn-lg w-100">Get Post From Server</button>
                <button onClick={() => setShowingCreateNewPostForm(true)} className="btn btn-secondary btn-lg w-100 mt-4">Create new Post</button>
              </div>
            </div>
          )}


          {(posts.length > 0 && showingCreateNewPostForm === false && postCurrentlyBeingUpdated === null) && renderPostsTable()}

          {showingCreateNewPostForm && <PostCreateForm onPostCreated={onPostCreated} />}

          {postCurrentlyBeingUpdated !== null && <PostUpdateForm post={postCurrentlyBeingUpdated} onPostUpdated={onPostUpdated} />}

          {(posts.length > 5) && showsPostsCount()}

        </div>
      </div>

    </div>
  );






}


