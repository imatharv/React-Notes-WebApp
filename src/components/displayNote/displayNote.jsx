import "./displayNoteStyles.scss";

import React from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import EmojiFlagsRoundedIcon from "@material-ui/icons/EmojiFlagsRounded";
import IconsGroup from "../icons/icons";

export default function DisplayNotes() {
  return (
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
          placeholder="Take a note.."
          multiline
          fullWidth
        />
      </CardContent>
      <CardActions disableSpacing>
        <IconsGroup />
      </CardActions>
    </Card>
  );
}
