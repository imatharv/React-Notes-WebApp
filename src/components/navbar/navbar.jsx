import "./navbarStyles.scss";
import React from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import deepPurple from "@material-ui/core/colors/deepPurple";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#fff !important",
    color: blueGrey[800],
    boxShadow: "none !important;",
  },
  appBarShift: {},
  menuButton: {
    marginRight: 1,
  },
  logoImage: {
    marginRight: 10,
    maxHeight: "40px !important",
    width: "auto",
    display: "inline !important",
  },
  headerTitle: {
    fontWeight: "400 !important",
    display: "inline !important",
  },
  title: {
    flexGrow: 1,
    display: "none",
    justifyContent: "flex-start !important",
    alignItems: "center !important",
    alignContent: "center !important",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  search: {
    marginRight: 10,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(blueGrey[100], 0.2),
    "&:hover": {
      backgroundColor: fade(blueGrey[100], 0.4),
    },
    width: "100% ",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      marginRight: 300,
      width: "50% ",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1.5, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "70%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  avatarWrapper: {
    marginLeft: "auto",
  },
  avatar: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  popperMenu: {
    padding: theme.spacing(0, 2, 0, 2),
    margin: theme.spacing(0.5, 2, 1, 1),
    textAlign: "center",
    alignItems: "center !important",
    backgroundColor: "#fff",
    boxShadow: "0 0.5rem 1rem rgb(0 0 0 / 15%) !important",
    borderRadius: 8,
    // [theme.breakpoints.down("sm")]: {
    //   margin: theme.spacing(0),
    // },
  },
  menuItemAvatarWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1),
  },
  menuItemAvatar: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    alignSelf: "center !important",
    fontSize: "26px !important",
  },
  papper: {
    boxShadow: "none !important",
  },
  accountInfo: {
    marginBottom: 15,
  },
}));

function Navigation(props) {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [title, setTitle] = React.useState("Notes");
  const anchorRef = React.useRef(null);
  const prevOpen = React.useRef(menuOpen);

  const handleClickLogout = () => {
    props.islogout();
  };
  const handleNavbarDrawerToggle = () => {
    props.drawerExpand();
  };
  const handleAccountInfoMenuToggle = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };
  const handleAccountInfoMenuClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setMenuOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setMenuOpen(false);
    }
  }
  const handleSearchInputText = (e) => {
    props.dispatch({ type: "Search", searchData: e.target.value });
  };
  React.useEffect(() => {
    if (prevOpen.current === true && menuOpen === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = menuOpen;
  }, [menuOpen]);
  React.useEffect(() => {
    setTitle(props.title);
  }, [props]);

  return (
    <AppBar position="fixed" className={clsx(classes.appBar)}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleNavbarDrawerToggle}
          edge="start"
          className="{clsx(classes.menuButton)} navbar-drawer-toggle"
        >
          <MenuIcon />
        </IconButton>

        <div className={classes.title}>
          <img
            src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
            className={classes.logoImage}
            alt="logo"
          />
          <Typography variant="h6" className={classes.headerTitle} noWrap>
            {title}
          </Typography>
        </div>

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            onChange={handleSearchInputText}
          />
        </div>
        <div className={classes.avatarWrapper}>
          <Button
            ref={anchorRef}
            aria-controls={menuOpen ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            className="account-info-menu-toggle"
            onClick={handleAccountInfoMenuToggle}
          >
            <Avatar className={classes.avatar}>A</Avatar>
          </Button>
          <Popper
            className={classes.popperMenu}
            open={menuOpen}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            <Paper className={classes.papper}>
              <ClickAwayListener onClickAway={handleAccountInfoMenuClose}>
                <MenuList
                  className="popper-menu"
                  autoFocusItem={menuOpen}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <div className={classes.accountInfo}>
                    <div className={classes.menuItemAvatarWrapper}>
                      <Avatar className={classes.menuItemAvatar}>A</Avatar>
                    </div>

                    <Typography className="font-weight-bold">
                      {props.firstName} {props.lastName}
                    </Typography>
                    <Typography className="font-weight-light small">
                      {props.email}
                    </Typography>
                    <Button
                      variant="contained"
                      className="menuItemButton buttonLight"
                    >
                      Manage your account
                    </Button>
                  </div>

                  <Divider className="menuDivider" />

                  <div className={classes.accountInfo}>
                    <Button
                      variant="contained"
                      className="menuItemLogoutButton buttonLight"
                      onClick={handleClickLogout}
                    >
                      Sign out
                    </Button>
                  </div>
                  {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Popper>
        </div>
      </Toolbar>
    </AppBar>
  );
}
function mapStateToProps(state) {
  return {
    title: state.titleReducer.title,
  };
}
export default connect(mapStateToProps)(Navigation);
