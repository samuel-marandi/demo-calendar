import CalendarActionTypes from "./CalendarActionTypes";
import API_URL from "../../apiUrls";
import api from "../../api";

const CalendarActions = {
  setData: payload => ({ type: CalendarActionTypes.SET_DATA, payload }),
  
  findRemindersForTheDay:
      payload => ({ type: CalendarActionTypes.FIND_REMINDERS, payload }),
  
  updateReminders: payload => ({ type: CalendarActionTypes.ADD_NEW_EVENT, payload }),
  
  addEvent: payload => (dispatch, getState) => {
    dispatch(CalendarActions.updateReminders(payload));
    dispatch(CalendarActions.findRemindersForTheDay());
    CalendarActions.updateLocalStorage(getState().calendar.reminders);
  },
  
  updateLocalStorage: (payload) => {
    if (typeof (Storage) !== "undefined") {
      const data = JSON.stringify(payload);
      localStorage.setItem("reminders", data);
    }
  },
  
  getReminders: () => (dispatch, getState) => {
    const data = localStorage.getItem("reminders");
    if (data) {
      const reminders = JSON.parse(data);
      dispatch(CalendarActions.setData(reminders));
      dispatch(CalendarActions.findRemindersForTheDay());
    } else {
      api
      .get(API_URL.REMINDERS)
      .then(response => {
        dispatch(CalendarActions.setData(response.data));
        dispatch(CalendarActions.findRemindersForTheDay());
        CalendarActions.updateLocalStorage(getState().calendar.reminders);
      });
    }
  }
};

export default CalendarActions;
