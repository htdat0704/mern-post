export const SET_AUTH = 'set_auth'
export const SET_DEFAULT = 'set_default'

export const setAuthSuccess = (response) => {
    return {
        type: SET_AUTH,
        payload: {
            isAuthenticated: true,
            user: response
        }
    }
}

export const setAuthFail = () => {
    return {
        type: SET_AUTH,
        payload: {
            isAuthenticated: false,
            user: null
        }
    }
}

export const setAuthDefult = () => {
    return {
        type: SET_DEFAULT
    }
}