import { Navigate } from 'react-router-dom';
import NavbarMenu from '../layout/NavBar';
import React from 'react';

const Protected = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <NavbarMenu></NavbarMenu>
      {children}
    </>
  );
};

export default Protected;
