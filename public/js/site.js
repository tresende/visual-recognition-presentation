
$(document).ready(function () {

    var handleFileSelect = function (evt, resource, callback) {
        var files = evt.target.files;
        var file = files[0];
        if (files && file) {
            var reader = new FileReader();
            reader.onload = function (readerEvt) {
                var binaryString = readerEvt.target.result;
                var base64 = btoa(binaryString);
                $('#scream').attr('src', 'data:image/gif;base64,' + base64);
                $.ajax({
                    url: resource,
                    method: 'post',
                    data: {
                        img: base64
                    },
                    success: function (rows) {
                        callback(rows);
                    }
                });
            };
            reader.readAsBinaryString(file);
        }
    };


    var generalModel = function (evt) {
        handleFileSelect(evt, '/api/item/', function (rows) {
            ///por classificacao
            var html = "<table class='table table-striped'>";
            for (var i = 0; i < rows.length; i++) {
                html += "<tr>";
                html += "<td>" + rows[i].class + "</td>";
                html += "<td>" + rows[i].score + "</td>";
                html += "</tr>";
            }
            html += "</table>";
            $("#table-response").html(html);
        });
    };

    var faceDetection = function (evt) {


        handleFileSelect(evt, '/api/face/', function (data) {
            var img = document.getElementById("scream");
            var canvas = document.getElementById('myCanvas');
            $(canvas).attr('width', ($(img).width()))
            $(canvas).attr('height', ($(img).height()))

            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            ctx.drawImage(img, 10, 10);
            var context = canvas.getContext('2d');
            $(img).hide();

            ///por classificacao
            var rows = data.images[0].faces;
            var html = "<table class='table table-striped'><thead><th>Age</th><th>Gender</th></thead>";
            for (var i = 0; i < rows.length; i++) {
                html += "<tr>";
                html += "<td>" + JSON.stringify(rows[i].age) + "</td>";
                html += "<td>" + JSON.stringify(rows[i].gender) + "</td>";
                html += "</tr>";
                var face_location = rows[i].face_location;
                context.beginPath();
                context.rect(face_location.left, face_location.top, face_location.width, face_location.height);
                context.lineWidth = 2;
                context.strokeStyle = 'red';
                context.stroke();

                context.font = "20px Arial"
                context.fillStyle = 'white';
                var text = "Age: " + rows[i].age.min + " - " + rows[i].age.max;
                context.fillText(text, face_location.left, face_location.top + face_location.height + 20);
                context.fillText(text, face_location.left, face_location.top + face_location.height + 20);

            }
            html += "</table>";
            $("#face-response").html(html);
        });
    };

    document.getElementById('filePicker').addEventListener('change', generalModel, false);
    document.getElementById('face-detect').addEventListener('change', faceDetection, false);
});