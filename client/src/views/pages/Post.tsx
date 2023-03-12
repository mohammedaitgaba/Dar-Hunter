import  React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions,Box,Paper,Grid,Divider  } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import Myimage from '../../assets/bannerBackground.png'
import Myimages from '../../assets/ekko.jpg'

import PremiumPosts from '../../components/homeComponents/PremiumPosts'
import SwipeableTextMobileStepper from '../../components/postComponents/imageSlider'
import { Post } from '../../types/post';
import { display } from '@mui/system';


export default function SinglePost() {
    const images = [Myimage,Myimages,Myimage,Myimages]
    const {user}= useSelector((state:any)=>state.auth)
    
    const { id } = useParams();
    const [post,setPost]=useState<Post>()
    useEffect(() => {
        GetPostById()
    }, [])

    const GetPostById = ()=>{
        axios.get(`http://localhost:3000/posts/onePost/${id}`,{
            headers: {
                'Authorization': 'Bearer ' + user.LoggedUser.token,
                'Content-Type': 'application/json'
              }
        })
        .then(res=>{            
            setPost(res.data.post)
        })
        .catch(err=>console.log(err))
    }
  return (
    <Box sx={{ flexGrow: 1 ,padding:10 ,paddingTop:15 }}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          {post?
            <Box sx={{display:'flex',width:'100%'}}>
                <Card sx={{ maxWidth: '100%' }}>
                <CardActionArea>
                    <CardContent>
                        {/* images container  */}
                        <SwipeableTextMobileStepper data={images}/>
                        {/* images container  */}
                    </CardContent>
                </CardActionArea>
                <Box sx={{padding:3}}>
                    <Box sx={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {post.Title}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            {post.Price} DH
                        </Typography>
                    </Box>
                    <Divider/>
                    <Box  sx={{paddingTop:2,paddingBottom:2}}>
                        <Typography variant="h5">
                            Description:                         
                        </Typography>
                        <Typography variant="body2" color="text.secondary">

                            {post.Description}
                        </Typography>
                    </Box>
                    <Divider/>
                </Box>
                <CardActions>
                    <Button size="small" color="primary">
                    Share
                    </Button>
                </CardActions>
                </Card>
            </Box>
            :
                <Box sx={{ display: 'flex',width:'100%',height:'100vh',justifyContent:'center',alignItems:'center'}}>
                    <CircularProgress />
                </Box>
        }
        </Grid>
        <Grid item xs={3}>
            <PremiumPosts/>
        </Grid>
      </Grid>
    </Box>
  );
}
