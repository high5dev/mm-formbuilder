import React, { useState, useEffect } from 'react';
import { Input } from 'reactstrap';

export const Design = ({ store, selectedCmp }) => {
  const [alignStyle, setAlignStyle] = useState('align1');
  const [buttonStyle, setButtonStyle] = useState('style1');
  const [fillOpacity, setFillOpacity] = useState(100);
  const [borderWidth, setBorderWidth] = useState(0);
  const [buttonCornerRadius, setButtonCornerRadius] = useState(0);

  useEffect(() => {
    if (selectedCmp) {
      setAlignStyle(selectedCmp.get('alignstyle'));
      setButtonStyle(selectedCmp.get('buttonstyle'));
      setFillOpacity(selectedCmp.get('fillopacity'));
      setBorderWidth(selectedCmp.get('borderwidth'));
      setButtonCornerRadius(selectedCmp.get('buttonconerradius'));
    }
  }, [selectedCmp]);

  const handleChangeButtonStyle = (val) => {
    setButtonStyle(val);
    selectedCmp.set('buttonstyle', val);
    if (val === 'style1') {
      handleChangeFillOpacity(100);
      handleChangeBorderWidth(0);
      handleChangeButtonCornerRadius(5);
    } else if (val === 'style2') {
      handleChangeFillOpacity(100);
      handleChangeBorderWidth(0);
      handleChangeButtonCornerRadius(20);
    } else if (val === 'style3') {
      handleChangeFillOpacity(100);
      handleChangeBorderWidth(0);
      handleChangeButtonCornerRadius(0);
    } else if (val === 'style4') {
      handleChangeFillOpacity(0);
      handleChangeBorderWidth(1);
      handleChangeButtonCornerRadius(5);
    } else if (val === 'style5') {
      handleChangeFillOpacity(0);
      handleChangeBorderWidth(1);
      handleChangeButtonCornerRadius(20);
    } else if (val === 'style6') {
      handleChangeFillOpacity(0);
      handleChangeBorderWidth(1);
      handleChangeButtonCornerRadius(0);
    }
  };

  const handleChangeAlignStyle = (val) => {
    setAlignStyle(val);
    selectedCmp.set('alignstyle', val);
  };

  const handleChangeFillOpacity = (val) => {
    setFillOpacity(val);
    selectedCmp.set('fillopacity', val);
  };

  const handleChangeBorderWidth = (val) => {
    setBorderWidth(val);
    selectedCmp.set('borderwidth', val);
  };

  const handleChangeButtonCornerRadius = (val) => {
    setButtonCornerRadius(val);
    selectedCmp.set('buttoncornerradius', val);
  };

  return (
    <div className="h-100 settings-content" style={{ overflow: 'scroll' }}>
      <div className="settings-title d-flex justify-content-center align-items-center">
        Product Details
      </div>
      <div className="mt-2">Product info alignment</div>
      <div className="d-flex hover-list align-list mt-1">
        <div
          className="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand me-2"
          onClick={() => handleChangeAlignStyle('align1')}
        >
          <div
            className={
              'item-bg d-flex align-items-center justify-content-center' +
              (alignStyle === 'align1' ? ' selected' : '')
            }
          >
            <svg
              class="_962Jt"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
              width="38"
              height="38"
              viewBox="0 0 38 38"
              data-hook="align-left-icon"
            >
              <path
                class="fuo8c"
                d="M26.000,27.000 C26.000,27.000 17.000,27.000 17.000,27.000 C15.852,27.000 15.000,26.000 15.000,25.000 C15.000,25.000 15.000,22.000 15.000,22.000 C15.000,21.000 15.852,20.000 17.000,20.000 C17.000,20.000 26.420,20.000 26.420,20.000 C27.569,20.000 28.000,21.000 28.000,22.000 C28.000,22.000 28.000,25.000 28.000,25.000 C28.000,26.000 27.149,27.000 26.000,27.000 ZM11.000,9.000 C11.000,9.000 13.000,9.000 13.000,9.000 C13.000,9.000 13.000,29.000 13.000,29.000 C13.000,29.000 11.000,29.000 11.000,29.000 C11.000,29.000 11.000,9.000 11.000,9.000 Z"
                fill-rule="evenodd"
                fill="#7fccf7"
              ></path>
              <path
                class="_3n3Ns"
                d="M25.000,16.000 C25.000,17.105 24.105,18.000 23.000,18.000 C23.000,18.000 17.000,18.000 17.000,18.000 C15.896,18.000 15.000,17.105 15.000,16.000 C15.000,16.000 15.000,13.000 15.000,13.000 C15.000,11.895 15.896,11.000 17.000,11.000 C17.000,11.000 23.000,11.000 23.000,11.000 C24.105,11.000 25.000,11.895 25.000,13.000 C25.000,13.000 25.000,16.000 25.000,16.000 Z"
                fill-rule="evenodd"
                fill="#3899ec"
              ></path>
            </svg>
          </div>
        </div>
        <div
          className="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand me-2"
          onClick={() => handleChangeAlignStyle('align2')}
        >
          <div
            className={
              'item-bg d-flex align-items-center justify-content-center' +
              (alignStyle === 'align2' ? ' selected' : '')
            }
          >
            <svg
              class="_228n2"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
              width="38"
              height="38"
              viewBox="0 0 38 38"
              data-hook="align-center-icon"
            >
              <path
                class="fuo8c"
                d="M25.000,27.000 C25.000,27.000 20.000,27.000 20.000,27.000 C20.000,27.000 20.000,29.000 20.000,29.000 C20.000,29.000 18.000,29.000 18.000,29.000 C18.000,29.000 18.000,27.000 18.000,27.000 C18.000,27.000 13.000,27.000 13.000,27.000 C11.852,27.000 11.000,26.000 11.000,25.000 C11.000,25.000 11.000,22.000 11.000,22.000 C11.000,21.000 11.852,20.000 13.000,20.000 C13.000,20.000 18.000,20.000 18.000,20.000 C18.000,20.000 18.000,9.000 18.000,9.000 C18.000,9.000 20.000,9.000 20.000,9.000 C20.000,9.000 20.000,20.000 20.000,20.000 C20.000,20.000 25.420,20.000 25.420,20.000 C26.569,20.000 27.000,21.000 27.000,22.000 C27.000,22.000 27.000,25.000 27.000,25.000 C27.000,26.000 26.149,27.000 25.000,27.000 Z"
                fill-rule="evenodd"
                fill="#7fccf7"
              ></path>
              <path
                class="_3n3Ns"
                d="M24.000,16.000 C24.000,17.105 23.105,18.000 22.000,18.000 C22.000,18.000 16.000,18.000 16.000,18.000 C14.895,18.000 14.000,17.105 14.000,16.000 C14.000,16.000 14.000,13.000 14.000,13.000 C14.000,11.895 14.895,11.000 16.000,11.000 C16.000,11.000 22.000,11.000 22.000,11.000 C23.105,11.000 24.000,11.895 24.000,13.000 C24.000,13.000 24.000,16.000 24.000,16.000 Z"
                fill-rule="evenodd"
                fill="#3899ec"
              ></path>
            </svg>
          </div>
        </div>
        <div
          className="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand"
          onClick={() => handleChangeAlignStyle('align3')}
        >
          <div
            className={
              'item-bg d-flex align-items-center justify-content-center' +
              (alignStyle === 'align3' ? ' selected' : '')
            }
          >
            <svg
              class="_3MgSE"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
              width="38"
              height="38"
              viewBox="0 0 38 38"
              data-hook="align-right-icon"
            >
              <path
                class="fuo8c"
                d="M26.000,29.000 C26.000,29.000 26.000,9.000 26.000,9.000 C26.000,9.000 28.000,9.000 28.000,9.000 C28.000,9.000 28.000,29.000 28.000,29.000 C28.000,29.000 26.000,29.000 26.000,29.000 ZM22.000,27.000 C22.000,27.000 13.000,27.000 13.000,27.000 C11.852,27.000 11.000,26.000 11.000,25.000 C11.000,25.000 11.000,22.000 11.000,22.000 C11.000,21.000 11.852,20.000 13.000,20.000 C13.000,20.000 22.420,20.000 22.420,20.000 C23.569,20.000 24.000,21.000 24.000,22.000 C24.000,22.000 24.000,25.000 24.000,25.000 C24.000,26.000 23.149,27.000 22.000,27.000 Z"
                fill-rule="evenodd"
                fill="#7fccf7"
              ></path>
              <path
                class="_3n3Ns"
                d="M24.000,16.000 C24.000,17.105 23.105,18.000 22.000,18.000 C22.000,18.000 16.000,18.000 16.000,18.000 C14.895,18.000 14.000,17.105 14.000,16.000 C14.000,16.000 14.000,13.000 14.000,13.000 C14.000,11.895 14.895,11.000 16.000,11.000 C16.000,11.000 22.000,11.000 22.000,11.000 C23.105,11.000 24.000,11.895 24.000,13.000 C24.000,13.000 24.000,16.000 24.000,16.000 Z"
                fill-rule="evenodd"
                fill="#3899ec"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="settings-title d-flex justify-content-center align-items-center mt-1">
        Add to Cart
      </div>
      <div className="mt-1">Button style</div>
      <div className="mt-1 d-grid hover-list button-style-list align-list">
        <div
          className="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand"
          onClick={() => handleChangeButtonStyle('style1')}
        >
          <div
            className={
              'item-bg d-flex align-items-center justify-content-center' +
              (buttonStyle === 'style1' ? ' selected' : '')
            }
          >
            <svg
              data-aid="button-skin-1-icon"
              class="_2AeKu"
              width="35"
              height="17"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 35 17"
            >
              <path
                class="_2OBPq"
                d="M131.5,765.4h-29a3,3,0,0,1-3-3v-11a3,3,0,0,1,3-3h29a3,3,0,0,1,3,3v11A3,3,0,0,1,131.5,765.4Z"
                transform="translate(-99.5 -748.4)"
                fill="#4eb7f5"
              ></path>
            </svg>
          </div>
        </div>
        <div
          className="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand"
          onClick={() => handleChangeButtonStyle('style2')}
        >
          <div
            className={
              'item-bg d-flex align-items-center justify-content-center' +
              (buttonStyle === 'style2' ? ' selected' : '')
            }
          >
            <svg
              data-aid="button-skin-2-icon"
              class="_2AeKu"
              width="35"
              height="17"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 35 17"
            >
              <rect class="_2OBPq" width="35" height="17" rx="8.5" ry="8.5" fill="#4eb7f5"></rect>
            </svg>
          </div>
        </div>
        <div
          className="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand"
          onClick={() => handleChangeButtonStyle('style3')}
        >
          <div
            className={
              'item-bg d-flex align-items-center justify-content-center' +
              (buttonStyle === 'style3' ? ' selected' : '')
            }
          >
            <svg
              data-aid="button-skin-3-icon"
              class="_2AeKu"
              width="35"
              height="17"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 35 17"
            >
              <rect class="_2OBPq" width="35" height="17" fill="#4eb7f5"></rect>
            </svg>
          </div>
        </div>
        <div
          className="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand"
          onClick={() => handleChangeButtonStyle('style4')}
        >
          <div
            className={
              'item-bg d-flex align-items-center justify-content-center' +
              (buttonStyle === 'style4' ? ' selected' : '')
            }
          >
            <svg
              data-aid="button-skin-4-icon"
              class="_2AeKu"
              width="35"
              height="17"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 35 17"
            >
              <path
                class="_2OBPq"
                d="M320,749.4a2,2,0,0,1,2,2v11a2,2,0,0,1-2,2H291a2,2,0,0,1-2-2v-11a2,2,0,0,1,2-2h29m0-1H291a3,3,0,0,0-3,3v11a3,3,0,0,0,3,3h29a3,3,0,0,0,3-3v-11a3,3,0,0,0-3-3h0Z"
                transform="translate(-288 -748.4)"
                fill="#4eb7f5"
              ></path>
            </svg>
          </div>
        </div>
        <div
          className="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand mt-1"
          onClick={() => handleChangeButtonStyle('style5')}
        >
          <div
            className={
              'item-bg d-flex align-items-center justify-content-center' +
              (buttonStyle === 'style5' ? ' selected' : '')
            }
          >
            <svg
              data-aid="button-skin-5-icon"
              class="_2AeKu"
              width="35"
              height="17"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 35 17"
            >
              <path
                class="_2OBPq"
                d="M375.2,749.4a7.5,7.5,0,1,1,0,15h-18a7.5,7.5,0,0,1,0-15h18m0-1h-18a8.5,8.5,0,0,0,0,17h18a8.5,8.5,0,1,0,0-17h0Z"
                transform="translate(-348.7 -748.4)"
                fill="#4eb7f5"
              ></path>
            </svg>
          </div>
        </div>
        <div
          className="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand mt-1"
          onClick={() => handleChangeButtonStyle('style6')}
        >
          <div
            className={
              'item-bg d-flex align-items-center justify-content-center' +
              (buttonStyle === 'style6' ? ' selected' : '')
            }
          >
            <svg
              data-aid="button-skin-6-icon"
              class="_2AeKu"
              width="35"
              height="17"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 35 17"
            >
              <path
                class="_2OBPq"
                d="M447,749v15H414V749h33m1-1H413v17h35V748h0Z"
                transform="translate(-413 -748)"
                fill="#4eb7f5"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="d-flex mt-1 align-items-center">
        <div style={{ width: '250px' }}>Fill opacity</div>
        <Input
          type="text"
          size="xs"
          value={fillOpacity}
          onChange={(e) => handleChangeFillOpacity(e.target.value)}
        />
      </div>
      <div className="d-flex mt-1 align-items-center">
        <div style={{ width: '250px' }}>Border Width</div>
        <Input
          type="text"
          size="xs"
          value={borderWidth}
          onChange={(e) => handleChangeBorderWidth(e.target.value)}
        />
      </div>
      <div className="d-flex mt-1 align-items-center">
        <div style={{ width: '250px' }}>Corner Radius</div>
        <Input
          type="text"
          size="xs"
          value={buttonCornerRadius}
          onChange={(e) => handleChangeButtonCornerRadius(e.target.value)}
        />
      </div>
    </div>
  );
};
