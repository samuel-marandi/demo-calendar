import React from "react";
import PropTypes from "prop-types";
import { MONTHS as months } from "../helpers/Enums";
import "../styles/month-view.scss";

const MonthView = (props) => {
  const { handleMonthClick } = props;
  return (
    <div className={MonthView.styles.container}>
      {months.map((month, index) =>
        (
          <div key={month} className={MonthView.styles.wrapper}>
            <button
              onClick={() => handleMonthClick(index + 1)}
              className={MonthView.styles.button}
            >{month}
            </button>
          </div>
        )
      )}
    </div>
  );
};

MonthView.propTypes = {
  handleMonthClick: PropTypes.func.isRequired
};

MonthView.styles = {
  container: "my-app__calendar__month-view-container",
  wrapper: "my-app__calendar__month-view-button-wrapper",
  button: "my-app__calendar__month-view-button"
};
export default MonthView;
