import React, { useEffect, useState, useRef } from 'react';
import Flatpickr from 'react-flatpickr';
import '@styles/react/libs/flatpickr/flatpickr.scss';

const Time = ({field, onChange, isDefault}) => {
  const [time, setTime] = useState(null);

  return <Flatpickr
    required
    className='form-control'
    value={time}
    onChange={(time) => {
      setTime(time[0]);
      onChange({[field.name]: time[0]});
    }}
    options={{
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i'
    }}  
  />
}

export default Time;