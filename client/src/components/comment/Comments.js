import {useState,useContext, useEffect} from 'react';
import { AuthContext } from '../../context/Auth/AuthContext';
import Comment from './Comment'
import CommentForm from './CommentForm'
import { PostContext } from '../../context/Post/PostContext';
import { Link } from 'react-router-dom';
import LoadingModal from '../layout/LoadingModel';

const Comments = () =>{
    const [activeComment, setActiveComment] = useState(null);
    const { postState: {comments}, addComment, deleteCommentId, updateCommentId} = useContext(PostContext);
    const {state: {isAuthenticated}} = useContext(AuthContext)
    const [isShowLoading, setShowLoading] = useState({
        type: '',
        show: false,
    });

    const loadingShow = (type) => {
        setShowLoading(prev => ({
            ...prev,
            type: type,
            show: true,
        }))
        setTimeout(() => {
            setShowLoading(prev => ({
                ...prev,
                show: false,
            }))
        },1500)
    }   


    const rootCommentsNoParent = comments.filter (backend =>backend.parentId === null);
    const getReplies = commenId => {
        return comments.filter(backendComment => backendComment.parentId === commenId).sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }
    
    const addCommentText = (text,parentId = null) => {
        addComment(text,parentId)
        loadingShow('ADD')
    }

    const deleteCommentText = (idComment) => {
        deleteCommentId(idComment)
        loadingShow('DELETE')
    }

    const updateComment = (text, commentId) => {
        updateCommentId(text, commentId)
        loadingShow('UPDATE')
    };


    return <div className='comments'>
        <LoadingModal show={isShowLoading.show} type={isShowLoading.type}></LoadingModal>
        <h3 className='comments-title'>Comments</h3>
        {isAuthenticated && <>
            <div className='comment-form-title'>Write Comment</div>
            <CommentForm submitLabel="Add" handleSubmit={addCommentText}/>
        </>}
        {!isAuthenticated && <>
            <div className='comment-form-title container ' style={{textAlign: 'center'}}>Login to comment</div>
            <Link to='/login'><button className="comment-form-button container" >Login</button></Link>
        </>}
        <div className='comments-container'>
            {rootCommentsNoParent.map(rootComment => (
                <Comment 
                    key={rootComment._id} 
                    comment={rootComment} 
                    replies={getReplies(rootComment._id)}
                    deleteComment = {deleteCommentText}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                    updateComment={updateComment}
                    addComment={addCommentText}
                />
            ))}
        </div>
        
    </div>
}

export default Comments