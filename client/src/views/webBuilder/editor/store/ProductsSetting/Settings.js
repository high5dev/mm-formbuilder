import React, { useEffect, useState } from 'react';
import { Input } from 'reactstrap';

export const Settings = ({ store, storeProducts, selectedCmp }) => {
  const [fieldNames, setFieldNames] = useState({});
  const [hoverEffect, setHoverEffect] = useState('Swap');
  const [showcartbutton, setShowCartbutton] = useState(true);

  useEffect(() => {
    if (selectedCmp) {
      setFieldNames(
        storeProducts?.fields?.reduce((state, field) => {
          state[field.name] = selectedCmp.get('fieldnames')?.includes(field.name);
          return state;
        }, {})
      );
      setHoverEffect(selectedCmp.get('hovereffect'));
      setShowCartbutton(selectedCmp.get('showcartbutton') == 1);
    }
  }, [selectedCmp]);

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

  const handleChangeHoverEffect = (val) => {
    setHoverEffect(val);
    selectedCmp.set('hovereffect', val);
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
        Image Hover Effect
      </div>
      <div className="mt-1">What happens when customers hover over the image on desktop?</div>
      <div className="mt-1 d-grid hover-list">
        <div
          className="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand"
          onClick={() => handleChangeHoverEffect('Nothing')}
        >
          <div className={'item-bg' + (hoverEffect === 'Nothing' ? ' selected' : '')}>
            <svg viewBox="0 0 70 70" fill="currentColor" width="70" height="70" color="#ee5951">
              <path d="M0 0 H70 V70 H0 Z" fill="none"></path>
              <path d="M0 70 L70 0" stroke="currentColor" stroke-width="2"></path>
            </svg>
          </div>
          <div className="mt-1 text-nowrap d-flex justify-content-center">Nothing</div>
        </div>
        <div
          className="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand"
          onClick={() => handleChangeHoverEffect('Swap')}
        >
          <div className={'item-bg' + (hoverEffect === 'Swap' ? ' selected' : '')}>
            <svg viewBox="0 0 72 72" fill="currentColor" width="72" height="72">
              <g class="Thumbnail_Store Galleries_Hover_Swap image_Selected">
                <path
                  fill="#80b1ff"
                  d="M17 26h22c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H17c-1.1 0-2-.9-2-2V28c0-1.1.9-2 2-2zm28-6H23c-1.1 0-2 .9-2 2v2h18c2.21 0 4 1.79 4 4v14h2c1.1 0 2-.9 2-2V22c0-1.1-.9-2-2-2z"
                  class="illus-clr-1"
                ></path>
                <path
                  fill="#e7f0ff"
                  d="M35.57 41h-15c-.81 0-1.28-.85-.81-1.47l3.17-4.14c.36-.47 1.08-.52 1.51-.12l2.49 2.33 2.89-4.17c.38-.55 1.21-.58 1.63-.06l4.91 6.07c.51.63.04 1.56-.79 1.56z"
                  class="illus-clr-3"
                ></path>
                <path
                  fill="#116dff"
                  d="M60.05 32.96v10c0 1.65-1.35 3-3 3h-9v-2h9c.55 0 1-.45 1-1v-10c0-.55-.45-1-1-1h-3.72l2.16 2.16-1.41 1.41-4.64-4.64 4.64-4.64 1.41 1.41-2.3 2.3h3.86c1.65 0 3 1.35 3 3z"
                  class="illus-clr-2"
                ></path>
              </g>
            </svg>
          </div>
          <div className="mt-1 text-nowrap d-flex justify-content-center">Swap image</div>
        </div>
        <div
          className="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand"
          onClick={() => handleChangeHoverEffect('Zoom')}
        >
          <div className={'item-bg' + (hoverEffect === 'Zoom' ? ' selected' : '')}>
            <svg viewBox="0 0 72 72" fill="currentColor" width="72" height="72">
              <g class="Thumbnail_Store Galleries_Hover_Zoom_Selected">
                <path
                  fill="#80b1ff"
                  d="M26 25h22c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H26c-1.1 0-2-.9-2-2V27c0-1.1.9-2 2-2z"
                  class="illus-clr-1"
                ></path>
                <path
                  fill="#e7f0ff"
                  d="M44.57 40h-15c-.81 0-1.28-.85-.81-1.47l3.17-4.14c.36-.47 1.08-.52 1.51-.12l2.49 2.33 2.89-4.17c.38-.55 1.21-.58 1.63-.06l4.91 6.07c.51.63.04 1.56-.79 1.56z"
                  class="illus-clr-3"
                ></path>
                <path
                  fill="#116dff"
                  d="M23.76 48.66l-3.29 3.29h2.59v2h-6v-6h2v2.59l3.29-3.29 1.41 1.41zm27.29-30.71v2h2.59l-3.29 3.29 1.41 1.41 3.29-3.29v2.59h2v-6h-6z"
                  class="illus-clr-2"
                ></path>
              </g>
            </svg>
          </div>
          <div className="mt-1 text-nowrap d-flex justify-content-center">Zoom</div>
        </div>
      </div>
      <div className="settings-title d-flex justify-content-center align-items-center mt-1">
        Add to Cart Button
      </div>
      <div className="mt-1 d-flex justify-content-between align-items-center">
        <div>Show button</div>
        <Input
          type="checkbox"
          className="me-3"
          checked={showcartbutton}
          onChange={handleChangeShowCartButton}
        />
      </div>
    </div>
  );
};
