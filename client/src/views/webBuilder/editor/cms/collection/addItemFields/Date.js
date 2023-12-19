import React, { useEffect, useState, useRef } from 'react';
import Flatpickr from 'react-flatpickr';
import '@styles/react/libs/flatpickr/flatpickr.scss';

const DateCom = ({field, onChange}) => {
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (field.defaultValue === 'none') {
      setDate(null);
    }
    if (field.defaultValue === 'dateToAddItem') {
      const currentDate = new Date().toLocaleString();
      setDate(currentDate);
      onChange({[field.name]: currentDate});
    }
    if (field.defaultValue === 'specificDate') {
      setDate(field.defaultDate);
      onChange({[field.name]: field.defaultDate});
    }
  }, [field.defaultValue]);

  return <Flatpickr
    required
    className='form-control'
    value={date}
    onChange={(date) => {
      setDate(date[0]);
      onChange({[field.name]: date[0]});
    }}
    options={{
      enableTime: field.includeTime ? true : false,
      dateFormat: 'Y-m-d H:i'
    }}  
  />
}

export default DateCom;