import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import { toast } from 'react-toastify';

const MapToken = import.meta.env.VITE_MAP_Key;

mapboxgl.accessToken = MapToken;

const Map = (props) => {
  console.log(props.data);
  
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-9.9);
  const [lat, setLat] = useState(32.35);
  const [zoom, setZoom] = useState(2);
  const [markerLng, setMarkerLng] = useState(props.data.lang);
  const [markerLat, setMarkerLat] = useState(props.data.latit);
  const marker = useRef(null);
  
  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-left');

    // Add any additional map configurations, layers, or markers here

  }, []);
  function handleClick() {

    
    if (markerLng !=0 && markerLat != 0) {
      map.current.flyTo({
        center: [markerLng, markerLat],
        zoom: 10,
        speed: 0.8,
        curve: 1,
        // easing: (t) => t,
        essential: true,
  
      });
      if (marker.current) {
        // Update the marker location
        marker.current.setLngLat([markerLng, markerLat]);
      } else {
        // Create a new marker and add it to the map
        marker.current = new mapboxgl.Marker()
          .setLngLat([markerLng, markerLat])
          .addTo(map.current);
      }
    }else{
      toast.warn("Oups there is no data for this propertie 🥲!",{
        autoClose: 2000,
        className: '',
        position: toast.POSITION.TOP_CENTER,
      })
    }

  }

  return (
    <div className='my-12 shadow-sm  border flex justify-between'>
      <button onClick={handleClick}>Fly to new location</button>

      <div ref={mapContainer} className='w-8/12 h-[75vh]'/>
    </div>
  )
}

export default Map