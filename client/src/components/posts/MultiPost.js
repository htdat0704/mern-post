import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import ActionButton from './ActionButton'

const MultiPost = ({post: {_id, status, title, description, username, url, user, slug}}) => {
    return (
    <Card className='shadow' border={status === 'TRAVEL' ? 'success' :status ==='FOOD AND DRINK' ? 'warning' : 'danger'}>
        <Card.Body>
            <Card.Title>
                <Row>
                    <Col width='80%'>
                        <p className='post-title'>Title: {title}</p>
                        <Badge pill bg={status === 'TRAVEL' ? 'success' :status ==='FOOD AND DRINK' ? 'warning' : 'danger'} >{status}</Badge>
                    </Col>
                    <Col style={{textAlign: 'right'}}>
                        <ActionButton url= {url} _id={_id} username={username || user.username} slug={slug} />
                    </Col>
                </Row>
            </Card.Title>
            <Card.Text>
                Author: {username || user.username}
            </Card.Text>
            <Card.Text>
            Description: {description}
            </Card.Text>
        </Card.Body>
    </Card>
    )

}

export default MultiPost