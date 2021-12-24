const container = document.querySelector('.container');
const getIpBtn = document.getElementById('get-location');

async function getLocation() {

    // get user ip
    let response = await fetch('https://api.ipify.org/?format=json');
    const {ip} = await response.json()

    // get user location
    const LocationResponse = await fetch(`http://ip-api.com/json/${ip}?lang=en&fields=1622041`);
    const {city, continent, country, district, regionName} = await LocationResponse.json();

    // render to browser location
    const geoLocation = document.createElement('div');
    geoLocation.innerHTML = `
    <ul class="geo-container">
        <li class="item">City: ${city}</li>
        <li class="item">Continent: ${continent}</li>
        <li class="item">Country: ${country}</li>
        <li class="item">District: ${district}</li>
        <li class="item">Region: ${regionName}</li>
    </ul>
    `
    container.appendChild(geoLocation);
}

getIpBtn.addEventListener('click', getLocation);