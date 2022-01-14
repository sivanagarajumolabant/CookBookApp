

import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Box, Grid, Menu, MenuItem, TextField } from "@material-ui/core";
import StyledTreeItem from "../Components/Treeview";
import AccountCircle from "@material-ui/icons/AccountCircle";

 import Footer  from '../Components/Footer'
//   import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    background: "#3f51b5",
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#3f51b5",
  },
  drawerContainer: {
    overflow: 'auto',
    background: "#3f51b5",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "yellow !important"
  }
}));

export default function ClippedDrawer({children}) {
  const classes = useStyles();
//   const classes = useStyles();
     const theme = useTheme();
  
     const [isOpened, setIsOpened] = React.useState(true);
  
     const [auth, setAuth] = React.useState(true);
     const [anchorEl, setAnchorEl] = React.useState(null);
     const openview = Boolean(anchorEl);
  
     const handleChange = (event) => {
       setAuth(event.target.checked);
     };
  
     const handleMenu = (event) => {
       setAnchorEl(event.currentTarget);
     };
  
     const handleClose = () => {
       setAnchorEl(null);
     };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
           <Grid container direction="row" spacing={10}  
           style={{paddingLeft:'3rem'}}
           >
             <Grid item>
               <Typography variant="h6" className={classes.title}>
                 Cookbook
               </Typography>
             </Grid>

             <Grid item style={{ paddingRight: "1rem" }}>
               <Autocomplete
                 size="small"
                 id="grouped-demo"
                 options={[{ title: "material ui" }]}
                 groupBy={""}
                 getOptionLabel={(option) => option.title}
                 style={{ width: 300 }}
                 InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                 
                 renderInput={(params) => (
                   <TextField
                   InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                     {...params}
                     label="With categories"
                     variant="outlined"
                   />
                 )}
               />
             </Grid>
             <Grid item>
               <Autocomplete
                 size="small"
                 id="grouped-demo"
                 options={[{ title: "material ui" }]}
                 groupBy={""}
                 getOptionLabel={(option) => option.title}
                 style={{ width: 300 }}
                 InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                 renderInput={(params) => (
                   <TextField
                   InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                     {...params}
                     label="With categories"
                     variant="outlined"
                   />
                 )}
               />
             </Grid>
           </Grid>
           {auth && (
             <div>
               <IconButton
                 aria-label="account of current user"
                 aria-controls="menu-appbar"
                 aria-haspopup="true"
                 onClick={handleMenu}
                 color="inherit"
               >
                 <AccountCircle />
               </IconButton>
               <Menu
                 id="menu-appbar"
                 anchorEl={anchorEl}
                 anchorOrigin={{
                   vertical: "top",
                   horizontal: "right",
                 }}
                 keepMounted
                 transformOrigin={{
                   vertical: "top",
                   horizontal: "right",
                 }}
                 open={openview}
                 onClose={handleClose}
               >
                 <MenuItem onClick={handleClose}>Logout</MenuItem>
               </Menu>
             </div>
           )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
        <Box py={5}>
         <StyledTreeItem />
         </Box>
        </div>
      </Drawer>
      <Box py={10}>
      <main className={classes.content}>
        <Toolbar />
     {children}
      </main>
      </Box>
      <Footer/>
    
    </div>
  );
}
