const Base = require('./Base');

module.exports = class Fules extends Base {
    async upload({ params, query, body}) {
        return this.run('files/Upload', {
            params : {
                ...params,
                ...query,
                chunk : body
            }
        });
    }
};
