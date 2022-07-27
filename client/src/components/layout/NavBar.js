import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import avarta from '../../assets/avarta.jpg'
import {Link, useNavigate} from "react-router-dom"
import logoutIcon from '../../assets/logout.svg'
import {AuthContext} from '../../context/Auth/AuthContext'
import {useContext, } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { PostContext } from "../../context/Post/PostContext"



const NavbarMenu = () => {
    const navigate = useNavigate()
    const {state : { user : {username }}, logoutUser} = useContext(AuthContext) ;
    const {setStateDefault} = useContext(PostContext)

    const handleLogout = async e => {
        e.preventDefault()
        await setStateDefault()
        await logoutUser()
        await navigate('/login')
    }

    return (
        <Navbar expand='lg' bg='primary' variant='dark' className='shadow' >
            <Navbar.Brand className='font-weight-bolder text-white' style={{ marginLeft: '30px'}} >
                <img src ={avarta} alt="Logo" className="user_avatar" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className ='mr-auto'>
                    <Nav.Link className='font-weight-bolder text-white' to='/dashboard' as={Link} >
                        DashBoard
                    </Nav.Link>
                </Nav>

                <Nav style={{marginLeft: 'auto', marginRight: '30px'}}>
                    <NavDropdown title={<>Welcome {username}</>} id="basic-nav-dropdown">
                        <NavDropdown.Item to='/mypost' as={Link}>
                            MyPost
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4" onClick ={logoutUser}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Button variant='secondary' className='font-weight-bolder text-white' onClick ={handleLogout}  >
                        <img src={logoutIcon} alt="logOut" width='32' height='32' className='mr-2'/>
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse> 
        </Navbar>
    )
}

export default NavbarMenu