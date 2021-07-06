import React from "react";
import "components/DayListItem.scss";

const classnames = require("classnames");

const formatSpots = function (spots) {
  let spotsString = "";
  if (spots > 1) {
    spotsString = `${spots} spots remaining`;
  }
  if (spots === 1) {
    spotsString = `${spots} spot remaining`;
  }
  if (spots === 0) {
    spotsString = "no spots remaining";
  }

  return spotsString;
};

const DayListItem = function (props) {
  console.log("daylistitem", props);
  const dayClass = classnames(
    "day-list__item",
    { "day-list__item--selected": props.selected },
    { "day-list__item--full": props.spots === 0 }
  );

  const formattedSpots = formatSpots(props.spots);

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formattedSpots}</h3>
    </li>
  );
};

export default DayListItem;
