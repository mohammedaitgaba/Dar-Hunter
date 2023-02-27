import React from 'react'
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea} from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import image from '../../assets/ekko.jpg'

const Posts = () => {
  const [postsStyleSwitcher,setPostsStyleSwitcher] = React.useState(false)
  const [like ,setLike]= React.useState(false)
  let items=[]
  for (let i = 0; i < 12; i++) {
    items.push(i)
  }
  return (
    <div className='flex flex-col'>
        <div className="shadow-lg p-4 w-full self-center bg-white" >
          <DashboardOutlinedIcon fontSize="large" sx={!postsStyleSwitcher?{color:'#000080'}:{color:'#ADD8E6'}} onClick={()=>setPostsStyleSwitcher(false)} />
          <ViewAgendaOutlinedIcon fontSize="large" sx={postsStyleSwitcher?{color:'#000080'}:{color:'#ADD8E6'}} onClick={()=>setPostsStyleSwitcher(true)}/>
        </div>
        <div className='flex flex-wrap py-6 md:justify-between justify-center'>
          {
            items.map((item)=>(
            <Card sx={!postsStyleSwitcher?{maxWidth: 345,position:'relative',marginBottom:5}:{width:'100%',position:'relative',marginBottom:5}}>
              <CardActionArea  sx={!postsStyleSwitcher?{display:'flex',flexDirection:'column'}:{display:'flex'}} >
                <CardMedia
                  component="img"
                  image={image}
                  alt="Profile pic" 
                  sx={!postsStyleSwitcher?{height:'280px',maxHeight:'300px'}:{maxWidth:'200px'}}
                />
                <FavoriteRoundedIcon color={'action'} sx={{position:'absolute', top:'5px',right:'5px',backgroundColor:'white',borderRadius:'50%',width:'35px',height:'35px'}}/>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
  
                <CardContent sx={{ width:'100%',display:'flex', justifyContent:'space-between'}}>
                  <Typography gutterBottom variant="h6" component="div" sx={{fontWeight:'600'}}>
                    1000dh
                  </Typography>
                  <BookmarkBorderOutlinedIcon fontSize="medium"/>
                </CardContent>
  
              </CardActionArea>
            </Card>
            ))
          }

        </div>
        <div className='self-center pt-4 '>
          <Stack spacing={2}>
              <Pagination count={10} shape="rounded" color="primary"/>
            </Stack>
        </div>
    </div>
  )
}

export default Posts