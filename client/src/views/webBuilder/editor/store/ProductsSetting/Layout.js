import React, { useEffect, useState } from 'react';
import { Input } from 'reactstrap';
export const Layout = ({ store, storeProducts, selectedCmp }) => {
  const [displayStyle, setDisplayStyle] = useState('style1');
  const [alignStyle, setAlignStyle] = useState('align1');
  const [sidePadding, setSidePadding] = useState(0);
  const [tpPadding, setTpPadding] = useState(0);
  const [cornerRadius, setCornerRadius] = useState(0);

  useEffect(() => {
    if (selectedCmp) {
      setDisplayStyle(selectedCmp.get('displaystyle'));
      setAlignStyle(selectedCmp.get('alignstyle'));
    }
  }, [selectedCmp]);

  const handleChangeDisplayStyle = (val) => {
    setDisplayStyle(val);
    selectedCmp.set('displaystyle', val);
    if (val != 'style4') {
      handleChangeAlignStyle('align1');
    } else {
      handleChangeAlignStyle('align2');
    }
  };

  const handleChangeAlignStyle = (val) => {
    setAlignStyle(val);
    selectedCmp.set('alignstyle', val);
  };

  const handleChangeSidePadding = (e) => {
    setSidePadding(e.target.value);
    selectedCmp.set('sidepadding', e.target.value);
  };

  const handleChangeTpPadding = (e) => {
    setTpPadding(e.target.value);
    selectedCmp.set('tppadding', e.target.value);
  };

  const handleChangeCornerRadius = (e) => {
    setCornerRadius(e.target.value);
    selectedCmp.set('cornerradius', e.target.value);
  };
  return (
    <div className="h-100 settings-content" style={{ overflow: 'scroll' }}>
      <div className="settings-title d-flex justify-content-center align-items-center">Gallery</div>
      <div className="mt-1">Product display style</div>
      <div className="mt-1 d-grid hover-list">
        <div
          className="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand"
          onClick={() => handleChangeDisplayStyle('style1')}
        >
          <div
            className={
              'item-bg d-flex align-items-center justify-content-center' +
              (displayStyle === 'style1' ? ' selected' : '')
            }
          >
            <svg
              id="Layer_1"
              width="40"
              height="72"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40"
              class="_2rXrQ"
              data-hook="layout-classic-icon"
            >
              <rect class="_1J3ON" width="40" height="28.2" rx="3.3" ry="3.3" fill="#4eb7f5"></rect>
              <path
                class="_1GJ2c"
                d="M124.4,490.4a1,1,0,0,0-1.2-.3l-0.3.3-6.5,6.4h6.4l3.5-3.4Z"
                transform="translate(-108.8 -472.8)"
                fill="#fff"
              ></path>
              <path
                class="_1r8bf"
                d="M133.3,486.7l-6.9,6.7-3.5,3.4h18.4l-6.5-10a1,1,0,0,0-1.2-.3Z"
                transform="translate(-108.8 -472.8)"
                fill="#d3edff"
              ></path>
              <ellipse class="_1r8bf" cx="12.7" cy="7.6" rx="2.3" ry="2.3" fill="#d3edff"></ellipse>
              <rect class="_1J3ON" y="34.2" width="19.4" height="1.77" fill="#4eb7f5"></rect>
              <rect class="_1J3ON" y="38.2" width="9.1" height="1.77" fill="#4eb7f5"></rect>
            </svg>
          </div>
        </div>
        <div
          className="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand"
          onClick={() => handleChangeDisplayStyle('style2')}
        >
          <div
            className={
              'item-bg d-flex align-items-center justify-content-center' +
              (displayStyle === 'style2' ? ' selected' : '')
            }
          >
            <svg
              id="Layer_1"
              width="40"
              height="72"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40"
              class="hnf8b"
              data-hook="layout-image-only-icon"
            >
              <rect class="_2C-G3" width="40" height="40" rx="3.3" ry="3.3" fill="#4eb7f5"></rect>
              <path
                class="_1y7dW"
                d="M224.3,495.6a1,1,0,0,0-1.2-.3l-0.3.3-6.5,6.4h6.4l3.5-3.4Z"
                transform="translate(-208.8 -472.6)"
                fill="#fff"
              ></path>
              <path
                class="_2A5ER"
                d="M233.2,491.9l-6.9,6.7-3.5,3.4h18.4l-6.5-10a1,1,0,0,0-1.2-.3Z"
                transform="translate(-208.8 -472.6)"
                fill="#d3edff"
              ></path>
              <ellipse class="_2A5ER" cx="12.7" cy="13" rx="2.3" ry="2.3" fill="#d3edff"></ellipse>
            </svg>
          </div>
        </div>
        <div
          className="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand"
          onClick={() => handleChangeDisplayStyle('style3')}
        >
          <div
            className={
              'item-bg d-flex align-items-center justify-content-center' +
              (displayStyle === 'style3' ? ' selected' : '')
            }
          >
            <svg
              id="Layer_1"
              width="40"
              height="72"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40"
              class="_1NGTN"
              data-hook="layout-with-border-icon"
            >
              <path
                class="_2WVXx"
                d="M350,472.7H316.6l-1.3.3a3.3,3.3,0,0,0-1.8,1.8,3.4,3.4,0,0,0-.3,1.3v33.3a3.3,3.3,0,0,0,3.3,3.3H350a3.3,3.3,0,0,0,3.3-3.3V476.1A3.3,3.3,0,0,0,350,472.7Zm1.8,36.7a1.8,1.8,0,0,1-1.8,1.8H316.6a1.8,1.8,0,0,1-1.8-1.8V498.6h36.9v10.8Z"
                transform="translate(-313.3 -472.7)"
                fill="#4eb7f5"
              ></path>
              <path
                class="mbZQQ"
                d="M328.9,488.1a1,1,0,0,0-1.2-.3l-0.3.3-6.5,6.4h6.4l3.5-3.4Z"
                transform="translate(-313.3 -472.7)"
                fill="#fff"
              ></path>
              <path
                class="_2DenK"
                d="M337.8,484.4l-6.9,6.7-3.5,3.4h18.4l-6.5-10a1,1,0,0,0-1.2-.3Z"
                transform="translate(-313.3 -472.7)"
                fill="#d3edff"
              ></path>
              <ellipse class="_2DenK" cx="12.7" cy="7.6" rx="2.3" ry="2.3" fill="#d3edff"></ellipse>
              <rect
                class="_2WVXx"
                x="5.4"
                y="29.6"
                width="19.4"
                height="1.77"
                fill="#4eb7f5"
              ></rect>
              <rect class="_2WVXx" x="5.4" y="33.6" width="9.1" height="1.77" fill="#4eb7f5"></rect>
            </svg>
          </div>
        </div>
        <div
          className="hover-item mt-1 d-flex flex-column justify-content-center align-items-center cursor-hand"
          onClick={() => handleChangeDisplayStyle('style4')}
        >
          <div
            className={
              'item-bg d-flex align-items-center justify-content-center' +
              (displayStyle === 'style4' ? ' selected' : '')
            }
          >
            <svg
              id="Layer_1"
              width="40"
              height="72"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40"
              class="_1cc73"
              data-hook="layout-centered-icon"
            >
              <rect
                class="_2rQrG"
                width="40"
                height="26.64"
                rx="3.2"
                ry="3.2"
                fill="#4eb7f5"
              ></rect>
              <path
                class="ctEAQ"
                d="M430.1,490.9a1,1,0,0,0-1.2-.2l-0.3.2-6.5,6h6.4l3.5-3.2Z"
                transform="translate(-414.6 -474.3)"
                fill="#fff"
              ></path>
              <path
                class="_2-ZIp"
                d="M439,487.4l-6.9,6.3-3.5,3.2H447l-6.5-9.5a1,1,0,0,0-1.2-.3Z"
                transform="translate(-414.6 -474.3)"
                fill="#d3edff"
              ></path>
              <ellipse class="_2-ZIp" cx="12.7" cy="7.2" rx="2.3" ry="2.2" fill="#d3edff"></ellipse>
              <rect
                class="_2rQrG"
                x="10.3"
                y="30.9"
                width="19.4"
                height="1.67"
                fill="#4eb7f5"
              ></rect>
              <rect
                class="_2rQrG"
                x="15.5"
                y="38.3"
                width="9.1"
                height="1.67"
                fill="#4eb7f5"
              ></rect>
              <rect class="_2rQrG" x="17" y="35" width="6" height="0.93" fill="#4eb7f5"></rect>
            </svg>
          </div>
        </div>
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
        Product Images
      </div>
      <div className="d-flex mt-1">
        <div style={{ width: '250px' }}>Image side padding</div>
        <Input type="text" size="xs" value={sidePadding} onChange={handleChangeSidePadding} />
      </div>
      <div className="d-flex mt-1">
        <div style={{ width: '250px' }}>Image top and bottom padding</div>
        <Input type="text" size="xs" value={tpPadding} onChange={handleChangeTpPadding} />
      </div>
      <div className="d-flex mt-1">
        <div style={{ width: '250px' }}>Image Corner Radius</div>
        <Input type="text" size="xs" value={cornerRadius} onChange={handleChangeCornerRadius} />
      </div>
    </div>
  );
};
