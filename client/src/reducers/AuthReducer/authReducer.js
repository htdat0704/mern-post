import { SET_AUTH, SET_DEFAULT, UPDATE_USER } from './authActions';
export const authLoading = {
  authLoading: true,
  isAuthenticated: false,
  user: null,
};

export const authReducer = (state, action) => {
  const { type, payload } = action;
  const { isAuthenticated, user } = payload ?? '';
  switch (type) {
    case SET_DEFAULT:
      return {
        authLoading: true,
        isAuthenticated: false,
        user: null,
      };
    case SET_AUTH:
      return {
        ...state,
        isAuthenticated,
        user,
        authLoading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: payload,
      };
    default:
      return payload;
  }
};
