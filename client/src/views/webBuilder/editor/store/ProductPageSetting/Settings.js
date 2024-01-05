import React, { useState, useEffect } from 'react';
import { Input } from 'reactstrap';

export const Settings = ({ store, storeProducts, selectedCmp }) => {
  const [fieldNames, setFieldNames] = useState({});
  const [showcartbutton, setShowCartbutton] = useState(true);
	const [buttonText, setButtonText] = useState('Add to Cart');

  useEffect(() => {
    if (selectedCmp) {
      setFieldNames(
        storeProducts?.fields?.reduce((state, field) => {
          state[field.name] = selectedCmp.get('fieldnames')?.includes(field.name);
          return state;
        }, {})
      );
      setShowCartbutton(selectedCmp.get('showcartbutton') == 1);
			setButtonText(selectedCmp.get('buttontext'));
    }
  }, [selectedCmp]);

	const handleChangeButtonText = (e) => {
    setButtonText(e.target.value);
    selectedCmp.set('buttontext', e.target.value);
  };

  const handleChangeSelectedFields = (name) => (event) => {
    const selectedFields = { ...fieldNames, [name]: event.target.checked };
    const names = Object.entries(selectedFields)
      .filter(([name, isChecked]) => isChecked)
      .map(([name]) => name);
    selectedCmp.set('fieldnames', names.join());
    setFieldNames({
      ...fieldNames,
      [name]: event.target.checked
    });
  };

  const handleChangeShowCartButton = (e) => {
    setShowCartbutton(e.target.checked);
    selectedCmp.set('showcartbutton', e.target.checked ? 1 : 0);
  };

  return (
    <div className="h-100 settings-content" style={{ overflow: 'scroll' }}>
      <div className="settings-title d-flex justify-content-center align-items-center">
        What's Displayed?
      </div>
      <div className="mt-1">What do you want to show?</div>
      {storeProducts?.fields?.map((field, index) => {
        return (
          <div className="d-flex mt-1">
            <Input
              type="checkbox"
              id={'field' + index}
              className="me-1"
              checked={fieldNames[field.name]}
              onChange={handleChangeSelectedFields(field.name)}
            />
            <label for={'field' + index}>{field.name}</label>
          </div>
        );
      })}
      <div className="settings-title d-flex justify-content-center align-items-center mt-1">
        Add to Cart
      </div>
      <div className="mt-1 d-flex justify-content-between">
        <div>Show button</div>
        <Input
          type="checkbox"
          className="me-3"
          checked={showcartbutton}
          onChange={handleChangeShowCartButton}
        />
      </div>
			<div className='mt-1'>Button text</div>
			<Input type="text" className="mt-1" value={buttonText} onChange={handleChangeButtonText} />
    </div>
  );
};
