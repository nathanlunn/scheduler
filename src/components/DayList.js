import React from 'react';
import DayListItem from './DayListItem';

function DayList(props) {
  const DayListItems = props.days.map(item => {
    return ( 
      <DayListItem 
        key={item.id} 
        name={item.name} 
        spots={item.spots} 
        selected={item.name === props.value} 
        setDay={props.onChange} 
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