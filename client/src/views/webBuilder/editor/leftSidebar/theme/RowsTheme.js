import React, { useContext, useState, useEffect } from 'react';
import { Button, Form, Nav, NavItem, NavLink, Input } from 'reactstrap';
import { Edit2, Plus } from 'react-feather';
import Select from 'react-select';
export default function RowsTheme() {
  const [rowPadding, setRowPadding] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  });
  const [columnInnerPadding, setColumnInnerPadding] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  });
  const [columnOuterPadding, setColumnOuterPadding] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  });
  return (
    <div className="p-1">
      <div className="background-row d-flex justify-content-between align-items-center mt-1">
        <div>Background Color</div>
        <Input type="color" style={{ width: '20%' }} />
      </div>
      <div className="row-spacing-row mt-1">
        <div>Default Row Spacing</div>
        <div style={{ whiteSpace: 'pre-wrap' }}>
          Change padding (inner spacing) on desktop <br />
          and tablet
        </div>
        <div>
          <div className="mt-2 d-flex align-items-center justify-content-around">
            <div
              className="padding-panel d-flex justify-content-around align-items-center"
              style={{ width: '250px', height: '250px', border: '1px solid lightgray' }}
            >
              <div
                className="inner-panel d-flex flex-column justify-content-between"
                style={{
                  width: '150px',
                  height: '150px',
                  border: '1px solid gray',
                  backgroundColor: 'lightgray',
                  padding: '10px'
                }}
              >
                <div className="top-padding d-flex justify-content-around">
                  <div className="d-flex align-items-center">
                    <Input type="text" className="padding-item" />
                  </div>
                </div>
                <div className="side-padding d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <Input type="text" className="padding-item" />
                  </div>
                  <div className="d-flex align-items-center">
                    <Input type="text" className="padding-item" />
                  </div>
                </div>
                <div className="bottom-padding d-flex justify-content-around">
                  <div className="d-flex align-items-center">
                    <Input type="text" className="padding-item" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">(px)</div>
        </div>
      </div>
      <div className="column-spacing-row mt-1">
        <div>Default Column Spacing</div>
        <div style={{ whiteSpace: 'pre-warp' }}>
          Change padding (inner spacing) on desktop <br />
          and tablet
        </div>
        <div>
          <div className="mt-2 d-flex align-items-center justify-content-around">
            <div
              className="padding-panel d-flex flex-column justify-content-between"
              style={{
                width: '250px',
                height: '250px',
                border: '1px solid lightgray',
                padding: '5px'
              }}
            >
              <div className="d-flex align-items-center justify-content-around">
                <Input type="text" className="padding-item" />
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <Input type="text" className="padding-item" />
                </div>
                <div
                  className="inner-panel d-flex flex-column justify-content-between"
                  style={{
                    width: '150px',
                    height: '150px',
                    border: '1px solid gray',
                    backgroundColor: 'lightgray',
                    padding: '10px'
                  }}
                >
                  <div className="top-padding d-flex justify-content-around">
                    <div className="d-flex align-items-center">
                      <Input type="text" className="padding-item" />
                    </div>
                  </div>
                  <div className="side-padding d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <Input type="text" className="padding-item" />
                    </div>
                    <div className="d-flex align-items-center">
                      <Input type="text" className="padding-item" />
                    </div>
                  </div>
                  <div className="bottom-padding d-flex justify-content-around">
                    <div className="d-flex align-items-center">
                      <Input type="text" className="padding-item" />
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <Input type="text" className="padding-item" />
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-around">
                <Input type="text" className="padding-item" />
              </div>
            </div>
          </div>
          <div className="text-center">(px)</div>
        </div>
      </div>
    </div>
  );
}
