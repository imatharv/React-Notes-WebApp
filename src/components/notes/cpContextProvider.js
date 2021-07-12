import CpContext from './cpContext';
import React from "react";

export default function CpContextProvider(props) {
    
    const [cpOpen, setCpOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    return (
        <CpContext.Provider
            value={{
                cpOpen: cpOpen,
                handleToggle: () => {
                    setCpOpen((prevOpen) => !prevOpen);
                },
                handleClose: (event) => {
                    if (anchorRef.current && anchorRef.current.contains(event.target)) {
                    return;
                    }
                    setCpOpen(false);
                }
            }}
        >
            {props.children}
        </CpContext.Provider>
    )
}