import React from 'react';
import PropTypes from 'prop-types';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import style from './Card.module.css';

function Card({ employee }) {
  const { name, office, imagePortraitUrl: imageUrl, gitHub, linkedIn, twitter } = employee;
  return (
    <div className={style.card}>
      <div className={style.image} style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className={style.details}>
        <h1 className={style.name}>{name}</h1>
        <ul className={style.social}>
          <li>
            <a target="_blank" rel="noreferrer" href={`https://linkedin.com/${linkedIn}`}>
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a target="_blank" rel="noreferrer" href={`https://github.com/${gitHub}`}>
              <FaGithub />
            </a>
          </li>
          <li>
            <a target="_blank" rel="noreferrer" href={`https://twitter.com/${twitter}`}>
              <FaTwitter />
            </a>
          </li>
        </ul>
      </div>
      <h1 className={style.location}>Office: {office}</h1>
    </div>
  );
}

Card.propTypes = {
  employee: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Card;
