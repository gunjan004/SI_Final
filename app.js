
const express = require('express');
const app = express();
const indexRoutes = require( './routes/index');

app.use(express.json());
app.use('/languageUnderstanding', indexRoutes);

app.listen(80, ()=> console.log('Server Up. Listening to port 80.........'));
module.exports = app;

