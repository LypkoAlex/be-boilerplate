module.exports = class Exception extends Error {
    constructor(data) {
        super();
        if (!data.message) throw new Error('MESSAGE REQUIRED');

        this.code = data.code;
        this.message = data.message;
    }

    toHash() {
        return {
            code: this.code,
            message: this.message
        };
    }
};
