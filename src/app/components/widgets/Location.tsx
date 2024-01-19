'use client';
import toast from "react-hot-toast";

const Location = () => {
    if ("geolocation" in navigator) {
        // Get the current position
        navigator.geolocation.getCurrentPosition(
          // Success callback
          function(position) {
            // Access the latitude and longitude from the position object
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            const string = latitude.toString() + longitude.toString();
      
            // Log the latitude and longitude to the console
            toast.success(`${string}`);

          },
          // Error callback
          function(error) {
            console.error("Error getting location:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    return ( 
        <div>Hard one to do ayy
            
        </div>
     );
}
 
export default Location;