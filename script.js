    //API url
    const url = 'https://api.wheretheiss.at/v1/satellites/25544';
    //Get the below code template from Leaflet
    const mymap = L.map('mapid').setView([0,0], 1);
    
    const tiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const layer = L.tileLayer(tiles);
    layer.addTo(mymap);
    
    //code for setting a custom icon for the marker
    const myIcon = L.icon({
    iconUrl: 'ISS.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],

});

//code for setting the marker
const  marker = L.marker([0,0], {icon: myIcon}).addTo(mymap);


//Function to get ISS json data from the API
    getISSData();

    let firstTime = true;
    async function getISSData(){
        const response = await fetch(url);
        const data = await response.json();
        //console.log(data);
        const lat = data.latitude;
        const lon = data.longitude;

        //const lat = 42.2875185;
        //const lon = -85.64109119999999;
        //console.log(lat, lon);
        document.getElementById("lat").textContent = lat.toFixed(2);
        document.getElementById("lon").textContent = lon.toFixed(2);

        if(firstTime)
        {
          mymap.setView([lat,lon], 2);
          firstTime = false;
        }
        
        const latlng = L.latLng(lat, lon);
        marker.setLatLng(latlng);

    }

    //to call function getISSS data every 1 second;
    setInterval(getISSData,1000);    