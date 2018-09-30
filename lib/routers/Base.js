const services = require('../services');
const Validator = require('../services/Validator');
module.exports = class Base {
    constructor() {
        this.validator = new Validator();
    }
    async run(actionName, { params }) {
        const [actionGroup, actionClass] = actionName.split('/');
        const result = await new services[actionGroup][actionClass]({ validator : this.validator }).run(params);

        return result;
    }
};
