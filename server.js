const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const multipart   = require('connect-multiparty');

const { appPort }   = require('./etc/config.json')[process.env.ENV];
const promiseRouter = require('./lib/PromiseRouter.js');
const getRoutes     = require('./lib/routers');
const routes        = getRoutes();
const router        = promiseRouter(express.Router);

const app = express();

app.use(bodyParser.urlencoded());

router.use(multipart());
app.use(cors({ origin: '*' }));

app.use(bodyParser.json({limit: 1024 * 1024, verify: (req, res, buf) => {
    try {
        JSON.parse(buf);
    } catch (e) {
        res.send({
            status: 0,
            error: {
                code:    'BROKEN_JSON',
                message: 'Please, verify your json'
            }
        });
    }
}}));

// API
app.use('/api/v1', router);

// Files
router.getAsync('/route', routes.files.upload.bind(routes.files));

if (process.env.ENV === 'live') {
    app.listen(appPort, function () {
        console.log(`listening on port ${appPort}`);
    });
}

module.exports = app;
