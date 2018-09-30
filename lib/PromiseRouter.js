const promiseWrapper = require('./PromiseWrapper');
const http           = require('http');

const methods = http.METHODS.map(method => method.toLowerCase());

module.exports = function PromiseRouter(Router) {
    /* eslint new-cap:0 */
    const router = Router();

    methods.forEach(method => {
        router[`${method}Async`] = function () {
            for (const i in arguments) {
                if (i !== '0') arguments[i] = promiseWrapper(arguments[i]);
            }

            return router[method](...arguments);
        };
    });

    return router;
};
