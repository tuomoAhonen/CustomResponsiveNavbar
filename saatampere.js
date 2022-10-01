fetch('https://api.openweathermap.org/data/2.5/weather?q=tampere&units=metric&lang=fi&appid=87fae93f75b393ea07953d9adef31685')
.then(function (response) {
    return response.json();
})
.then(function (responseJSON) {
    setSaaTampere(responseJSON);
})
.catch(function (error) {
    document.getElementById("saatampere").innerHTML="<p>Haettua tietoa ei pystytä näyttämään</p>";
    console.log(error);
})

function setSaaTampere(data) {
    var teksti="";

    teksti+="<ul><li><b>Kaupunki: "+data.name+"</b></li>";
    teksti+="<li>Sää: "+data.weather[0].description+"</li>";
    teksti+="<li>Lämpötila: "+Math.round(data.main.temp)+" &#8451;</li>";
    teksti+="<li>Tuulen nopeus: "+Math.round(data.wind.speed*10)/10+" m/s</li></ul>";
    teksti+=""

    document.getElementById("saatampere").innerHTML=teksti;
}