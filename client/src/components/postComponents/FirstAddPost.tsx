import React from 'react'
import { useState,useEffect } from 'react';
import { Box, Grid, TextField, Paper,Select, MenuItem ,InputLabel,RadioGroup,Radio,FormControlLabel} from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import {updatePostData} from "../../redux/features/PostSlice";
import PropertyImage from "../../assets/property.jpg"
import { PostData } from '../../types/post';

const FirstAddPost = () => {
    
  const postData = useSelector((state:any) => state.postData.postData);  
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log(postData);
    
  },[postData])
    const handleChange = (field:string , value: string|number)=>{      
          dispatch(updatePostData({
            ...postData,
            [field]: value
        }));
  }  
    return (
      <Box sx={{ flexGrow: 1 ,paddingTop:5}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box component={Paper} sx={{ p: 3 }}>
              <form >
                <InputLabel id="type-label">Transaction Type</InputLabel>
                <RadioGroup
                  aria-label="transaction-type"
                  name="TransactionType"
                  value={postData.TransactionType}
                  onChange={(event)=>handleChange("TransactionType",String(event.target.value))}
                  sx={{display:'flex',flexDirection:'row',padding:2,justifyContent:'space-between'}}
                >
                  <FormControlLabel value="Sale" control={<Radio />} label="Sale" />
                  <FormControlLabel value="Rent" control={<Radio />} label="Rent" />
                  <FormControlLabel value="Demande" control={<Radio />} label="Demande" />
                  <FormControlLabel value="Mortgage" control={<Radio />} label="Mortgage" />
                </RadioGroup>

                <InputLabel id="type-label">Property Type</InputLabel>
                <RadioGroup
                  aria-label="PropertyType"
                  name="PropertyType"
                  value={postData.PropertyType}
                  onChange={(event)=>handleChange("PropertyType",String(event.target.value))}
                  sx={{display:'flex',flexDirection:'row',padding:2,justifyContent:'space-between'}}
                >
                  <FormControlLabel value="Home" control={<Radio />} label="Home" />
                  <FormControlLabel value="Appartment" control={<Radio />} label="Appartment" />
                  <FormControlLabel value="Villa" control={<Radio />} label="Villa" />
                  <FormControlLabel value="GroundSpot" control={<Radio />} label="GroundSpot" />
                </RadioGroup>
                <TextField
                    name="Title"
                    label="Title"
                    value={postData.Title}
                    onChange={(event)=>handleChange("Title",String(event.target.value))}
                    fullWidth
                    required
                    sx={{marginTop:3}}

                />
                <TextField
                  name="Description"
                  label="Description"
                  multiline
                  rows={4}
                  value={postData.Description}
                  onChange={(event)=>handleChange("Description",String(event.target.value))}
                  fullWidth
                  required
                  sx={{marginTop:3}}
                  />
                <TextField
                    name="Price"
                    type="number"
                    label="Price"
                    value={postData.Price}
                    onChange={(event)=>handleChange("Price",Number(event.target.value))}
                    fullWidth
                    required
                    sx={{marginTop:3}}
                />
              </form>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component={Paper} sx={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'563px'}}>
              <img src={PropertyImage} alt="placeholder" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
}

export default FirstAddPost
