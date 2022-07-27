import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useContext, useState } from 'react'
import { PostContext } from '../../context/Post/PostContext'


const AddPostModal = () => {

    const {showAddPost, setShowAddPost, addPost} = useContext(PostContext)
    const [disable, setDisable] = useState(false);
    console.log(disable)

    const [newPost,setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TRAVEL'
    })

    const closeDialog= () =>{
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: 'TRAVEL' 
        })
        setShowAddPost(false)
        setDisable(false)
    }

    const onSubmit = async e =>{
        setDisable(true)
        e.preventDefault()
        await addPost(newPost)
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: 'TRAVEL' 
        })
        setDisable(false)
        setShowAddPost(false)
    }

    const {title, description, url, status} = newPost

    const onChangeNewPostForm = event => setNewPost({...newPost, [event.target.name]: event.target.value})

    return(
        <Modal show={showAddPost} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to add?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body >
                    <Form.Group  style={{marginTop: "15px", marginBottom: "15px"}}>
                        <Form.Control type='text' placeholder='Title' name='title' required aria-describedby='title-help' onChange={onChangeNewPostForm} value={title}/>
                        <Form.Text id='title-help' muted> Require</Form.Text>
                    </Form.Group>
                    <Form.Group  style={{marginTop: "15px", marginBottom: "15px"}}>
                        <Form.Control as='textarea' row={4} placeholder='Description' name='description' onChange={onChangeNewPostForm} value={description}/>
                    </Form.Group>
                    <Form.Group style={{marginTop: "15px", marginBottom: "15px"}}>
                        <Form.Control type='text' placeholder='Url Image' name='url' onChange={onChangeNewPostForm} value={url}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Status:</Form.Label>
                        <Form.Control as='select' value={status} name='status' onChange={onChangeNewPostForm}>
                            <option value="TRAVEL">TRAVEL</option>
                            <option value="FOOD AND DRINK">FOOD AND DRINK</option>
                            <option value="CULTURE">CULTURE</option>
                        </Form.Control>
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant = 'secondary' onClick={closeDialog}>Cancel</Button>
                    <Button variant = 'primary' type='submit' disabled={disable} >Submit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPostModal;