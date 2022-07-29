import { authReducer,authLoading } from '../../reducers/AuthReducer/authReducer';
import { setAuthFail, setAuthSuccess, setAuthDefult } from '../../reducers/AuthReducer/authActions';
import { useReducer,useEffect} from 'react'
import { AuthContext } from './AuthContext';
import axios from 'axios'
import { LOCAL_STORAGE_TOKEN_NAME, apiUrl, apiUrlHeroku } from '../constant'
import setAuthToken from '../../utils/setAuthToken'



const AuthContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(authReducer,authLoading);
    
    // login succeess
    const loadUser = async()  => {
        let check = false;
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            await setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
            check=true
        }
        

        try{
            let response
            if(check){
                response = await axios.get(`${apiUrlHeroku}/auth`)
            }
            if(response.data.success){
                dispatch(setAuthSuccess(response.data.user))
            }
        }catch(e){
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch(setAuthFail())
       }
    }

    // useEffect(() => {
    //     loadUser()
    // },[])

    const loginUser = async userForm => {
        try{
            const response =await axios.post(`${apiUrlHeroku}/auth/login`,userForm);
            if(response.data.success)
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            dispatch(setAuthSuccess(response.data.user))
            return response.data
        }catch(e){
            console.log(e)
            if(e.response.data) return e.response.data;
            else return {success: false, message: e.message}
        }
    }

    const registerUser = async userForm => {
        try{
            const response =await axios.post(`${apiUrlHeroku}/auth/register`,userForm);
            if(response.data.success)
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            dispatch(setAuthSuccess(response.data.newUser))
            return response.data
        }catch(e){
            console.log(e)
            if(e.response.data) return e.response.data;
            else return {success: false, message: e.message}
        }
    }

    const logoutUser = async () => {
        await delete axios.defaults.headers.common['Authorization']
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispatch(setAuthDefult())
    }


    const authContextData = {registerUser, loginUser,logoutUser, state, loadUser}

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider