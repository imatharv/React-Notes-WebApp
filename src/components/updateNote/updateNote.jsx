import "./updateNoteStyles.scss";
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import EmojiFlagsRoundedIcon from "@material-ui/icons/EmojiFlagsRounded";
import IconsGroup from "../icons/icons";

export default function UpdateNoteDialog(props) {
  const [DialogOpen, setDialogOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (DialogOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [DialogOpen]);
  //   const handleClose = () => {
  //     setDialogOpen(false);
  //   };
  return (
    <div>
      <Dialog
        open={props.dialogOpen}
        //onClose={handleClose}
        scroll={props.scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={props.scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Card className="displayNote">
              <CardHeader
                action={
                  <IconButton aria-label="Pin to top">
                    <EmojiFlagsRoundedIcon />
                  </IconButton>
                }
                title={
                  <TextField
                    name="noteTitle"
                    className="noteTitle"
                    id="standard-textarea"
                    label=""
                    //value={data.title}
                    placeholder="Title"
                    multiline
                    fullWidth
                  />
                }
              />
              <CardContent>
                <TextField
                  name="noteContent"
                  className="noteContent"
                  id="standard-textarea"
                  label=""
                  //value={data.description}
                  placeholder="Take a note.."
                  multiline
                  fullWidth
                />
              </CardContent>
              <CardActions disableSpacing>
                <IconsGroup />
              </CardActions>
            </Card>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            //onClick={handleClose}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
