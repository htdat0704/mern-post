import { AuthContext } from '../../context/Auth/AuthContext';
import { useContext, useState, useEffect } from 'react';
import Infor from '../user/Infor';
import Spinner from 'react-bootstrap/Spinner';
import UpdateUser from '../user/UpdateUser';
import React from 'react';

const Profile = ({ route }) => {
  const {
    state: { user },
    loadUser,
  } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(async () => {
      await loadUser();
      await setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  let body;

  if (isLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else {
    // body = (
    //     <>
    //         <NavbarMenu></NavbarMenu>
    //         <PostForm></PostForm>
    //     </>
    // )
    body = (
      <>
        {route === 'profile' && <Infor user={user} />}
        {route === 'updateProfile' && <UpdateUser user={user} />}
      </>
    );
  }

  return body;
};

export default Profile;
