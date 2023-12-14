import React, { useEffect, useState, useRef } from 'react';
import Flatpickr from 'react-flatpickr';
import '@styles/react/libs/flatpickr/flatpickr.scss';

const Time = ({field, value, onChange, isDefault, rowId}) => {
  const [time, setTime] = useState(null);
  
  useEffect(() => {
    setTime(value);
  }, [value]);

  return <Flatpickr
    required
    className='form-control'
    value={time}
    onChange={(time) => {
      setTime(time[0]);
      onChange(field, time[0], rowId);
    }}
    options={{
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i'
    }}  
  />
}

export default Time;