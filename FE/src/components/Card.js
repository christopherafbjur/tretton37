import React from 'react';
import PropTypes from 'prop-types';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import style from './Card.module.css';

// eslint-disable-next-line react/prop-types
function Card({ employee, lastEmployeeRef }) {
  const { name, office, profileimg, github, linkedin, twitter } = employee;
  return (
    <div ref={lastEmployeeRef} className={style.card}>
      <div className={style.image} style={{ backgroundImage: `url(${profileimg})` }} />
      <div className={style.details}>
        <h4 className={style.name}>{name}</h4>
        <div className={style.social}>
          <IconContext.Provider value={{ color: 'black' }}>
            <span className={style.icon}>
              <a target="_blank" rel="noreferrer" href={`https://linkedin.com/${linkedin}`}>
                <FaLinkedin />
              </a>
            </span>

            <span className={style.icon}>
              <a target="_blank" rel="noreferrer" href={`https://github.com/${github}`}>
                <FaGithub />
              </a>
            </span>
            <span className={style.icon}>
              <a target="_blank" rel="noreferrer" href={`https://twitter.com/${twitter}`}>
                <FaTwitter />
              </a>
            </span>
          </IconContext.Provider>
        </div>
      </div>
      <h4 className={style.location}>Office: {office}</h4>
    </div>
  );
}

Card.propTypes = {
  employee: PropTypes.shape({
    user_id: PropTypes.number,
    profileimg: PropTypes.string,
    name: PropTypes.string,
    office: PropTypes.string,
    github: PropTypes.string,
    twitter: PropTypes.string,
    linkedin: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired,
};

export default Card;
