import React, { useEffect, useRef, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Bold, X, Trash2, Check, ChevronRight} from 'react-feather';
import { RiQuestionMark } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Collapse,
  Label,
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
import {getWebsiteAction, getPageAction, updatePageAction, publishWebsiteAction, getWebCollectionsAction, getWebDatasetsAction, getWebsiteAllDatasetsAction, updatePageNameAction} from '../store/action'
import { setFormReducer } from '../store/reducer';
import OffCanvas from '../../components/offcanvas';
import { employeeUpdateIdError } from '../../contacts/store/reducer';
import '@src/assets/styles/web-builder.scss';
import { webBuilderPlugin } from './elements/webBuilderPlugin';
import PublishModal from './topNav/publish/publishModal';
import { getWebElementsAction, createWebElementAction, getBlogsAction, getProductDatasetAction } from '../store/action';
import { menu } from './util';
import { getCategoriesByMenu, createWebElement } from '../store/api';
import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';
import AddElementModal from './topNav/import/AddElementModal';
import RenameModal from './topNav/rename/renameModal';
import CreateFormModal from '../createForm/CreateFormModal';
import DuplicateModal from './topNav/duplicate/duplicateModal';
import InvitationModal from './topNav/invite/invitationModal';
import cmsimg from '../../../assets/img/cms-img.png'
import { CiCircleChevRight, CiCirclePlus } from 'react-icons/ci';
import CreateCollectionModal from './cms/collection/CreateCollectionModal';
import EditCollectionModal from './cms/collection/EditCollectionModal';
import CreateDatasetModal from './cms/CreateDatasetModal';
import ConnectCollectionModal from './elements/toolbar/ConnectCollectionModal';
import BlogModal from './topNav/blog/BlogModal'
import { GiConsoleController } from 'react-icons/gi';
import Sidebar from './Sidebar';
export default function Editor({
  isblog,
  setIsBlog,
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
  device,
  store,
  sidebarData,
  setSidebarData,
  selectedCategory,
  setSelectedCategory,
  openAddElementMdl,
  setOpenAddElementMdl,
  addSideBarOpen,
  setAddSideBarOpen,
}) {
  const [openCreateForm, setOpenCreateForm] = useState();
  const { id } = useParams();
  const form = store.form;
  const dispatch = useDispatch();
  const history = useHistory();
  const [editor, setEditor] = useState(null);
  const [blockManager, setBlockManager] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCmp, setSelectedCmp] = useState(null);
  const [isRunning, setIsRunning] = useState(true);
  const [isPublishModal, setIsPublishModal]=useState(false);
  const [publishUrl, setPublishUrl]=useState();
  const [viewCMSMenu, setViewCMSMenu]=useState(false);
  const [openCreateColMdl, setOpenCreateColMdl] = useState(false);
  const [openEditCollection, setOpenEditCollection] = useState({isOpen: false, data: {}});
  const toggleCreateForm = () => setOpenCreateForm(!openCreateForm);
  const [openCreateDatasetMdl, setOpenCreateDatasetMdl] = useState({isOpen: false, data: {}});
  const [connectData, setConnectData] = useState({isOpen: false, data: {}});
  const [modelsToConnect, setModelsToConnect] = useState([]);
  const [isinvite, setIsInvite] = useState(false);
  const [productDataset, setProductDataset] = useState({});
  const [datasetConnect, setDatasetConnect] = useState([]);
  const [selectedDataset, setSelectedDataSet] = useState({});
  const loadedRef = useRef();
  loadedRef.current = isLoading;
  
  const toggle = () => {
    setOpen(!open);
  };

  const toggleOpenEditCollection = (data) => {
    if (data) {
      setOpenEditCollection({
        ...openEditCollection,
        isOpen: !openEditCollection.isOpen,
        data,
      });
    } else {
      setOpenEditCollection({
        ...openEditCollection,
        isOpen: !openEditCollection.isOpen,
      });
    }
  }

  const _toggleRename =(_open) =>{
    setRenameMdl(_open);
  }

  const _toggleDuplicate = (_open) => {
    setDuplicateMdl(_open);
  }

  const togglePublish = (_open) => {
    setIsPublishModal(_open);
    setIsPublish(false);
  }

  const createColMdlToggle = () => {
    setOpenCreateColMdl(!openCreateColMdl);
  };

  const createDatasetToggle = (data) => {
    if (data) {
      setOpenCreateDatasetMdl({...openCreateDatasetMdl, isOpen: !openCreateDatasetMdl.isOpen, data});
    } else {
      setOpenCreateDatasetMdl({...openCreateDatasetMdl, isOpen: !openCreateDatasetMdl.isOpen});
    }
  };
  const toggleBlog =(_open) =>{
    setIsBlog(_open);
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

  const scrollToTarget =(_target) =>{
    document.getElementById(_target).scrollIntoView(true);
  } 

  const getProductDataset = (collectionId) => {
    dispatch(getProductDatasetAction(collectionId)).then(res => {
      if (res) {
        console.log(res);
        setProductDataset(res.data[0]);
        selectedCmp.set('numOfItems', res.data[0].values.length);
      }
    })
  };

  const setDatasetFields = (data) => {
    setDatasetConnect(data);
    let selCmp = selectedCmp;
    selectedCmp.set('datasetConnect', data);
    if(selectedCmp.attributes.type === 'slider-product-gallery' || selectedCmp.attributes.type === 'related-products')
    {
      selCmp = selectedCmp.getChildAt(0);
      setConnectModel(selectedCmp.getChildAt(0), data);
    }
    else
      setConnectModel(selectedCmp, data);
    selCmp.components().models.map((m, index) => {
      m.components().models.map((element) => {
        const existingItemIndex = data.findIndex(item => (item.id + (index != 0 ? ("-" + (index + 1)) : "")) === element.ccid);

        if (existingItemIndex !== -1) {
          // Update the name if the ID exists
          if (element.get('type') == 'text') {
            if (element.components().models.length == 0) {
              element.set('content', productDataset.values[index][data[existingItemIndex].name]);
            } else {
              element.components().models[0].set('content', productDataset.values[index][data[existingItemIndex].name]);
            }
          }
        } else {
          // Add a new item if the ID doesn't exist
          //dataConnect.push(newData);
        }
      });
    });
  }

  const setConnectModel = (cmp, dataSet) => {
    const repeaterItemCmp = cmp.getChildAt(0);
    const tempModelsToConnect = [];
    repeaterItemCmp.components().models.map(m => {
      const connectedField = dataSet.filter((data) => data.id == m.ccid);
      if(connectedField.length > 0)
        m.description = connectedField[0].name;
      tempModelsToConnect.push(m);
    });
    setModelsToConnect(tempModelsToConnect);
  }

  const handleSelectChangeDataSet = (data) => {
    setSelectedDataSet(data);
    selectedCmp.set('selectedDataset', data);
  }

  // useEffect(() =>{
  //   let interval;
  //     if(editor && !form.isPublish){
  //        interval=setInterval(() =>{
  //         const current_page=editor.Pages.getSelected();
  //         const html = editor.getHtml({ current_page });
  //         const css = editor.getCss({ current_page });
  //         const payload={
  //           page:page?._id,
  //           html:html,
  //           css:css,
  //         };
  //         dispatch(updatePageAction(id, payload));
  //        }, 2000);
  //        return () => clearInterval(interval);
  //     }
  // }, [editor?.getHtml(editor?.Pages.getSelected()), editor?.getCss(editor?.Pages.getSelected()), form, page])

  useEffect(() => {
    if (store?.form?._id)
      dispatch(getWebsiteAllDatasetsAction(store?.form?._id));
      dispatch(getWebCollectionsAction(store?.form?._id));
  }, [store?.form?._id]);

  useEffect(() => {
    dispatch(getWebElementsAction());
    dispatch(getBlogsAction());
    dispatch(getWebsiteAction(id)).then(res=>{
      if(res){
        setPage(res[0]);
      }
    })
    const gjsEditor = grapesjs.init({
      container: '#editor',
      height: window.innerHeight - 117,
      plugins: [basicBlockPlugin, (editor) => webBuilderPlugin(editor), websitePlugin],

      richTextEditor: {
        actions: []
      },
      blockManager: {
        custom: true,
        // appendTo: '#blocks'
      },
      styleManager: {
        appendTo: document.querySelector('#style-manager-container'),
      },
      selectorManager: {
        appendTo: document.querySelector('#selector-manager-container'),
      },
      layerManager: {
        appendTo: document.querySelector('#layer-manager-container'),
      },
      traitManager: {
        appendTo: document.querySelector('#trait-manager-container'),
      },
      pageManager: true,
      pageManager: {
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

    let compoId = "";
    gjsEditor.on('component:add', (component) => {
      if (!loadedRef.current) {
        if (compoId == "")
          compoId = component.ccid;
        const parentType = component.parent().get('type');
        
        if ((parentType == 'product-item' || parentType == 'repeat-item') && (component.parent().parent().get('cloning') == false || component.parent().parent().parent().get('cloning') == false)) {
          const parentComponent = component.parent().parent();
          const parentChildren = parentComponent.get('components');

          // Filter out the current component from the children
          const childrenWithoutCurrent = parentChildren.filter((child) => child !== component.parent());
          setIsLoading(true);
          childrenWithoutCurrent.forEach((child, index) => {
            console.log(child);
            console.log(component.toHTML());

            const copiedComponent = component.clone();
            copiedComponent.ccid = compoId + "-" + (index + 2);
            if(component.get('type') == 'text')
              copiedComponent.set('style', { padding: "10px" });
            child.append(copiedComponent);
          });
          setIsLoading(false);
        }
        compoId = "";
      }
    });
    gjsEditor.on('component:remove', (component) => {
      if (!loadedRef.current) {
        if (compoId == "")
          compoId = component.ccid.split('-')[0];
        const parentType = component.parent().get('type');

        if ((parentType == 'product-item' || parentType == 'repeat-item') && (component.parent().parent().get('cloning') == false || component.parent().parent().parent().get('cloning') == false)) {
          const parentComponent = component.parent().parent();
          const parentChildren = parentComponent.get('components');

          // Filter out the current component from the children
          const childrenWithoutCurrent = parentChildren.filter((child) => child !== component.parent());
          setIsLoading(true);
          childrenWithoutCurrent.forEach((child, index) => {
            child.get('components').models.forEach((element) => {
              if (element.ccid.includes(compoId)) {
                element.remove();
              }
            })
          });
          setIsLoading(false);
        }
        compoId = "";
      }
    });
    // gjsEditor.on('component:update', (component) => {
    //   if (!loadedRef.current) {
    //     const parentType = component.parent().get('type');

    //     if (parentType == 'product-item' || parentType == 'repeat-item') {
    //       if(component.parent().parent().get('tagName') == 'gridproductgallery') {

    //       }
    //       const parentComponent = component.parent().parent();
    //       const parentChildren = parentComponent.get('components');

    //       // Filter out the current component from the children
    //       const childrenWithoutCurrent = parentChildren.filter((child) => child !== component.parent());
    //       setIsLoading(true);
    //       childrenWithoutCurrent.forEach((child, index) => {
    //         child.get('components').models.forEach((element) => {
    //           if (element.ccid.includes(compoId)) {
    //             element.remove();
    //           }
    //         })
    //       });
    //       setIsLoading(false);
    //     }
    //   }
    // });
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
      if (cmp.attributes.type === 'repeater' || cmp.attributes.type === 'grid-product-gallery' || cmp.attributes.type === 'slider-product-gallery' || cmp.attributes.type === 'related-products') {
        setSelectedDataSet(cmp.get('selectedDataset'));
        setDatasetConnect(cmp.get('datasetConnect'));
        if(cmp.attributes.type === 'slider-product-gallery' || cmp.attributes.type === 'related-products')
          setConnectModel(cmp.getChildAt(0), cmp.get('datasetConnect'));
        else
          setConnectModel(cmp, cmp.get('datasetConnect'));
      }
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
      console.log('cmp=======', cmp);
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
                ${menu.map((e, idx) => {
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
                ${menu[1].subMenu.map((e, idx) => {
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

      gjsEditor.Commands.add('connect-collection', geditor => {
        setConnectData({isOpen: true, data: {}});
      });

      // Add new toolbar
      const dc = gjsEditor.DomComponents;
      const new_toolbar_id = 'custom-id';
  
      const htmlLabel = `<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="save"><path d="m20.71 9.29-6-6a1 1 0 0 0-.32-.21A1.09 1.09 0 0 0 14 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-8a1 1 0 0 0-.29-.71ZM9 5h4v2H9Zm6 14H9v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1Zm4-1a1 1 0 0 1-1 1h-1v-3a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v3H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.41l4 4Z"></path></svg>`
      const connectionLabel = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="connection"><path d="M8.86 6H12a6 6 0 0 1 6 6 1 1 0 0 0 2 0 8 8 0 0 0-8-8H8.86a4 4 0 1 0 0 2ZM3 5a2 2 0 1 1 2 2 2 2 0 0 1-2-2Zm16 10a4 4 0 0 0-3.86 3H12a6 6 0 0 1-6-6 1 1 0 0 0-2 0 8 8 0 0 0 8 8h3.14A4 4 0 1 0 19 15Zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2Z"></path></svg>`;

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
                if (elType.id === 'repeater' || elType.id === 'gallery' || elType.id === 'grid-product-gallery' || elType.id === 'slider-product-gallery' || elType.id === 'related-products') {
                  toolbar.unshift({
                    id: 'connect-collection',
                    command: 'connect-collection',
                    label: connectionLabel
                  });
                }
              }
            }),
            view: oldView
          });
        }
      });
      // gjsEditor.BlockManager.remove('link');
      // gjsEditor.BlockManager.remove('link-block');
    setEditor(gjsEditor);
  }, []);

  useEffect(()=>{
    if(customwidth && customwidth!=320 && customwidth!=768 && customwidth!=1280){
      const device_name=(Math.random() + 1).toString();
      const command_name= (Math.random() + 2).toString();
      editor?.DeviceManager.add({
        id: device_name,
        name: device_name,
        width: customwidth.toString() + 'px'
      });
      editor.Commands.add(command_name, (editor) => {
        editor?.setDevice(device_name);
      });
      editor?.runCommand(command_name);
    }
    else {
      if (customwidth === 320) {
        editor?.runCommand('set-device-mobile');
      }
      else if (customwidth === 768) {
        editor?.runCommand('set-device-tablet');
      }
      else {
        editor?.runCommand('set-device-desktop');
      }
    }
  }, [customwidth])

  // editor?.on('component:selected', (cmp) => {
  //   dispatch(getWebsiteAction(id)).then(res=>{
  //     if(res){
  //       setPage(res[0]);
  //     }
  //   })
  // }, []);

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
  }, [])

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

  useEffect(() => {
    if (editor) {
      const current_page = editor.Pages.getSelected();
      const html = editor.getHtml({ current_page });
      const css = editor.getCss({ current_page });
      const payload = {
        page: page?._id,
        html: html,
        css: css,
      };

      if (ispreview) {
        dispatch(updatePageAction(id, payload)).then((res) => {
          if (res) {
            history.push(`/preview/${id}/${page?.name}`);
            setIsPreview(false);
          }
        });
      }
      if (ispublish) {
        dispatch(publishWebsiteAction(id, payload)).then((res) => {
          if (res) {
            const _form = { ...form, ...res };
            dispatch(setFormReducer(_form));
            setIsPublishModal(true);
            setPublishUrl(`/website/${id}`);
            toast.success('Website published successfully');
            setIsPublish(false);
          }
        });
      }
    };
  }, [ispreview, ispublish]);

  useEffect(() => {
    if (page) {
      setIsLoading(true);
      dispatch(getPageAction(page._id)).then((res) => {
        if (res) {
          if (editor) {
            editor.setComponents(res);
          };
          setIsLoading(false);
        }
      })
    }
  }, [page?._id]);

  useEffect(() => {
    if (editor) {
      store.webElements.map((el, idx) => {
        editor.BlockManager.add(`${el.category[0].mainMenu}-${el.category[0].subMenu}-${el.category[0].name}-${idx}`, {
          label: el.category[0].name,
          content: el.html,
          media: el.imageUrl,
          category: `${el.category[0].mainMenu}-${el.category[0].subMenu}-${el.category[0].name}`,
          menu: `${el.category[0].mainMenu}-${el.category[0].subMenu}`,
          submenu:el.category[0].subMenu,
          mainmenu:el.category[0].mainMenu
        });
      });
    }
  }, [store.webElements, editor]);

  useEffect(() =>{
    if(editor){
      editor?.on('component:add',(component) =>{
        if(store.webBlogs.length){
          if(component.get('type')==='post-list-large' || component.get('type') === 'post-card-large' || component.get('type') === 'post-list-sidebar'){
            component.set('blogs', store.webBlogs);
          }
          if(component.get('type') ==='recent-post'){
            let recentBlogs=[];
            recentBlogs.push(store.webBlogs[store.webBlogs.length-1]);
            component.set('blogs', recentBlogs);
          }
          if(component.get('type')==='category-menu'){
            component.set('num', store.webBlogs.length);
          }
          if(component.get('type')==='archive-menu'){
            let postList=[];
            for(let i=0; i<12;i++){
              const blogs=store.webBlogs.filter((blog) =>new Date(blog.updatedAt).getMonth()===i);
              const amount=blogs.length;
              if(amount>0){
                const month=new Date(blogs[0].updatedAt).getMonth()+1;
                const year=new Date(blogs[0].updatedAt).getFullYear();
                const date=month.toString()+'/'+year.toString();
                postList.push({date:date, amount:amount})
              }
            }
            component.set('postList', postList);
          }
        }
        else{
          console.log('no webblogs')
        }
    
      })
      const components=editor.getWrapper().components().models;
      for(let i=0; i<components.length; i++){
        const component=components[i];
        if(component.get('type')==='post-list-large' || component.get('type') === 'post-card-large' || component.get('type') === 'post-list-sidebar'){
          component.set('blogs', store.webBlogs);
        }
        if(component.get('type') ==='recent-post'){
          let recentBlogs=[];
          recentBlogs.push(store.webBlogs[store.webBlogs.length-1]);
          component.set('blogs', recentBlogs);
        }
        if(component.get('type')==='category-menu'){
          component.set('num', store.webBlogs.length);
        }
        if(component.get('type')==='archive-menu'){
          let postList=[];
          for(let i=0; i<12;i++){
            const blogs=store.webBlogs.filter((blog) =>new Date(blog.updatedAt).getMonth()===i);
            const amount=blogs.length;
            if(amount>0){
              const month=new Date(blogs[0].updatedAt).getMonth()+1;
              const year=new Date(blogs[0].updatedAt).getFullYear();
              const date=month.toString()+'/'+year.toString();
              postList.push({date:date, amount:amount})
            }
          }
          component.set('postList', postList);
        }
      }
    }
  }, [store.webBlogs])



  return (
    <div className="d-flex">
    <div className="expanded-sidebar">
      <PerfectScrollbar
        options={{ suppressScrollX: true }}
        style={{ height: `calc(100vh - 120px)` }}
      >
        <Collapse isOpen={addSideBarOpen} horizontal={true} delay={{ show: 10, hide: 20 }} style={{height: '100%'}} className='d-flex'>
          {
            tab !== 'Pages' && <>
              <Sidebar
                sidebarData={sidebarData}
                setSidebarData={setSidebarData}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <Collapse isOpen={sidebarData.isOpen} horizontal={true} delay={{ show: 10, hide: 20 }} style={{height: '100%'}} className='d-flex'>
                <div>
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
                        sidebarData.menu.id === 'quick-add' && (
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
                          )
                        }
                        {
                          sidebarData.menu.id != 'quick-add' && sidebarData.menu.id != 'blog' && sidebarData.menu.id !== 'cms' && sidebarData.menu.id !== 'store' (
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
                        {
                          sidebarData.menu.id === 'cms' && (
                            <>
                              {viewCMSMenu && <div className="cms-element" style={{width: 350}}>
                                {
                                  sidebarData?.menu?.subMenu?.map(sub => {
                                    return (
                                      <div className='my-1'>
                                        {sub.menu && <h5 className='ps-1 pt-2' color='black'>{sub.menu}</h5>}
                                        {
                                          sub.data.map(e => {
                                            return (
                                              <div
                                                className='d-flex align-items-center px-2 py-1 cms-menu-item'
                                                onClick={() => {
                                                  if (e.id === 'add-preset') {

                                                  }
                                                  if (e.id === 'create-collection') {
                                                    createColMdlToggle();
                                                  }
                                                  if (e.id === 'dataset') {
                                                    createDatasetToggle();
                                                  }
                                                  if (e.id === 'form-dataset') {
                                                    createDatasetToggle({isFormDataset: true});
                                                  }
                                                  if (e.id === 'rich-content') {
                                                    
                                                  }
                                                }}
                                                >
                                                <img className="me-1" width="70" height="70" src={e.icon}/>
                                                <div>
                                                  <div style={{color: 'black', fontWeight: 500, fontSize: 15}}>{e.title}</div>
                                                  <div style={{fontSize: 13}}>{e.description}</div>
                                                </div>
                                                <div style={{width: 50, height: 50}} className='d-flex align-items-center'>
                                                  {(e.id === 'add-preset' || e.id === 'create-collection') ?
                                                    <CiCircleChevRight className='ms-1 cms-menu-icon' size={27} />
                                                    : <CiCirclePlus className='ms-1 cms-menu-icon' size={27} />
                                                  }
                                                </div>
                                              </div>
                                            );
                                          })
                                        }
                                      </div>
                                    )
                                  })
                                }                        
                              </div>}
                              {
                                !viewCMSMenu && <div className="cms-element d-flex flex-column align-items-center">
                                  <img width="350" src={cmsimg}/>
                                  <h2 className='mt-3'>Use the CMS</h2>
                                  <h4 className='mb-3'>Easily manage your site content</h4>
                                  <div>
                                    <h6 className='mt-1'><Check size={20} color='green'/> Set up content collections</h6>
                                    <h6 className='mt-1'><Check size={20} color='green'/> Create 100s of dynamic pages</h6>
                                    <h6 className='mt-1'><Check size={20} color='green'/> Collect info from site visitors</h6>
                                  </div>
                                  <Button color='primary' className='round mt-3' onClick={() => {setViewCMSMenu(true)}}>Add to Site</Button>
                                </div>
                              }
                            </>
                          )
                        }
                        {
                          sidebarData.menu.id === 'blog' && (
                            <div className='submenu-and-element d-flex'>
                            <div className="submenu-list">
                              {
                                sidebarData?.menu?.subMenu?.map(sub => {
                                  const returnComponent = <>
                                    <div className='submenu-item' onClick={()=>scrollToTarget(sub.name)}>{sub.name}</div>
                                  </>
                                  return returnComponent;
                                })
                              }
                            </div>
                            <div className="element-container">
                              {
                                sidebarData.menu.id === 'blog' && sidebarData?.menu?.subMenu?.map(sub =>{
                                  let tempblocks=[];
                                  blockManager?.blocks?.filter(e => e.get('label')=== sub.name).map((b) =>{
                                    tempblocks.push(b);
                                  });
                                  const returnComponent=
                                    <>
                                      <div className='fw-bold text-black p-2' id={sub.name}>
                                        {sub.name}
                                      </div>
                                      {
                                        sub.name!="RSS Button" && 
                                        <div className=''>
                                          {tempblocks.map((b)=>{
                                          return(
                                            <div className="element">
                                              <img width="280" src={b.get('media')} />
                                              {/* <iframe srcDoc={b.get('content')}/> */}
                                              <div
                                                draggable
                                                onDragStart={(e) => {
                                                  e.stopPropagation();
                                                  blockManager.dragStart(b, e.nativeEvent);
                                                } }
                                                onDragEnd={(e) => {
                                                  e.stopPropagation();
                                                  blockManager.dragStop(false);
                                                } }
                                              >
                                              </div>
                                            </div>
                                            )
                                        })                           
                                        }
                                            </div>
                                      }
                                      
                                      
                                        {sub.name==="RSS Button" && 
                                        <div className='d-flex'>
                                          {
                                            tempblocks&& tempblocks.map((b)=>{
                                              return(
                                                <div className="element" style={{marginBottom:'10px'}}>
                                                  <img width="40" src={b.get('media')} />
                                                  {/* <iframe srcDoc={b.get('content')}/> */}
                                                  <div
                                                    draggable
                                                    onDragStart={(e) => {
                                                      e.stopPropagation();
                                                      blockManager.dragStart(b, e.nativeEvent);
                                                    } }
                                                    onDragEnd={(e) => {
                                                      e.stopPropagation();
                                                      blockManager.dragStop(false);
                                                    } }
                                                  >
                                                  </div>
                                                </div>
                                                )
                                              })  
                                          }
                                        </div>
                                
                                        }
                                    
                                    </>;
                                    return returnComponent;
                                  
                                })
                              }
                            </div>
                          </div>
                          )
                        }
                        {
                          sidebarData.menu.id === 'store' && (
                            <div className='submenu-and-element d-flex'>
                              <div className="submenu-list">
                                {
                                  sidebarData?.menu?.subMenu?.map(sub => {
                                    const returnComponent = <>
                                      <div className='submenu-item' onClick={() => scrollToTarget(sub.menu)}>{sub.menu}</div>
                                    </>
                                    return returnComponent;
                                  })
                                }
                              </div>
                              <div className="store-add">
                                {editor?.BlockManager.blocks.filter(e => e.get('category') === 'Store').map((block) => (
                                  <div
                                    key={block.getId()}
                                    draggable
                                    className='store-item cursor-pointer'
                                    onDragStart={(ev) => {
                                      ev.stopPropagation();
                                      blockManager.dragStart(block, ev.nativeEvent);
                                    }}
                                    onDragEnd={(ev) => {
                                      ev.stopPropagation();
                                      blockManager.dragStop(false);
                                    }}
                                    id={block.getLabel()}
                                  >
                                    {/* <div
                              style={{ width: 30, height: 30 }}
                              dangerouslySetInnerHTML={{ __html: block.getMedia() }}
                            /> */}
                                    <div
                                      className="text-sm w-full mt-1"
                                      title={block.getLabel()}
                                    >
                                      {block.getLabel()}
                                      <span class="info-icon-tooltip">
                                        <svg width="18" height="18" preserveAspectRatio="xMidYMid" viewBox="1.5 1.5 18 18" class="symbol symbol-infoIcon"><g id="infoIconSvg"><circle cx="10.5" cy="10.5" r="8" fill="transparent"></circle><path id="path-1" fill-rule="evenodd" d="M10.5 19.5a9 9 0 01-9-9 9 9 0 019-9 9 9 0 019 9 9 9 0 01-9 9zm-8-9c0 4.411 3.589 8 8 8s8-3.589 8-8-3.589-8-8-8-8 3.589-8 8zm10 5h-4l1-2v-3h-1l1-2h2v5l1 2zm-3-10h2v2h-2v-2z"></path></g></svg>
                                        <div className='tooltip-content'>
                                          <div className='tooltip-title'>{block.getLabel()}</div>
                                          <div className='tooltip-text'>{block.getContent().text}</div>
                                        </div>
                                      </span>
                                    </div>
                                    <img src={`/assets/images/elements/${block.getMedia()}.png`} style={{ marginLeft: "14px", marginRight: "14px" }} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        }                    
                    </div>
                  </div>
                </div>
              </Collapse>
            </>
          }
          
          <div style={{display:tab==='Pages'?'block':'none', height: '100%'}}>
            <div className="sidebar-header px-1">
              <span className="px-1 fs-5 fw-bolder text-black">{tab}</span>
              <span>
                <X
                  size={20}
                  onClick={(e) => {
                    setAddSideBarOpen(false);
                  }}
                />
              </span>
            </div>
            <PageSidebar id={id} store={store} editor={editor} setEditor={setEditor} page={page} setPage={setPage}/>
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
        </PerfectScrollbar>
      </div>
      <ImportModal editor={editor} setEditor={setEditor} open={open} toggle={toggle} />
      <PublishModal publishUrl={publishUrl} isOpen={isPublishModal} toggle={togglePublish} />
      <AddElementModal editor={editor} setEditor={setEditor} openAddElementMdl={openAddElementMdl} setOpenAddElementMdl={setOpenAddElementMdl} />
      <RenameModal store={store} isOpen={renameMdl} toggle={_toggleRename}/>
      <CreateFormModal open={createMdl} store={store} dispatch={dispatch}/>
      <DuplicateModal store={store} isOpen={duplicateMdl} toggle={_toggleDuplicate}/>
      <InvitationModal store={store} isOpen={isinvite} toggle={setIsInvite}/>
      <CreateCollectionModal store={store} open={openCreateColMdl} toggle={createColMdlToggle} editCollectionToggle={toggleOpenEditCollection}/>
      <CreateDatasetModal store={store} mdlData={openCreateDatasetMdl} toggle={createDatasetToggle} />
      <EditCollectionModal store={store} openCollection={openEditCollection} setOpenEditCollection={setOpenEditCollection} toggle={toggleOpenEditCollection} />
      <ConnectCollectionModal store={store} connectData={connectData} setConnectData={setConnectData} modelsToConnect={modelsToConnect} getProductDataset={getProductDataset} datasetConnect={datasetConnect} setDatasetConnect={setDatasetFields} handleSelectChangeDataSet={handleSelectChangeDataSet} selectedDataset={selectedDataset} />
      <BlogModal store ={store} isOpen={isblog} toggle={toggleBlog}/>
  </div>
  );
}
