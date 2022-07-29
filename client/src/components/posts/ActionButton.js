import Button from 'react-bootstrap/Button'
import deleteIcon from '../../assets/delete.svg'
import editIcon from '../../assets/edit.svg'
import enterIcon from '../../assets/enter.svg'
import { AuthContext } from '../../context/Auth/AuthContext'
import { useContext , useState} from 'react'
import { PostContext } from '../../context/Post/PostContext'
import { Link } from 'react-router-dom'
import LoadingModal from '../layout/LoadingModel'

const ActionButton = ({_id, username, slug}) => {
    const {deletePostt} = useContext(PostContext)

    const {state: {user }} = useContext(AuthContext)
    const [isShowLoading, setShowLoading] = useState({
        type: '',
        show: false,
    });

    const loadingShow = (type) => {
        setShowLoading(prev => ({
            ...prev,
            type: type,
            show: true,
        }))
        setTimeout(() => {
            setShowLoading(prev => ({
                ...prev,
                show: false,
            }))
        },1500)
    }   

    let body;

    if(user){
        body = (
            <>
            <Button className='post-button'  to={`/post/${slug}`} as={Link} >
                <img src={enterIcon} alt="play" width='32' height='32'/>
            </Button>  
            { user.username === username && 
            <>
                <Button className='post-button'to={`/update/${slug}`} as={Link} >
                    <img src={editIcon} alt="edit" width='24' height='24'/>
                </Button>
                <Button className='post-button' onClick={() => {
                    deletePostt(_id)
                    loadingShow('DELETE')
                }}>
                    <img src={deleteIcon} alt="delete" width='32' height='32'/>
                </Button>
            </>
                }
        </> 
        )
    }else{
        body = (
            <>
            <Button className='post-button' to={`/post/${slug}`} as={Link} >
                <img src={enterIcon} alt="play" width='32' height='32'/>
            </Button>  
            </>
        )
    }

    return <>
        {body}
        <LoadingModal show={isShowLoading.show} type={isShowLoading.type}></LoadingModal>
    </>;
}

export default ActionButton