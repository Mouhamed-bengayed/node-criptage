const Joi = require('joi');

let reclamationSchema = Joi.object({
    text: Joi.string().min(3).required(),
    date: Joi.date().required(),
});

function validateReclamation(obj) {
    let valid_res = reclamationSchema.validate(obj);

    return valid_res.error

}

module.exports.validateReclamation = validateReclamation;
module.exports.reclamationSchema = reclamationSchema;
