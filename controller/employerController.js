const { ObjectId } = require('mongodb')
const dbConn = require('../config/dbConn');
const validateEmployer = require('../model/employer')
// const reclamationValid = require('../model/employer')
const collectionName = 'employer';


async function getCurentEmployer(req, res) {
    const employerId = req.employer._id;
    var id = new ObjectId(employerId);
    try {
        const employer = await dbConn.getDB().collection(collectionName).findOne({ _id: id });
        res.json(employer);
    } catch (err) {
        res.status(500).json({ 'messagee': err.message });
    }
}

async function getAllEmployers(req, res) {
    try {
        const employers = await dbConn.getDB().collection(collectionName).find().toArray();
        res.json(employers);
    } catch (err) {
        res.status(500).json({ 'messagee': err.message });
    }
}

async function getEmployerById(req, res) {
    const employerId = req.params.id;
    var id = new ObjectId(employerId);
    try {
        const employer = await dbConn.getDB().collection(collectionName).findOne({ _id: id });
        res.json(employer);
    } catch (err) {
        res.status(500).json({ 'messagee': err.message });
    }
}

async function find(req, res) {
    const employer = String(req.params.employer);
    try {
        await dbConn.getDB().collection(collectionName).createIndex({
            email: "text",
            firstName: "text",
            lastName: "text",
            phone: "text"
        })
        const employerRes = await dbConn.getDB().collection(collectionName).find({ $text: { $search: employer } }).toArray()
        res.json(employerRes);
    } catch (err) {
        res.status(500).json({ 'messagee': err.message });
    }
}


async function updateEmployer(req, res) {
    const employerId = req.params.id;
    const updateEmployer = req.body;
    delete updateEmployer._id;
    if (validateEmployer.validateEmployer(newEmployer)) {
        res.status(400).json(validateEmployer.validateEmployer(newEmployer).message)
    } else {
        var id = new ObjectId(employerId);
        try {
            await dbConn.getDB().collection(collectionName).updateOne({ _id: id }, { $set: updateEmployer });
            res.json({ message: 'employer updated successfully' });
        } catch (err) {
            res.status(500).json({ 'messagee': err.message });
        }
    }
}

async function deleteEmployer(req, res) {
    var employerId = req.params.id
    var id = new ObjectId(employerId);

    try {
        await dbConn.getDB().collection(collectionName).deleteOne({ _id: id });
        res.json({ message: 'employer deleted successfully' });
    } catch (err) {
        res.status(500).json({ 'messagee': err.message });
    }
}

module.exports = {
    find,
    getAllEmployers,
    getEmployerById,
    updateEmployer,
    deleteEmployer,
    getCurentEmployer,
};
