const express = require('express');
const router = express.Router();
const db = require('../services/database');

router.get('/', async function (req, res) {
  const options = {
    query: req.query.query || '',
    office: req.query.office || '',
    orderBy: req.query.orderBy || 'name',
    direction: req.query.direction || 'ASC',
    limit: req.query.limit || null,
    offset: req.query.offset || null,
  };

  //! Note, I'm aware that this approach opens up for SQL injection but don't have time to migrate to other postgres lib
  const query = `
    SELECT * FROM users 
    WHERE name ILIKE '%${options.query}%' 
    AND office ILIKE '%${options.office}%' 
    ORDER BY ${options.orderBy} ${options.direction}
    LIMIT ${options.limit}
    OFFSET ${options.offset}
  `;

  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).send(result.rows);
  });
});

module.exports = router;
