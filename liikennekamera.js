fetch('https://tie.digitraffic.fi/api/v1/data/camera-data')
.then(function (response) {
    return response.json();
})
.then(function (responseJSON) {
    setLiikenneKamerat(responseJSON);
    console.log("toimii json");
    console.log(responseJSON);
})
.catch(function (error) {
    console.log(error);
})

function setLiikenneKamerat(data) {
    var teksti="";
    var pvm="";
    var aika="";
    for(var i=0; i<data.cameraStations.length; i++) {
        for(var j=0; j<data.cameraStations[i].cameraPresets.length; j++) {
            if(data.cameraStations[i].cameraPresets[j].presentationName) {
                if(data.cameraStations[i].cameraPresets[j].presentationName.includes("Tampere")) {
                    pvm=data.cameraStations[i].cameraPresets[j].measuredTime.slice(0, data.cameraStations[i].cameraPresets[j].measuredTime.indexOf("T"));
                    aika=data.cameraStations[i].cameraPresets[j].measuredTime.slice(data.cameraStations[i].cameraPresets[j].measuredTime.indexOf("T")+1, data.cameraStations[i].cameraPresets[j].measuredTime.indexOf("Z"));
                    teksti+="<p><b>"+data.cameraStations[i].cameraPresets[j].presentationName+"</b> "+pvm+" "+aika+" <a href='"+data.cameraStations[i].cameraPresets[j].imageUrl+"'>"+data.cameraStations[i].cameraPresets[j].imageUrl+"</a></p>";
                    teksti+="<img class='liikennekamerakuvat' src='"+data.cameraStations[i].cameraPresets[j].imageUrl+"' alt='"+data.cameraStations[i].cameraPresets[j].presentationName+"'>";  
                };
            }
        };
    };
    document.getElementById("liikennekamera").innerHTML=teksti;
}