const Exception = require('./Exception');

module.exports = route => {
    return async (req, res, next) => {
        function asyncRoute() {
            return new Promise((resolve, reject) => {
                const result = route(req, res, () => resolve('next'));
                if  (result instanceof Promise) {
                    result.then(resolve);
                    result.catch(reject);
                }
            });
        }

        try {
            const data = await asyncRoute();
            if (data === 'next') return next();

            data.status = 1;
            return res.status(200).send(data);
        } catch (error) {
            if (error instanceof Exception) {
                res.status(400).send({
                    status: 0,
                    error: error.toHash()
                });
            } else {
                console.error('REQUEST URL ', req.url);
                console.error('REQUEST PARAMS: ', req.params);
                console.error('REQUEST BODY: ', req.body);
                console.error('ERROR: ', error.stack);
                console.error('-------------------');

                res.send({
                    status: 0,
                    error: {
                        code:    'UNKNOWN_ERROR',
                        message: 'Please, contact your system administrator!'
                    }
                });
            }
        }
    };
};
