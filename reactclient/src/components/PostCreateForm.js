import React, { useState } from 'react'
import Constants from '../utilities/Constants'

export default function PostCreateForm(props) {
    const initialformData = Object.freeze({
        title: "Post X",
        content: "This is post X and also "
    });

    const [formData, setformData] = useState(initialformData);

    // to be focused on change for each field of the form, when anyone changes
    // e.target.value update the e.target.name (fieldName, must be the same 
    // used in the HTML form) and update de formData
    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const postCreate = {
            postId: 0,
            title: formData.title,
            content: formData.content
        };

        const url = Constants.API_URL_CREATE_POST;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postCreate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

        props.onPostCreated(postCreate);
    };


    return (
        <form className='w-100 px-5'>
            <h1 className='mt-5'>Create new Post</h1>
            <div className='mt-5'>
                <label className='h3 form-label'>Post Title</label>
                <input value={formData.title} name="title" type="text" className='form-control' onChange={handleChange} />
            </div>

            <div className='mt-4'>
                <label className='h3 form-label'>Post Content</label>
                <input value={formData.content} name="content" type="text" className='form-control' onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Submit</button>
            <button onClick={() => props.onPostCreated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Cancel</button>

        </form>
    );
}
