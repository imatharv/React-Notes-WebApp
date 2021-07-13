import "./colorPalletStyles.scss";
import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({}));

export default function ColorPalletMenu(props) {
  const classes = useStyles();
  const handleClose = () => {
    props.handleClose();
  };
  const handleListKeyDown = () => {
    props.handleListKeyDown();
  };
  return (
    <Popper
      open={props.cpOpen}
      anchorEl={props.anchorRef}
      role={undefined}
      className="color-pallet-popper"
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom",
          }}
        >
          <div className="color-pallet-container">
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={props.cpOpen}
                id="menu-list-grow"
                onKeyDown={handleListKeyDown}
              >
                <MenuItem
                  className="color-pallet"
                  onClick={handleClose}
                ></MenuItem>
                <MenuItem
                  className="color-pallet"
                  onClick={handleClose}
                ></MenuItem>
                <MenuItem
                  className="color-pallet"
                  onClick={handleClose}
                ></MenuItem>
                <MenuItem
                  className="color-pallet"
                  onClick={handleClose}
                ></MenuItem>
                <MenuItem
                  className="color-pallet"
                  onClick={handleClose}
                ></MenuItem>
                <MenuItem
                  className="color-pallet"
                  onClick={handleClose}
                ></MenuItem>
              </MenuList>
            </ClickAwayListener>
          </div>
        </Grow>
      )}
    </Popper>
  );
}
