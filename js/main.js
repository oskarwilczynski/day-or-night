function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 53.8008, lng: 1.5491},
      zoom: 3
    });

    map.addListener('click', function(event) {
        const latLng = event.latLng;

        map.setZoom(9);
        map.setCenter(latLng);

        fetchSunriseSunset(latLng.lat(), latLng.lng());
    });
}

function fetchSunriseSunset(lat, lng) {
    fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`)
    .then(res => {
        if (res.ok) {
        return res.json();
        } else {
        throw Error(`Request rejected with status ${res.status}`);
        }
    })
    .then(data => calcDaytime(data.results))
    .catch(err => console.error(err));
}

function calcDaytime(data) {
    const sunsetTime = data.sunset;
    const sunriseTime = data.sunrise;
    let currentTime = new Date().toISOString().substr(0,19) + "+00:00";

    // PREVENTING NOT UPDATED SUNRISE/SUNSET BUG FOR WEST
    if (sunsetTime.substr(0, 10) > currentTime.substr(0, 10)) {
        console.log("Test")
        currentTime = new Date();

        currentTime.setDate(currentTime.getDate() + 1);
        currentTime = currentTime.toISOString().substr(0,19) + "+00:00";
    }

    // PREVENTING NOT UPDATED SUNRISE/SUNSET BUG FOR EAST
    // if (sunriseTime.substr(0, 10) <= currentTime.substr(0, 10)) {
    //     console.log("Test2")
    //     currentTime = new Date();

    //     currentTime.setDate(currentTime.getDate() - 1);
    //     currentTime = currentTime.toISOString().substr(0,19) + "+00:00";;
    // }

    function decideDaytime() {
        if (currentTime >= sunriseTime && currentTime < sunsetTime) {
            return true;
        } else if (currentTime === sunsetTime) {
            return false;
        } else {
            return false;
        }
    }

    displayDaytime(decideDaytime());
}

function displayDaytime(boolean) {
    const header = document.querySelector("#text-header");

    if (boolean) {
        header.textContent = "It's a day!"

        header.style.textDecoration="underline";
        header.style.textDecorationColor="#ff4500";
    } else {
        header.textContent = "It's a night..."

        header.style.textDecoration="underline";
        header.style.textDecorationColor="#844f83";
    }
}
