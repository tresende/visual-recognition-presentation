
$(document).ready(function () {

    var handleFileSelect = function (evt) {
        var files = evt.target.files;
        var file = files[0];
        if (files && file) {
            var reader = new FileReader();
            reader.onload = function (readerEvt) {
                var binaryString = readerEvt.target.result;
                var base64 = btoa(binaryString);
                $.ajax({
                    url: '/api/item/',
                    method: 'post',
                    data: {
                        img: base64
                    },
                    success: function (rows) {
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
                    }
                });
            };
            reader.readAsBinaryString(file);
        }
    };
    document.getElementById('filePicker').addEventListener('change', handleFileSelect, false);
});