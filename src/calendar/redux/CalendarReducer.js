
import CalendarActionTypes from "./CalendarActionTypes";
import { findReminders } from "../helpers/Utils";

const initialState = {
  isLoading: true,
  reminders: [],
  remindersForTheDay: []
};

const CalendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case CalendarActionTypes.SET_DATA: {
      return {
        ...state,
        isLoading: false,
        reminders: action.payload
      };
    }
    case CalendarActionTypes.FIND_REMINDERS:
      return {
        ...state,
        remindersForTheDay: findReminders(state.reminders, action.payload)
      };
    case CalendarActionTypes.ADD_NEW_EVENT:
      return {
        ...state,
        reminders: [...state.reminders, action.payload]
      };
    default:
      return state;
  }
};

export default CalendarReducer;
