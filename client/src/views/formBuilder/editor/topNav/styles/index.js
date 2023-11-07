import React, { useEffect, useState } from 'react';
import { Eye, Save, X, ChevronDown, MoreHorizontal, Plus } from 'react-feather';

import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { toast } from 'react-toastify';
import '@src/assets/styles/web-builder.scss';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  ButtonGroup,
  Collapse,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  Spinner,
  Input,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
  UncontrolledTooltip
} from 'reactstrap';
import StylePropertyField from './StylePropertyField';

export default function Index({ editor, setEditor, setStyleTab }) {
  const [open, setOpen] = useState('1');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  let sectors;
  if (editor) {
    sectors = editor.StyleManager.getSectors();
  }
  return (
    <div className="d-flex">
      <PerfectScrollbar
        className="scrollable-content"
        options={{ suppressScrollX: true }}
        style={{ height: `calc(100vh - 120px)` }}
      >
        <div className="style-sidebar">
          <div className="sidebar-header px-1">
            <span className="px-1 fs-5 fw-bolder text-black">Styles</span>
            <span>
              <X
                size={20}
                onClick={(e) => {
                  setStyleTab(false);
                }}
              />
            </span>
          </div>
          <div className="px-1 bg-white">
            <Accordion open={open} toggle={toggle} Collapse>
              {sectors &&
                sectors.map((sector, index) => {
                  return (
                    <AccordionItem>
                      <AccordionHeader targetId={index} className="fw-bold text-black">
                        {sector.getName()}
                      </AccordionHeader>
                      <AccordionBody accordionId={index}>
                        <div className="d-flex flex-wrap">
                          {sector.getProperties().map((prop) => {
                            return <StylePropertyField key={prop.getId()} prop={prop} />;
                          })}
                        </div>
                      </AccordionBody>
                    </AccordionItem>
                  );
                })}
              <AccordionItem></AccordionItem>
            </Accordion>
          </div>
        </div>
      </PerfectScrollbar>
    </div>
  );
}
