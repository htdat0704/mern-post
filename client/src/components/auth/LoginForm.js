import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link, useNavigate } from 'react-router-dom'
import {useState, useContext} from 'react'
import { AuthContext } from '../../context/Auth/AuthContext'


const LoginForm = () => {
    const navigate = useNavigate();
    const {loginUser} = useContext(AuthContext);
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    })
    const {username, password} = loginForm;

    const handleOnChange =  e => setLoginForm({...loginForm, [e.target.name]: e.target.value})

    const login = async event => {
        event.preventDefault()

        try{
            const loginData = await loginUser(loginForm);
            if(loginData.success){
                navigate('/dashboard')
            }else{
                alert(loginData.message)
            }
        }catch(e){
            console.log(e)
        }
    }

    

    return(
        <>
            <Form  className='my-4 form-group' onSubmit={login}>
                <Form.Group >
                    <Form.Control 
                        type='text' 
                        placeholder='Username' 
                        name ='username' 
                        required 
                        value={username}
                        onChange={handleOnChange}
                    />
                </Form.Group>

                <Form.Group >
                    <Form.Control 
                        type='password' 
                        placeholder='Password'
                        name ='password' 
                        required 
                        value={password}
                        onChange={handleOnChange}
                    />
                </Form.Group>
           
                <Button variant='success' type='submit'>Login</Button>
            </Form>
            <p>Don't have any account? 
                <Link to='/register'>
                    <Button variant='info' size='sm' className='ml-2'>Resgister</Button>
                </Link>
            </p>
        </>
    )
}

export default LoginForm