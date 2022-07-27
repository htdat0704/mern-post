import LoginForm from '../auth/LoginForm'
import RegitserForm from '../auth/RegisterForm'
import { AuthContext } from '../../context/Auth/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'
import NavbarNoLogin from '../layout/NavBarNoLogin';

const Auth = ({ authRoute }) => {

    const {state: {authLoading, isAuthenticated}, loadUser} = useContext(AuthContext);
    const {isLoading, setLoading} = useState(true)
    
    const load = async () => {
        await loadUser()
        setLoading(false)
    }

    useEffect(() => {
        load()
    },[])

    let body;

    if(isLoading){
        body = (
            <div className='d-flex justify-content-center mt-2'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    }else if (isAuthenticated) {
        return <Navigate to='/dashboard' />
    }else{
        body = (
            (   
                <>
                    {authRoute === 'login' && <LoginForm />}
                    {authRoute === 'register' && <RegitserForm />}
                </>
            )
        )
    }
    

    return(
        <>
            <NavbarNoLogin></NavbarNoLogin>
            <div className='landing'>
			<div className='dark-overlay'>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{borderRadius: '1rem'}}>
                                <div className="card-body p-5 text-center">
                                    <div className="mb-md-5 mt-md-4 pb-5">
                                        <h2>LEARN IT</h2>
                                        <p>Fun is very wild</p>
                                        {body}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Auth