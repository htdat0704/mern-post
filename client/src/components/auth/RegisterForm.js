import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link, useNavigate } from 'react-router-dom'
import {useState, useContext} from 'react'
import { AuthContext } from '../../context/Auth/AuthContext'


const RegisterForm = () => {
    const navigate = useNavigate();
    const {registerUser} = useContext(AuthContext);
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
        confirmPassword: '', 
    })
    const handleOnChange =  e => setLoginForm({...loginForm, [e.target.name]: e.target.value})

    const register = async event => {
        event.preventDefault()

        const {confirmPassword, password} = loginForm;
        console.log(confirmPassword)
        console.log(password)
        if(confirmPassword !== password) {
            return alert("Confirm password not match");
        }

        try{
            const loginData = await registerUser(loginForm);
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
            <Form onSubmit={register}>
                <Form.Group>
                    <Form.Control 
                        type='text' 
                        placeholder='Username'  
                        name ='username' 
                        onChange = {handleOnChange}
                        required 
                    />
                </Form.Group>

                <Form.Group className='form-group'>
                    <Form.Control 
                        type='password' 
                        placeholder='Password'  
                        name ='password' 
                        onChange = {handleOnChange}
                        required 
                    />
                </Form.Group>

                <Form.Group className='form-group'>
                    <Form.Control 
                        type='password' 
                        placeholder='Confirm password'  
                        name ='confirmPassword'
                        onChange = {handleOnChange} 
                        required 
                    />
                </Form.Group>

                <Button variant='success' type='submit'>Register</Button>
            </Form>
            <p>Don't have any account?
                <Link to='/login'>
                    <Button variant='info' size='sm' className='ml-2'>Login</Button>
                </Link>
            </p>
        </>
    )
}

export default RegisterForm