import React from "react";
import PropTypes from "prop-types";
import "../styles/year-view.scss";

const YearView = (props) => {
  const { topBoundForYearView, handleYearClick } = props;
  const lowerBoundForYearView = topBoundForYearView - 11;
  
  const range = (size, startAt = 0) =>
    [...Array(size).keys()].map(i => i + startAt);
  
  const years = range(12, lowerBoundForYearView);
  
  return (
    <div className={YearView.styles.container}>
      {years.map((year) =>
        (
          <div key={year} className={YearView.styles.wrapper}>
            <button
              onClick={() => handleYearClick(year)}
              className={YearView.styles.button}
            >{year}
            </button>
          </div>
        )
      )}
    </div>
  );
};

YearView.propTypes = {
  topBoundForYearView: PropTypes.number.isRequired,
  handleYearClick: PropTypes.func.isRequired
};

YearView.styles = {
  container: "my-app__calendar__year-view-container",
  wrapper: "my-app__calendar__year-view-button-wrapper",
  button: "my-app__calendar__year-view-button"
};

export default YearView;
