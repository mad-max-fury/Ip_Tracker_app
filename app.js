
const url_string = window.location.href;
const url = new URL(url_string);
const userIp = url.searchParams.get("ipaddress");

const button = document.getElementById('btn');

const loader = document.querySelector('.loader-main');

const ipadd = userIp ? userIp : '';



async function getData(ipadd) {
    loaders('block')
    const URL = `https://geo.ipify.org/api/v1?apiKey=at_dNhG8M1kw4pcBL1dECaTFs3Gf2rK5&ipAddress=${ipadd}`
    console.log("getData")
    //get the geolocation
    const fetchURL = async (url) => await fetch(url).then(response => response.json())

    fetchURL(URL)
        .then(response => con(response))
        .catch(e => console.log(e))
};

getData(ipadd);
button.addEventListener('click', () => {
    console.log(getIp.value)
    getData(ipadd)
})


function con(response) {
    console.log(response)
    const ipAddress = response.ip;
    const loc = `${response.location.city}, ${response.location.country} ${response.location.postalCode}`
    const time = response.location.timezone;
    const ISP = response.isp
    const lat = response.location.lat;
    const lng = response.location.lng;

    details(ipAddress, loc, time, ISP)
    maps(lat, lng)
    loaders('none')

}

function details(ipAddress, loc, time, ISP) {
    const ipaddress = document.getElementById('ipaddress');
    const location = document.getElementById('location');
    const timezone = document.getElementById('timezone');
    const isp = document.getElementById('isp');

    ipaddress.textContent = ipAddress
    location.textContent = loc
    timezone.textContent = `GMT ${time}`
    isp.textContent = ISP
}


function maps(lat, lng) {
    //map
    let mymap = L.map('map').setView([lat, lng], 13);
    let marker = L.marker([lat, lng]).addTo(mymap);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidmVycmVhdXhibGFjayIsImEiOiJja3Fyem14aTcxY3cxMnhxaHAwb25sMGN5In0.Xc32_sTWg7mlqcGm_qoMxw'
    }).addTo(mymap);
}

function loaders(display) {
    if (display === 'block') {
        loader.classList.add('block');
        console.log(display);
    } else if (display === 'none') {
        console.log(display);
        loader.classList.remove('block');
    }
}
