import React from "react";
import { Route } from "react-router-dom";

import CalendarContainer from "../calendar/CalendarContainer";

const OpenRoutes = () => (<Route path="/" component={CalendarContainer} />);

export default OpenRoutes;
