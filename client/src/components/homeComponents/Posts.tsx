import React from 'react'
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import image from '../../assets/ekko.jpg'

const Posts = () => {
  const [postsStyleSwitcher,setPostsStyleSwitcher] = React.useState(false)
  return (
    <div className='flex flex-col'>
        <div className="shadow-lg p-4 w-full self-center bg-white" >
          <DashboardOutlinedIcon fontSize="large" sx={!postsStyleSwitcher?{color:'#000080'}:{color:'#ADD8E6'}} onClick={()=>setPostsStyleSwitcher(false)} />
          <ViewAgendaOutlinedIcon fontSize="large" sx={postsStyleSwitcher?{color:'#000080'}:{color:'#ADD8E6'}} onClick={()=>setPostsStyleSwitcher(true)}/>
        </div>
        <div className='flex flex-wrap py-6 md:justify-between justify-center'>
          <Card sx={!postsStyleSwitcher?{maxWidth: 345}:{width:'100%'}}>
            <CardActionArea sx={!postsStyleSwitcher?{display:'flex',flexDirection:'column'}:{display:'flex',marginBottom:5}}>
              <CardMedia
                component="img"
                image={image}
                alt="Profile pic" 
                sx={!postsStyleSwitcher?{height:'320px',maxHeight:'320px'}:{maxWidth:'200px'}}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </CardActionArea>
          </Card>
          <Card sx={!postsStyleSwitcher?{maxWidth: 345}:{width:'100%'}}>
            <CardActionArea sx={!postsStyleSwitcher?{display:'flex',flexDirection:'column'}:{display:'flex',marginBottom:5}}>
              <CardMedia
                component="img"
                image={image}
                alt="Profile pic" 
                sx={!postsStyleSwitcher?{height:'320px',maxHeight:'320px'}:{maxWidth:'200px'}}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </CardActionArea>
          </Card>
          <Card sx={!postsStyleSwitcher?{maxWidth: 345}:{width:'100%'}}>
            <CardActionArea sx={!postsStyleSwitcher?{display:'flex',flexDirection:'column'}:{display:'flex',marginBottom:5}}>
              <CardMedia
                component="img"
                image={image}
                alt="Profile pic" 
                sx={!postsStyleSwitcher?{height:'320px',maxHeight:'320px'}:{maxWidth:'200px'}}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </CardActionArea>
          </Card>

        </div>
    </div>
  )
}

export default Posts