import Button from 'react-bootstrap/Button'
import editIcon from '../../assets/edit.svg'
import { useContext } from 'react';
import { AuthContext } from '../../context/Auth/AuthContext';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'

const PostForm = ({post}) => {
    const {state:{ user, isAuthenticated}} = useContext(AuthContext)
    const navigate = useNavigate();
    let body ;

    const handleClick = () => {
        navigate(`/update/${post.slug}`)
    }

    if(!post){
        body = (
            <div className='d-flex justify-content-center mt-2'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    }else if(isAuthenticated){
        body = ( <div className='container'>
        <h1 className='my-4'>{post.title} - 
            <small> TITLE </small>
            {user.username === post.user.username && <>
            <Button className='post-button' style={{marginLeft: 'auto', marginRight: '30px'}} onClick={handleClick}>
                <img src={editIcon} className='img-fluid' alt="edit"  />
            </Button>
            </>}
        </h1>
        
        <Row>
            <Col md='8'>
                <img className='img-fluid hover-shadow' src={post.url} alt=" " style={{width: '750px', height: '500px'}}/>
            </Col>

            <Col md='4'>
                <h3 className='my-3'> Author: {post.user.username}</h3>
                <Badge pill bg={post.status === 'LEARNED' ? 'success' :post.status ==='LEARNING' ? 'warning' : 'danger'} >{post.status}</Badge>
                <h3 className='my-3'>{post.description}</h3>
                
            </Col>
        </Row>
    </div>)
    }else{
        body= (<div className='container'>
        <h1 className='my-4'>{post.title} - 
            <small> TITLE </small>
        </h1>
        
        <Row>
            <Col md='8'>
                <img className="img-fluid" src={post.url} style={{maxWidth: '80rem'}} alt=""/>
            </Col>

            <Col md='4'>
                <h3 className='my-3'> Author: {post.user.username}</h3>
                <Badge pill bg={post.status === 'LEARNED' ? 'success' :post.status ==='LEARNING' ? 'warning' : 'danger'} >{post.status}</Badge>
                <h3 className='my-3'>{post.description}</h3>
                
            </Col>
        </Row>
    </div>)
    }
    return body
}

export default PostForm