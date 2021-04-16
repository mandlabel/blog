import React, { useState } from 'react'
import axios from 'axios'
import { useRouteMatch } from 'react-router-dom'
import { useHistory } from "react-router-dom";
export const EditPost = () => {

    const [title, setTitle] = useState('Its a new Title')
    const [content, setContent] = useState('Its a new Content')

    const match = useRouteMatch()
    const post_id = match.params.id

    const history = useHistory();

    const editP = async (id) => {
        try {   
            const data = { title, content }
            const res = await axios.put(`/api/update/${id}`, data)
            console.log(res)

            history.push("/");
        }
        catch(err) {
            console.error(err)
        }
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <h5 className="card-header text-center">Edit Post</h5>
                    <div className="card-body">
                        Title:
                        <input onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" />
                        Content:
                        <textarea onChange={(e) => setContent(e.target.value)} value={content} className="form-control" />
                            <br></br>
                        <button className="btn btn-success  col text-center" onClick={() => editP(post_id)}>Edit Post</button>
                    </div>
                </div>
        </div>
    )
}