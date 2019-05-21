import moment from "moment";

const currentDayDateString = () => `${moment().date()} ${moment().month() + 1} ${moment().year()}`;

const findReminders = (allReminders, selectedDayObject) => {
  const reminders = [];

  if (!selectedDayObject) {
    allReminders.forEach(reminder => {
      const reminderDateString = `${reminder.day} ${reminder.month} ${reminder.year}`;
      if (reminderDateString === currentDayDateString()) {
        reminders.push(reminder);
      }
    });
  } else {
    allReminders.forEach(reminder => {
      const reminderDateString = `${reminder.day} ${reminder.month} ${reminder.year}`;
      const userSelectedDate = `${selectedDayObject.day} ${selectedDayObject.month} ${selectedDayObject.year}`;
  
      if (reminderDateString === userSelectedDate) {
        reminders.push(reminder);
      }
    });
  }
  
  return reminders;
};

const validDate = (timeAndDate) => {
  const milliseconds = (new Date()).getTime();
  const inputMilliseconds = (new Date(timeAndDate)).getTime();

  return inputMilliseconds >= milliseconds;
};

export {
  validDate,
  findReminders,
  currentDayDateString
};
