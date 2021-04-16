import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios'

export const Home = () => {
    
    const [posts, setPosts] = useState([])
    const [show, setShow] = useState(false);

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = (post) => {
        setShow(true);
        setTitle(post.title)
        setDesc(post.content)
    }
    const getPosts = async () => {
        const { data: posts } = await axios.get('/api/posts')
        setPosts(posts.reverse())
    }

    useEffect(() => {
        getPosts()
    }, []);

    return (
    <div>
    <div className="card mb-3">
        {posts.map((post) => (
            <div key={post._id}>
            <div className="card w-50 mx-auto">
                    <div className="card-body mb-3">
                        <h5 className="card-title">{post.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">By {post.createdBy.username}</h6>
                            <p className="card-text"><small className="text-muted">{post.createdAt.substring(0,post.createdAt.indexOf("T"))}</small></p>
                            <Button variant="btn btn-success w-50" onClick={() => handleShow(post)}>
                                Read
                            </Button>
                    </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{desc}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
            </Modal>
            </div>
        ))}
    </div>
    </div>
    )
}
