import {PostContext} from './PostContext';
import { postReducer,postLoading } from '../../reducers/PostReducer/postReducer';
import axios from 'axios';
import {setPostSuccess, setPostFail,setAddPost, deletePost, updatePost, getPost, setDefault, getComment, addCommentSuccess, deleteComment} from '../../reducers/PostReducer/postActions'
import {useReducer, useState} from 'react'
import setAuthToken from '../../utils/setAuthToken';
import { LOCAL_STORAGE_TOKEN_NAME, apiUrl, apiUrlHeroku } from '../constant';


function PostProvider({children}) {

    const [postState,dispatch] = useReducer(postReducer,postLoading);
    const [showAddPost,setShowAddPost] = useState(false)
    // const [postFullState,setPostFull] = useState({  
    //     postLoading: true,
    //     posts: []
    // })


    const getPosts = async() => {
        try{
            const response = await axios.get(`${apiUrlHeroku}/post`)
            if(response.data.success){
                dispatch(setPostSuccess(response.data.postHaveUser))
                // setPostFull(prev => ({
                //     ...prev,
                //     posts: response.data.postHaveUser,
                //     postLoading: false,
                // }))
            }
        }catch(e){
            dispatch(setPostFail)
       }    
    }


    const getPostOneUsers = async() => {
        try{
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
            const response = await axios.get(`${apiUrlHeroku}/post/user`)
            if(response.data.success){
                dispatch(setPostSuccess(response.data.posts))

            }
        }catch(e){
            dispatch(setPostFail)
        }
    }

    const addPost = async newPost =>{
        try{
            const response = await axios.post(`${apiUrlHeroku}/post/create`, newPost)
            if(response.data.success){
                await dispatch(setAddPost(response.data.postOut))
                return response.data
            }
        }catch(e){
            dispatch(setPostFail)
            console.log(e)
        }
    }

    const deletePostt = async postId => {
        try{
            await setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
            const response  = await axios.delete(`${apiUrlHeroku}/post/delete/${postId}`)
            if(response.data.success){
                dispatch(deletePost(postId))
            }
        }catch (e){
            console.log(e)
        }
    }

    const updateOnePost = async updatePostForm => {
        try{
            const response = await axios.put(`${apiUrlHeroku}/post/update/${updatePostForm._id}`,updatePostForm)
            if(response.data.success){
                dispatch(updatePost(response.data.post))
            }
            return response.data
        }catch(e){
            console.log(e)
            return e.message
        }
    }

    const getOnePost = async slug => {
        try{
            const response = await axios.get(`${apiUrlHeroku}/post/get/${slug}`)
            if(response.data.success){
                await dispatch(getPost(response.data.postFind))
                await dispatch(getComment(response.data.commentFind))
            }
            console.log(response.data.commentFind)
            return response;
        }catch(e){
            console.log(e)
        }
    }

    const addComment = async (body,parentId = null) => {
        try{
            const formComment = {
                body,
                parentId,
                postId : postState.post._id
            }
            const response = await axios.post(`${apiUrlHeroku}/post/createComment`, formComment)
            if(response.data.success){
                await dispatch(getComment(response.data.commentFind))
            }
        }catch(e){
            console.log(e)
        }
    }

    const deleteCommentId = async commentId => {
        try{
            await setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
            const response  = await axios.delete(`${apiUrlHeroku}/post/deleteComment/${commentId}`)
            if(response.data.success){
                dispatch(deleteComment(commentId))
            }
        }catch (e){
            console.log(e)
        }
    }

    const setStateDefault = () => {
        dispatch(setDefault())
    }


    const postContext = {postState, getPosts, getPostOneUsers,showAddPost,setShowAddPost, addPost, deletePostt, getOnePost, updateOnePost, setStateDefault,addComment, deleteCommentId }

    return (
        <PostContext.Provider value={postContext} >
            {children}
        </PostContext.Provider>
    )
}

export default PostProvider