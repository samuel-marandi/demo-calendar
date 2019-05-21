import React from "react";
import PropTypes from "prop-types";
import WeekdaysHeader from "./WeekdaysHeader";
import DaysInMonth from "./DaysInMonth";
import "../styles/day-view.scss";

const DayView = (props) => {
  const { days, blanks, daysInMonth } = props;
  
  return (
    <table className={DayView.styles.container}>
      <thead>
        <WeekdaysHeader days={days} />
      </thead>
      <tbody>
        <DaysInMonth blanks={blanks} daysInMonth={daysInMonth} />
      </tbody>
    </table>
  );
};

DayView.propTypes = {
  days: PropTypes.array.isRequired,
  blanks: PropTypes.array.isRequired,
  daysInMonth: PropTypes.array.isRequired
};

DayView.styles = {
  container: "my-app__calendar__day-view-container"
};

export default DayView;
