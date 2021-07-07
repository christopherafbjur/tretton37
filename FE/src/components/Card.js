import React from 'react';
import PropTypes from 'prop-types';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import style from './Card.module.css';

// eslint-disable-next-line react/prop-types
function Card({ employee, lastEmployeeRef }) {
  const { name, office, imageUrl, github, linkedin, twitter } = employee;
  return (
    <div ref={lastEmployeeRef} className={style.card}>
      <div className={style.image} style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className={style.details}>
        <h4 className={style.name}>{name}</h4>
        <ul className={style.social}>
          <li>
            <a target="_blank" rel="noreferrer" href={`https://linkedin.com/${linkedin}`}>
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a target="_blank" rel="noreferrer" href={`https://github.com/${github}`}>
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
      <h4 className={style.location}>Office: {office}</h4>
    </div>
  );
}

Card.propTypes = {
  employee: PropTypes.shape({
    user_id: PropTypes.number,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    office: PropTypes.string,
    github: PropTypes.string,
    twitter: PropTypes.string,
    linkedin: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired,
};

export default Card;
