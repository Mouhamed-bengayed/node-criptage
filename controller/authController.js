const Bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const dbConn = require('../config/dbConn');

const collectionName = 'employer';

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });
    const employers = await dbConn.getDB().collection(collectionName).find().toArray();
    const foundEmployer = employers.find(person => person.email === email);
    if (!foundEmployer) return res.sendStatus(400);
    const match = await Bcrypt.compareSync(password, foundEmployer.password);
    if (match) {

        const accessToken = jwt.sign(
            {
                "employer": foundEmployer
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        
            res.json({ token: accessToken, employer: foundEmployer });
        


    } else {
        res.sendStatus(400);
    }
}

module.exports = { handleLogin };
