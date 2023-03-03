import * as React from 'react';
import { Routes, Route,Link } from "react-router-dom";

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import Divider from '@mui/material/Divider';


import PostsUser from './PostsUser';
import ProfileUser from './ProfileUser';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const sideBarItems = [
    { text: "Profile", link: "/account/" ,icon:<AccountCircleOutlinedIcon/>},
    { text: "Posts", link: "/account/myPosts",icon:<InventoryOutlinedIcon/> },
  ];

  return (
    <div className='pt-[76px] flex h-screen'>
        <Box sx={{ display: 'flex'}}>
        <CssBaseline />
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
                <KeyboardArrowRightRoundedIcon />
            </IconButton>
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            height:'80vh',
            position:'relative',
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                top: '74px',
                height: '90%',
                justifyContent:'center',
                backgroundColor:'#DEE5E5',
            },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader sx={{position:'absolute',top:'0',right:'0'}}>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </DrawerHeader>
            <List>
            {sideBarItems.map((item, index) => (
              <Link to={item.link} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Divider />
                <ListItem key={item.text} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItemButton>
                </ListItem>
                <Divider />
              </Link>
            ))}
            </List>

        </Drawer>
        <Main open={open}>
            <Routes>
                <Route path='/' element={<ProfileUser/>}/>
                <Route path='/myPosts' element={<PostsUser/>}/>
            </Routes>
        </Main>
        </Box>

    </div>
  );
}