import PostForm from '../singlePost/PostForm'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/Auth/AuthContext';
import NavbarMenu from '../layout/NavBar';
import NavbarNoLogin from '../layout/NavBarNoLogin';
import Spinner from 'react-bootstrap/esm/Spinner';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import { PostContext } from '../../context/Post/PostContext';
import { useParams } from 'react-router-dom';
// import Badge from 'react-bootstrap/Badge';
// import editIcon from '../../assets/edit.svg'
// import Button from 'react-bootstrap/Button'
import UpdateForm from '../singlePost/UpdateForm';
import ProtectedUpdate from '../routing/ProtectedUpdate';
import Protected from '../routing/ProtectedRout';

const SinglePost = ({route}) => {

    const {state:{ user, isAuthenticated}, loadUser} = useContext(AuthContext)
    const {postState:{ post}, getOnePost} = useContext(PostContext)
    const [isLoading, setLoading] = useState(true);
    
    let body;
    let {slug}  = useParams();

    useEffect(() =>{
        const response = async () => {
            await getOnePost(slug);
            await loadUser();
            await setLoading(false)
        }
        response()
    },[slug])
    
    if(isLoading ){
        body = (
            <div className="spinner-container">
                <Spinner animation='border' variant='info'/>
            </div>
        )

    }else if(isAuthenticated){
        console.log(user.username)
        // body = (
        //     <>
        //         <NavbarMenu></NavbarMenu>
        //         <PostForm></PostForm>
        //     </>
        // )
        body = (
            (   
                <>
                    <NavbarMenu></NavbarMenu>
                
                    {route === 'post' && <PostForm  post={post}/>}
                    {route === 'update' && (
                        <ProtectedUpdate post={post.user.username} user={user.username} >
                            <UpdateForm post={post} />
                        </ProtectedUpdate>
                        )}
                </>
            )
        )
    }else{

        // body = (
        //     <>
        //         <NavbarNoLogin></NavbarNoLogin>
        //         <PostForm></PostForm>
        //     </>
        // )
        body = (
            (   
                <>
                    <NavbarNoLogin></NavbarNoLogin>
                    {route === 'post' && <PostForm  post={post}/>}
                    {route === 'update' && (
                        <Protected user={isAuthenticated}>
                            <UpdateForm  />
                        </Protected>
                        )}
                </>
            )
        )
    } 


    return body;
}

export default SinglePost