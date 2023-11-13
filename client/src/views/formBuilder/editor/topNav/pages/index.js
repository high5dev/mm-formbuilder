import React, { useEffect, useState } from 'react';
import { Eye, Save, X, ChevronDown, MoreHorizontal, Plus, Trash, Delete } from 'react-feather';
import { CiTrash } from 'react-icons/ci';

import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { toast } from 'react-toastify';
import '@src/assets/styles/web-builder.scss';
import {
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

export default function Index({ editor, setEditor, setPageTab }) {
  const [pages, setPages] = useState([]);
  const [pagenum, setPageNum]=useState(1);
  const [selectedPage, setSelectedPage] = useState();
  const addNewPage = () => {
    if (pages) {
      const nextIndex = pagenum + 1;
      editor.Pages.add({
        name: `New page ${nextIndex}`,
        component: `<h1>Page content ${nextIndex}</h1>`
      });
      setPages([...editor.Pages.getAll()]);
      setPageNum(nextIndex);
      setEditor(editor);
    }
  };
  const removePage = (page) => {
    const page_id = page.getId();
    editor.Pages.remove(page_id);
    setPages([...editor.Pages.getAll()]);
    setEditor(editor);
  };

  const selectPage = (page) => {
    editor.Pages.select(page.getId());
    setSelectedPage(page);
  };

  useEffect(() => {
    const _pages = editor?.Pages.getAll();
    if (_pages) {
      setPageNum(_pages.length);
      setPages([..._pages]);
      setSelectedPage(_pages[0]);
    }
  }, [editor]);

  return (
    <div className="d-flex">
      <PerfectScrollbar
        className="scrollable-content"
        options={{ suppressScrollX: true }}
        style={{ height: `calc(100vh - 120px)` }}
      >
        <div className="page-sidebar">
          <div className="bg-white px-2">
            <div className="p-2 d-flex justify-content-around my-1  ">
              <button
                className="btn btn-primary"
                onClick={addNewPage}
                style={{ minWidth: '100px', fontSize:'12px' }}
              >
                <Plus size={15} />
                Add page
              </button>
            </div>
            {pages &&
              pages.map((page, index) => (
                <div
                  key={page.getId()}
                  className="page-item d-flex my-1 justify-content-between"
                >
                  <div className="fs-6 fw-bolder text-black" onClick={() => selectPage(page)}>
                    {page.getName() || 'Home page'}
                  </div>
                  {selectedPage !== page && (
                    <div onClick={() => removePage(page)}>
                      <CiTrash size={20} color={'#174ae7'} />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </PerfectScrollbar>
    </div>
  );
}
