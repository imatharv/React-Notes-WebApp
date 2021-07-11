import "./colorPattetStyles.scss";
import "./iconsStyles.scss";

// import clsx from "clsx";
// import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
// import Paper from "@material-ui/core/Paper";
// import Popper from "@material-ui/core/Popper";
// import MenuList from "@material-ui/core/MenuList";
// import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import CropOriginalRoundedIcon from "@material-ui/icons/CropOriginalRounded";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";

// const useStyles = makeStyles((theme) => ({
//   popperMenu: {
//     padding: theme.spacing(0, 2, 0, 2),
//     margin: theme.spacing(0.5, 2, 1, 1),
//     textAlign: "center",
//     alignItems: "center !important",
//     backgroundColor: "#fff",
//     boxShadow: "0 0.5rem 1rem rgb(0 0 0 / 15%) !important",
//     borderRadius: 8,
//     // [theme.breakpoints.down("sm")]: {
//     //   margin: theme.spacing(0),
//     // },
//   },
//   menuItemAvatarWrapper: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: theme.spacing(1),
//   },
// }));

export default function IconsGroup(props) {
  // const classes = useStyles();
  // const [menuOpen, setMenuOpen] = React.useState(false);
  // const anchorRef = React.useRef(null);
  // const prevOpen = React.useRef(menuOpen);

  // const handleAccountInfoMenuToggle = () => {
  //   setMenuOpen((prevOpen) => !prevOpen);
  // };
  // const handleAccountInfoMenuClose = (event) => {
  //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
  //     return;
  //   }
  //   setMenuOpen(false);
  // };
  // const handleClickColorMenu = () => {
  //   props.serColor(true);
  // };

  return (
    <div className="icons-group">
      <IconButton aria-label="Remind me">
        <AddAlertOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton aria-label="Add colaborators">
        <PersonAddOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton
        aria-label="Add colour"
        // onClick={handleClickColorMenu}
      >
        <PaletteOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton aria-label="Add image">
        <CropOriginalRoundedIcon fontSize="small" />
      </IconButton>
      <IconButton aria-label="Archive">
        <ArchiveOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton aria-label="More">
        <MoreVertRoundedIcon fontSize="small" />
      </IconButton>
      {/* <Popper
        className={classes.popperMenu}
        open={menuOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        <Paper className={classes.papper}>
          <ClickAwayListener onClickAway={handleAccountInfoMenuClose}>
              <div className={}>
               
              </div>
          </ClickAwayListener>
        </Paper>
      </Popper> */}
    </div>
  );
}
