import userIcon from '../../assets/user-icon.png';
import { AuthContext } from '../../context/Auth/AuthContext';
import { useContext } from 'react';
import CommentForm from './CommentForm';
import React from 'react';

const Comment = ({
  comment,
  replies,
  deleteComment,
  parentId = null,
  activeComment,
  setActiveComment,
  addComment,
  updateComment,
}) => {
  const {
    state: { isAuthenticated, user },
  } = useContext(AuthContext);
  let canEdit = false;
  let canDelete = false;
  if (isAuthenticated) {
    canEdit = user._id === comment.user._id;
    canDelete = user._id === comment.user._id;
  }

  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const canReply = isAuthenticated;

  const isReplying =
    activeComment &&
    activeComment.type === 'replying' &&
    activeComment.id === comment._id;
  const isEditing =
    activeComment &&
    activeComment.type === 'editing' &&
    activeComment.id === comment._id;
  const replyId = parentId ? parentId : comment._id;
  return (
    <div className="comment">
      <div className="comment-image-container">
        <img src={userIcon} alt="" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.user.username}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={text => updateComment(text, comment._id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({
                  id: comment._id,
                  type: 'replying',
                })
              }>
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({
                  id: comment._id,
                  type: 'editing',
                })
              }>
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment._id)}>
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={text => addComment(text, replyId)}
            handleCancel={() => {
              setActiveComment(null);
            }}
            hasCancelButton
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map(reply => (
              <Comment
                comment={reply}
                key={reply._id}
                replies={[]}
                deleteComment={deleteComment}
                parentId={comment._id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                addComment={addComment}
                updateComment={updateComment}></Comment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
