import { SET_POST_SUCCESS, SET_POST_FAIL,ADD_POST, DELETE_POST,UPDATE_POST,GET_POST , SET_DEFAULT } from "./postActions";

export const postLoading = {
    post:null,
    postLoading: true,
    posts: []
}

export const postReducer = (state,action) => {
    const{type,  payload} = action;
    switch(type){
        case SET_DEFAULT:
            return{
                post:null,
                postLoading: true,
                posts: []
            }
        case GET_POST:
            return{
                ...state,
                post: payload,
                postLoading: false,
            }
        case SET_POST_SUCCESS:
            return {
                ...state,
                posts: payload, 
                postLoading: false,
            };
        case SET_POST_FAIL:
            return {
                ...state,
                posts: payload,
                postLoading: false,
            }
        case ADD_POST :
            return{
                ...state,
                posts: [...state.posts, payload]
            }
        case DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter(post => post._id !== payload )
            }
        case UPDATE_POST:
            const newPosts = state.posts.map(post =>
				post._id === payload._id ? payload : post
			)
            return{
                ...state,
                posts: newPosts,
                post: payload,
                postLoading: false,
            }
        default:
            return {
                ...state,
                posts: payload, 
                postLoading: false,
            };
    }
}