import React, { useState } from 'react';
import Calendar from 'react-calendar';

function CalendarApp() {
  const [value, onChange] = useState(new Date());
 
  return (
    <div className="calendar">
      <Calendar
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default Calendar