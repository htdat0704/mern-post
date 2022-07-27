import {PostContext} from './PostContext';
import { postReducer,postLoading } from '../../reducers/PostReducer/postReducer';
import axios from 'axios';
import {setPostSuccess, setPostFail,setAddPost, deletePost, updatePost, getPost, setDefault} from '../../reducers/PostReducer/postActions'
import {useReducer, useState} from 'react'
import setAuthToken from '../../utils/setAuthToken';
import { LOCAL_STORAGE_TOKEN_NAME } from '../constant';


function PostProvider({children}) {

    const [postState,dispatch] = useReducer(postReducer,postLoading);
    const [showAddPost,setShowAddPost] = useState(false)
    // const [postFullState,setPostFull] = useState({  
    //     postLoading: true,
    //     posts: []
    // })


    const getPosts = async() => {
        try{
            const response = await axios.get(`http://localhost:5000/post`)
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
            const response = await axios.get('http://localhost:5000/post/user')
            if(response.data.success){
                dispatch(setPostSuccess(response.data.posts))

            }
        }catch(e){
            dispatch(setPostFail)
        }
    }

    const addPost = async newPost =>{
        try{
            const response = await axios.post('http://localhost:5000/post/create', newPost)
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
            const response  = await axios.delete(`http://localhost:5000/post/delete/${postId}`)
            if(response.data.success){
                dispatch(deletePost(postId))
            }
        }catch (e){
            console.log(e)
        }
    }

    const updateOnePost = async updatePostForm => {
        try{
            const response = await axios.put(`http://localhost:5000/post/update/${updatePostForm._id}`,updatePostForm)
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
            const response = await axios.get(`http://localhost:5000/post/get/${slug}`)
            if(response.data.success){
                await dispatch(getPost(response.data.postFind))
            }
            return response;
        }catch(e){
            console.log(e)
        }
    }

    const setStateDefault = () => {
        dispatch(setDefault())
    }


    const postContext = {postState, getPosts, getPostOneUsers,showAddPost,setShowAddPost, addPost, deletePostt, getOnePost, updateOnePost, setStateDefault}

    return (
        <PostContext.Provider value={postContext} >
            {children}
        </PostContext.Provider>
    )
}

export default PostProvider