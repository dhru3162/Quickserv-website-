import React from 'react';
const UserHero = ({  banner }) => {

  return (
    <div className="user-hero">
      <img className='here-banner-bg' src={banner} alt="" />
     
    </div>
  );
};

export default UserHero;
