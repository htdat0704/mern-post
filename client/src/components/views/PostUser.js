import { PostContext } from '../../context/Post/PostContext'
import { useContext, useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import MultiPost from '../posts/MultiPost'
import { AuthContext } from '../../context/Auth/AuthContext'
import Footer from '../layout/Footer'
import { Link, Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import NavbarMenu from '../layout/NavBar'
import NavbarNoLogin from '../layout/NavBarNoLogin'

const PostUser = () => {
    const {
        getPostsByUser,
        postState: { posts },
    } = useContext(PostContext)
    const {
        state: { user, isAuthenticated },
    } = useContext(AuthContext)
    const [isLoading, setLoading] = useState(true)

    let { username } = useParams()

    useEffect(() => {
        const timer = setTimeout(async () => {
            await getPostsByUser(username)
            await setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [username])

    let body

    if (isLoading) {
        body = (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation="border" variant="info" />
            </div>
        )
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className="text-center mx-5 my-5">
                    <Card.Header as="h1">Hi </Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to Post of {username}</Card.Title>
                        <Card.Text>User have no Post, pls go back</Card.Text>
                        <Button to="/dashboard" as={Link}>
                            Go back dashboard
                        </Button>
                    </Card.Body>
                </Card>
            </>
        )
    } else {
        body = (
            <>
                <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
                    {posts.map((post) => (
                        <Col key={post._id} className="my-2">
                            <MultiPost post={post}></MultiPost>
                        </Col>
                    ))}
                </Row>
                <Row className="row-cols-12 row-cols-md-12 g-12 mx-auto mt-12">
                    <Button className="floating" to="/dashboard" as={Link}>
                        Go back dashboard
                    </Button>
                </Row>
            </>
        )
    }

    return (
        <>
            {isAuthenticated && <NavbarMenu></NavbarMenu> &&
                username === user.username && (
                    <Navigate to="/mypost"></Navigate>
                )}
            {!isAuthenticated && <NavbarNoLogin></NavbarNoLogin>}
            {body}
            <Footer></Footer>
        </>
    )
}

export default PostUser
