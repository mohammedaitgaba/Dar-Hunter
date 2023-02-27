import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  styled,
} from "@mui/material";
import { alpha } from '@mui/material/styles';
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { Link, BrowserRouter as Router  } from "react-router-dom";
import LogoDarHunter from '../assets/logo/LogoDarHunter.png'
import LogoText from '../assets/logo/LogoText.png'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
  };

  const menuItems = [
    { text: "Home", link: "/" },
    { text: "About", link: "/about" },
    { text: "Contact", link: "/contact" },
    { text: "Properties", link: "/properties" },
  ];

  const Logo = styled(Link)({
    display:'flex',
    alignItems:'center',
    color: "black",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  });
                            // backgroundColor: alpha('#ffffff', 0.15), // set opacity to 25%


  return (
    <div className="fixed z-10 w-full">
    <Router>
        <AppBar position="static"  sx={{backgroundColor: 'rgba(255 , 255, 255, 0.41)',backdropFilter: 'blur(12px)'}} >
        <Toolbar  sx={{
              color:'black',
              boxShadow: '0',
              p: 2,
              display:'flex',
              justifyContent:'space-around'
          }}>

            <Logo to="/">
              <img src={LogoDarHunter} alt="Logo DarHunter" className="w-8"/>
              <img src={LogoText} alt="Logo DarHunter" className="w-28 h-4 m-2 "/>
            </Logo>
            {isMobile ? (
            <IconButton color="inherit" aria-label="menu" sx={{ ml: "auto" }} onClick={toggleDrawer(true)}>
                <MenuIcon />
            </IconButton>
            ) : (
            <>
              <Box sx={{ display: "flex" }}>
                  {menuItems.map((item, index) => (
                  <Button key={index} color="inherit" component={Link} to={item.link} sx={{paddingLeft:'20px',paddingRight:'20px'}}>
                      {item.text}
                  </Button>
                  ))}
              </Box>
              <Button variant="outlined" sx={{ color:'black',borderColor: 'black', borderWidth: 2}}>Login</Button>
            </>
            )}
        </Toolbar>
        <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
            <List sx={{ width: "300px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center" }}>
            <IconButton
                color="inherit"
                aria-label="close"
                sx={{ mr: "auto", display: { md: "none" } }}
                onClick={toggleDrawer(false)}
            >
                <CloseIcon />
            </IconButton>
            {menuItems.map((item, index) => (
                <ListItem key={index} component={Link} to={item.link} onClick={toggleDrawer(false)} >
                  <ListItemText primary={item.text}/>
                </ListItem>
            ))}
            </List>
        </Drawer>
        </AppBar>
    </Router>
    </div>

  );
};

export default Navbar;
