const Base = require('../Base');
const X = require('../../Exception.js');

module.exports =  class List extends Base {
    validate(params) {
        const rules = {
        };

        return this.validator.validate(params, rules);
    }

    async execute(data) {
        if (!data) {
            throw new X({
                message : 'DATA DOES NOT EXIST'
            });
        }

        const result = {
            data : 'data'
        };

        return { result };
    }
};
