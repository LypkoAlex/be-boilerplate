/* eslint-disable */
const fs              = require('fs');
const crypto          = require('crypto');
const assert          = require('assert');
const path            = require('path');
const WebSocketClient = require('websocket').client;

const app          = require('../server.js');
const FileUploader = require('../lib/FileUploader.js');
const { appPort }  = require('../etc/config.json')[process.env.ENV];

const client = new WebSocketClient();
let sessionId = '';

describe('File upload.', () => {
    before(() => {
        app.listen(appPort);
    });

    describe('starting clients', () => {
        it('Connect to the socket and init a session.', () => {
            return new Promise((res) => {
                client.on('connect', function(connection) {
                    connection.send(JSON.stringify({ type : 'INIT' }));
                    connection.on('message', ({ utf8Data }) => {
                        sessionId = JSON.parse(utf8Data).data.session;
                        return res();
                    });
                });
                client.connect(`ws://localhost:${appPort}/`);
            });
        });

        it('Create client in the session and upload the file.', async () => {
            const uploader = new FileUploader({
                url : `http://localhost:${appPort}/file/${sessionId}`,
                filePath : path.join(__dirname, './mock-data/test.txt')
            });
            await uploader.upload();
        });

        it('Compare hashs.', () => {
            const originFile = fs.readFileSync(path.join(__dirname, './mock-data/test.txt'));
            const uploadedFile = fs.readFileSync(path.join(__dirname, './test.txt'));
            const originHash = crypto.createHash('md5');
            const uploadedHash = crypto.createHash('md5');
            assert.equal(
                originHash.update(originFile).digest('hex'),
                uploadedHash.update(uploadedFile).digest('hex')
            );
        });
    });

    after(() => {
        fs.unlinkSync(path.join(__dirname, './test.txt'))
    });
});
