import Modal from 'react-bootstrap/Modal';
import ReactLoading from 'react-loading';
import Badge from 'react-bootstrap/Badge';
import React from 'react';

const LoadingModal = ({ show, type, db = null }) => {
  return (
    <Modal show={show}>
      <Modal.Title style={{ textAlign: 'center' }}>
        <Badge
          pill
          bg={
            type === 'ADD'
              ? 'success'
              : type === 'UPDATE'
              ? 'warning'
              : 'danger'
          }>
          {type} {db ? db : ''}
        </Badge>
      </Modal.Title>

      <Modal.Body>
        <div className="spinner-container">
          <ReactLoading
            type={'balls'}
            color={
              type === 'ADD' ? 'green' : type === 'UPDATE' ? 'yellow' : 'red'
            }
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingModal;
