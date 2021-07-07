/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE users (
      user_id SERIAL PRIMARY KEY,
      name VARCHAR(80) NOT NULL,
      office VARCHAR(20) NOT NULL,
      github VARCHAR(80) NOT NULL,
      twitter VARCHAR(80) NOT NULL,
      linkedin VARCHAR(80) NOT NULL,
      profileImg VARCHAR(255),
      created_at timestamp with time zone DEFAULT now()
    );
  `);
};

exports.down = (pgm) => {};
