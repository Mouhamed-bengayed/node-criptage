const express = require('express');
const app = express();
require('dotenv').config()
const bodyParser = require('body-parser');

const db = require('./config/dbConn');
const credentials = require('./middleware/credentials');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');

const PORT = process.env.PORT || 3000;

app.use(express.json());
const cors = require('cors');
const verifyJWT = require('./middleware/verifyJWT');

app.use(credentials);
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json())

app.use('/auth', require('./route/auth'));
app.use('/register', require('./route/register'));

// app.use(verifyJWT);
app.use('/employer', require('./route/employerRoute'))
app.use('/reclamation', require('./route/reclamationRoute'))

app.use((req, res) => {
    res.status(404).send('Not Found');
  });


db.connect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
