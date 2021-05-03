import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Calendar = ({ startDate, setStartDate }) => {
  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        minDate={new Date()}
      />
    </div>
  );
};

export default Calendar;