import { useState,useEffect } from "react";

import { useParams,useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  ImageListItem,
  ImageList 
} from "@mui/material";
import { styled } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Post } from "../../types/post";
import PrimaryButton from "../../components/global/buttons/PrimaryButton";
import { toast } from 'react-toastify';



const Form = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  maxWidth: 600,
  margin: "0 auto",
}));

const Section = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));


export default function PostForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {user}= useSelector((state:any)=>state.auth)
  const apiUrl = import.meta.env.VITE_API_URL;
  const [post,setPost]=useState<Post>()
  const navigate = useNavigate();


  const token:string = user?.LoggedUser?.token
  if (token) {
    
    const decodedToken:{id:string} = jwt_decode(token);
    const id_user = decodedToken?.id;
  }

  useEffect(()=>{
    GetPostById()
  },[])
  const GetPostById = async()=>{
    try {
      const res = await axios.get(`${apiUrl}/posts/onePost/${id}`,{
          headers: {
              'Authorization': 'Bearer ' + user.LoggedUser.token,
              'Content-Type': 'application/json'
            }
      })
      setPost(res.data.post)
      const data = res.data.post
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  const handleChange = (field:string , value: string|number)=>{      
    setPost((prevState:any)=>({
      ...prevState,
      [field]:value
    }))
  }
  const handleDetailsChange = (field:string , value: string|number)=>{
    setPost((prevState:any)=>({
      ...prevState,
      Details: [
        {
          ...prevState.Details[0],
          [field]: value,
        },
      ],
    }))
  }

  const handleUpdatePost = async()=>{
    await axios.put(`${apiUrl}/posts/UpdatePost`,post,{
      headers: {
          'Authorization': 'Bearer ' + token,
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
  }

  return (
    <>
      {
      post && id_user===post.Maker._id ?
        <Form  sx={{paddingTop:12}}>
          <Section>
            <Typography variant="h5">Basic Information</Typography>
            <TextField
              id="title"
              name="Title"
              label="Title"
              value={post.Title}
              onChange={(event) =>
                handleChange("Title", String(event.target.value))
              }
              variant="outlined"
              required
            />
            <TextField
              id="description"
              name="Description"
              label="Description"
              multiline
              rows={4}
              value={post.Description}
              onChange={(event) =>
                handleChange("Description", String(event.target.value))
              }
              variant="outlined"
              required
            />
            <TextField
              id="price"
              name="Price"
              label="Price"
              type="number"
              value={post.Price}
              onChange={(event) =>
                handleChange("Price", Number(event.target.value))
              }
              variant="outlined"
              required
              InputProps={{
                startAdornment: <Box mr={1}>DH</Box>,
              }}
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">Transaction Type</FormLabel>
                <RadioGroup
                    aria-label="transaction-type"
                    name="TransactionType"
                    value={post.TransactionType}
                    onChange={(event)=>handleChange("TransactionType",String(event.target.value))}
                    sx={{display:'flex',flexDirection:'row',padding:2,justifyContent:'space-between'}}
                    >
                    <FormControlLabel value="Sell" control={<Radio />} label="Sell" />
                    <FormControlLabel value="Rent" control={<Radio />} label="Rent" />
                    <FormControlLabel value="Demande" control={<Radio />} label="Demande" />
                    <FormControlLabel value="Mortgage" control={<Radio />} label="Mortgage" />
                </RadioGroup>
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend">Property Type</FormLabel>
              <RadioGroup
                      aria-label="PropertyType"
                      name="PropertyType"
                      value={post.PropertyType}
                      onChange={(event)=>handleChange("PropertyType",String(event.target.value))}
                      sx={{display:'flex',flexDirection:'row',padding:2,justifyContent:'space-between'}}
                    >
                      <FormControlLabel value="Home" control={<Radio />} label="Home" />
                      <FormControlLabel value="Appartment" control={<Radio />} label="Appartment" />
                      <FormControlLabel value="Villa" control={<Radio />} label="Villa" />
                      <FormControlLabel value="GroundSpot" control={<Radio />} label="GroundSpot" />
                    </RadioGroup>
            </FormControl>
          </Section>
            <Section>
            <Typography variant="h5">Location</Typography>
            <TextField
              id="city"
              name="City"
              label="City"
              value={post.City}
              onChange={(event) =>
                handleChange("City", String(event.target.value))
              }
              variant="outlined"
              required
            />
            <TextField
              id="sector"
              name="Sector"
              label="Sector"
              value={post.Sector}
              onChange={(event) =>
                handleChange("Sector", String(event.target.value))
              }
              variant="outlined"
              required
            />
            </Section>
            <Section>
            <Typography variant="h5">Details</Typography>
            <TextField
                name="Details[0].Surface"
                type="number"
                label="Surface"
                value={post.Details[0].Surface}
                onChange={(event) =>
                  handleDetailsChange("Surface", Number(event.target.value))
                }
                fullWidth
                required
                sx={{ marginTop: 3 }}
              />

              <TextField
                name="Rooms"
                type="number"
                label="Rooms"
                value={post.Details[0].Rooms}
                onChange={(event) =>
                  handleDetailsChange("Rooms", Number(event.target.value))
                }
                fullWidth
                required
                sx={{ marginTop: 3 }}
              />
              <TextField
                name="floors"
                type="number"
                label="floors"
                value={post.Details[0].floors}
                onChange={(event) =>
                  handleDetailsChange("floors", Number(event.target.value))
                }
                fullWidth
                required
                sx={{ marginTop: 3 }}
              />
            </Section>
            <Section>
            <Typography variant="h5">Pics</Typography>
              <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                {post.Pics.map((item) => (
                  <ImageListItem key={item}>
                    <img
                      src={`${item}?w=164&h=164&fit=crop&auto=format`}
                      alt={item}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Section>
            <PrimaryButton title="Update" onClick={handleUpdatePost} width="120px" height="50px"/>
        </Form>
      :<Box sx={{padding:20,textAlign:'center'}}>
        <Typography>NOT Authorized</Typography>
      </Box>
      }
   </>
)
}

