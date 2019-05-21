import React from "react";
import PropTypes from "prop-types";
import { CALENDAR_STATE, ICONS, MONTHS } from "../helpers/Enums";
import "../styles/navigation-header.scss";

const NavigationHeader = (props) => {
  const {
    calendarState,
    onHeaderClick,
    userSelectedYear,
    userSelectedMonth,
    topBoundForYearView,
    onLeftNavigationClick,
    onRightNavigationClick
  } = props;
  
  const renderHeaderTitle = (state) => {
    const title = {
      [CALENDAR_STATE.DAY]: `${MONTHS[userSelectedMonth - 1]} ${userSelectedYear}`,
      [CALENDAR_STATE.MONTH]: `${userSelectedYear}`,
      [CALENDAR_STATE.YEAR]: `${topBoundForYearView - 11} - ${topBoundForYearView}`
    };
    
    return title[state];
  };
  
  return (
    <div className={NavigationHeader.styles.headerContainer}>
      <button onClick={onLeftNavigationClick} className={NavigationHeader.styles.navButtons}>
        <img className={NavigationHeader.styles.icon} src={ICONS.LEFT_CHEVRON} alt="left-chevron" />
      </button>
      <button onClick={onHeaderClick} className={NavigationHeader.styles.headerButton}>
        <span className={NavigationHeader.styles.headerText}>
          {renderHeaderTitle(calendarState)}
        </span>
      </button>
      <button onClick={onRightNavigationClick} className={NavigationHeader.styles.navButtons}>
        <img className={NavigationHeader.styles.icon} src={ICONS.RIGHT_CHEVRON} alt="right-chevron" />
      </button>
    </div>
  );
};

NavigationHeader.propTypes = {
  calendarState: PropTypes.string.isRequired,
  userSelectedYear: PropTypes.number.isRequired,
  userSelectedMonth: PropTypes.number.isRequired,
  topBoundForYearView: PropTypes.number.isRequired,
  onHeaderClick: PropTypes.func.isRequired,
  onLeftNavigationClick: PropTypes.func.isRequired,
  onRightNavigationClick: PropTypes.func.isRequired
};

NavigationHeader.styles = {
  icon: "my-app__calendar__nav-header-icon",
  headerText: "my-app__calendar__nav-header-text",
  headerButton: "my-app__calendar__nav-header-button",
  navButtons: "my-app__calendar__nav-header-nav-buttons",
  headerContainer: "my-app__calendar__nav-header-container"
};

export default NavigationHeader;
