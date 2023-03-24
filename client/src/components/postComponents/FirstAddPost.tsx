import React from 'react'
import { useState,useEffect } from 'react';
import { Box, Grid, TextField, Paper,Select, MenuItem ,InputLabel} from '@mui/material';

const FirstAddPost = ({ postData, setPostData }:any) => {
    
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
            <Box component={Paper} sx={{ p: 3 }}>
              <form >
                <InputLabel id="type-label">Transaction Type</InputLabel>
                <Select
                    labelId="type-label"
                    name='TransactionType'
                    value={postData.TransactionType}
                    label="Type"
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{marginTop:3}}
                  />
                <TextField
                    name="Price"
                    type="number"
                    label="Price"
                    value={postData.Price}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{marginTop:3}}
                />
              </form>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component={Paper} sx={{display:'flex',justifyContent:'center',alignItems:'center' }}>
              <img src="https://via.placeholder.com/400x400" alt="placeholder" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
}

export default FirstAddPost
