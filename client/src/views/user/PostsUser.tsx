import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Post } from "../../types/post";
import jwt_decode from "jwt-decode";
import { useNavigate  } from "react-router-dom";

import { styled } from "@mui/system";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const IconHolder = styled("form")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "35px",
  height: "35px",
  backgroundColor: "white",
  borderRadius: "50%",
  marginLeft: 1,
  marginRight: 1,
}));

const PostsUser = () => {
  const [posts, setPosts] = useState<Post[] | null>([]);
  const { user } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();



  // get id and token from user state so we can pass it with req

  const token: string = user?.LoggedUser?.token;
  const decodedToken: { id: string } = jwt_decode(token);
  const id = decodedToken?.id;

  useEffect(() => {
    GetMyPosts();
  }, []);

  const GetMyPosts = async () => {
    setPosts([]);
    const response = await axios.post(`${apiUrl}/posts/myPosts`, { maker: id });
    if (response.data) {
      response.data.MyPosts?.forEach((element: Post) => {
        setPosts((prevArray: any) => [...prevArray, element]);
      });
    }
  };
  const handleNavigateToPost = (id: string) => {
    navigate(`/posts/${id}`);
  };
  const handleUpdate = (id: string) => {
    navigate(`/updatePost/${id}`);
  };
  const handleDelete = async(id_post: string) => {
    const data = {id_post,id}
    console.log(data);
    
    await axios.put(`${apiUrl}/posts/DeletePost`,data,{
      headers: {
          'Authorization': 'Bearer ' +token,
          'Content-Type': 'application/json'
        }
    })
  .then(res=>{
    console.log(res.data);
    if (res.data) {
      toast.success(`${res.data.message}`)
      navigate(`/`);

    }
  })
  .catch(err=>{
    console.log(err.message)
    toast.error(`Data error  ${err.message}`)
  })
  };

  return (
    <div>
      <div className="flex flex-wrap px-20 py-6 md:justify-between justify-center">
        {posts
          ? posts.map((post: Post) => (
              <Card
                sx={{
                  maxWidth: 345,
                  minWidth: 340,
                  position: "relative",
                  marginBottom: 5,
                }}
              >
                <CardActionArea
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <CardMedia
                    component="img"
                    image={post.Pics[0]}
                    alt="pic"
                    sx={{ height: "280px", maxHeight: "300px" }}
                    onClick={() => handleNavigateToPost(post._id)}
                  />
                  <Box></Box>
                  {id === post.Maker._id && (
                    <Box
                      sx={{
                        position: "absolute",
                        display: "flex",
                        top: "10px",
                        right: "10px",
                        borderRadius: "50%",
                      }}
                    >
                      <IconHolder onClick={() => handleUpdate(post._id)}>
                        <CreateOutlinedIcon />
                      </IconHolder>
                      <IconHolder onClick={() => handleDelete(post._id)}>
                        <DeleteOutlinedIcon/>
                      </IconHolder>
                    </Box>
                  )}
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
          : <Box>
            No Posts Founds
            </Box>
            }
      </div>
    </div>
  );
};

export default PostsUser;
