import React, { useEffect, useRef, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Bold, X, Trash2} from 'react-feather';
import { RiQuestionMark } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Spinner
} from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import websitePlugin from 'grapesjs-preset-webpage';
import basicBlockPlugin from 'grapesjs-blocks-basic';
import formPlugin from 'grapesjs-plugin-forms';
import 'grapesjs/dist/css/grapes.min.css';
import '../../../assets/scss/form-builder/style.scss';
import '../../../assets/scss/form-builder/main.scss';
import '@src/assets/styles/web-builder.scss';
import grapesjs from 'grapesjs';
import ImportModal from './topNav/import/ImportModal';
import StyleSidebar from './topNav/styles';
import LayerSidebar from './topNav/layers';
import PageSidebar from './topNav/pages';
import TraitSidebar from './topNav/traits';
import {getWebsiteAction, getPageAction, updatePageAction, publishWebsiteAction} from '../store/action'
import { setFormReducer } from '../store/reducer';
import OffCanvas from '../../components/offcanvas';
import { employeeUpdateIdError } from '../../contacts/store/reducer';
import '@src/assets/styles/web-builder.scss';
import { webBuilderPlugin } from './elements/webBuilderPlugin';
import PublishModal from './topNav/publish/publishModal';
import { getWebElementsAction, createWebElementAction } from '../store/action';
import { menu } from './util';
import { getCategoriesByMenu, createWebElement } from '../store/api';
import * as htmlToImage from 'html-to-image';
import AddElementModal from './topNav/import/AddElementModal';
import RenameModal from './topNav/rename/renameModal';
import CreateFormModal from '../createForm/CreateFormModal';
import DuplicateModal from './topNav/duplicate/duplicateModal';
export default function Editor({
  createMdl,
  setCreateMdl,
  renameMdl,
  setRenameMdl,
  duplicateMdl,
  setDuplicateMdl,
  customwidth,
  page,
  setPage,
  isclear,
  setIsClear,
  ispreview,
  ispublish,
  setIsPreview,
  setIsPublish,
  tab,
  setTab,
  open,
  setOpen,
  rsidebarOpen,
  setRSidebarOpen,
  sidebarOpen,
  setSidebarOpen,
  device,
  store,
  sidebarOpen,
  setSidebarOpen,
  sidebarData,
  setSidebarData,
  selectedCategory,
  setSelectedCategory,
  openAddElementMdl,
  setOpenAddElementMdl,
}) {

  const [openCreateForm, setOpenCreateForm] = useState();
  const {id}=useParams();
  const dispatch=useDispatch();
  const _store = useSelector(state => state.formEditor);
  const [editor, setEditor] = useState(null);
  const store = useSelector(state => state.formEditor);
  const [blockManager, setBlockManager] = useState(null);
  const [isLoading, setIsLoading]=useState(false);
  const [selectedCmp, setSelectedCmp] = useState(null);
  const [isPublishModal, setIsPublishModal]=useState(false);
  const [publishUrl, setPublishUrl]=useState();
  const toggleCreateForm = () => setOpenCreateForm(!openCreateForm);
  const toggle = () => {
    setOpen(!open);
  };

  const _toggleRename =(_open) =>{
    setRenameMdl(_open);
  }

  const _toggleDuplicate = (_open) =>{
    setDuplicateMdl(_open);
  }

  const togglePublish=(_open)=>{
    setIsPublishModal(_open);
    setIsPublish(false);
  }

  const handleSidebarOpen = (e) => {
    setSidebarData({
      ...sidebarData,
      isOpen: false,
    })
  };
  
  const handleRSideBarOpen = (e) => {
    setRSidebarOpen(false);
  };
  useEffect(() => {
    dispatch(getWebElementsAction());
    dispatch(getWebsiteAction(id)).then(res=>{
      if(res){
        setPage(res[0]);
      }
    })
    const gjsEditor = grapesjs.init({
      container: '#editor',
      height: window. innerHeight-117,
      plugins: [basicBlockPlugin,(editor) => webBuilderPlugin(editor), websitePlugin],

      richTextEditor: {
        actions: []
      },
      blockManager: {
        custom: true,
        // appendTo: '#blocks'
      },
      styleManager:{
        appendTo: document.querySelector('#style-manager-container'),
      },
      selectorManager:{
        appendTo:document.querySelector('#selector-manager-container'),
      },
      layerManager:{
        appendTo: document.querySelector('#layer-manager-container'),
      },
      traitManager:{
        appendTo: document.querySelector('#trait-manager-container'),
      },
      pageManager: true,
      pageManager:{
        appendTo: document.querySelector('#page-manager-container'),
      },
      storageManager: {
        type: 'local',
        autoload: true,
        autosave: true,
        stepsBeforeSave: 1,
        storeComponents: true,
        storeStyles: true,
        storeHtml: true,
        storeCss: true,
        autorender: false
    },
      deviceManager: {
        default: 'desktop',
        devices: [
          {
            id: 'desktop',
            name: 'Desktop',
            width: '1280px',
            widthMedia: '1920px'
          },
          {
            id: 'tablet',
            name: 'Tablet',
            width: '768px',
            widthMedia: '992px'
          },
          {
            id: 'mobilePortrait',
            name: 'Mobile portrait',
            width: '320px',
            widthMedia: '480px'
          }
        ]
      },
      panels: {
        defaults: []
      },
      commands: {
        defaults: [{}]
      },
    });
    gjsEditor.on('block:drag:start', function (model) {
      setSidebarData({
        ...sidebarData,
        isOpen: false,
      });
    });
    gjsEditor.Commands.add('set-device-desktop', (editor) => {
      editor.setDevice('desktop');
    });
    gjsEditor.Commands.add('set-device-tablet', (editor) => {
      editor.setDevice('tablet');
    });
    gjsEditor.Commands.add('set-device-mobile', (editor) => {
      editor.setDevice('mobilePortrait');
    });
    gjsEditor.on('block:custom', props => {
      // The `props` will contain all the information you need in order to update your UI.
      // props.blocks (Array<Block>) - Array of all blocks
      // props.dragStart (Function<Block>) - A callback to trigger the start of block dragging.
      // props.dragStop (Function<Block>) - A callback to trigger the stop of block dragging.
      // props.container (HTMLElement) - The default element where you can append your UI

      // Here you would put the logic to render/update your UI.
      setBlockManager(props);
    });
    gjsEditor.on('component:selected', (cmp) => {
      setSelectedCmp(cmp);
    });
    gjsEditor.on('block:custom', props => {
      // The `props` will contain all the information you need in order to update your UI.
      // props.blocks (Array<Block>) - Array of all blocks
      // props.dragStart (Function<Block>) - A callback to trigger the start of block dragging.
      // props.dragStop (Function<Block>) - A callback to trigger the stop of block dragging.
      // props.container (HTMLElement) - The default element where you can append your UI

      // Here you would put the logic to render/update your UI.
      setBlockManager(props);
    });

    gjsEditor.on('component:selected', (cmp) => {
      setSelectedCmp(cmp);
    });
  
      // Add custom commands
      gjsEditor.Commands.add('save-component', editor => {
        const saveModalElement = document.createElement('div');
        saveModalElement.className = "save-component-modal d-flex flex-column align-items-center";
  
        saveModalElement.innerHTML = `
          <div class="d-flex w-100">
            <div class="w-50 p-1">
              <h5>Main menu</h5>
              <select class="select-main-menu w-100">
                ${
                  menu.map((e, idx) => {
                    if (idx !== 0)
                    return (
                      `<option class="main-menu-option" value=${e.id}>${e.name}</option>`
                    );
                  })
                }
              </select>
            </div>
            
            <div class="w-50  p-1">
              <h5>Sub menu</h5>
              <select class="select-sub-menu w-100">
                ${
                  menu[1].subMenu.map((e, idx) => {
                    return (
                      `<option class="sub-menu-option" value=${e.id}>${e.name}</option>`
                    );
                  })
                }
              </select >
            </div>
          </div>
          
          <div  class="w-100 p-1">
            <h5>Category</h5>
            <input class="input-category w-100" type="text" placeholder="Insert category..."/>
            <div class="category-options"></div>
          </div>
  
          <button class="btn btn-primary mb-1 save-component-btn">Save</button>
        `;
  
        const mainMenuDropDown = saveModalElement.querySelector('.select-main-menu');
        const subMenuSelect = saveModalElement.querySelector('.select-sub-menu');
        const categoryInput = saveModalElement.querySelector('.input-category');
        const saveComponentBtn = saveModalElement.querySelector('.save-component-btn');
        const categoryOptions = saveModalElement.querySelector('.category-options');
  
        let mainMenu = menu[0].id;
        let subMenu = menu[0].subMenu?.id || '';
        let category = '';
        let existedCategories = [];
        let tempCategories = [];
  
        getCategoriesByMenu({mainMenu, subMenu}).then((res) => {
          existedCategories = res.data.data;
        });
  
        mainMenuDropDown.addEventListener('change', (ev) => {
          mainMenu = ev.target.value;
          const submenuData = menu.find(e => e.id === ev.target.value).subMenu;      
          subMenu = submenuData[0]?.id || '';
  
          getCategoriesByMenu({mainMenu, subMenu}).then((res) => {
            existedCategories = res.data.data;
          });
  
          const childrenLength = subMenuSelect.childNodes.length;
          for (let i = 0 ; i < childrenLength; i++) {
            subMenuSelect.removeChild(subMenuSelect.firstChild);
          }
  
          submenuData.map(e => {
            const newOption = document.createElement('option');
            newOption.className = "sub-menu-option";
            newOption.value = e.id;
            newOption.innerText = e.name;
            subMenuSelect.append(newOption);
          })
        });
  
        subMenuSelect.addEventListener('change', (ev) => {
          subMenu = ev.target.value;
          getCategoriesByMenu({mainMenu, subMenu}).then((res) => {
            existedCategories = res.data.data;
          });
        });
  
        categoryInput.addEventListener('input', (ev) => {
          category = ev.target.value;
          tempCategories = [];
          existedCategories.map((e) => {
            if (e.name.includes(category)) tempCategories.push(e);
          });
  
          const childrenLength = categoryOptions.childNodes.length;
          for (let i = 0 ; i < childrenLength; i++) {
            categoryOptions.removeChild(categoryOptions.firstChild);
          }
  
          tempCategories.map(e => {
            const newOption = document.createElement('option');
            newOption.className = "category-option ps-1";
            newOption.value = e.name;
            newOption.innerText = e.name;
            categoryOptions.append(newOption);
          })
        });
  
        saveComponentBtn.addEventListener('click', () => {
          if (!mainMenu) {
            alert('Please select main menu.');
            return;
          }
  
          if (!category) {
            alert('Please input or select a category.');
            return;
          }
  
          const selectedCmp = editor.getSelected();
          htmlToImage.toPng(selectedCmp.getEl()).then((dataUrl) => {
            const html = selectedCmp.toHTML();
            const css = editor.CodeManager.getCode(selectedCmp, 'css', { cssc: editor.CssComposer });
  
            dispatch(createWebElementAction({mainMenu, subMenu, category, html: `${html}<style>${css}</style>`, imageUrl: dataUrl})).then((res) => {
              editor.Modal.close();
            });
          });
          
        });
  
        editor.Modal.open({
          title: 'Save component', // string | HTMLElement
          content: saveModalElement, // string | HTMLElement
        });
      });

      // Add new toolbar
      const dc = gjsEditor.DomComponents;
      const new_toolbar_id = 'custom-id';
  
      const htmlLabel = `<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="save"><path d="m20.71 9.29-6-6a1 1 0 0 0-.32-.21A1.09 1.09 0 0 0 14 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-8a1 1 0 0 0-.29-.71ZM9 5h4v2H9Zm6 14H9v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1Zm4-1a1 1 0 0 1-1 1h-1v-3a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v3H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.41l4 4Z"></path></svg>`
      
      dc.getTypes().forEach(elType => {
        let {model:oldModel, view:oldView} = elType;
        if (elType.id !== 'wrapper') {
          dc.addType(elType.id, {
            model: oldModel.extend({
              initToolbar() {
                oldModel.prototype.initToolbar.apply(this);
                const toolbar = this.get('toolbar');
                
                if (!toolbar.filter(tlb => tlb.id === new_toolbar_id ).length) {
                  toolbar.unshift({
                    id: new_toolbar_id,
                    command: 'save-component',
                    label: htmlLabel
                  });
                  this.set('toolbar', toolbar);
                }
              }
            }),
            view: oldView
          });
        }
      });
    setEditor(gjsEditor);
  }, []);


  useEffect(()=>{
    if(customwidth && customwidth!=320 && customwidth!=768 && customwidth!=1280){
      const device_name=(Math.random() + 1).toString();
      const command_name= (Math.random() + 2).toString();
      editor?.DeviceManager.add({
        id: device_name,
        name: device_name,
        width: customwidth.toString()+'px'
       });
       editor.Commands.add(command_name, (editor) => {
        editor?.setDevice(device_name);
      });
      editor?.runCommand(command_name);
    }
    else{
      if(customwidth===320){
        editor?.runCommand('set-device-mobile');
      }
      else if(customwidth===768){
        editor?.runCommand('set-device-tablet');
      }
      else{
        editor?.runCommand('set-device-desktop');
      }
    }
  }, [customwidth])

  editor?.on('component:selected', (cmp) => {
    dispatch(getWebsiteAction(id)).then(res=>{
      if(res){
        setPage(res[0]);
      }
    })
  }, []);

  useEffect(() =>{
    if(isclear){
      if(editor){
        editor.Components.clear();
      }
      setIsClear(false);
    }
  }, [isclear])

  useEffect(() => {
    if (editor) {
      store.webElements.map((el, idx) => {
        editor.BlockManager.add(`${el.category[0].mainMenu}-${el.category[0].subMenu}-${el.category[0].name}-${idx}`, {
          label: el.category[0].name,
          content: el.html,
          media: el.imageUrl,
          category: `${el.category[0].mainMenu}-${el.category[0].subMenu}-${el.category[0].name}`,
          menu: `${el.category[0].mainMenu}-${el.category[0].subMenu}`,
        });
      });

    }
  }, [isclear])

  editor?.on('component:selected', (cmp) => {
    setSelectedCmp(cmp);
  });
  useEffect(() => {
    if (editor !== null) {
      switch (device) {
        case 'desktop':
          editor.runCommand('set-device-desktop');
          break;
        case 'tablet':
          editor.runCommand('set-device-tablet');
          break;
        case 'mobile':
          editor.runCommand('set-device-mobile');
          break;
        default:
          editor.runCommand('set-device-desktop');
          break;
      }
    }
  }, [device]);

  useEffect(()=>{
    if(editor){
      const current_page=editor.Pages.getSelected();
      const html = editor.getHtml({ current_page });
      const css = editor.getCss({ current_page });
      const payload={
        page:page?._id,
        html:html,
        css:css,
      };

      if(ispreview){
        dispatch(updatePageAction(id, payload)).then((res)=>{
          if(res){
            toast.success('Current page saved successfully');
          }
        });
        setIsPreview(false);
      }
      if(ispublish){
        dispatch(publishWebsiteAction(id, payload)).then((res)=>{
          if(res){
            setIsPublishModal(true);
            setPublishUrl(`/website/${id}`);
            toast.success('Website published successfully');
            setIsPublish(false);
          } 
        });
      }
    };
  }, [ispreview, ispublish]);

  useEffect(()=>{
    if(page){
      setIsLoading(true);
      dispatch(getPageAction(page._id)).then((res)=>{
        if(res){
          setIsLoading(false);
          if(editor){
            editor.setComponents(res);
          };
        }  
      })
    }
  }, [page?._id])

  useEffect(() => {
    if (editor) {
      store.webElements.map((el, idx) => {
        editor.BlockManager.add(`${el.category[0].mainMenu}-${el.category[0].subMenu}-${el.category[0].name}-${idx}`, {
          label: el.category[0].name,
          content: el.html,
          media: el.imageUrl,
          category: `${el.category[0].mainMenu}-${el.category[0].subMenu}-${el.category[0].name}`,
          menu: `${el.category[0].mainMenu}-${el.category[0].subMenu}`,
        });
      });
    }
  }, [store.webElements, editor]);
  return (
    <div className="d-flex">
      <div className="expanded-sidebar">
        <PerfectScrollbar
          options={{ suppressScrollX: true }}
          style={{ height: `calc(100vh - 120px)` }}
        >
         <Collapse isOpen={sidebarData.isOpen} horizontal={true} delay={{ show: 10, hide: 20 }} style={{height: '100%'}}>
            <div className="expanded-header">
              <span>{sidebarData.menu.name}</span>
              <div>
                <span className="header-icon">
                  <RiQuestionMark size={16} />
                </span>
                <span className="header-icon" onClick={handleSidebarOpen}>
                  <X size={16} />
                </span>
              </div>
            </div>
            <div className="expanded-content">
              <div id="blocks">
                {
                  sidebarData.menu.id === 'quick-add' ? (
                    <div className="quick-add">
                      {editor?.BlockManager.blocks.filter(e => e.get('category') === 'Basic').map((block) => (
                        <div
                          key={block.getId()}
                          draggable
                          className='d-flex flex-column align-items-center border border-secondary rounded cursor-pointer py-2 px-1 transition-colors mt-1 mb-1'
                          onDragStart={(ev) => {
                            ev.stopPropagation();
                            blockManager.dragStart(block, ev.nativeEvent);
                          }}
                          onDragEnd={(ev) => {
                            ev.stopPropagation();
                            blockManager.dragStop(false);
                          }}
                        >
                          <div
                            style={{width: 30, height: 30}}
                            dangerouslySetInnerHTML={{ __html: block.getMedia() }}
                          />
                          <div
                            className="text-sm text-center w-full mt-1"
                            title={block.getLabel()}
                          >
                            {block.getLabel()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='submenu-and-element d-flex'>
                      <div className="submenu-list">
                        {
                          sidebarData?.menu?.subMenu?.map(sub => {
                            const categories = [];
                            const tempBlocks = [];
                            editor?.BlockManager.blocks.map((e) => {
                              if (e.get('menu') === `${sidebarData.menu.id}-${sub.id}` && categories.findIndex(c => c === `${sidebarData.menu.id}-${sub.id}-${e.get('label')}`) === -1) {
                                categories.push(`${sidebarData.menu.id}-${sub.id}-${e.get('label')}`);
                                tempBlocks.push(e);
                              }
                            });
                            
                            const returnComponent = <>
                              <h5 className='submenu-item'>{sub.name}</h5>
                              {
                                tempBlocks.map(b => {
                                  return (
                                    <div
                                      className={selectedCategory === `${sidebarData.menu.id}-${sub.id}-${b.get('label')}` ? 'selected-submenu-category' : 'submenu-category'}
                                      onClick={() => {setSelectedCategory(`${sidebarData.menu.id}-${sub.id}-${b.get('label')}`)}}
                                      >
                                      {b.get('label')}
                                    </div>
                                  );
                                })
                              }
                            </>
                            return returnComponent;
                          })
                        }
                      </div>
                      <div className="element-container">
                        {
                          blockManager?.blocks?.filter(e => e.get('category').id === selectedCategory).map(b => {
                            return (
                              <div className="element">
                                <img width="280" src={b.get('media')} />
                                <div
                                  draggable
                                  onDragStart={(e) => {
                                    e.stopPropagation();
                                    blockManager.dragStart(b, e.nativeEvent);
                                  }}
                                  onDragEnd={(e) => {
                                    e.stopPropagation();
                                    blockManager.dragStop(false);
                                  }}
                                >
                                </div>
                              </div>);
                          })
                        }
                      </div>
                    </div>
                  )
                }
                
                
              </div>
            </div>
          </Collapse>
        </PerfectScrollbar>
      </div>
      <div className="w-100 border">
        {isLoading ?      <div className="d-flex  justify-content-center mb-2 mt-2" style={{position:'absolute', top:"50%", left:"50%", zIndex:10}}>
            <Spinner color="secondary">Loading...</Spinner>
          </div>:<></>}

        <div id="editor"></div>
      </div>
      <div className="property-sidebar" style={{display:rsidebarOpen?'block':'none'}}>
      <PerfectScrollbar
        className="scrollable-content"
        options={{ suppressScrollX: true }}
        style={{ height: `calc(100vh - 120px)` }}
      >
            <div className="sidebar-header px-1">
            <span className="px-1 fs-5 fw-bolder text-black">{tab}</span>
            <span>
              <X
                size={20}
                onClick={(e) => {
                  handleRSideBarOpen(e);
                }}
              />
            </span>
          </div>
              <div style={{display:tab==='Styles'?'block':'none'}}>
                  <div id="selector-manager-container" />
                  <div id="style-manager-container" />
                </div>
              <div style={{display:tab==='Layers'?'block':'none'}}>
                <div id="layer-manager-container" />  
              </div>
              <div style={{display:tab==='Traits'?'block':'none'}}>
                <div id="trait-manager-container" />
              </div>
              <div style={{display:tab==='Pages'?'block':'none'}}>
                <PageSidebar id={id} store={_store} editor={editor} setEditor={setEditor} page={page} setPage={setPage}/>
              </div>
        </PerfectScrollbar>
      </div>
      <ImportModal editor={editor} setEditor={setEditor} open={open} toggle={toggle} />
      <PublishModal publishUrl={publishUrl} isOpen={isPublishModal} toggle={togglePublish}/>
      <AddElementModal editor={editor} setEditor={setEditor} openAddElementMdl={openAddElementMdl} setOpenAddElementMdl={setOpenAddElementMdl} />
      <RenameModal store={_store} isOpen={renameMdl} toggle={_toggleRename}/>
      <CreateFormModal open={createMdl} store={store} dispatch={dispatch}/>
      <DuplicateModal store={_store} isOpen={duplicateMdl} toggle={_toggleDuplicate}/>
    </div>
  );
}
