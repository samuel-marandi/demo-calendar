import React, { Fragment } from "react";
import PropTypes from "prop-types";

const DaysInMonth = (props) => {
  const { blanks, daysInMonth } = props;
  const totalSlots = [...blanks, ...daysInMonth];
  const rows = [];
  let cells = [];
  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      // if index not equal 7 that means not go to next week
      cells.push(row);
    } else {
      // when reach next week we contain all td in last week to rows
      rows.push(cells);
      cells = []; // empty container
      // in current loop we still push current row to new container
      cells.push(row);
    }
    if (i === totalSlots.length - 1) { // when end loop we add remain date
      rows.push(cells);
    }
  });
  
  return (
    <Fragment key={Math.random()}>
      {rows.map((days) => (<tr key={Math.random()}>{days}</tr>))}
    </Fragment>
  );
};

DaysInMonth.propTypes = {
  blanks: PropTypes.array.isRequired,
  daysInMonth: PropTypes.array.isRequired
};

export default DaysInMonth;
