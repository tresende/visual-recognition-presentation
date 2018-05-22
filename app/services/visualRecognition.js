var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
let fs = require('fs');
const key = '6755b2f9ac816a139682c2720290c2d7e0cc10d0';
const crypto = require("crypto");
module.exports = {

    recognize(base64, type) {
        return new Promise((resolve, reject) => {
            let guid = crypto.randomBytes(16).toString("hex");
            let fileName = "./temp/" + guid + ".png";
            base64 = base64.replace(/^data:image\/png;base64,/, "");
            fs.writeFile(fileName, base64, 'base64',
                function (err, data) {
                    if (err) { }
                    var visualRecognition = new VisualRecognitionV3({
                        api_key: key,
                        version_date: '2016-05-20',
                        headers: {
                            'X-Watson-Learning-Opt-Out': 'true'
                        }
                    });
                    var params = {
                        // threshold: 0.6,
                        threshold: 0,
                        images_file: fs.createReadStream(fileName),
                    };

                    if (type == 1) {
                        visualRecognition.detectFaces(params, function (err, response) {
                            return resolve(response);
                        });
                    } else {
                        visualRecognition.classify(params,
                            function (err, response) {
                                if (err) {
                                    return reject(err);
                                } else {
                                    return resolve(response.images[0].classifiers[0].classes.map((item) => {
                                        return {
                                            class: item.class,
                                            score: item.score
                                        }
                                    }).sort(function (a, b) {
                                        return b.score - a.score
                                    }));
                                }
                            });
                    }
                })
        });
    }
}