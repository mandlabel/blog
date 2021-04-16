import React, { useState, useContext } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from "../context/AuthContext";
export const MyPosts = () => {

    const { loggedIn } = useContext(AuthContext)

    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        const { data: posts } = await axios.get('/api/mypost')
        setPosts(posts.reverse())
    }
    const deletePost = async (id) => {     
        try {
            const { data } = await axios.delete(`/api/remove/${id}`)
            console.log(data)
            await getPosts()
        }
        catch(err) {
            console.error(err)
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-outline-success p0-w25 mx-auto" onClick={() => getPosts()}>Show my Posts</button>
            </div>
            {posts.map((post) => (
            <div key={post._id}>
            <div className="card w-75 border-primary mb-3 mx-auto">
            <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text h8">{post.content}</p>

                <div className="card-footer">
                    <b>Created at:</b> {post.createdAt.substring(0,post.createdAt.indexOf("T"))}
                </div>
                {loggedIn === true && (
                    <>
                        <Link to={`/edit/${post._id}`} className="btn btn-success p-0 w-25">Edit Post</Link>   
                        <button className="btn btn-danger p-0 w-25" aria-label="Delete" onClick={() => deletePost(post._id)}>Delete</button> 
                    </>
                )}   
            </div>
            </div>
            </div>
            ))}   
        </div>
    )
}
