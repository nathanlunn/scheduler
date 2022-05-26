import React from "react";
import classNames from 'classnames';
import "components/DayListItem.scss";

// set extra classes to an element if it was given a truthy selected prop, or if the given spots prop is 0
function DayListItem(props) {
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  })

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">
        {props.spots === 0 && 'no spots remaining'}
        {props.spots === 1 && '1 spot remaining'}
        {props.spots > 1 && `${props.spots} spots remaining`}
      </h3>
    </li>
  );
} 

export default DayListItem;

