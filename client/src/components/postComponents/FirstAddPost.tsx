import React from 'react'
import { useState,useEffect } from 'react';
import { Box, Grid, TextField, Paper,Select, MenuItem ,InputLabel} from '@mui/material';
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
                <Select
                    labelId="type-label"
                    name='TransactionType'
                    value={postData.TransactionType}
                    label="Type"
                    onChange={(event)=>handleChange("TransactionType",String(event.target.value))}
                    sx={{width:'100%',marginBottom:3}}
                >
                    <MenuItem value="Sell" >Sell</MenuItem>
                    <MenuItem value="Rent">Rent</MenuItem>
                    <MenuItem value="Demande">Demande</MenuItem>
                    <MenuItem value="Mortgage" >Mortgage</MenuItem>
                </Select>
                <InputLabel id="type-label">Property Type</InputLabel>
                <Select
                    labelId="type-label"
                    name='PropertyType'
                    value={postData.PropertyType}
                    label="Type"
                    onChange={(event)=>handleChange("PropertyType",String(event.target.value))}
                    sx={{width:'100%',marginBottom:3}}

                >
                    <MenuItem value="Home" >Home</MenuItem>
                    <MenuItem value="Appartment">Appartment</MenuItem>
                    <MenuItem value="Villa">Villa</MenuItem>
                    <MenuItem value="GroundSpot" >GroundSpot</MenuItem>
                </Select>
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
