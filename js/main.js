function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 53.8008, lng: 1.5491},
      zoom: 3
    });

    map.addListener('click', function(event) {
        // Displaying loading state
        document.querySelector("#text-header").textContent = "Loading...";
        document.querySelector("#text-header").style.textDecoration="none";
        
        const latLng = event.latLng;

        map.setZoom(9);
        map.setCenter(latLng);

        fetchAllData(latLng.lat(), latLng.lng());
    });
}

function fetchAllData(lat, lng) {
    let yesterdayData, currentData, tomorrowData;

    function fetchTemplate(variable, date) {
        return fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${date}&formatted=0`)
        .then(res => {
            if (res.ok) {
            return res.json();
            } else {
            throw Error(`Request rejected with status ${res.status}`);
            }
        })
        .then(data => variable = data.results)
        .catch(err => console.error(err));
    }

    function getYesterdayData() {
        yesterday = new Date();

        yesterday.setDate(yesterday.getDate() - 1);
        yesterday = yesterday.toISOString().substr(0,10);

        return fetchTemplate(yesterdayData, yesterday);
    }

    function getCurrentData() {
        return fetchTemplate(currentData, "today");
    }

    function getTomorrowData() {
        tomorrow = new Date();

        tomorrow.setDate(tomorrow.getDate() - 1);
        tomorrow = tomorrow.toISOString().substr(0,10);

        return fetchTemplate(tomorrowData, tomorrow);
    }

    function getAllData(){
        return Promise.all([getYesterdayData(), getCurrentData(), getTomorrowData()])
    }

    getAllData()
    .then(([yesterdayFetch, currentFetch, tomorrowFetch]) => {
        calcDaytime(yesterdayFetch, currentFetch, tomorrowFetch)
    })
}

function calcDaytime(yesterdayData, currentData, tomorrowData) {
    let currentTime = new Date().toISOString().substr(0,19) + "+00:00";

    function decideDaytime() {
        if (
            (currentTime >= currentData.sunrise && currentTime < currentData.sunset) ||
            (currentTime >= yesterdayData.sunrise && currentTime < yesterdayData.sunset) ||
            (currentTime >= tomorrowData.sunrise && currentTime < tomorrowData.sunset)
        ) {
            return true;
        } else if (currentTime === currentData.sunset) {
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
