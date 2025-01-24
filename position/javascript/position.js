function localiser()
{
    document.getElementById('principale').style.display = "flex";
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function(trouverLatitudeETLongitude)
        {
            var latitude = trouverLatitudeETLongitude.coords.latitude;
            var longitude = trouverLatitudeETLongitude.coords.longitude;

            var map = L.map('map').setView([latitude, longitude], 18);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            var marqueur = L.marker([latitude, longitude]).addTo(map);

            var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=a6555805942a823eb4cb5bd48cf0eca7";
            axios.get(apiUrl)
            .then(response => {
                // Les données météorologiques se trouvent dans la propriété 'data' de la réponse
                var donneeTemperature = response.data;
                console.log(donneeTemperature);
                // Faites ce que vous souhaitez avec les données météorologiques
                document.getElementById('ville').innerHTML = donneeTemperature.name;
                document.getElementById('pays').innerHTML = donneeTemperature.sys.country;
                document.getElementById('temperature').innerHTML = Math.round(donneeTemperature.main.temp);
                document.getElementById('humidite').innerHTML = donneeTemperature.main.humidity;
                document.getElementById('vent').innerHTML = donneeTemperature.wind.speed;
                var iconeTemperature = document.getElementById('iconeTemperature');
                var etat = document.getElementById('etat');
                if(donneeTemperature.weather[0].main == "Clouds")
                {
                    iconeTemperature.src = "./images/nuage.png"
                    etat.innerHTML = "Nuageux"
                }
                else if(donneeTemperature.weather[0].main == "Clear")
                {
                    iconeTemperature.src = "./images/soleil.png"
                    etat.innerHTML = "Ensoleillé"
                }
                else if(donneeTemperature.weather[0].main == "Rain")
                {
                    iconeTemperature.src = "./images/pluie.png"
                    etat.innerHTML = "Pluvieux"
                }
                else if(donneeTemperature.weather[0].main == "Drizzle")
                {
                    iconeTemperature.src = "./images/bruine.png"
                    etat.innerHTML = "Bruineux"
                }
                else if(donneeTemperature.weather[0].main == "Haze")
                {
                    iconeTemperature.src = "./images/brume.png"
                    etat.innerHTML = "Brumeux"
                }
                else if(donneeTemperature.weather[0].main == "Snow")
                {
                    iconeTemperature.src = "./images/neige.png"
                    etat.innerHTML = "Enneigé"
                }
            })
            .catch(error => {
                // Gérez les erreurs de requête
                console.error(error);
            });
        });
    }
}

function bloquer()
{
    document.getElementById('principale').style.display = "none";
}