import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import React from 'react';

const Landing = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className="spinner-container">
          <ReactLoading type={'balls'} color={'green'} />
        </div>
      )}
      {!isLoading && <Navigate to="/login" />}
    </>
  );
};

export default Landing;
