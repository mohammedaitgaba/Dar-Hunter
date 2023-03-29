import { Box, Grid, TextField, Paper,Select, MenuItem ,InputLabel, Typography} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import {updatePostData} from "../../redux/features/PostSlice";

type DetailsData = {
    Rooms: number;
    Surface: number;
    floors: number;
  };
  
const ThirdAddPost = () => {

  const postData = useSelector((state:any) => state.postData.postData);        
  const dispatch = useDispatch();

    const handleDetailsChange = (field: keyof DetailsData, value: number) => {
      
      dispatch(updatePostData(
        {
          ...postData,
          Details: [
            {
              ...postData.Details[0],
              [field]: value,
            },
          ],
        }
      ))
      };
  return (
    <Box sx={{ flexGrow: 1 ,paddingTop:5}}>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Box component={Paper} sx={{ p: 3,width:'100%'}}>
            <Typography sx={{textAlign:'center'}}>Details</Typography>
            <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column', minHeight:'55vh'}}>           
                <TextField
                    name="Details[0].Surface"
                    type="number"
                    label="Surface"
                    value={postData.Details[0].Surface}
                    onChange={(event) => handleDetailsChange("Surface", Number(event.target.value))} 
                    fullWidth
                    required
                    sx={{marginTop:3}}
                />
                  
                <TextField
                    name="Rooms"
                    type="number"
                    label="Rooms"
                    value={postData.Details[0].Rooms}
                    onChange={(event) => handleDetailsChange("Rooms", Number(event.target.value))} 
                    fullWidth
                    required
                    sx={{marginTop:3}}
                />
                <TextField
                    name="floors"
                    type="number"
                    label="floors"
                    value={postData.Details[0].floors}
                    onChange={(event) => handleDetailsChange("floors", Number(event.target.value))} 
                    fullWidth
                    required
                    sx={{marginTop:3}}
                />
            </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box component={Paper} sx={{display:'flex',justifyContent:'center',alignItems:'center' }}>
            <div className='w-full h-[65vh]'></div>
        </Box>
      </Grid>
    </Grid>
  </Box>
  )
}

export default ThirdAddPost
