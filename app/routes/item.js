let service = require('../services/visualRecognition')

module.exports = function (app) {
    app.post('/api/item', function (req, res) {
        service.recognize(req.body.img).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({
                msg: err
            });
        });
    });

    app.post('/api/face', function (req, res) {
        service.recognize(req.body.img, 1).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({
                msg: err
            });
        });
    });
};