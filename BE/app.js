const employeesRoute = require('./routes/employees');
const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

app.use('/employees', employeesRoute);
app.get('/', function (req, res) {
  res.send('Im alive');
});
app.listen(port, () => console.log(`Running server on port ${port}`));
