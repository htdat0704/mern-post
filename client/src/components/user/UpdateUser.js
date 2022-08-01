import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth/AuthContext';
import { useContext } from 'react';
import React from 'react';

const UpdateUser = ({ user }) => {
  let body;
  const { updateUserNow } = useContext(AuthContext);
  const navigate = useNavigate();
  const [updateUser, setUpdateUser] = useState(user);

  const handleSubmit = async () => {
    try {
      await updateUserNow(updateUser);
      navigate(`/profile`);
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeUpdated = async e => {
    e.preventDefault();
    setUpdateUser(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { password } = user;
  console.log(user);
  body = (
    <div className="container">
      <div className="landing-inner">
        <Form onSubmit={handleSubmit}>
          <h1 stye={{ color: 'black' }}>UPDATE User</h1>
          <Form.Group>
            <Form.Label>Update password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={onChangeUpdated}
            />
          </Form.Group>
          <br></br>
          <Button variant="primary" type="submit">
            Click here to Update
          </Button>
        </Form>
      </div>
    </div>
  );

  return <> {body}</>;
};

export default UpdateUser;
