import React from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import image from '../../assets/bannerBackground.png'
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
const PremiumPosts = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className="shadow-lg p-4 w-full text-center bg-white">
        <WorkspacePremiumRoundedIcon fontSize="large" sx={{color:'#FFD700'}}/>
        premium
      </div>
      <div className='py-6'>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={image}
              alt="Profile pic"
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
          </CardActionArea>
        </Card>
      </div>
    </div>
  )
}

export default PremiumPosts