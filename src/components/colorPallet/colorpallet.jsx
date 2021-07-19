import "./colorPalletStyles.scss";
import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

export default function ColorPalletMenu(props) {
  const colors = [
    "#a7ffeb",
    "#cbf0f8",
    "#aecbfa",
    "#d7aefb",
    "#fdcfe8",
    "#e6c9a8",
    "#fff475",
    "#f28b82",
    "#ffffff",
  ];
  const handleClickGetColorCode = (e, color) => {
    props.handleClickGetColor(e, color);
  };
  const handleClickMenuClose = () => {
    props.handleClose();
  };
  const handleListKeyDown = () => {
    props.handleListKeyDown();
  };
  return (
    <Popper
      open={props.cpOpen}
      role={undefined}
      className="color-pallet-popper"
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "top" ? "center bottom" : "center top",
          }}
        >
          <div className="color-pallet-container">
            <ClickAwayListener onClickAway={handleClickMenuClose}>
              <MenuList
                autoFocusItem={props.cpOpen}
                id="menu-list-grow"
                onKeyDown={handleListKeyDown}
              >
                {colors.map((color, index) => (
                  <MenuItem
                    key={index}
                    className="color-pallet"
                    style={{ backgroundColor: color }}
                    onClick={(e) => handleClickGetColorCode(e, color)}
                  ></MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </div>
        </Grow>
      )}
    </Popper>
  );
}
