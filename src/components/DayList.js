import React from 'react';
import DayListItem from './DayListItem';

function DayList(props) {
  const DayListItems = props.days.map(item => {
    return ( 
      <DayListItem 
        key={item.key} 
        name={item.name} 
        spots={item.spots} 
        selected={item.name === props.day} 
        setDay={props.setDay} 
      />
    )
  })

  return (
    <ul>
      {DayListItems}
    </ul>
  );
}

export default DayList;