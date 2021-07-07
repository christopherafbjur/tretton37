const express = require('express');
const router = express.Router();
const db = require('../services/database');

router.get('/', async function (req, res) {
  const query = `SELECT * FROM users ORDER BY name asc`;

  db.query(query, function (err, result) {
    if (err) throw err;
    res.status(200).send(result.rows);
  });
});

module.exports = router;
