import React from "react";
import DayListItem from "components/DayListItem";

const DayList = function(props) {

  return (
    <ul data-testid="day">
      { props.days.map(day => (
      <DayListItem 
          key= { day.id }
          name={ day.name } 
          spots={ day.spots } 
          selected={ day.name === props.day }
          setDay={ props.setDay }  
        />
      )) };
    </ul>
  );
};

export default DayList;

