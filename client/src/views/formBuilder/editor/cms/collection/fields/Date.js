import React, { useEffect, useState, useRef } from 'react';
import Flatpickr from 'react-flatpickr';
import '@styles/react/libs/flatpickr/flatpickr.scss';

const Date = ({field, value, onChange, rowId}) => {
  const [date, setDate] = useState(null);
  
  useEffect(() => {
    setDate(value);
  }, [value]);

  return <Flatpickr
    required
    className='form-control'
    value={date}
    onChange={(date) => {
      setDate(date[0]);
      onChange(field, date[0], rowId);
    }}
    options={{
      enableTime: field.includeTime ? true : false,
      dateFormat: 'Y-m-d H:i'
    }}  
  />
}

export default Date;