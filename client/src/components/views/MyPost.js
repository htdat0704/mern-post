import { PostContext } from "../../context/Post/PostContext";
import { useContext, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import MultiPost from "../posts/MultiPost";
import AddPostModal from "../posts/AddPostModel";
import addIcon from "../../assets/addicon.svg"
import { AuthContext } from "../../context/Auth/AuthContext";

const MyPost = () =>{

    const { getPostOneUsers, setShowAddPost, postState: {posts, postLoading}} = useContext(PostContext);
    const { state:{ user} } = useContext(AuthContext);
    console.log(posts)
    useEffect(() =>  {
        getPostOneUsers()
    }, [])


    let body;

    if(postLoading ) {

        body = (
            <div className='d-flex justify-content-center mt-2'>
                <Spinner animation='border' variant='info' />
            </div>
        )
        
    }else if( posts.length !== 0){
        
        body = (
            <>
                <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                    {posts.map(post => (
                        <Col key = {post._id} className='my-2'>
                            <MultiPost post={post} ></MultiPost>
                        </Col>
                    ))}
                </Row>
                
                <Button className='btn-floating' onClick={setShowAddPost.bind(this, true)}>
                        <img src={addIcon} alt='add Post' width='60' height='60' />
                </Button>
            </>
        ) 
    }else{
        body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h1'>Hi {user.username}</Card.Header>
					<Card.Body>
						<Card.Title>Welcome to Post everyday</Card.Title>
						<Card.Text>
							Click the button below to track your experience
						</Card.Text>
						<Button
							variant='primary'
							onClick={setShowAddPost.bind(this, true)}
						>
							Submit new Post
						</Button>
					</Card.Body>
				</Card>
			</>
		)
    }
    

    return <>
        {body}
        <AddPostModal/>
    </>
}

export default MyPost