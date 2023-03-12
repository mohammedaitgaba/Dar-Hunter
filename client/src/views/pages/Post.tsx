import  React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions,Box,Grid,Divider,Avatar, Stack, styled, Paper   } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

import Myimage from '../../assets/bannerBackground.png'
import Myimages from '../../assets/ekko.jpg'

import PremiumPosts from '../../components/homeComponents/PremiumPosts'
import SwipeableTextMobileStepper from '../../components/postComponents/imageSlider'
import { Post } from '../../types/post';
import { display } from '@mui/system';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: 'center',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    color: theme.palette.text.primary,
  }));

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

                    {/* images container  */}
                <CardActionArea>
                    <SwipeableTextMobileStepper data={images}/>
                </CardActionArea>

                <Box sx={{padding:3}}>

                    {/* Post Title and Price  */}
                    <Box sx={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {post.Title}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            {post.Price} DH
                        </Typography>
                    </Box>
                        <Divider/>

                    {/* posts Maker Info  */}
                    <Box sx={{display:'flex',justifyContent:'space-between', paddingTop:2,paddingBottom:2}}>
                        <Box sx={{display:'flex',alignItems:'center'}}>
                            <Avatar alt="Remy Sharp" src={Myimages}   sx={{ width: 80, height: 80 }}/>
                            <Typography paddingLeft={2}>
                                {post.Maker.FirstName} {post.Maker.LastName}
                            </Typography>
                        </Box>
                        <Box sx={{display:'flex',flexDirection:'column', alignItems:'start',justifyContent:'center'}}>
                            <Typography color={'Highlight'}>
                                <LocalPhoneOutlinedIcon /> {post.Maker.Phone}                            
                            </Typography>
                            <Typography color={'Highlight'}>
                                <ForwardToInboxOutlinedIcon/> {post.Maker.Email}                          
                            </Typography>
                        </Box>
                    </Box>
                        <Divider/>

                        {/* post descrption */}
                    <Box  sx={{paddingTop:2,paddingBottom:2}}>
                        <Typography variant="h5">
                            Description:                         
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {post.Description}
                        </Typography>
                    </Box>
                        <Divider/>

                        {/* post Details */}
                    <Box  sx={{paddingTop:2,paddingBottom:2}}>
                        <Typography variant="h5">
                            Details:                         
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Stack>
                                    <Item><Typography fontWeight={600}>Property type : </Typography> {post.PropertyType} </Item>
                                    <Item><Typography fontWeight={600}>TransactionType :</Typography> {post.TransactionType} </Item>
                                    <Item><Typography fontWeight={600}>City : </Typography>{post.City} </Item>
                                    <Item><Typography fontWeight={600}>Sector : </Typography>{post.Sector} </Item>
                                </Stack> 
                            </Grid>
                            <Grid item xs={6}>
                                <Stack>
                                    {Object.entries(post.Details[0]).map(([key,value])=>(
                                        <Item key={key}><Typography fontWeight={600}>{key} : </Typography> {value} </Item>
                                    ))}
                                </Stack>                           
                            </Grid>
                        </Grid>

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
