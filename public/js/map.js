
// var map = L.map('map').setView([51.505, -0.09], 13);
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// navigator.geolocation.getCurrentPosition(success, error);
// var circle; // Declare circle variable globally
// var marker;
// let zoomed;

// function success(position) {
//     const latitude = position.coords.latitude;//latitude of the user
//     const longitude = position.coords.longitude;//longitude of the user
//     const accuracy = position.coords.accuracy;//accuraacy of the location

//     // if (circle) {
//     //     // Remove existing circle from the map
//         // map.removeLayer(circle);
//     // }
//        if(marker){
//         map.removeLayer(marker);
//         map.removeLayer(circle);
//        }
//      marker = L.marker([latitude, longitude]).addTo(map);//calling the markder method from th LEAFLET LIBRARY. This is to create a map marker to the location 

//     if (circle) {
//         // Update the radius of the existing circle
//         circle.setLatLng([latitude, longitude]).setRadius(accuracy * 9); // Adjust radius as needed
//     } else {
//         // Create a new circle if it doesn't exist
//         circle = L.circle([latitude, longitude], { radius: accuracy * 9 }).addTo(map);
//     }

//     if(!zoomed){
//        zoomed = map.fitBounds(circle.getBounds());// Adjust map view to fit the circle
//     }
//     map.setView([latitude,longitude]);//we are doing this because we want the map box to move with the marker ad 
//     //the marker should be on the middle of the box in which the map is being shown
// }
// function error(err) {
//     if (err.code == 1) {
//         alert("Please allow location access!");
//     } else {
//         alert("Cannot retrieve location!");
//     }
// }



// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 13); // Default coordinates and zoom

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// L.map('map'): Initializes a new Leaflet map on the HTML element with the ID map.
// .setView([51.505, -0.09], 13): Centers the map at latitude 51.505 and longitude -0.09 with a zoom level of 13.

// Function to geocode address
function geocodeAddress(address) {
    var url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`;

    // function geocodeAddress(address): Defines a function to convert an address into latitude and longitude.
    // var url = ...: Constructs the URL for the geocoding API request.

    console.log(`Geocoding URL: ${url}`); // console.log(...): Logs the constructed URL to the console for debugging.


    fetch(url)
        .then(response => {
            console.log('Response Status:', response.status); // Log the status code
            return response.json();
        })

//         fetch(url): Sends a request to the geocoding API.
// .then(response => ...): Processes the API response.
// console.log('Response Status:', response.status): Logs the status code of the response.
// return response.json(): Converts the response to JSON format.


        .then(data => {
            console.log('Geocoding Data:', data); // Log the geocoding data
            if (Array.isArray(data) && data.length > 0) {
                var location = data[0];
                if (location.lat && location.lon) {
                    var lat = location.lat;
                    var lon = location.lon;
                    console.log(`Extracted Latitude: ${lat}, Longitude: ${lon}`); // Log the extracted coordinates
                    placeMarker(lat, lon);
                } else {
                    console.error('Latitude and/or Longitude missing in response');
                }
            } else {
                console.error('No results found or data is not in expected format');
            }
        })
        .catch(error => console.error('Fetch Error:', error));
}

// .then(data => ...): Processes the JSON data received from the API.
// console.log('Geocoding Data:', data): Logs the data received from the geocoding API.
// if (Array.isArray(data) && data.length > 0): Checks if the data is an array with at least one result.
// var location = data[0]: Gets the first result from the array.
// if (location.lat && location.lon): Checks if the latitude and longitude are present.
// console.log(Extracted Latitude: ${lat}, Longitude: ${lon}): Logs the extracted coordinates.
// placeMarker(lat, lon): Calls the function to place a marker on the map with the coordinates.
// .catch(error => console.error('Fetch Error:', error)): Catches and logs any errors that occur during the fetch operation.



// Function to place a marker and circle on the map
function placeMarker(lat, lon) {
    // Remove existing markers and circles if needed
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker || layer instanceof L.Circle) {
            map.removeLayer(layer);
        }
    });
    // function placeMarker(lat, lon): Defines a function to add a marker and a circle to the map.
    // map.eachLayer(function(layer) {...}): Iterates over all layers on the map.
    // if (layer instanceof L.Marker): Checks if the layer is a marker.
    // map.removeLayer(layer): Removes the existing marker from the map.




    // Add new marker
    var marker = L.marker([lat, lon]).addTo(map)
        .bindPopup('Location: ' + lat + ', ' + lon)
        .openPopup();
    
        // L.marker([lat, lon]).addTo(map): Adds a new marker to the map at the specified coordinates.
        // .bindPopup('Location: ' + lat + ', ' + lon): Binds a popup to the marker with the coordinates.
        // .openPopup(): Opens the popup immediately.
        


    // Add a circle around the marker
    var circle = L.circle([lat, lon], {
        color: '#40a6f5', // Circle color
        fillColor: '#5a9fe8', // Fill color
        fillOpacity: 0.3, // Fill opacity
        radius: 1500 // Circle radius in meters
    }).addTo(map);

    // Set map view to the new location
    map.setView([lat, lon], 13);
}


// L.circle([lat, lon], {...}): Creates a circle centered at the marker’s location.
// color: 'blue': Sets the border color of the circle.
// fillColor: '#30a2ff': Sets the fill color of the circle.
// fillOpacity: 0.5: Sets the opacity of the circle’s fill color.
// radius: 500: Sets the radius of the circle in meters.
// .addTo(map): Adds the circle to the map.
// map.setView([lat, lon], 13): Centers the map view on the marker’s location with a zoom level of 13.



// Get the location data from the hidden input field
var locationData = document.getElementById('location-data').value;
console.log('Location Data:', locationData); // Log the location data

// Geocode the address and update the map
geocodeAddress(locationData);


// document.getElementById('listing-form'): Gets the form element by its ID.
// .addEventListener('submit', function(event) {...}): Adds an event listener for form submission.
// event.preventDefault(): Prevents the default form submission behavior.
// var address = document.getElementById('location-input').value: Gets the value of the location input field.
// console.log('Form Submitted with Location:', address): Logs the entered location address.
// geocodeAddress(address): Calls the geocodeAddress function with the entered address to fetch the coordinates and update the map.