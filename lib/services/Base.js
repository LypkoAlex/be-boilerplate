module.exports =  class Base {
    constructor(args) {
        if (!args.validator) throw new Error('validator required');
        this.validator = args.validator;
    }
    async run(params) {
        const data = await this.validate(params);
        return await this.execute(data);
    }
};
