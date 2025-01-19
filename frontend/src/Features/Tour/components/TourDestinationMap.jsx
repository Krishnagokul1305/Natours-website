import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

function TourDestinationMap({ locations}) {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia3Jpc2huYTEzMDUiLCJhIjoiY202M3NqcHF6MTJjcTJrc2UyaDRqZnphdCJ9.AjZZ_rk7n-ydCcQtmHa09w";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      zoom: 7, // Initial zoom level
      center: locations[0].coordinates, // Set center to the first location
      style: "mapbox://styles/mapbox/streets-v11", // Set map style
    });

    // Add markers for each location
    locations.forEach((location) => {
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h3>Day ${location.day}: ${location.description}</h3>`);

      new mapboxgl.Marker()
        .setLngLat(location.coordinates)
        .setPopup(popup) // Attach the popup to the marker
        .addTo(mapRef.current);

      // Open the popup by default
      popup.addTo(mapRef.current); // Open the popup immediately
    });

    // Cleanup map on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div id="map-container" ref={mapContainerRef} className="h-[500px]">
      {/* Map will be rendered here */}
    </div>
  );
}

export default TourDestinationMap;
