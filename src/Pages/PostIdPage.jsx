import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostService from '../API/PostService'
import Loader from '../components/UI/Loader/Loader'
import useFetching from '../hook/useFetching'

function PostIdPage() {
    const params = useParams()
    const [post, setPosts] = useState({})
    const [comments, setComments] = useState([])

    const [fetchPostById, isLoading] = useFetching(async (id) => {
        const response = await PostService.getById(params.id)
        setPosts(response.data)
    })
    const [fetchComments, isComLoading] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(params.id)
        setComments(response.data)
    })
    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, []) 
    return (
        <div>
            <h1>Post: {params.id}</h1>
            {isLoading
                ? <Loader />
                : <div>{post.id}. {post.title}</div>
            }
            <h1>
                Comments:
            </h1>
            {isComLoading
                ? <Loader />
                : <div>{comments.map(comm =>
                    <div style={{ marginTop: 15 }}>
                        <h5>{comm.email}</h5>
                        <div>{comm.body}</div>
                    </div>
                )}
                </div>
            }
        </div>
    )
}

export default PostIdPage