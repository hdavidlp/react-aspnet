import React from "react";



export default function App() {
  return (
    <div className="container" >
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <h1>Hello Bootstrap</h1>
          {renderPostsTable() }
        </div>
      </div>
      Hello World
    </div>
  );


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
            <tr>
              <th scope="row">1</th>
              <td>Post 1 Title</td>
              <td>Post 1 Content</td>
              <td>
                <button className="btn btn-dark btn-lg mx-3 my-3">Update</button>
                <button className="btn btn-secondary btn-lg ">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}


