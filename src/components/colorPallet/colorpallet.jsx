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

  const handleClickMenuClose = (colorCode) => {
    props.handleClose(colorCode);
  };
  const handleListKeyDown = () => {
    props.handleListKeyDown();
  };
  return (
    <Popper
      open={props.cpOpen}
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
            <ClickAwayListener onClickAway={handleClickMenuClose}>
              <MenuList
                autoFocusItem={props.cpOpen}
                id="menu-list-grow"
                onKeyDown={handleListKeyDown}
              >
                {colors.map((text, index) => (
                  <MenuItem
                    key={index}
                    className="color-pallet"
                    onClick={handleClickMenuClose(text)}
                    style={{ backgroundColor: text }}
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
