import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "../styles/add-event-view.scss";
import { validDate } from "../helpers/Utils";

const AddNewEventView = (props) => {
  const {
    handleAddClick,
    userSelectedDay,
    userSelectedMonth,
    userSelectedYear,
    setAddViewVisible
  } = props;
  
  const [timeAndDate, setTimeAndDate] = useState(new Date(`${userSelectedMonth}/${userSelectedDay}/${userSelectedYear}`));
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  
  const handleAddButtonClick = () => {
    if (title.length === 0 || title.length <= 3) {
      setError("Title is too short or blank");
    } else if (!validDate(timeAndDate)) {
      setError("The date picked is not valid");
    } else {
      setError("");
      handleAddClick({ title, location, timeAndDate });
    }
  };
  
  return (
    <div className={AddNewEventView.styles.root}>
      <div className={AddNewEventView.styles.mainContainer}>
        <div className={AddNewEventView.styles.headerContainer}>
          <span className={AddNewEventView.styles.headerText}>Add New Event</span>
          <button
            onClick={() => setAddViewVisible(false)}
            className={AddNewEventView.styles.backButton}
          >
            Back
          </button>
        </div>
        <div className={AddNewEventView.styles.field}>
          <span className={AddNewEventView.styles.text}>Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={AddNewEventView.styles.input}
          />
        </div>
        <div className={AddNewEventView.styles.field}>
          <span className={AddNewEventView.styles.text}>Location</span>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={AddNewEventView.styles.input}
          />
        </div>
        <div className={AddNewEventView.styles.field}>
          <span className={AddNewEventView.styles.text}>Pick Date & Time</span>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={timeAndDate}
            onChange={setTimeAndDate}
            className={AddNewEventView.styles.datePicker}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
          />
        </div>
        <div className={AddNewEventView.styles.field}>
          {error && <div className={AddNewEventView.styles.error}>{error}</div>}
          <button
            onClick={handleAddButtonClick}
            className={AddNewEventView.styles.addButton}
          >Add Event
          </button>
        </div>
      </div>
    </div>
  );
};

AddNewEventView.propTypes = {
  handleAddClick: PropTypes.func.isRequired,
  userSelectedDay: PropTypes.number.isRequired,
  userSelectedYear: PropTypes.number.isRequired,
  setAddViewVisible: PropTypes.func.isRequired,
  userSelectedMonth: PropTypes.number.isRequired
};

AddNewEventView.styles = {
  root: "my-app__calendar__add-event-root",
  mainContainer: "my-app__calendar__add-event-container",
  headerContainer: "my-app__calendar__add-event-header",
  headerText: "my-app__calendar__add-event-header-text",
  backButton: "my-app__calendar__add-event-back-button",
  field: "my-app__calendar__add-event-field",
  text: "my-app__calendar__add-event-text",
  input: "my-app__calendar__add-event-input",
  error: "my-app__calendar__add-event-error",
  datePicker: "my-app__calendar__add-event-date-picker",
  addButton: "my-app__calendar__add-event-add-button"
};

export default AddNewEventView;
