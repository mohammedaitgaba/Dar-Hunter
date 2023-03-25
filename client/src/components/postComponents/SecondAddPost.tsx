import { Box, Grid, TextField, Paper,Select, MenuItem ,InputLabel, Typography} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import { toast } from 'react-toastify';

const MapToken = import.meta.env.VITE_MAP_Key;

mapboxgl.accessToken = MapToken;

const SecondAddPost = ({ postData, setPostData }:any) => {

    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);
    let marker:any = null
    useEffect(() => {
      const initializeMap = ({ setMap, mapContainerRef }) => {
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [-9.22933683809569, 32.29563731901142],
          zoom: 11,
        });
  
        map.on('load', () => {
          setMap(map);
  
          map.on('click', (event) => {
            const coordinates = [event.lngLat.lng, event.lngLat.lat];
            setPostData({
                ...postData,
                Location: [
                  {
                    lang: coordinates[0],
                    latit: coordinates[1],
                  },
                ],
              });   
            if (!marker) {
              const newMarker = new mapboxgl.Marker({ draggable: true }).setLngLat(coordinates).addTo(map);
              
              marker = newMarker
              newMarker.on('dragend', () => {
                  const lngLat = newMarker.getLngLat();
                console.log(`Marker is now at longitude: ${lngLat.lng} and latitude: ${lngLat.lat}`);
                setPostData({
                    ...postData,
                    Location: [
                      {
                        lang: lngLat.lng,
                        latit: lngLat.lat,
                      },
                    ],
                  });
              });
            } else {
              marker.setLngLat(coordinates);
              console.log(coordinates);
              
            }
          });
        });
      };
  
      if (!map) initializeMap({ setMap, mapContainerRef });
    }, [map]);
  

    const handleChange = (e:any)=>{
        setPostData({
            ...postData,
            [e.target.name]: e.target.value,
          });
    }  
  return (
    <Box sx={{ flexGrow: 1 ,paddingTop:5}}>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Box component={Paper} sx={{ p: 3,width:'100%'}}>
            <Typography sx={{textAlign:'center'}}>Info</Typography>
            <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column', minHeight:'55vh'}}>           
                <InputLabel id="type-label">City</InputLabel>
                <Select
                    labelId="type-label"
                    name='City'
                    value={postData.City}
                    label="City"
                    onChange={handleChange}
                    sx={{width:'100%'}}
                >
                    <MenuItem value="Sell" >Sell</MenuItem>
                    <MenuItem value="Rent">Rent</MenuItem>
                    <MenuItem value="Demande">Demande</MenuItem>
                    <MenuItem value="Mortgage" >Mortgage</MenuItem>
                </Select>
                <TextField
                    name="Sector"
                    label="Sector"
                    value={postData.Sector}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{marginTop:3}}

                />
                <TextField
                    name="Location"
                    label="Location"
                    disabled
                    value={postData.Location[0].lang+" , "+postData.Location[0].latit}
                    fullWidth
                    required
                    sx={{marginTop:3}}
                />
            </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box component={Paper} sx={{display:'flex',justifyContent:'center',alignItems:'center' }}>
            <div ref={mapContainerRef} className='w-full h-[65vh]'/>
        </Box>
      </Grid>
    </Grid>
  </Box>
  )
}

export default SecondAddPost