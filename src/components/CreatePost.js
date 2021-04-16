import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";
export const CreatePost = () => {

    const [title, setTitle] = useState('Title')
    const [content, setContent] = useState('Content...')

    const history = useHistory();

    const newP = async () => {

        try {
            await axios.post('/api/posts', {
                title,
                content,
              })

            history.push('/')
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <h5 className="card-header text-center">Post something new...</h5>
                    <div className="card-body">
                        Title:
                        <input onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" />
                        Content:
                        <textarea onChange={(e) => setContent(e.target.value)} value={content} className="form-control" />
                            <br></br>
                        <button className="btn btn-success  col text-center" onClick={newP}>Create Post</button>
                    </div>
                </div>
        </div>
    )
}