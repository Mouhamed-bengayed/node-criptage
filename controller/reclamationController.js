const { ObjectId } = require('mongodb')
const dbConn = require('../config/dbConn');
const validateReclamation = require('../model/reclamtaion');
const { encrypt, decrypt } = require('../cryptage/cryptage');
const collectionName = 'reclamation';

async function addReclamation(req, res) {
    try {
        req.body.date = new Date()
        if (validateReclamation.validateReclamation(req.body)) {
            res.status(400).json(validateReclamation.validateReclamation(req.body).message)
        } else {

            reclamation = {
                date: new Date(),
                text: req.body.text,
                employer: req.employer
            }
            reclamation.text = encrypt(req.body.text)
            const result = await dbConn.getDB().collection(collectionName).insertOne(reclamation);
            res.status(201).json(reclamation);
        }
    } catch (err) {
        res.status(500).json({ 'messagee': err.message });
    }
}

async function getAllReclamation(req, res) {
    try {
        const reclamations = await dbConn.getDB().collection(collectionName).find().toArray();

        // let decryReclamations = reclamations.map((r =>   {...r, r.text= decrypt(r.text)} : r)
        reclamations.forEach((element, index) => {
            element.text = decrypt(element.text);
          });
        res.json(reclamations);
    } catch (err) {
        res.status(500).json({ 'messagee': err.message });
    }
}

async function getReclamationById(req, res) {
    const reclamationId = req.params.id;
    var id = new ObjectId(reclamationId);
    try {
        const reclamation = await dbConn.getDB().collection(collectionName).findOne({ _id: id });
        reclamation.text = decrypt(reclamation.text)
        res.json(reclamation);
    } catch (err) {
        res.status(500).json({ 'messagee': err.message });
    }
}


module.exports = {
    getAllReclamation,
    addReclamation,
    getReclamationById,
   
};
