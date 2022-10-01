fetch('https://visittampere.fi/api/v1/event')
.then(function (response) {
    return response.json();
})
.then(function (responseJSON) {
    //document.getElementById("tapahtumat").innerHTML="<p>Toimii</p>";
    setTapahtumat(responseJSON);
})
.catch(function (error) {
    document.getElementById("tapahtumat").innerHTML="<p>Haettua tietoa ei pysty näyttämään</p>";
    console.log(error);
})

function setTapahtumat(data) {
    var teksti="";

    for(var i=0; i<data.length; i++) {
        while(data[i].description.includes("</p>\n<p>&nbsp;</p>\n")) {
            if(data[i].description.includes("</p>\n<p>&nbsp;</p>\n")) {
                var tutkittava=data[i].description;
                var indexi=tutkittava.indexOf("</p>\n<p>&nbsp;</p>\n");
                var alku=data[i].description.slice(0, indexi);
                var loppu=data[i].description.slice(indexi+21);
                data[i].description=alku+loppu;
            }
        }

        teksti+="<ul>";
        teksti+="<li><b>"+data[i].title+"</b></li>";
        teksti+="<li>"+data[i].description+"</li>";
        if(data[i].contact_info.address !== null){
            teksti+="<li>"+data[i].contact_info.address+"</li>";
        }
        if(data[i].ticket_link !== null){
            var linkki="<p>\n</p>"+data[i].ticket_link;
            teksti+="<li><a href='"+linkki+"'>"+linkki+"</a></li>";
        }
        teksti+="</ul>";
    }

    document.getElementById("tapahtumat").innerHTML=teksti;
}