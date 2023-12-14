import React, { useEffect, useState } from 'react';
import { Eye, Save, X } from 'react-feather';
import { BiMobile } from 'react-icons/bi';
import { FaBox, FaLayerGroup, FaPaintBrush } from 'react-icons/fa';
import { MdOutlineDesktopMac, MdOutlineTablet } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Button,
  ButtonGroup,
  Collapse,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  Spinner
} from 'reactstrap';
import { updateFormDataAction } from '../store/action';
var previewTimerId;

export default function MainNav({
  toggle,
  isOpen,
  toggleBlocks,
  setDevice,
  dispatch,
  store,
  editor,
  setBlockTitle,
  step,
  shepherd
}) {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [timerStart, setTimerStart] = useState(false);
  const [timerCount, setTimerCount] = useState(0);
  const toggleNav = () => setIsNavOpen(!isOpen);

  const handlePreview = () => {
    //set html,css
    startTimer();
    const html = editor.getHtml();
    const css = editor.getCss();
    const components = editor.getComponents();

    editor.runCommand('set-data');
    // save to db
    let tempFormData = store.form.formData.map((x) => {
      if (x.id === step.id) {
        return { ...step, html: html, css: css, components: components };
      }
      return x;
    });
    dispatch(updateFormDataAction(store.form._id, { formData: tempFormData,orderElements:store.formOrderElements,products:store.formProducts  })).then(() => {
      endTimer();
    });

    //redirect to preview with data
    window.open(`/web-preview/${store.form._id}&path=${step.path}`);
  };

  const handleSave = () => {
    //set html,css
    const html = editor.getHtml();
    const css = editor.getCss();
    const components = editor.getComponents();
    editor.runCommand('set-data');
    let tempFormData = store.form.formData.map((x) => {
      if (x.id === step.id) {
        return { ...step, html: html, css: css, components: components };
      }
      return x;
    });
    dispatch(updateFormDataAction(store.form._id, { formData: tempFormData,orderElements:store.formOrderElements,products:store.formProducts }));
    toggle(store.form._id);
    if (shepherd) {
      shepherd.next();
    }
  };
  const handleSections = () => {
    setBlockTitle('Sections');
    const blocks = editor.BlockManager.getAll();
    const filtered = blocks.filter((block) => block.get('category').attributes.id === 'Layout');
    editor.BlockManager.render(filtered);

    toggleBlocks(true);
  };
  const handleColumns = () => {
    setBlockTitle('Columns');
    const blocks = editor.BlockManager.getAll();
    const filtered = blocks.filter((block) => block.get('category').attributes.id === 'Column');
    editor.BlockManager.render(filtered);

    toggleBlocks(true);
  };
  const handleElements = () => {
    setBlockTitle('Elements');
    const blocks = editor.BlockManager.getAll();
    const filtered = blocks.filter(
      (block) =>
        block.get('category').attributes?.id !== 'Column' &&
        block.get('category').attributes?.id !== 'Layout'
    );
    editor.BlockManager.render(filtered);

    toggleBlocks(true);
  };

  const startTimer = () => {
    previewTimerId = setInterval(() => {
      setTimerCount((prev) => (prev < 10 ? prev + 1 : prev));
    }, 1000);
    setTimerStart(true);
  };

  const endTimer = () => {
    setTimerStart(false);
    setTimerCount(0);
    clearInterval(previewTimerId);
  };

  return (
    <div>
      <Navbar full="true" expand="md">
        <NavbarToggler onClick={toggleNav} />
        <Collapse isOpen={isNavOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem className="me-1">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  toggle(store.form._id);
                  if (shepherd) {
                    shepherd.next();
                  }
                }}
                color="light"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0374C7';
                  e.currentTarget.style.borderColor = '#0374C7';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '';
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.color = '#000';
                }}
              >
                CLOSE
              </Button>
            </NavItem>
            {/* <NavItem className="me-1">
              <Button color="link" className="p-0" onClick={() => toggleStyles(!isStyle)}>
                <FaPaintBrush size={20} />
              </Button>
            </NavItem> */}

            <NavItem className="me-1 my-auto">
              <ButtonGroup>
                <Button
                  color="outline-light"
                  onClick={() => setDevice('desktop')}
                  style={{ padding: '5px' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0374C7')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                >
                  <MdOutlineDesktopMac size={20} />
                </Button>
                <Button
                  color="outline-light"
                  onClick={() => setDevice('tablet')}
                  style={{ padding: '5px' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0374C7')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                >
                  <MdOutlineTablet size={20} />
                </Button>
                <Button
                  color="outline-light"
                  onClick={() => setDevice('mobile')}
                  style={{ padding: '5px' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0374C7')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                >
                  <BiMobile size={20} />
                </Button>
              </ButtonGroup>
            </NavItem>
          </Nav>

          <Nav className="ms-auto me-0" navbar>
            <NavItem className="me-1 my-auto">
              <ButtonGroup>
                <button
                  onClick={handleSections}
                  className="btn text-light btn-section"
                  style={{ background: '#21D4E1' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#6ae0ad';
                    e.currentTarget.style.borderColor = '#6ae0ad';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#21D4E1';
                    e.currentTarget.style.borderColor = '#21D4E1';
                  }}
                >
                  <span>SECTIONS</span>
                </button>
                <button
                  className="btn text-light"
                  onClick={handleColumns}
                  style={{ backgroundColor: '#5173FF' }}//0298DE
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#5173FF';
                    e.currentTarget.style.borderColor = '#5173FF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#5173FF';
                    e.currentTarget.style.borderColor = '#5173FF';
                  }}
                >
                  <span>COLUMNS</span>
                </button>
                <button
                  onClick={handleElements}
                >
                  <span>ELEMENTS</span>
                </button>
              </ButtonGroup>
            </NavItem>

            <NavItem className="me-1 my-auto">
              <ButtonGroup>
                <Button
                  color="light"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePreview();
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0374C7';
                    e.currentTarget.style.borderColor = '#0374C7';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '';
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.color = '#000';
                  }}
                  disabled={timerStart}
                >
                  {timerStart ? (
                    <div className="d-flex align-items-center">
                      {/* <Spinner style={{ width: '1.3rem', height: '1.3rem' }} /> */}
                      <span>{10 - timerCount}</span>
                      <span className="ms-1">LOADING</span>
                    </div>
                  ) : (
                    <>
                      <Eye size={16} />
                      <span>PREVIEW</span>
                    </>
                  )}
                </Button>
                <Button
                  className="email-tour-6"
                  color="outline-light"
                  onClick={handleSave}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0374C7';
                    e.currentTarget.style.borderColor = '#0374C7';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '';
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.color = '#000';
                  }}
                >
                  <Save size={16} /> <span>SAVE</span>
                </Button>
              </ButtonGroup>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
