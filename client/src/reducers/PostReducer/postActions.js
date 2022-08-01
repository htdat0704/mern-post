export const SET_POST_SUCCESS = 'set_post_success';
export const SET_POST_FAIL = 'set_post_fail';
export const ADD_POST = 'add_post';
export const LOGOUT_USER_POST = 'logout_user_post';
export const DELETE_POST = 'delete_post';
export const UPDATE_POST = 'update_post';
export const GET_POST = 'get_post';
export const SET_DEFAULT = 'set_default';
export const GET_COMMENT = 'get_comment';
export const ADD_COMMENT = 'add_comment';
export const DELETE_COMMENT = 'delete_comment';
export const UPDATE_COMMENT = 'update_comment';

export const updateComment = payload => {
  return {
    type: UPDATE_COMMENT,
    payload,
  };
};
export const deleteComment = commentID => {
  return {
    type: DELETE_COMMENT,
    payload: commentID,
  };
};

export const addCommentSuccess = payload => {
  return {
    type: ADD_COMMENT,
    payload,
  };
};
export const getComment = payload => {
  return {
    type: GET_COMMENT,
    payload,
  };
};

export const setDefault = () => {
  return {
    type: SET_DEFAULT,
  };
};

export const setPostSuccess = response => {
  return {
    type: SET_POST_SUCCESS,
    payload: response,
  };
};

export const setPostFail = () => {
  return {
    type: SET_POST_FAIL,
    payload: [],
  };
};

export const setAddPost = payload => {
  return {
    type: ADD_POST,
    payload: payload,
  };
};

export const logoutUserPost = () => {
  return {
    type: LOGOUT_USER_POST,
    payload: [],
  };
};

export const deletePost = postId => {
  return {
    type: DELETE_POST,
    payload: postId,
  };
};

export const updatePost = payload => {
  return {
    type: UPDATE_POST,
    payload: payload,
  };
};

export const getPost = payload => {
  return {
    type: GET_POST,
    payload: payload,
  };
};
