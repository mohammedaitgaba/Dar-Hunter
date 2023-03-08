import React,{useState,useEffect} from 'react'
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

import axios from 'axios';
import { Post } from '../../types/post';
const Posts = () => {
  const [postsStyleSwitcher,setPostsStyleSwitcher] = useState(false)
  const [like ,setLike]= useState(false)
  const [posts,setPosts]=useState<[Post]>([])
  const [actuallPage,setActuallPage] = useState<number>(1)
  const [totalPages,setTotalPages] =useState<number>(0)
  useEffect(()=>{
    GetAllPosts()
  },[actuallPage])
  const GetAllPosts = async()=>{
    setPosts([])
    const response = await axios.post('http://localhost:3000/posts/AllPosts',{
      Limit:3,
      Page:actuallPage
    })
    if (response.data) {
      setTotalPages(response.data.TotalPages)
      response.data.posts?.forEach((element:Post) => {
        setPosts(prevArray => [...prevArray, element])
      });
    }
  }
  const handlePageChange = (event:any, page:number) => {
    setActuallPage(page)
  };

  return (
    <div className='flex flex-col'>
        <div className="flex justify-between shadow-lg p-4 w-full self-center bg-white" >
          <div>
            <DashboardOutlinedIcon fontSize="large" sx={!postsStyleSwitcher?{color:'#000080'}:{color:'#ADD8E6'}} onClick={()=>setPostsStyleSwitcher(false)} />
            <ViewAgendaOutlinedIcon fontSize="large" sx={postsStyleSwitcher?{color:'#000080'}:{color:'#ADD8E6'}} onClick={()=>setPostsStyleSwitcher(true)}/>
          </div>
          <div className="relative text-gray-600 w-2/4">
            <input type="search" name="search" placeholder="Search" className="bg-white border w-full h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"/>
            <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 20 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>
        <div className='flex flex-wrap py-6 md:justify-between justify-center'>
          {
            posts.map((post:Post)=>(
            <Card sx={!postsStyleSwitcher?{maxWidth: 345,minWidth:340,position:'relative',marginBottom:5}:{width:'100%',position:'relative',marginBottom:5}}>
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
                    {post.Title}                  
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.Description}
                  </Typography>
                </CardContent>
  
                <CardContent sx={{ width:'100%',display:'flex', justifyContent:'space-between'}}>
                  <Typography gutterBottom variant="h6" component="div" sx={{fontWeight:'600'}}>
                    {post.Price}
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
              <Pagination count={totalPages} shape="rounded" color="primary" onChange={handlePageChange}/>
            </Stack>
        </div>
    </div>
  )
}

export default Posts