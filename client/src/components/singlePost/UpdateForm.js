import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useState, useContext} from 'react'
import { PostContext } from '../../context/Post/PostContext'
import { useNavigate } from 'react-router-dom'
import setAuthToken from '../../utils/setAuthToken'
import { LOCAL_STORAGE_TOKEN_NAME } from '../../context/constant'
import Spinner from 'react-bootstrap/Spinner'

const UpdateForm = ({post}) => {

    const [updatedPost, setUpdatedPost] = useState(post);
    const {updateOnePost} = useContext(PostContext)
    const navigate = useNavigate();
    const onChangeUpdated = e => {
        setUpdatedPost(prev => ({
            ...prev,
            [e.target.name]: e.target.value 
        }))
    }


    const handleSubmit = async event =>{
        event.preventDefault()

        try{
            await setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
            await updateOnePost(updatedPost)

            navigate(`/post/${updatedPost.slug}`)
            
        }catch(e){
            console.log(e)
        }

    }
    let body;

    if(!post){
        body = (
            <div className='d-flex justify-content-center mt-2'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    }else{
        const {status,title,description,url} = updatedPost
        body = (
            <>  
            <div className='landing-inner'>
            <Form onSubmit={handleSubmit}>
                <h1 stye={{color: 'black'}}>UPDATE POST</h1>
                <Form.Group>
                    <Form.Label>Update Title:</Form.Label>
                    <Form.Control type="text" 
                                name='title'
                                value={title}
                                onChange={onChangeUpdated} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Update Description</Form.Label>
                    <Form.Control type="text" 
                                name='description'
                                value={description}
                                onChange={onChangeUpdated} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Update URL:</Form.Label>
                    <Form.Control type="text" 
                                name="url"
                                value={url} 
                                onChange={onChangeUpdated} /> 
                </Form.Group>
                <Form.Group>
                        <Form.Label>Status:</Form.Label>
                        <Form.Control as='select' value={status} name='status' onChange={onChangeUpdated}>
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARNING">LEARNING</option>
                            <option value="LEARNED">LEARNED</option>
                        </Form.Control>
                </Form.Group>
                <br></br>
                <Button variant="primary" type="submit" >
                Click here to Update
                </Button>
            </Form>
            </div>
        </>
        )
    }

    return body;
}

export default UpdateForm