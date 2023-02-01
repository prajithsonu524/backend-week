const joi = require('joi');
const HTTPError = require('../utilities/todo.utility');
const requestBodyValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string()
            .required()
        ,
    });
    const { error } = schema.validate(req.body);
    if (error) {
        throw new HTTPError('name must be a string', 400);
    }
    else {
        next();
    }
};
module.exports = requestBodyValidation;