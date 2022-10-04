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
            if (data[i].timeTableRows[j].stationShortCode == "TPE" && data[i].timeTableRows[j].type == "ARRIVAL") {
                if (data[i].trainCategory == "Long-distance") {
                    tyyppi="Kaukojuna";
                } else {
                    tyyppi="Lähijuna";
                }
                teksti+="<p>Lähtö: <b>"+data[i].timeTableRows[0].scheduledTime.substr(11, 5)+" - "+data[i].timeTableRows[0].scheduledTime.substr(0, 10).split("-").reverse().join("-").replace(/-/g, ".")+"</b></p>";
                teksti+="<p>Saapuminen: <b>"+data[i].timeTableRows[j].scheduledTime.substr(11, 5)+" - "+data[i].timeTableRows[j].scheduledTime.substr(0, 10).split("-").reverse().join("-").replace(/-/g, ".")+"</b></p>";
                teksti+="<p>Matka: <b>"+data[i].timeTableRows[0].stationShortCode+" - Tampere - "+data[i].timeTableRows[data[i].timeTableRows.length-1].stationShortCode+"</b></p>";
                teksti+="<p class='junat-alarivi'>"+tyyppi+" numero: <b>"+data[i].timeTableRows[j].trainNumber+"</b></p>";
            }
        }
    }

    teksti+="<table><tr><th>Lähtö</th><th>Saapuminen</th><th>Matka</th><th>Junanumero</th><th>Junatyyppi</th></tr>";
    for (var i=0; i<data.length; i++) {
        for (var j=0; j<data[i].timeTableRows.length; j++) {
            if (data[i].timeTableRows[j].stationShortCode == "TPE" && data[i].timeTableRows[j].type == "ARRIVAL") {
                if (data[i].trainCategory == "Long-distance") {
                    tyyppi="Kaukojuna";
                } else {
                    tyyppi="Lähijuna";
                }
                teksti+="<tr>";
                teksti+="<td>"+data[i].timeTableRows[0].scheduledTime.substr(11, 5)+" - "+data[i].timeTableRows[0].scheduledTime.substr(0, 10).split("-").reverse().join("-").replace(/-/g, ".")+"</td>";
                teksti+="<td>"+data[i].timeTableRows[j].scheduledTime.substr(11, 5)+" - "+data[i].timeTableRows[j].scheduledTime.substr(0, 10).split("-").reverse().join("-").replace(/-/g, ".")+"</td>";
                teksti+="<td>"+data[i].timeTableRows[0].stationShortCode+" - Tampere - "+data[i].timeTableRows[data[i].timeTableRows.length-1].stationShortCode+"</td>";
                teksti+="<td>"+data[i].timeTableRows[j].trainNumber+"</td>";
                teksti+="<td>"+tyyppi+"</td>";
                teksti+="</tr>"
            }
        }
    }
    teksti+="</table>";

    var filtteroidytjunat=[];
    var objekti={};
    for (var i=0; i<data.length; i++) {
        for (var j=0; j<data[i].timeTableRows.length; j++) {
            if (data[i].timeTableRows[j].stationShortCode == "TPE" && data[i].timeTableRows[j].type == "ARRIVAL") {
                if (data[i].trainCategory == "Long-distance") {
                    tyyppi="Kaukojuna";
                } else {
                    tyyppi="Lähijuna";
                }
                objekti={
                "lahtoaika":data[i].timeTableRows[0].scheduledTime.substr(11, 5)+" "+data[i].timeTableRows[0].scheduledTime.substr(0, 10).split("-").reverse().join("-").replace(/-/g, "."), 
                "saapumisaika":data[i].timeTableRows[j].scheduledTime.substr(11, 5)+" "+data[i].timeTableRows[j].scheduledTime.substr(0, 10).split("-").reverse().join("-").replace(/-/g, "."),
                "matka":data[i].timeTableRows[0].stationShortCode+" - Tampere - "+data[i].timeTableRows[data[i].timeTableRows.length-1].stationShortCode,
                "junanumero":data[i].timeTableRows[j].trainNumber,
                "junatyyppi":tyyppi
                };
                filtteroidytjunat.push(objekti);
            }
        }
    }

    filtteroidytjunat.sort(function(a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.lahtoaika) - new Date(b.lahtoaika);
    });

    console.log(filtteroidytjunat);

    teksti+="<h1>Aikataulu filtteröitynä lähdön perusteella</h1>";

    for (var i=0; i<filtteroidytjunat.length; i++) {
        teksti+="<p>Lähtö: <b>"+filtteroidytjunat[i].lahtoaika+"</b></p>";
        teksti+="<p>Saapuminen: <b>"+filtteroidytjunat[i].saapumisaika+"</b></p>";
        teksti+="<p>Matka: <b>"+filtteroidytjunat[i].matka+"</b></p>";
        teksti+="<p class='junat-alarivi'>"+filtteroidytjunat[i].junatyyppi+" numero: <b>"+filtteroidytjunat[i].junanumero+"</b></p>";
    }

    teksti+="<table><tr><th>Lähtö</th><th>Saapuminen</th><th>Matka</th><th>Junanumero</th><th>Junatyyppi</th></tr>";
    for (var i=0; i<filtteroidytjunat.length; i++) {
        teksti+="<tr>";
        teksti+="<td>"+filtteroidytjunat[i].lahtoaika+"</td>";
        teksti+="<td>"+filtteroidytjunat[i].saapumisaika+"</td>";
        teksti+="<td>"+filtteroidytjunat[i].matka+"</td>";
        teksti+="<td>"+filtteroidytjunat[i].junanumero+"</td>";
        teksti+="<td>"+filtteroidytjunat[i].junatyyppi+"</td>";
        teksti+="</tr>"
    }
    teksti+="</table>";

    document.getElementById("junat").innerHTML=teksti;
}