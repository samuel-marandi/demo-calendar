import React from "react";
import PropTypes from "prop-types";

const WeekdaysHeader = (props) => {
  const { days } = props;
  
  return (
    <tr>
      {days.map((day) =>
        (
          <th className={WeekdaysHeader.styles.weekday} key={day} >
            {day.slice(0, 1)}
          </th>
        )
      )}
    </tr>
  );
};

WeekdaysHeader.propTypes = {
  days: PropTypes.array.isRequired
};

WeekdaysHeader.styles = {
  weekday: "my-app__calendar__day-view-week-day"
};

export default WeekdaysHeader;
