import { PostContext } from "../../context/Post/PostContext";
import { AuthContext } from "../../context/Auth/AuthContext";
import { useContext, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MultiPost from "../posts/MultiPost";
import NavbarNoLogin from "../layout/NavBarNoLogin"
import NavbarMenu from "../layout/NavBar"
import AddPostModal from "../posts/AddPostModel";
import addIcon from "../../assets/addicon.svg"
import Button from 'react-bootstrap/Button';

const Dashboard = () =>{

    const { postState: {posts, postLoading}, getPosts, setShowAddPost} = useContext(PostContext);
    const { state:{ isAuthenticated, authLoading} } = useContext(AuthContext);
    useEffect(() => { 
        getPosts();
    }, [])

    let body;

    if(postLoading || authLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation='border' variant='info'/>
            </div>
        )
    }else if(isAuthenticated){

        body = (
            <>
                <NavbarMenu></NavbarMenu>
                    <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                        {posts.map(post => (
                            <Col key = {post._id} className='my-2'>
                                <MultiPost post={post}></MultiPost>
                            </Col>
                        ))}
                    </Row>
                    
                    <Button className='btn-floating' onClick={() => setShowAddPost(true)}>
                        <img src={addIcon} alt='add Post' width='60' height='60' />
                    </Button>
            </>
        )
    }else{

        body = (
            <>
                <NavbarNoLogin></NavbarNoLogin>
                    <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                        {posts.map(post => (
                            <Col key = {post._id} className='my-2'>
                                <MultiPost post={post}></MultiPost>
                            </Col>
                        ))}
                    </Row>

            </>
        )
    }

    return <>
        {body}
        <AddPostModal/>
    </>
}

export default Dashboard