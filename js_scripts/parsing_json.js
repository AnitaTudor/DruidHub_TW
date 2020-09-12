function json_parsing() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("TEST").innerHTML =
                this.responseText;
        }
    };
    xhttp.open("GET", "../json_data_files/expansions_data.json", true);
    xhttp.send();
}