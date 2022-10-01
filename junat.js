fetch('https://rata.digitraffic.fi/api/v1/live-trains/station/HKI?departing_trains=100&include_nonstopping=false')
.then(function (response) {
    return response.json();
})
.then(function (responseJSON) {
    setJunat(responseJSON);
    console.log("toimii");
})
.catch(function (error) {
    console.log(error);
})

function setJunat(data) {
    var teksti="";
    var tyyppi="";

    for (var i=0; i<data.length; i++) {
        for (var j=0; j<data[i].timeTableRows.length; j++) {
            if (data[i].timeTableRows[j].stationShortCode == "TPE" && data[i].timeTableRows[j].type == "DEPARTURE" && data[i].timeTableRows[0].stationShortCode == "HKI") {
                if (data[i].trainCategory == "Long-distance") {
                    tyyppi="Kaukojuna";
                } else {
                    tyyppi="Lähijuna";
                }
                teksti+="<p><b>Lähtö:</b> "+data[i].timeTableRows[j].scheduledTime.substr(0, 10)+" "+data[i].timeTableRows[j].scheduledTime.substr(11, 5)+"</p>";
                teksti+="<p><b>Matka:</b> "+data[i].timeTableRows[0].stationShortCode+" - "+data[i].timeTableRows[data[i].timeTableRows.length-1].stationShortCode+"</p>";
                teksti+="<p class='junat-alarivi'><b>"+tyyppi+" numero:</b> "+data[i].timeTableRows[j].trainNumber+"</p>";
            }
        }
    }

    document.getElementById("junat").innerHTML=teksti;
}