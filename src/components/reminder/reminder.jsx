import React, { useEffect } from "react";
import "./reminderStyles.scss";
import IconButton from "@material-ui/core/IconButton";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import NoteService from "../../services/noteService";
const Service = new NoteService();

export default function AddReminder(props) {
  const [reminderDialogOpen, setReminderDialogOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date(""));
  const [selectedTime, setSelectedTime] = React.useState("");

  const handleClickReminderIcon = () => {
    setReminderDialogOpen(true);
  };

  const handleClickReminderDialogClose = () => {
    setReminderDialogOpen(false);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleSave = () => {
    if (props.parent === "createNote") {
      props.getReminders(selectedDate, selectedTime);
      setReminderDialogOpen(false);
    } else if (props.parent === "viewNote") {
      const token = localStorage.getItem("token");
      //let noteId = props.data.id;
      console.log(props.data.id);
      //let data = [selectedDate, selectedTime];
      let reminder = [];
      reminder = selectedDate + "T" + selectedTime;
      console.log(reminder);
      let data = {
        id: props.data.id,
        reminder: reminder,
      };
      Service.addReminder(data, token)
        .then((res) => {
          console.log(res);
          setReminderDialogOpen(false);
          props.displayNote();
        })
        .catch((error) => {
          console.log("Data posting error in add reminders: ", error);
        });
    }
  };

  const handleRemoveReminder = () => {
    if (props.parent === "ceareNote") {
      setSelectedDate("");
      setSelectedTime("");
      props.getReminders(selectedDate, selectedTime);
      setReminderDialogOpen(false);
    } else if (props.parent === "viewNote") {
      const token = localStorage.getItem("token");
      //let noteId = props.data.id;
      //let data = [selectedDate, selectedTime];
      let data = {
        id: props.data.id,
        reminder: [selectedDate, selectedTime],
      };
      Service.addReminder(data, token)
        .then((res) => {
          console.log(res);
          setReminderDialogOpen(false);
          props.displayNote();
        })
        .catch((error) => {
          console.log("Data posting error in remove collaborator: ", error);
        });
    }
  };

  return (
    <div className="reminder-wrapper">
      <IconButton aria-label="Remind me" onClick={handleClickReminderIcon}>
        <AddAlertOutlinedIcon fontSize="small" />
      </IconButton>
      <Dialog
        maxWidth="xs"
        open={reminderDialogOpen}
        onClose={handleClickReminderDialogClose}
        className="reminder-dialog"
        aria-labelledby="reminder-dialog-title"
        aria-describedby="reminder-dialog-description"
      >
        <DialogTitle id="reminder-dialog-title">Reminders</DialogTitle>
        <hr className="mx-3 mt-0 mb-2" />
        <DialogContent id="reminder-dialog-description">
          <TextField
            id="date"
            label="Select date"
            type="date"
            defaultValue="2017-05-24"
            className="mb-2"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            onChange={handleDateChange}
          />
          <TextField
            id="time"
            label="Select time"
            type="time"
            defaultValue="07:30"
            className=""
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            fullWidth
            onChange={handleTimeChange}
          />
        </DialogContent>
        <hr className="mx-3 mt-2 mb-0" />
        <DialogActions>
          <Button onClick={handleClickReminderDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
