import React from 'react';
import PropTypes from 'prop-types';

function Card({ employee }) {
  const { name, office, imagePortraitUrl: imageUrl } = employee;
  return (
    <div className="profile-card" style={{ backgroundColor: 'gray' }}>
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          width: '100px',
          height: '100px',
        }}
      />
      <div className="details">
        <h1 className="name">{name}</h1>
        <ul className="social">
          <li>LinkedIn</li>
          <li>Github</li>
          <li>Twitter</li>
        </ul>
      </div>
      <h1 className="office">Office: {office}</h1>
    </div>
  );
}

Card.propTypes = {
  employee: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Card;
