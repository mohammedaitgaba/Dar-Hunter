import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Post } from "../../types/post";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Pagination,
  Box,
  Button,
  Stack,
  Menu,
  MenuItem,
} from "@mui/material";
const apiUrl = import.meta.env.VITE_API_URL;

const Posts = () => {
  const [postsStyleSwitcher, setPostsStyleSwitcher] = useState(false);
  const [posts, setPosts] = useState<Post[] | null>([]);
  const [actuallPage, setActuallPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const {user}= useSelector((state:any)=>state.auth)

  // get id and token from user state so we can pass it with req

  const token:string = user?.LoggedUser?.token
  const decodedToken:{id:string} = jwt_decode(token);
  const id = decodedToken?.id; 

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();

  const handleUpdate = (id: string) => {
    navigate(`/updatePost/${id}`);
  };

  const handleNavigateToPost = (id:string)=>{
    navigate(`posts/${id}`);
  }

  // handle deleting a post by id
  const handleDelete = (id: string) => {
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // this part handle getting posts from server
  useEffect(() => {
    GetAllPosts();
  }, [actuallPage]);

  const GetAllPosts = async () => {
    setPosts([]);
    const response = await axios.post(`${apiUrl}/posts/AllPosts`, {
      Limit: 9,
      Page: actuallPage,
    });
    if (response.data) {
      setTotalPages(response.data.TotalPages);
      response.data.posts?.forEach((element: Post) => {
        setPosts((prevArray: any) => [...prevArray, element]);
      });
    }
  };
  const handlePageChange = (event: any, page: number) => {
    setActuallPage(page);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between shadow-lg p-4 w-full self-center bg-white">
        <div>
          <DashboardOutlinedIcon
            fontSize="large"
            sx={
              !postsStyleSwitcher ? { color: "#000080" } : { color: "#ADD8E6" }
            }
            onClick={() => setPostsStyleSwitcher(false)}
          />
          <ViewAgendaOutlinedIcon
            fontSize="large"
            sx={
              postsStyleSwitcher ? { color: "#000080" } : { color: "#ADD8E6" }
            }
            onClick={() => setPostsStyleSwitcher(true)}
          />
        </div>
        <div className="relative text-gray-600 w-2/4">
          <input
            type="search"
            name="search"
            placeholder="Search"
            className="bg-white border w-full h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
          />
          <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
            <SearchOutlinedIcon/>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap py-6 md:justify-between justify-center">
        {posts
          ? posts.map((post: Post) => (
              <Card
                sx={
                  !postsStyleSwitcher
                    ? {
                        maxWidth: 345,
                        minWidth: 340,
                        position: "relative",
                        marginBottom: 5,
                      }
                    : { width: "100%", position: "relative", marginBottom: 5 }
                }
              >
                <CardActionArea
                  sx={
                    !postsStyleSwitcher
                      ? { display: "flex", flexDirection: "column"}
                      : { display: "flex" }
                  }
                >
                  <CardMedia
                    component="img"
                    image={post.Pics[0]}
                    alt="pic"
                    sx={
                      !postsStyleSwitcher
                        ? { height: "280px", maxHeight: "300px" }
                        : { maxWidth: "200px" ,maxHeight: "250px",minHeight:'250px'}
                    }
                    onClick={()=>handleNavigateToPost(post._id)}
                  />
                  {
                    id===post.Maker._id &&
                  <Box
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "30px",
                      borderRadius: "50%",
                      width: "35px",
                      height: "35px",
                    }}
                  >
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      sx={{ padding: 0 }}
                    >
                      <ExpandMoreOutlinedIcon />
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={() => handleUpdate(post._id)}>
                        Update
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(post._id)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </Box>
                  }
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {post.Title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {post.Description}
                      </Typography>
                    </CardContent>

                    <CardContent
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "600" }}
                      >
                        {post.Price} DH
                      </Typography>
                      <BookmarkBorderOutlinedIcon fontSize="medium" />
                    </CardContent>
                </CardActionArea>
              </Card>
            ))
          : null}
      </div>
      <div className="self-center pt-4 ">
        <Stack spacing={2}>
          <Pagination count={totalPages} shape="rounded" color="primary" onChange={handlePageChange}/>
        </Stack>
      </div>
    </div>
  );
};

export default Posts;


