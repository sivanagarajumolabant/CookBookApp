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
import GmailTreeView from "../Components/Treeview";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";
import Footer from "../Components/Footer";
import axios from "axios";
import API_BASE_URL from "../Config/config";
//   import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
    overflow: "auto",
    background: "#3f51b5",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
     width:'100%'
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "yellow !important",
  },
  inputRoot: {
    color: "white",
     
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      // Default left padding is 6px
      paddingLeft: 26
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    }
  }
}));

export default function ClippedDrawer({ children }) {
  const classes = useStyles();
  //   const classes = useStyles();
  const theme = useTheme();

  const [isOpened, setIsOpened] = React.useState(true);

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openview = Boolean(anchorEl);
  const [menuList, setmenuList] = React.useState([]);
const history =useHistory()
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
     localStorage.clear()
     history.push('/')
  };
  const getmenus = async (value) => {
    const res = await axios.get(`${API_BASE_URL}/fol/${value}`);
    setmenuList(res.data);
  };

  React.useEffect(() => {
    getmenus(1);
  }, []);

  const handleversion = (v) => {
    getmenus(v.code);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid
            container
            direction="row"
            spacing={10}
            style={{ paddingLeft: "3rem" }}
          >
            <Grid item
            
             onClick={()=>history.push('/dashboard')}
            >
              <Typography variant="h6" className={classes.title}>
                Cookbook
              </Typography>
            </Grid>

            <Grid item style={{ paddingRight: "1rem" }}>
              <Autocomplete
                size="small"
                id="grouped-demo"
                className={classes.inputRoot}
                options={[
                  { title: "Oracle To Postgres" },
                  { title: "Oracle TO SQLServer" },
                  { title: "Oracle To MYSQL" },
                ]}
                groupBy={""}
                defaultValue={{ title: "Oracle To Postgres" }}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                    {...params}
                    label="MigrationTypes                     "
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Autocomplete
                size="small"
                id="grouped-demo"
                options={[
                  { title: "v1", code: 1 },
                  { title: "v2", code: 2 },
                  { title: "v3", code: 3 },
                ]}
                 className={classes.inputRoot}
                groupBy={""}
                getOptionLabel={(option) => option.title}
                defaultValue={{ title: "v1", code: 1 }}
                style={{ width: 300 }}
                onChange={(e, v) => handleversion(v)}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                    {...params}
                    label="Migration Type  Versions"
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
            <GmailTreeView menuList={menuList} />
          </Box>
        </div>
      </Drawer>
      <Box py={3}>
        <main className={classes.content}>
          <Toolbar />
          {children}
        </main>
      </Box>
      {/* <Footer /> */}
    </div>
  );
}
