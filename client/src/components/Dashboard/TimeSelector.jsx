import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const TimeSelector = ({ time, setTime, startDate, startTime }) => {
  const currentDate = new Date();
  let min_time = new Date();

  if (startTime) {
    min_time = new Date(new Date().setHours(startTime.getHours(), startTime.getMinutes() + 5));
  }
  else if (startDate.getDate() !== currentDate.getDate()) {
    min_time.setHours(0, 0);
  }

  return (
    <div>
      <DatePicker
        selected={time}
        onChange={date => setTime(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={5}
        timeCaption="Time"
        dateFormat="h:mm aa"
        minTime={min_time}
        maxTime={currentDate.setHours(23, 55)}
      />
    </div>

  )
};

export default TimeSelector;
