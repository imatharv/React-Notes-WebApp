import "./drawerStyles.scss";
import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  hide: {
    display: "block",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),

    border: "none !important",
    paddingLeft: 0,
    boxShadow: "0rem 0.5rem 1rem rgba(100,100,100,0.1) !important",
    [theme.breakpoints.up("md")]: {
      paddingLeft: 6,
      marginTop: 64,
    },
    marginTop: 55,
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(6.7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(8.5) + 1,
      paddingLeft: 6,
      marginTop: 64,
    },
    marginTop: 55,
    border: "none !important",
  },
}));

export default function ActionsDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // const handleDrawerClick = (component) => {
  //   props.handleDrawerLinkClick(component);
  // };

  // const handleDrawerToggle = () => {
  //   setOpen(!open);
  // };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: props.open,
        [classes.drawerClose]: !props.open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        }),
      }}
      // onMouseEnter={handleDrawerToggle}
      // onMouseLeave={handleDrawerToggle}
    >
      <List>
        <ListItem
          button
          //onClick={handleDrawerClick("notes")}
        >
          <ListItemIcon>
            <EmojiObjectsOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Notes</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <NotificationsNoneRoundedIcon />
          </ListItemIcon>
          <ListItemText>Reminders</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LabelOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Labels</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <EditOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Edit labels</ListItemText>
        </ListItem>
        <ListItem
          button
          //onClick={handleDrawerClick("archives")}
        >
          <ListItemIcon>
            <ArchiveOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Archives</ListItemText>
        </ListItem>
        <ListItem
          button
          //onClick={handleDrawerClick("trash")}
        >
          <ListItemIcon>
            <DeleteOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Trash</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
}
