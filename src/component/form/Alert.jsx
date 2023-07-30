import React, { useState } from 'react';

const Alert = ({ onConfirm, setIsPopupOpen }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const handleConfirm = () => {
    setIsConfirming(true);
    onConfirm();
  };
  return (
    <div className="confirmation-popup ">
      <div className="popup-content">
        <h2>Confirm Form Update</h2>
        <p>Are you sure you want to update</p>
      </div>
      <div className='confirm-btn'>
        <button className='btn active' onClick={handleConfirm} disabled={isConfirming}>
          {isConfirming ? 'Updating...' : 'Update'}
        </button>
        <button className='btn' onClick={() => setIsPopupOpen(false)} >Cancel</button>
      </div>
    </div>
  );
};

export default Alert;
