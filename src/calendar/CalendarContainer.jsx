import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import classNames from "classnames";

import "./styles/calendar.scss";
import NavigationHeader from "./components/NavigationHeader";
import DayView from "./components/DayView";
import { CALENDAR_STATE } from "./helpers/Enums";
import MonthView from "./components/MonthView";
import YearView from "./components/YearView";
import EventViewer from "./components/EventViewer";
import CalendarActions from "./redux/CalendarActions";
import AddNewEventView from "./components/AddNewEventView";

const CalendarContainer = (props) => {
  const {
    calendar,
    addEvent,
    getReminderData,
    findRemindersForTheDay
  } = props;
  
  const weekDayShort = moment.weekdaysShort();
  const [dateObject, setDateObject] = useState(moment());
  const [calendarState, setCalendarState] = useState(CALENDAR_STATE.DAY);
  const [topBoundForYearView, setTopBoundForYearView] = useState(moment().year());
  const [userSelectedDay, setUserSelectedDay] = useState(moment().date());
  const [userSelectedYear, setUserSelectedYear] = useState(moment().year());
  const [userSelectedMonth, setUserSelectedMonth] = useState(moment().month() + 1);
  const [topContainerVisible, setTopContainerVisible] = useState(true);
  const [addViewVisible, setAddViewVisible] = useState(false);
  const firstDayOfMonth = () => moment(dateObject).startOf("month").format("d");
  const totalNoOfDays = moment().daysInMonth();
  const blanks = [];
  const daysInMonth = [];
  const handleDayClick = (day) => setUserSelectedDay(day);
  
  for (let i = 0; i < firstDayOfMonth(); i++){
    blanks.push(<td key={i * Math.random()} className="calendar-day-empty">{""}</td>);
  }
  
  for (let d = 1; d <= totalNoOfDays; d++) {
    const dayStyles = classNames(CalendarContainer.styles.button, [{
      [CalendarContainer.styles.currentDay]:
      d === moment().date() &&
      userSelectedMonth === moment().month() + 1 &&
      userSelectedYear === moment().year(),
      [CalendarContainer.styles.buttonSelected]:
      d === userSelectedDay
    }]);
    
    daysInMonth.push(
      <td className={CalendarContainer.styles.calendarDay} key={d * Math.random()}>
        <div className={CalendarContainer.styles.buttonWrapper}>
          <button onClick={() => handleDayClick(d)} className={dayStyles}>
            {d}
          </button>
        </div>
      </td>
    );
  }
  
  const bottomContainerStyle = classNames(CalendarContainer.styles.bottomContainer, {
    [CalendarContainer.styles.bottomContainerAlternate]: !topContainerVisible
  });
  
  const handleHeaderClick = () => {
    switch (calendarState) {
      case CALENDAR_STATE.MONTH:
        setCalendarState(CALENDAR_STATE.YEAR);
        break;
      case CALENDAR_STATE.DAY:
        setCalendarState(CALENDAR_STATE.MONTH);
        break;
      default:
    }
  };
  
  const setMonth = () => {
    // console.log("Set month Called");
    let newDateObject = { ...dateObject };
    newDateObject = moment(newDateObject).set("month", userSelectedMonth);
    setDateObject(newDateObject);
  };
  
  const handleLeftNavigationClick = () => {
    switch (calendarState) {
      case CALENDAR_STATE.DAY:
        setUserSelectedMonth(userSelectedMonth === 1 ? 12 : userSelectedMonth - 1);
        setMonth();
        break;
      case CALENDAR_STATE.MONTH:
        setUserSelectedYear(userSelectedYear - 1);
        break;
      case CALENDAR_STATE.YEAR:
        setTopBoundForYearView(topBoundForYearView - 12);
        break;
      default:
    }
  };
  
  const handleRightNavigationClick = () => {
    switch (calendarState) {
      case CALENDAR_STATE.DAY:
        setUserSelectedMonth(userSelectedMonth === 12 ? 1 : userSelectedMonth + 1);
        setMonth();
        break;
      case CALENDAR_STATE.MONTH:
        setUserSelectedYear(userSelectedYear + 1);
        break;
      case CALENDAR_STATE.YEAR:
        setTopBoundForYearView(topBoundForYearView + 12);
        break;
      default:
    }
  };
  
  const handleYearClick = (year) => {
    setUserSelectedYear(year);
    setCalendarState(CALENDAR_STATE.MONTH);
  };
  
  const handleMonthClick = (month) => {
    setUserSelectedMonth(month);
    setMonth(month);
    setCalendarState(CALENDAR_STATE.DAY);
  };
  
  const handleAddEvent = (newEvent) => {
    const { title, location, timeAndDate } = newEvent;
    const payload = {
      day: moment(timeAndDate).date(),
      month: moment(timeAndDate).month() + 1,
      year: moment(timeAndDate).year(),
      title,
      location,
      from: moment(timeAndDate).hour(),
      to: moment(timeAndDate).hour()
    };
    
    addEvent(payload);
  };
  
  useEffect(() => getReminderData(), [getReminderData]);
  
  useEffect(
    () => findRemindersForTheDay({
      day: userSelectedDay,
      month: userSelectedMonth,
      year: userSelectedYear
    }),
    [
      findRemindersForTheDay,
      userSelectedDay,
      userSelectedMonth,
      userSelectedYear]
  );
  
  const renderView = (state) => {
    const viewState = {
      [CALENDAR_STATE.DAY]: <DayView
        days={weekDayShort}
        daysInMonth={daysInMonth}
        blanks={blanks}
      />,
      [CALENDAR_STATE.MONTH]: <MonthView
        handleMonthClick={handleMonthClick}
      />,
      [CALENDAR_STATE.YEAR]: <YearView
        handleYearClick={handleYearClick}
        topBoundForYearView={topBoundForYearView}
      />
    };
    
    return viewState[state];
  };
  
  return (
    <div className={CalendarContainer.styles.root}>
      <div className={CalendarContainer.styles.mainContainer}>
        {
          topContainerVisible &&
          <div className={CalendarContainer.styles.topContainer}>
            <NavigationHeader
              calendarState={calendarState}
              userSelectedYear={userSelectedYear}
              userSelectedMonth={userSelectedMonth}
              topBoundForYearView={topBoundForYearView}
              onHeaderClick={handleHeaderClick}
              onLeftNavigationClick={handleLeftNavigationClick}
              onRightNavigationClick={handleRightNavigationClick}
              headerTitle={moment().format("MMMM YYYY")}
            />
            {renderView(calendarState)}
          </div>
        }
        <div className={bottomContainerStyle}>
          <EventViewer
            setAddViewVisible={setAddViewVisible}
            reminders={calendar.remindersForTheDay}
            userSelectedDay={userSelectedDay}
            userSelectedYear={userSelectedYear}
            userSelectedMonth={userSelectedMonth}
            topContainerVisible={topContainerVisible}
            setTopContainerVisible={setTopContainerVisible}
          />
        </div>
        {
          addViewVisible &&
            <AddNewEventView
              userSelectedDay={userSelectedDay}
              userSelectedYear={userSelectedYear}
              userSelectedMonth={userSelectedMonth}
              handleAddClick={handleAddEvent}
              setAddViewVisible={setAddViewVisible}
            />
        }
      </div>
    </div>
  );
};

CalendarContainer.styles = {
  root: "my-app__calendar__root",
  mainContainer: "my-app__calendar__container",
  topContainer: "my-app__calendar__container-top",
  bottomContainer: "my-app__calendar__container-bottom",
  bottomContainerAlternate: "my-app__calendar__container-bottom-alternate",
  calendarDay: "my-app__calendar__calendar-day",
  currentDay: "my-app__calendar__calendar-day-current",
  weekday: "my-app__calendar__week-day",
  buttonWrapper: "my-app__calendar__calendar-day-wrapper",
  button: "my-app__calendar__calendar-day-button",
  buttonSelected: "my-app__calendar__calendar-day-selected"
};

CalendarContainer.propTypes = {
  addEvent: PropTypes.func.isRequired,
  calendar: PropTypes.object.isRequired,
  getReminderData: PropTypes.func.isRequired,
  findRemindersForTheDay: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  calendar: state.calendar
});

const mapDispatchToProps = dispatch => ({
  getReminderData: () => { dispatch(CalendarActions.getReminders()); },
  
  findRemindersForTheDay: (payload) => {
    dispatch(CalendarActions.findRemindersForTheDay(payload));
  },
  
  addEvent: (payload) => {
    dispatch(CalendarActions.addEvent(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer);
