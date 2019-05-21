import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import classNames from "classnames";
import "../styles/event-viewer.scss";
import { currentDayDateString } from "../helpers/Utils";

const EventViewer = (props) => {
  const {
    reminders,
    topContainerVisible,
    setTopContainerVisible,
    setAddViewVisible,
    userSelectedDay,
    userSelectedMonth,
    userSelectedYear
  } = props;
  
  const mainContainerStyle = classNames(EventViewer.styles.mainContainer, {
    [EventViewer.styles.mainContainerAlternate]: !topContainerVisible
  });
  
  const eventsContainerStyle = classNames({
    [EventViewer.styles.eventsContainer]: topContainerVisible,
    [EventViewer.styles.eventsContainerAlternate]: !topContainerVisible
  });
  
  const selectedDateString = `${userSelectedDay} ${userSelectedMonth} ${userSelectedYear}`;
  const dayOfWeek = moment(`${userSelectedYear}-${userSelectedMonth}-${userSelectedDay}`).day();
  
  return (
    <div className={mainContainerStyle}>
      <div className={EventViewer.styles.headerContainer}>
        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus,jsx-a11y/click-events-have-key-events */}
        <div
          role="button"
          onClick={() => setTopContainerVisible(false)}
          className={EventViewer.styles.titleContainer}
        >
          <span className={EventViewer.styles.titleText}>{
           selectedDateString === currentDayDateString()
           ? "TODAY" : `${moment().day(dayOfWeek).format("dddd")}`
          }
          </span>
          <span className={EventViewer.styles.dateText}>
            {`${userSelectedDay}/${userSelectedMonth}/${userSelectedYear}`}
          </span>
        </div>
        {
          topContainerVisible &&
          <button
            onClick={() => setAddViewVisible(true)}
            className={EventViewer.styles.addButton}
          >Add New
          </button>
        }
        {
          !topContainerVisible &&
          <button
            onClick={() => setTopContainerVisible(true)}
            className={EventViewer.styles.addButton}
          >Back
          </button>
        }
      </div>
      <div className={eventsContainerStyle}>
        {
          reminders.length > 0
            ? reminders.map(reminder =>
            (
              <div key={Math.random()} className={EventViewer.styles.itemWrapper}>
                <div className={EventViewer.styles.bulletWrapper} >
                  <span className={EventViewer.styles.bullet} />
                </div>
                <div className={EventViewer.styles.contentContainer}>
                  <span className={EventViewer.styles.eventTitleText}>{reminder.title}</span>
                  <span className={EventViewer.styles.eventLocationText}>{reminder.location}</span>
                </div>
              </div>
            )
          )
            : <div>No events found today.</div>
        }
      </div>
    </div>
  );
};

EventViewer.propTypes = {
  reminders: PropTypes.array.isRequired,
  userSelectedDay: PropTypes.number.isRequired,
  userSelectedMonth: PropTypes.number.isRequired,
  userSelectedYear: PropTypes.number.isRequired,
  setAddViewVisible: PropTypes.func.isRequired,
  topContainerVisible: PropTypes.bool.isRequired,
  setTopContainerVisible: PropTypes.func.isRequired
};


EventViewer.styles = {
  mainContainer: "my-app__calendar__event-viewer-container-main",
  mainContainerAlternate: "my-app__calendar__event-viewer-container-main-alternate",
  headerContainer: "my-app__calendar__event-viewer-container-header",
  titleContainer: "my-app__calendar__event-viewer-container-title",
  titleText: "my-app__calendar__event-viewer-text-title",
  dateText: "my-app__calendar__event-viewer-text-date",
  addButton: "my-app__calendar__event-viewer-button",
  eventsContainer: "my-app__calendar__event-viewer-container-events",
  eventsContainerAlternate: "my-app__calendar__event-viewer-container-events-alternate",
  bulletWrapper: "my-app__calendar__event-viewer-bullet-wrapper",
  itemWrapper: "my-app__calendar__event-viewer-item-wrapper",
  bullet: "my-app__calendar__event-viewer-bullet",
  contentContainer: "my-app__calendar__event-viewer-container-content",
  eventTitleText: "my-app__calendar__event-viewer-text-event-title",
  eventLocationText: "my-app__calendar__event-viewer-text-event-location",
  eventTimingText: "my-app__calendar__event-viewer-text-event-timing"
};

export default EventViewer;
//
// <span className={EventViewer.styles.eventTimingText}>
//                     {`${reminder.from} - ${reminder.to}`}
//                   </span>
