import {useState,useContext} from 'react';
import { AuthContext } from '../../context/Auth/AuthContext';
import Comment from './Comment'
import CommentForm from './CommentForm'
import { PostContext } from '../../context/Post/PostContext';
import { Link } from 'react-router-dom';

const Comments = () =>{
    const [activeComment, setActiveComment] = useState(null);
    const { postState: {comments}, addComment, deleteCommentId} = useContext(PostContext);
    const {state: {isAuthenticated}} = useContext(AuthContext)


    const rootCommentsNoParent = comments.filter (backend =>backend.parentId === null);
    const getReplies = commenId => {
        return comments.filter(backendComment => backendComment.parentId === commenId).sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }
    
    const addCommentText = (text,parentId = null) => {
        addComment(text,parentId)
       
    }

    const deleteCommentText = (idComment) => {
        deleteCommentId(idComment)
    }

    const updateComment = (text, commentId) => {
        console.log("update")
      };


    return <div className='comments'>
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