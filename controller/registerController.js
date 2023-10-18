const dbConn = require('../config/dbConn');
const validateEmployer = require('../model/employer')
const collectionName = 'employer';
const Bcrypt = require('bcryptjs')


const addEmployer = async (req, res) => {
    const newEmployer = req.body
    // newEmployer.role = "client"
    if (validateEmployer.validateEmployer(newEmployer)) {
        res.status(400).json(validateEmployer.validateEmployer(newEmployer).message)
    } else {
        const employers = await dbConn.getDB().collection(collectionName).find().toArray();
        const duplicate = employers.find(employer => ((employer.phone === newEmployer.phone) || ((employer.email === newEmployer.email) && (employer.role == newEmployer.role))));
        if (duplicate) return res.sendStatus(400);
        try {
            const hashedPwd = await Bcrypt.hashSync(newEmployer.password, 10);
            newEmployer.password = hashedPwd;
            const result = await dbConn.getDB().collection(collectionName).insertOne(newEmployer);
            res.status(201).json(newEmployer);
        } catch (err) {
            res.status(500).json({ 'messagee': err.message });
        }
    }

}
module.exports = { addEmployer };
