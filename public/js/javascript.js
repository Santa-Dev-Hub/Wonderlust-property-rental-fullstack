document.addEventListener('DOMContentLoaded', () => {
function confirmDelete() {
    if (confirm("Are you sure you want to delete this listing?")) {
        document.getElementById("deleteForm").submit();
    }
}
});
/* Function Declaration: function confirmDelete() {

     This line declares a function named confirmDelete. This function will contain the code that will run when the delete button is clicked.
     Confirmation Dialog: if (confirm("Are you sure you want to delete this listing?")) {
    
     confirm is a built-in JavaScript function that shows a modal dialog with a specified message and two buttons: "OK" and "Cancel".
     The message in this case is "Are you sure you want to delete this listing?".
     The confirm function returns true if the user clicks "OK" and false if the user clicks "Cancel".
     Form Submission: document.getElementById("deleteForm").submit();
    
     document.getElementById("deleteForm") selects the form element with the ID deleteForm.
     .submit() is a method that submits the form programmatically. This is equivalent to the user clicking the submit button on the form.
     Closing Braces: } (two closing braces to end the if statement and the function). */

     (() => {
        'use strict'
      
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')
      
        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
          form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
      
            form.classList.add('was-validated')
          }, false)
        })
      })()







      function confirmReviewDelete(reviewId) {
        if (confirm("Are you sure you want to delete this Review?")) {
          document.getElementById("deletereview-" + reviewId).submit();
        }
    }


   // javascript.js

// Array to store coordinates
let coords = [];

// Geocoding function
async function geocodeLocation(location) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&addressdetails=1`);
    const data = await response.json();
    console.log(data); // Add this line to inspect the API response
    if (data.length > 0) {
        const { lat, lon } = data[0];
        return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } else {
        throw new Error("Location not found");
    }
}

// Function to handle form submission
document.addEventListener('DOMContentLoaded', () => {
document.getElementById('newform').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const locationInput = document.querySelector('input[name="location"]').value;
    try {
        const { latitude, longitude } = await geocodeLocation(locationInput);

        // Store the coordinates in the array
        coords = [latitude, longitude];

        // Update the map with the new coordinates
        if (typeof window.updateMap === 'function') {
            window.updateMap(latitude, longitude);
        }

    } catch (error) {
        alert("Unable to find location: " + error.message);
    }
});
});



document.addEventListener('DOMContentLoaded', () => {
  const taxSwitch = document.querySelector('#flexSwitchCheckDefault');
  const gstline = document.getElementsByClassName('hidegst');


  taxSwitch.addEventListener('click', () => {
    console.log('Div clicked');
    for (let i = 0; i < gstline.length; i++) {
      gstline[i].classList.toggle('showgst');
    }
  });
});