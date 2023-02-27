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
    <div className='flex flex-col items-center justify-center sticky top-[90px]'>
      <div className="shadow-lg p-4 w-full text-center bg-white">
        <WorkspacePremiumRoundedIcon fontSize="large" sx={{color:'#FFD700'}}/>
        premium
      </div>
      <div className='py-6'>
        <Card sx={{ maxWidth: 340, width:340,marginBottom:5 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={image}
              alt="Profile pic"
              sx={{maxHeight:'150px'}}
            />
            <CardContent sx={{display:'flex',justifyContent:'space-between'}}>
              <Typography  variant="h6" component="div">
                Lizard
              </Typography>
              <Typography  variant="h6" component="div">
                1000 Dh
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 340 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={image}
              alt="Profile pic"
              sx={{maxHeight:'150px'}}
            />
            <CardContent sx={{display:'flex',justifyContent:'space-between'}}>
              <Typography  variant="h6" component="div">
                Lizard
              </Typography>
              <Typography  variant="h6" component="div">
                1000 Dh
              </Typography>
            </CardContent>

          </CardActionArea>
        </Card>
      </div>
    </div>
  )
}

export default PremiumPosts