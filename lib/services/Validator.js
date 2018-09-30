const Exception = require('../Exception');
const LIVR      = require('livr');

LIVR.Validator.registerDefaultRules();

module.exports = class Validator {
    validate(data, rules) {
        const validator = new LIVR.Validator(rules).prepare();

        const result = validator.validate(data);

        if (!result) {
            throw new Exception({
                code:   'FORMAT_ERROR',
                message: validator.getErrors()
            });
        }

        return result;
    }
};
