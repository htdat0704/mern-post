import editIcon from '../../assets/edit.svg'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

const Infor = ({ user }) => {
    let body
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/updateProfile`)
    }

    body = (
        <div className="container">
            <h1 style={{ textAlign: 'center' }}>
                HELLO: {user.username} -<small> username </small>
                <Button
                    className="post-button"
                    style={{ marginLeft: 'auto', marginRight: '30px' }}
                    onClick={handleClick}
                >
                    <img src={editIcon} className="img-fluid" alt="edit" />
                </Button>
            </h1>
            <ul></ul>
        </div>
    )

    return <> {body}</>
}

export default Infor
