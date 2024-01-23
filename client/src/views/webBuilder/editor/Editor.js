import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Bold,
  X,
  Trash2,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Plus,
  Edit,
  MoreVertical,
  Settings,
  ChevronsRight
} from 'react-feather';
import { CgStyle } from 'react-icons/cg';
import { IoMdArrowDropright, IoMdArrowDropdown, IoMdSend } from 'react-icons/io';
import { RiQuestionMark } from 'react-icons/ri';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Link, useHistory, useParams } from 'react-router-dom';
import { SlArrowDown } from 'react-icons/sl';
import Select from 'react-select';
import WebFont from 'webfontloader';
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
  Spinner,
  Modal,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Input,
  Col,
  Row
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
import { setChildFormReducer, setCurrentPage, setFormReducer } from '../store/reducer';
import {
  getWebsiteAction,
  getPageAction,
  updatePageAction,
  publishWebsiteAction,
  createChildFormAction,
  getWebCollectionsAction,
  deleteWebElementAction,
  getWebDatasetsAction,
  getWebsiteAllDatasetsAction,
  updatePageNameAction,
  getConnectionsByWebsiteAction,
  updateSelectedProductAction,
  getChildFormsAction,
  getProductCategoryAction,
  getWebsiteRolesAction,
  addWebBuilderThemeColorAction,
  getWaitingClientsAction,
  updateFormAction,
  getGoogleFontsAction,
  createShopPagesAction,
  updateWebBuilderThemeAction
} from '../store/action';
import OffCanvas from '../../components/offcanvas';
import { getUserData } from '../../../auth/utils';
import { employeeUpdateIdError } from '../../contacts/store/reducer';
import '@src/assets/styles/web-builder.scss';
import { webBuilderPlugin } from './elements/webBuilderPlugin';
import PublishModal from './topNav/publish/publishModal';
import {
  getWebElementsAction,
  createWebElementAction,
  getBlogsAction,
  getProductDatasetAction
} from '../store/action';
import { menu } from './util';
import { getCategoriesByMenu, createWebElement, getImageLibrary } from '../store/api';
import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';
import CreateAssetModal from './leftSidebar/assets/CreateAssetModal';
import RenameAssetModal from './leftSidebar/assets/RenameAssetModal';
import AddElementModal from './topNav/import/AddElementModal';
import UploadMediaModal from './topNav/import/UploadMediaModal';
import RenameModal from './topNav/rename/renameModal';
import CreateFormModal from '../createForm/CreateFormModal';
import DuplicateModal from './topNav/duplicate/duplicateModal';
import InvitationModal from './topNav/invite/invitationModal';
import FormEditorModal from './leftSidebar/form/FormEditorModal';
import SelectFormModal from './leftSidebar/form/SelectFormModal';
import ColorTheme from './leftSidebar/theme/ColorTheme';
import TextTheme from './leftSidebar/theme/TextTheme';
import ImageTheme from './leftSidebar/theme/ImageTheme';
import ButtonTheme from './leftSidebar/theme/ButtonTheme';
import RowsTheme from './leftSidebar/theme/RowsTheme';
import BackgroundTheme from './leftSidebar/theme/BackgroundTheme';
import cmsimg from '../../../assets/img/cms-img.png';
import { CiCircleChevRight, CiCirclePlus } from 'react-icons/ci';
import CreateCollectionModal from './cms/collection/CreateCollectionModal';
import EditCollectionModal from './cms/collection/EditCollectionModal';
import CreateDatasetModal from './cms/CreateDatasetModal';
import ConnectCollectionModal from './elements/toolbar/ConnectCollectionModal';
import ConnectProductDataSetModal from './elements/toolbar/ConnectProductDataSetModal';
import EditProductsModal from './store/EditProductsModal';
import AddCartButtonModal from './store/AddCartButtonModal';
import BlogModal from './topNav/blog/BlogModal';
import { GiConsoleController } from 'react-icons/gi';
import Sidebar from './Sidebar';
import { element } from 'prop-types';
import ProductsSettingModal from './store/ProductsSetting/ProductsSettingModal';
import { ProductPageSettingModal } from './store/ProductPageSetting/ProductPageSettingModal';
import { CustomerDatasetModal } from './store/customerDataset/CustomerDatasetModal';
import RoleModal from './topNav/role';
import AddPresetModal from './cms/AddPresetModal';
import CMS from './topNav/cms';
import { fontWebStyle } from './leftSidebar/theme/defaultTheme/variable';
import { ImCheckmark, ImCross } from 'react-icons/im';
import {
  colors,
  fonts,
  buttons,
  background,
  image,
  property
} from '../editor/leftSidebar/theme/defaultTheme';
// import { attr } from 'highcharts';
import RichTextEditor from './leftSidebar/content/RichTextEditor';
import ContentSideBar from './leftSidebar/content/ContentSideBar';
export default function Editor({
  isblog,
  thispage,
  setThispage,
  setIsBlog,
  createMdl,
  setCreateMdl,
  renameMdl,
  setRenameMdl,
  duplicateMdl,
  setDuplicateMdl,
  customwidth,
  isclear,
  setIsClear,
  isback,
  setIsBack,
  isSave,
  setIsSave,
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
  selectedSubMenu,
  setSelectedSubMenu,
  selectedCategory,
  setSelectedCategory,
  openAddElementMdl,
  setOpenAddElementMdl,
  addSideBarOpen,
  setAddSideBarOpen,
  selectedMainNav,
  setSelectedMainNav,
  roleMdl,
  setRoleMdl,
  VisibleMenu
}) {
  const [openCreateForm, setOpenCreateForm] = useState();
  const { id } = useParams();
  const form = store.form;
  const formTheme = store.formTheme;
  const page = store.currentPage;
  const dispatch = useDispatch();
  const history = useHistory();
  const [editor, setEditor] = useState(null);
  const [blockManager, setBlockManager] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStoreLoading, setIsStoreLoading] = useState(true);
  const [selectedCmp, setSelectedCmp] = useState(null);
  const [isRunning, setIsRunning] = useState(true);
  const [isPublishModal, setIsPublishModal] = useState(false);
  const [publishUrl, setPublishUrl] = useState();
  const [formeditorMdl, setFormEditorMdl] = useState(false);
  const [themeEditing, setThemeEditing] = useState(false);
  const [openCreateColMdl, setOpenCreateColMdl] = useState(false);
  const [openCreateAssetMdl, setOpenCreateAssetMdl] = useState(false);
  const [openRenameAssetMdl, setOpenRenameAssetMdl] = useState(false);
  const [openEditCollection, setOpenEditCollection] = useState({ isOpen: false, data: {} });
  const [openCreateDatasetMdl, setOpenCreateDatasetMdl] = useState({ isOpen: false, data: {} });
  const [openAddPresetMdl, setOpenAddPresetMdl] = useState(false);
  const [addFormMdl, setAddFormMdl] = useState(false);
  const [connectData, setConnectData] = useState({ isOpen: false, data: {} });
  const [modelsToConnect, setModelsToConnect] = useState([]);
  const [isinvite, setIsInvite] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedWebElement, setSelectedWebElement] = useState();
  const [selectedProductCategory, setSelectedProductCategory] = useState({});
  const [selectedFormBlock, setSelectedFormBlock] = useState(null);
  const [OpenCategory, setOpenCategory] = useState({ index: 0, value: true });
  //theme section
  const [selectedColor, setSelectedColor] = useState();
  const [selectedButton, setSelectedButton] = useState();
  const [selectedFont, setSelectedFont] = useState();
  const [selectedImage, setSelectedImage] = useState(formTheme?.image);
  const [selectedBackground, setSelectedBackground] = useState(formTheme?.background);
  const [storeProducts, setStoreProducts] = useState({});
  const user = getUserData();
  useEffect(() => {
    if (store?.form?._id) {
      dispatch(getWebsiteAllDatasetsAction(store.form._id));
      dispatch(getWebCollectionsAction(store.form._id));
      dispatch(getProductDatasetAction(store.form._id));
      dispatch(getConnectionsByWebsiteAction(store.form._id));
      dispatch(getWebsiteRolesAction(store.form._id));
      dispatch(getWebsiteAllDatasetsAction(store.form._id));
      dispatch(getWaitingClientsAction(store.form._id));
    }
  }, [store.form._id]);

  useEffect(() => {
    if (store.webCollections) {
      store.webCollections.map((collection) => {
        if (collection.category == 'store') {
          setStoreProducts(collection);
          return;
        }
      });
    }
  }, [store.webCollections]);

  const [productDataset, setProductDataset] = useState({});
  const [datasetConnect, setDatasetConnect] = useState([]);
  const [selectedDataSet, setSelectedDataSet] = useState({});
  const [showProductDataSetModal, setShowProductDataSetModal] = useState(false);
  const [showEditProductsModal, setShowEditProductsModal] = useState(false);
  const [showProductsSettingModal, setShowProductsSettingModal] = useState(false);
  const [showProductPageSettingModal, setShowProductPageSettingModal] = useState(false);
  const [showAddCartButtonModal, setShowAddCartButtonModal] = useState(false);
  const [cartProductId, setCartProductId] = useState('');
  const [customerDataset, setCustomerDataset] = useState({ type: '', collectionId: '' });
  const [showCustomerDatasetModal, setShowCustomerDatasetModal] = useState(false);
  const [showCustomerDatasetModalLoading, setShowCustomerDatasetModalLoading] = useState(false);
  const [cdCheckedItems, setCDCheckedItems] = useState({});
  const [customerCollectId, setCustomerCollectId] = useState('');
  const [ClientWaiting, setClientWaiting] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const toggleCreateForm = () => setOpenCreateForm(!openCreateForm);

  const [selectedConnectedData, setSelectedConnectedData] = useState('');

  const loadedRef = useRef();
  const storeRef = useRef();
  const productRef = useRef();
  loadedRef.current = isStoreLoading;
  storeRef.current = store;
  productRef.current = storeProducts;

  const collectFormSubmission = async () => {
    Swal.fire({
      title: 'Submission Forms',
      text: 'Are you sure you want to submit these forms?',
      icon: 'warning',
      iconColor: '#ea5455',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-1'
      },
      buttonsStyling: false
    }).then((result) => {
      setClientWaiting(true);
      if (result.isConfirmed) {
        setClientWaiting(false);
      } else {
        setClientWaiting(false);
      }
    });
  };

  const getPopups = (editor) => {
    const allComponents = editor.getWrapper().components().models;
    const popups = [];
    allComponents.forEach((c) => {
      let popupData = {};
      if (c.get('type') === 'popup') {
        c.components().models.map((e) => {
          if (e.ccid.includes('popup-trigger')) {
            popupData = {
              ...popupData,
              triggerId: e.ccid
            };
          }
          if (e.ccid.includes('popup-wrapper')) {
            popupData = {
              ...popupData,
              wrapperId: e.ccid
            };
          }
        });

        c.getTraits().map((t) => {
          popupData = {
            ...popupData,
            [t.attributes.name]: t.attributes.value
          };
        });

        popups.push(popupData);
      }
    });
    return popups;
  };
  function getAllChildComponents(component) {
    var allChildComponents = [];

    // Get direct children of the current component
    var directChildren = component.get('components');

    // Recursively traverse each direct child
    directChildren.forEach(function (childComponent) {
      allChildComponents.push(childComponent);
      // Recursively get children of the current child
      var grandChildComponents = getAllChildComponents(childComponent);
      allChildComponents = allChildComponents.concat(grandChildComponents);
    });

    return allChildComponents;
  }

  // const PageSave = async () => {
  //   if (editor) {
  //     const current_page = editor.Pages.getSelected();
  //     const html = editor.getHtml({ current_page });
  //     const css = editor.getCss({ current_page });
  //     const payload = {
  //       page: page?._id,
  //       html: html,
  //       css: css
  //     };
  //     console.log(current_page)
  //   // return await dispatch(updatePageAction(id, payload));
  //   }
  //   setIsSave(false)
  // };

  const toggle = () => {
    setOpen(!open);
  };
  const toggleAddPresetMdl = () => {
    setOpenAddPresetMdl(!openAddPresetMdl);
  };

  const toggleOpenEditCollection = (data) => {
    if (data) {
      setOpenEditCollection({
        ...openEditCollection,
        isOpen: !openEditCollection.isOpen,
        data
      });
    } else {
      setOpenEditCollection({
        ...openEditCollection,
        isOpen: !openEditCollection.isOpen
      });
    }
  };

  const _toggleRename = (_open) => {
    setRenameMdl(_open);
  };

  const _toggleDuplicate = (_open) => {
    setDuplicateMdl(_open);
  };

  const togglePublish = (_open) => {
    setIsPublishModal(_open);
    setIsPublish(false);
  };

  const createColMdlToggle = () => {
    setOpenCreateColMdl(!openCreateColMdl);
  };

  const createDatasetToggle = (data) => {
    if (data) {
      setOpenCreateDatasetMdl({
        ...openCreateDatasetMdl,
        isOpen: !openCreateDatasetMdl.isOpen,
        data
      });
    } else {
      setOpenCreateDatasetMdl({ ...openCreateDatasetMdl, isOpen: !openCreateDatasetMdl.isOpen });
    }
  };
  const toggleBlog = (_open) => {
    setIsBlog(_open);
  };

  const toggleRoleMdl = (_open) => {
    setRoleMdl(!roleMdl);
  };

  const handleSidebarOpen = (e) => {
    setSidebarData({
      ...sidebarData,
      isOpen: false
    });
    setOpenCategory({ index: 0, value: true });
  };

  const handleRSideBarOpen = (e) => {
    setRSidebarOpen(false);
  };

  const createForm = () => {
    const pageId = page?._id;
    const websiteId = form?._id;
    const elements = [];
    const name = 'My Form';
    const payload = {
      websiteId,
      pageId,
      elements,
      name
    };
    dispatch(createChildFormAction(payload)).then((res) => {
      if (res) {
        const { form, formPage } = res;
        let pageList = [];
        pageList.push({ ...formPage, html: '', css: '' });
        const newForm = { ...form, formPages: pageList };
        dispatch(setChildFormReducer(newForm));
        setFormEditorMdl(true);
      }
    });
  };

  const scrollToTarget = (_target) => {
    document.getElementById(_target).scrollIntoView(true);
  };

  const selectFormToggle = (_open) => {
    setAddFormMdl(_open);
  };

  const getProductDataset = (collectionId) => {
    // setIsStoreLoading(true);
    // dispatch(getProductDatasetAction(collectionId)).then(res => {
    //   if (res) {
    //     console.log(res);
    //     setProductDataset(res.data[0]);
    //     selectedCmp.set('numOfItems', res.data[0].values.length);
    //     setIsStoreLoading(false);
    //   }
    // })
  };

  const setDatasetFields = (data) => {
    setIsStoreLoading(true);
    selectedCmp.set('cloning', true);
    setDatasetConnect(data);
    let selCmp = selectedCmp;
    selectedCmp.set('datasetConnect', data);
    if (
      selectedCmp.attributes.type === 'sliderproductgallery' ||
      selectedCmp.attributes.type === 'relatedproducts'
    ) {
      selCmp = selectedCmp.getChildAt(0);
      setConnectModel(selectedCmp.getChildAt(0), data);
    } else setConnectModel(selectedCmp, data);
    selCmp.components().models.map((m, index) => {
      m.components().models.map((element) => {
        const existingItemIndex = data.findIndex(
          (item) => item.id + (index != 0 ? '-' + (index + 1) : '') === element.ccid
        );

        if (existingItemIndex !== -1) {
          // Update the name if the ID exists
          if (element.get('type') == 'text') {
            if (element.components().models.length == 0) {
              element.set('content', storeProducts?.values[index][data[existingItemIndex].name]);
            } else {
              element
                .components()
                .models[0].set(
                  'content',
                  storeProducts?.values[index][data[existingItemIndex].name]
                );
            }
          }
        } else {
          // Add a new item if the ID doesn't exist
          //dataConnect.push(newData);
        }
      });
    });
    selectedCmp.set('cloning', false);
    setIsStoreLoading(false);
  };

  const setConnectModel = (cmp, dataSet) => {
    const repeaterItemCmp = cmp.getChildAt(0);
    const tempModelsToConnect = [];
    repeaterItemCmp.components().models.map((m) => {
      const connectedField = dataSet.filter((data) => data.id == m.ccid);
      if (connectedField.length > 0) m.description = connectedField[0].name;
      tempModelsToConnect.push(m);
    });
    setModelsToConnect(tempModelsToConnect);
  };

  const handleSelectChangeDataSet = (data) => {
    setSelectedDataSet(data);
    selectedCmp.set('selectedDataset', data);
  };

  const handleChangeProductId = (id) => {
    setCartProductId(id);
    selectedCmp.set('productId', id);
  };
  const handleChangeSelectedProductCategory = (category) => {
    setSelectedProductCategory(category);
    selectedCmp.set('category', category);
  };
  const handleOnclick = (index) => {
    setOpenCategory({ index: index, value: true });
  };

  const handleRemove = (_b) => {
    const id = _b.get('index');
    const ccid = _b.getId();
    dispatch(deleteWebElementAction(id)).then((res) => {
      if (res) {
        editor.BlockManager.remove(ccid);
      }
    });
  };

  const handleChangeCustomerDataset = (type, collectionId) => {
    setCustomerDataset({ type: type, collectionId: collectionId });
  };

  const handleCDCheckboxChange = (field, isChecked) => {
    setCDCheckedItems({
      ...cdCheckedItems,
      [`${customerDataset.type}-${customerDataset.collectionId}`]: {
        ...cdCheckedItems[`${customerDataset.type}-${customerDataset.collectionId}`],
        [field]: isChecked
      }
    });
  };

  const handleRename = (_b) => {
    setSelectedWebElement(_b);
    setOpenRenameAssetMdl(true);
    // const id=_b.get('index');
    // const ccid=_b.getId();
    // dispatch(updateWebElementAction(id)).then((res)=>{
    //   if(res){
    //     editor.BlockManager.remove(ccid);
    //   }
    // })
  };
  // useEffect(() =>{
  //   let interval;
  //     if(editor && !form.isPublish){
  //       interval=setInterval(() =>{
  //         const current_page=editor.Pages.getSelected();
  //         const html = editor.getHtml({ current_page });
  //         const css = editor.getCss({ current_page });
  //         const payload={
  //           page:page?._id,
  //           html:html,
  //           css:css,
  //         };
  //         dispatch(updatePageAction(id, payload));
  //       }, 2000);
  //       return () => clearInterval(interval);
  //     }
  // }, [editor?.getHtml(editor?.Pages.getSelected()), editor?.getCss(editor?.Pages.getSelected()), form, page])

  const addNewThemeColor = () => {
    if (formTheme?._id && formTheme?.colors) {
      const themeId = formTheme._id;
      const colors = formTheme.colors;
      const payload = {
        name: 'Color #' + colors.length.toString(),
        value: '#000000'
      };
      dispatch(addWebBuilderThemeColorAction(themeId, payload)).then((res) => {
        // if (res) {
        //   setSelectedSubMenu('colors');
        //   setThemeEditing(true);
        // }
      });
    }
  };

  const handleThemeColor = (value, item) => {
    let tempColor = JSON.parse(JSON.stringify(item));
    setSelectedColor({ ...tempColor, value: value });
  };
  useEffect(() => {
    if (editor && store.selectedProduct) {
      const components = editor.getWrapper().components().models;
      components.forEach((component) => {
        if (component.get('type') === 'productpage') {
          component.set('product', store?.selectedProduct);
        }
      });
    }
  }, [store.selectedProduct]);
  useEffect(() => {
    if (editor && store.cartProducts) {
      const components = editor.getWrapper().components().models;
      components.forEach((component) => {
        if (component.get('type') === 'cartpage') {
          component.set('product', store?.cartProducts);
        }
      });
    }
  }, [store.cartProducts]);

  const saveFormBlock = (html) => {
    if (
      selectedFormBlock.get('type') === 'new-form' ||
      selectedFormBlock.get('type') === 'add-form'
    ) {
      let comps = selectedFormBlock.get('components');
      while (comps.length > 0) {
        comps.pop();
      }
      comps.push(html);
    }
  };

  useEffect(() => {
    if (editor) {
      setIsStoreLoading(true);
      function updateComponentsAndChildren(components, webProducts, categories) {
        components.forEach((component) => {
          if (
            component.get('type') === 'gridproductgallery' ||
            component.get('type') === 'sliderproductgallery' ||
            component.get('type') === 'relatedproducts'
          ) {
            component.set('products', webProducts);
            const categoryId = component.getAttributes().categoryid;
            const category = categories.find((item) => item._id === categoryId);
            if (category != undefined && category != null) component.set('category', category);
            else if (categories.length > 0) {
              component.set('category', categories[0]);
            }
          }

          // Recursively update children
          if (component.components) {
            updateComponentsAndChildren(component.components().models, webProducts, categories);
          }
        });
      }

      const components = editor.getWrapper().components().models;
      components.forEach((component) => {
        if (
          component.get('type') === 'gridproductgallery' ||
          component.get('type') === 'sliderproductgallery' ||
          component.get('type') === 'relatedproducts'
        ) {
          component.set('products', storeProducts);
        }
      });
      updateComponentsAndChildren(components, storeProducts, store?.categories);
      setIsStoreLoading(false);
    }
  }, [storeProducts, store?.categories]);

  useEffect(() => {
    if (editor) {
      function updateComponentsAndChildren(components, webProducts, categories) {
        components.forEach((component) => {
          if (component.get('type') === 'productpage') {
            if (
              Object.keys(storeRef.current?.selectedProduct).length == 0 &&
              productRef.current?.values.length > 0
            ) {
              dispatch(updateSelectedProductAction(productRef.current?.values[0]));
              component.set('product', productRef.current?.values[0]);
            } else {
              component.set('product', storeRef.current?.selectedProduct);
            }
          }

          // Recursively update children
          if (component.components) {
            updateComponentsAndChildren(component.components().models, webProducts, categories);
          }
        });
      }

      const components = editor.getWrapper().components().models;
      updateComponentsAndChildren(components, storeProducts);
    }
  }, [storeProducts]);

  useEffect(() => {
    if (store?.form?._id) {
      dispatch(getWebsiteAllDatasetsAction(store?.form?._id));
      dispatch(getWebCollectionsAction(store?.form?._id));
      dispatch(getProductDatasetAction(store?.form?._id));
      dispatch(getProductCategoryAction(store?.form?._id));
      dispatch(getConnectionsByWebsiteAction(store.form._id));
    }
  }, [store?.form?._id]);

  useEffect(() => {
    dispatch(getWebElementsAction());
    // dispatch(getChildFormsAction(store?.form?._id));
    // dispatch(getBlogsAction(store?.form?._id));
    dispatch(getWebsiteAction(id)).then((res) => {
      if (res) {
        dispatch(setCurrentPage(res.find((e) => e._id === page?._id)));
      } else {
      }
    });
    // const parserCss = (css, editor) => {
    //   const result = [];
    //   // ... parse the CSS string
    //     result.push({
    //       selectors: '.input-link-element, .theme-text-default',
    //       style: { color: 'red' }
    //     })
    //   // ...
    //   return result; // Result should be ALWAYS an array
    // };

    let gjsEditor = grapesjs.init({
      container: '#editor',
      height: window.innerHeight - 117,
      canvas: {
        scripts: [
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyBUSVulzSzbfl45dgmM8lWUQanfMz4Fb9o&libraries=places&callback=myMap'
        ],
        styles: ['https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css']
      },
      plugins: [basicBlockPlugin, (editor) => webBuilderPlugin(editor), websitePlugin],
      pluginsOpts: {
        [basicBlockPlugin]: {
          flexGrid: true
        }
      },
      fromElement: true,
      richTextEditor: {
        actions: []
      },
      blockManager: {
        custom: true
        // appendTo: '#blocks'
      },
      styleManager: {
        appendTo: document.querySelector('#style-manager-container'),
        clearProperties: true
      },
      selectorManager: {
        custom: true,
        componentFirst: true,
        appendTo: document.querySelector('#selector-manager-container')
      },
      // parser: {
      //   parserCss,
      // },
      layerManager: {
        appendTo: document.querySelector('#layer-manager-container')
      },
      traitManager: {
        appendTo: document.querySelector('#trait-manager-container')
      },
      pageManager: true,
      pageManager: {
        appendTo: document.querySelector('#page-manager-container')
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
            width: '1680px',
            widthMedia: '1680px'
          },
          {
            id: 'tablet',
            name: 'Tablet',
            width: '768px',
            widthMedia: '768px'
          },
          {
            id: 'mobilePortrait',
            name: 'Mobile portrait',
            width: '320px',
            widthMedia: '320px'
          }
        ]
      },
      panels: {
        defaults: []
      },
      commands: {
        defaults: [{}]
      }
    });

    let compoId = '';
    const setChildIds = (originalComponent, clonedComponent, i) => {
      var originalChildren = originalComponent.get('components');
      var clonedChildren = clonedComponent.get('components');

      originalChildren.each(function (originalChild, index) {
        var clonedChild = clonedChildren.at(index);
        clonedChild.ccid = originalChild.ccid.split('-')[0] + 'a' + (i == 0 ? '' : '-' + (i + 1));

        // Recursive call for any nested children
        if (originalChild.get('components').length > 0) {
          setChildIds(originalChild, clonedChild);
        }
      });
    };
    gjsEditor.on('canvas:drop', (data, component) => {
      setSelectedFormBlock(component);
    });

    gjsEditor.on('component:add', (component) => {
      let device = gjsEditor.getDevice();
      if (device !== 'desktop' && device !== 'tablet') {
        if (component.get('type') == 'count-down') {
          component.set('template', component.getAttributes().template);
          component.set('style', {
            'text-align': 'center',
            'padding-left': '10px',
            'padding-right': '10px',
            // width: 'fit-content',
          });
          getAllChildComponents(component).map((children) => {
            children.set('style', { 'font-size': '15px', 'padding-left':'2px', 'padding-right':'2px' });
          });
        } else if (component.get('type') == 'text') {
          component.set('style', { 'padding-left': '0.5rem', 'padding-right': '0.5rem' });
        } else if (component.get('type') == 'video') {
          component.set('style', {
            width: '320px',
            height: '200px',
            'padding-left': '0.5rem',
            'padding-right': '0.5rem'
          });
          getAllChildComponents(component).map((children) => {
            children.set('style', { 'font-size': '16px' });
          });
        } 
        else if (component.get('type') == 'social-bar') {
          component.set('style', {
            display: 'flex',
            'flex-direction': 'row',
            width: 'fit-content',
            height: '60px'
          })
          getAllChildComponents(component).map((children) => {
            children.set('style', { 'font-size': '20px' });
          })
         }
        else {
          component.set('style', {
            'padding-left': '0.5rem',
            'padding-right': '0.5rem'
          });
          getAllChildComponents(component).map((children) => {
            if (children.get('tagName') == 'h1') {
              children.set('style', { 'font-size': '30px' });
            }
            if (children.get('tagName') == 'img')
              children.set('style', { 'max-width': '200px', 'min-width': '200px' });
          });
        }
      }
      if (!component) return;
      if (
        component.get('type') === 'gridproductgallery' ||
        component.get('type') === 'sliderproductgallery' ||
        component.get('type') === 'relatedproducts'
      ) {
        setIsStoreLoading(true);
        dispatch(getProductDatasetAction(storeRef.current?.form?._id));
        const shopPages = storeRef?.current?.form?.formData?.filter((data) => data.type === 'shop');
        if (shopPages.length == 0) {
          dispatch(createShopPagesAction({ id: storeRef.current?.form?._id }));
        }
        const categoryId = component.getAttributes().categoryid;
        const category = storeRef.current?.categories.find((item) => item._id === categoryId);
        if (category != undefined && category != null) component.set('category', category);
        else if (storeRef.current?.categories.length > 0) {
          component.set('category', storeRef.current?.categories[0]);
        }
        component.set('fieldnames', component.getAttributes().fieldnames);
        component.set('hovereffect', component.getAttributes().hovereffect);
        component.set('showcartbutton', component.getAttributes().showcartbutton);
        component.set('displaystyle', component.getAttributes().displaystyle);
        component.set('alignstyle', component.getAttributes().alignstyle);
        component.set('sidepadding', component.getAttributes().sidepadding);
        component.set('tppadding', component.getAttributes().tppadding);
        component.set('cornerradius', component.getAttributes().cornerradius);
        component.set('buttontext', component.getAttributes().buttontext);
        component.set('buttonstyle', component.getAttributes().buttonstyle);
        component.set('fillopacity', component.getAttributes().fillopacity);
        component.set('borderwidth', component.getAttributes().borderwidth);
        component.set('buttoncornerradius', component.getAttributes().buttoncornerradius);
        component.set('products', storeProducts);
      } else if (component.get('type') === 'addtocartbutton') {
        setCartProductId(productRef.current?.values[0].id);
        component.set('productId', productRef.current?.values[0].id);
      } else if (component.get('type') === 'shoppingcart') {
        let cartItemCount = 0;
      } else if (component.get('type') === 'productpage') {
        if (
          Object.keys(storeRef.current?.selectedProduct).length == 0 &&
          productRef.current.values.length > 0
        ) {
          dispatch(updateSelectedProductAction(productRef.current.values[0]));
          component.set('product', productRef.current.values[0]);
        } else {
          component.set('product', storeRef.current?.selectedProduct);
        }
        component.set('fieldnames', component.getAttributes().fieldnames);
        component.set('showcartbutton', component.getAttributes().showcartbutton);
        component.set('alignstyle', component.getAttributes().alignstyle);
        component.set('buttontext', component.getAttributes().buttontext);
        component.set('buttonstyle', component.getAttributes().buttonstyle);
        component.set('fillopacity', component.getAttributes().fillopacity);
        component.set('borderwidth', component.getAttributes().borderwidth);
        component.set('buttoncornerradius', component.getAttributes().buttoncornerradius);
      } else if (component.get('type') === 'cartpage') {
        component.set('cartProducts', storeRef.current?.cartProducts);
      } else if (component.get('type') === 'iframe-element') {
        component.set('url', component.getAttributes().url);
      } else if (component.get('type') === 'count-down') {
        component.set('template', component.getAttributes().template);
      }
      // if (!loadedRef.current && component.get('type') != 'image') {
      //   if (compoId == '') compoId = component.ccid;
      //   const parentType = component.parent().get('type');

      //   if (
      //     (parentType == 'product-item' || parentType == 'repeat-item') &&
      //     (component.parent().parent().get('cloning') == false ||
      //       component.parent().parent().parent().get('cloning') == false)
      //   ) {
      //     console.log(component);
      //     setIsStoreLoading(true);
      //     let numOfItems;
      //     if (
      //       component.parent().parent().get('tagName') == 'gridproductgallery' ||
      //       component.parent().parent().get('tagName') == 'repeater'
      //     ) {
      //       numOfItems = component.parent().parent().get('numOfItems');
      //     } else {
      //       numOfItems = component.parent().parent().parent().get('numOfItems');
      //     }
      //     let originalComp = component.parent().clone();
      //     let comps = component.parent().parent().get('components');
      //     for (let i = comps.models.length - 1; i >= 0; i--) {
      //       comps.models[i].remove();
      //     }

      //     for (let i = 0; i < numOfItems; i++) {
      //       const item = originalComp.clone();

      //       setChildIds(originalComp, item, i);
      //       comps.push(item);
      //     }
      //     setIsStoreLoading(false);

      //     // const parentComponent = component.parent().parent();
      //     // const parentChildren = parentComponent.get('components');

      //     // // Filter out the current component from the children
      //     // const childrenWithoutCurrent = parentChildren.filter((child) => child !== component.parent());

      //     // childrenWithoutCurrent.forEach((child, index) => {

      //     //   const copiedComponent = component.clone();
      //     //   copiedComponent.ccid = compoId + "-" + (index + 2);
      //     //   if(component.get('type') == 'text')
      //     //     copiedComponent.set('style', { padding: "10px" });
      //     //   child.append(copiedComponent);
      //     // });
      //     // setIsLoading(false);
      //   }
      //   compoId = '';
      // }
    });
    gjsEditor.on('component:remove', (component) => {
      const id = component.getId();
      const css = gjsEditor.Css;
      const rules = css.getRules(`#${id}`);
      css.remove(rules);
      if (!loadedRef.current && component.changed != {}) {
        if (compoId == '') compoId = component.ccid.split('-')[0];
        const parentType = component.parent()?.get('type');

        if (
          (parentType == 'product-item' || parentType == 'repeat-item') &&
          (component.parent().parent().get('cloning') == false ||
            component.parent().parent().parent().get('cloning') == false)
        ) {
          const parentComponent = component.parent().parent();
          const parentChildren = parentComponent.get('components');

          // Filter out the current component from the children
          const childrenWithoutCurrent = parentChildren.filter(
            (child) => child !== component.parent()
          );
          setIsStoreLoading(true);
          childrenWithoutCurrent.forEach((child, index) => {
            child.get('components').models.forEach((element) => {
              if (element.ccid.includes(compoId)) {
                element.remove();
              }
            });
          });
          setIsStoreLoading(false);
        }
        compoId = '';
      }
    });
    // gjsEditor.on('component:update', (component) => {
    //   if (!loadedRef.current) {
    //     try {
    //       const parentType = component.parent().get('type');

    //       if (
    //         (parentType == 'product-item' || parentType == 'repeat-item') &&
    //         (component.parent().parent().get('cloning') == false ||
    //           component.parent().parent().parent().get('cloning') == false)
    //       ) {
    //         setIsStoreLoading(true);
    //         let numOfItems;
    //         if (
    //           component.parent().parent().get('tagName') == 'gridproductgallery' ||
    //           component.parent().parent().get('tagName') == 'repeater'
    //         ) {
    //           numOfItems = component.parent().parent().get('numOfItems');
    //         } else {
    //           numOfItems = component.parent().parent().parent().get('numOfItems');
    //         }
    //         let originalComp = component.parent().clone();
    //         let comps = component.parent().parent().get('components');
    //         for (let i = comps.models.length - 1; i >= 0; i--) {
    //           comps.models[i].remove();
    //         }

    //         for (let i = 0; i < numOfItems; i++) {
    //           const item = originalComp.clone();

    //           setChildIds(originalComp, item, i);
    //           comps.push(item);
    //         }
    //         setIsStoreLoading(false);
    //       }
    //     } catch (e) { }
    //   }
    // });
    gjsEditor.on('block:drag:start', function (model) {});
    gjsEditor.on('block:drag:stop', function (model) {
      setSidebarData({
        ...sidebarData,
        isOpen: false
      });
    });
    gjsEditor.Commands.add('set-device-desktop', (editor) => {
      editor.setDevice('desktop');
      const allComponents = editor.getWrapper().components().models;
      allComponents.map((cmp) => {
        console.log('------->', cmp.getClasses());
        if (cmp.get('type') == 'video') {
          cmp.set('style', {
            width: '615px',
            height: '350px'
          });
        }
      });
    });
    gjsEditor.Commands.add('set-device-tablet', (editor) => {
      editor.setDevice('tablet');
      const allComponents = editor.getWrapper().components().models;
      allComponents.map((cmp) => {
        console.log('------->', cmp.getClasses());
        if (cmp.get('type') == 'video') {
          cmp.set('style', {
            width: '615px',
            height: '350px'
          });
        }
      });
    });
    gjsEditor.Commands.add('set-device-mobile', (editor) => {
      editor.setDevice('mobilePortrait');
      const allComponents = editor.getWrapper().components().models;
      allComponents.map((cmp) => {
        console.log('------->', cmp.get('type'));
        if (cmp.get('type') == 'count-down') {
          getAllChildComponents(cmp).map((children) => {
            children.set('style', { 'font-size': '15px', 'padding-left':'0.5rem', 'padding-right':'0.5rem' });
          });
        } else if (cmp.get('tagName') == 'h1' || cmp.get('tagName') == 'h5'  ||cmp.get('tagName') == 'p' ) {
          // cmp.set('style', { 'padding-left': '0.5rem', 'padding-right': '0.5rem' });
        } else if (cmp.get('type') == 'video') {
          cmp.set('style', {
            width: '320px',
            height: '200px',
            'padding-left': '0.5rem',
            'padding-right': '0.5rem'
          });
        } else if (cmp.get('type') == 'social-bar') {
          cmp.set('style', {
            display: 'flex',
            'flex-direction': 'row',
            width: 'fit-content',
            height: '60px'
          });
          getAllChildComponents(cmp).map((children) => {
            children.set('style', { 'font-size': '20px' });
          });
        } else {
          cmp.set('style', {
            width: '320px',
            'padding-left': '0.5rem',
            'padding-right': '0.5rem'
          });
          getAllChildComponents(cmp).map((children) => {
            if (children.get('tagName') == 'h1') {
              children.set('style', { 'font-size': '30px' });
            }
            if (children.get('tagName') == 'img')
              children.set('style', { 'max-width': '200px', 'min-width': '200px' });
          });
        }
      });
    });
    gjsEditor.on('block:custom', (props) => {
      // The `props` will contain all the information you need in order to update your UI.
      // props.blocks (Array<Block>) - Array of all blocks
      // props.dragStart (Function<Block>) - A callback to trigger the start of block dragging.
      // props.dragStop (Function<Block>) - A callback to trigger the stop of block dragging.
      // props.container (HTMLElement) - The default element where you can append your UI

      // Here you would put the logic to render/update your UI.
      setBlockManager(props);
    });
    gjsEditor.on('component:selected', (cmp) => {
      // get the selected componnet and its default toolbar
      const defaultToolbar = cmp.get('toolbar');
      if (defaultToolbar.filter((tlb) => tlb.id === new_toolbar_id)) {
        defaultToolbar.unshift({
          id: `RightSidebar-new_toolbar_id`,
          command: 'RightSidebar-component',
          label: settingLabel
        });
      }
      setSelectedCmp(cmp);
      if (
        cmp.attributes.type === 'gridproductgallery' ||
        cmp.attributes.type === 'sliderproductgallery' ||
        cmp.attributes.type === 'relatedproducts'
      ) {
        setSelectedDataSet(cmp.get('selectedDataset'));
        setDatasetConnect(cmp.get('datasetConnect'));
        setSelectedProductCategory(cmp.get('category'));
        // if(cmp.attributes.type === 'sliderproductgallery' || cmp.attributes.type === 'relatedproducts')
        //   setConnectModel(cmp.getChildAt(0), cmp.get('datasetConnect'));
        // else
        //   setConnectModel(cmp, cmp.get('datasetConnect'));
      } else if (cmp.attributes.type === 'addtocartbutton') {
        if (cmp.get('productId') != '') {
          setCartProductId(cmp.get('productId'));
        }
      }
    });

    // gjsEditor.on('update', () => {
    // console.log('editor update----------', gjsEditor.getHtml());
    // const current_page=editor.Pages.getSelected();
    // const html = editor.getHtml({ current_page });
    // const css = editor.getCss({ current_page });
    // const payload={
    //   page:page?._id,
    //   html:html,
    //   css:css,
    // };
    // dispatch(updatePageAction(id, payload));
    // });

    gjsEditor.on('component:mount', (cmp) => {
      const connection = store.webConnections.find((c) => c.componentId == cmp.ccid);
      if (connection) {
        const dataset = store.webDatasets.find((d) => d._id === connection.datasetId);
        if (dataset) {
          console.log(' dataset ---------------------', store.webCollections, dataset);
          const collection = store.webCollections.find((cl) => cl._id === dataset.collectionId);
          if (collection) {
            console.log(' collection ---------------------', collection, cmp.get('type'));
            if (cmp.get('type') === 'text') {
              // cmp.components(collection.values[1][connection.connectedField]);
            }

            if (cmp.get('type') === 'image') {
              // cmp.setAttributes({src: collection.values[1][connection.connectedField]});
              // cmp.attributes.src = collection.values[1][connection.connectedField];
              console.log(' cmp html ---------------------', cmp, cmp.toHTML());
            }

            if (cmp.get('type') === 'map') {
              // cmp.setAttributes({src: collection.values[1][connection.connectedField]});
              // cmp.attributes.src = collection.values[1][connection.connectedField];
              console.log(' cmp html ---------------------', cmp, cmp.toHTML());
            }
          }
        }
      }
    });

    // Add custom commands
    gjsEditor.Commands.add('save-component', (editor) => {
      Swal.fire({
        title: 'Save component',
        text: 'Are you sure you want to save this component into assets?',
        // icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-primary ms-1'
        },
        buttonsStyling: false
      }).then((result) => {
        if (result.isConfirmed) {
          setOpenCreateAssetMdl(true);
        }
      });
    });
    gjsEditor.Commands.add('RightSidebar-component', (grapeEditor) => {
      setRSidebarOpen(true);
      setTab('Styles');
    });
    gjsEditor.Commands.add('connect-collection', (geditor) => {
      setConnectData({ ...connectData, isOpen: true });
    });

    gjsEditor.Commands.add('blog-management', (editor) => {
      setIsBlog(true);
    });

    gjsEditor.Commands.add('manage-products', (geditor) => {
      setShowEditProductsModal(true);
    });

    gjsEditor.Commands.add('setting-product', (gjsEditor) => {
      setShowProductsSettingModal(true);
    });

    gjsEditor.Commands.add('setting-productpage', (gjsEditor) => {
      setShowProductPageSettingModal(true);
    });

    gjsEditor.Commands.add('setting-addcartbutton', (gjsEditor) => {
      setShowAddCartButtonModal(true);
    });

    const rte = gjsEditor.RichTextEditor;
    rte.remove('wrap');

    const fontFamilies = [
      { value: 'Arial, Helvetica, sans-serif', name: 'Arial' },
      { value: 'Arial Black, Gadget, sans-serif', name: 'Arial Black' },
      { value: 'Brush Script MT, sans-serif', name: 'Brush Script MT' },
      { value: 'Comic Sans MS, cursive, sans-serif', name: 'Comic Sans MS' },
      { value: 'Courier New, Courier, monospace', name: 'Courier New' },
      { value: 'Georgia, serif', name: 'Georgia' },
      { value: 'Helvetica, sans-serif', name: 'Helvetica' },
      { value: 'Impact, Charcoal, sans-serif', name: 'Impact' },
      { value: 'Lucida Sans Unicode, Lucida Grande, sans-serif', name: 'Lucida Sans Unicode' },
      { value: 'Tahoma, Geneva, sans-serif', name: 'Tahoma' },
      { value: 'Times New Roman, Times, serif', name: 'Times New Roman' },
      { value: 'Trebuchet MS, Helvetica, sans-serif', name: 'Trebuchet MS' },
      { value: 'Verdana, Geneva, sans-serif', name: 'Verdana' }
      // ... other font families ...
    ];

    const fetchGoogleFonts = async () => {
      const data = await dispatch(getGoogleFontsAction());
      if (!data) return;
      const fontData = data?.items?.map((font) => {
        return { name: font.family, url: font.files.regular };
      });
      const fontFamilyProp = gjsEditor?.StyleManager.getProperty('typography', 'font-family');
      const decorationOptions = [
        { id: 'none', label: 'none' },
        { id: 'underline', label: 'underline' },
        { id: 'line-through', label: 'line-through' }
      ];
      const property = gjsEditor?.StyleManager.addProperty(
        'typography',
        {
          label: 'Text-decoration',
          property: 'text-decoration',
          type: 'select',
          default: 'none',
          options: decorationOptions
        },
        { at: -2 }
      );
      const zIndex = gjsEditor?.StyleManager.addProperty(
        'typography',
        {
          label: 'Z-Index',
          property: 'z-index',
          type: 'input',
          default: 'none'
        },
        { at: -3 }
      );
      const options = [];
      fontData?.forEach((font) => {
        options.push({ id: font.name, label: font.name });
      });

      fontFamilyProp.set('options', options);
      const loadFont = (fontName) => {
        WebFont.load({
          google: {
            families: [fontName]
          },
          active: function () {
            // Append the font stylesheet to the GrapesJS iframe
            const cssLink = gjsEditor.Canvas.getDocument().createElement('link');
            cssLink.href = `https://fonts.googleapis.com/css?family=${fontName.replace(
              /\s/g,
              '+'
            )}`;
            cssLink.rel = 'stylesheet';
            cssLink.type = 'text/css';
            const head = gjsEditor.Canvas.getDocument().head;
            head.appendChild(cssLink);
          }
        });
      };
      fontFamilyProp.on('change:value', (model) => {
        // Handle the font family change
        const selectedFontFamily = model.get('value');
        loadFont(selectedFontFamily);
        // Additional actions based on the selected font family
        // ...
      });
      gjsEditor.StyleManager.render();
      rte.add('fontFamily', {
        icon: `
            <select class="gjs-field" style="width: 100px">
                ${fontData
                  ?.map((font) => `<option value="${font.name}">${font.name}</option>`)
                  .join('')}
            </select>
        `,
        event: 'change',
        result: (rte, action) => {
          const fontFamilyValue = action.btn.childNodes[1].value;
          loadFont(fontFamilyValue);
          rte.exec('fontName', fontFamilyValue);
        },
        update: (rte, action) => {
          const value = rte.doc.queryCommandValue('fontName');
          console.log(value);
          if (value) {
            action.btn.firstChild.value = value.replace(/['"]+/g, ''); // Remove quotes
          }
        }
      });
    };
    fetchGoogleFonts();
    rte.add('fontColor', {
      icon: `<input type="color" class="gjs-field" style="width: 27px" />`,
      // Bind the 'result' on 'change' listener
      event: 'change',
      result: (rte, action) => {
        const colorValue = action.btn.firstChild.value;
        rte.exec('foreColor', colorValue);
      },
      // Callback on any input change (mousedown, keydown, etc..)
      update: (rte, action) => {
        const value = rte.doc.queryCommandValue('foreColor');
        function rgbStringToHex(rgbString) {
          const rgbValues = rgbString.match(/\d+/g).map(Number);
          const hex = rgbValues.map((val) => val.toString(16).padStart(2, '0')).join('');
          return `#${hex}`;
        }
        if (value) {
          action.btn.firstChild.value = rgbStringToHex(value);
        }
      }
    });

    // Add new toolbar
    const dc = gjsEditor.DomComponents;
    const new_toolbar_id = 'custom-id';

    const htmlLabel = `<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="save"><path d="m20.71 9.29-6-6a1 1 0 0 0-.32-.21A1.09 1.09 0 0 0 14 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-8a1 1 0 0 0-.29-.71ZM9 5h4v2H9Zm6 14H9v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1Zm4-1a1 1 0 0 1-1 1h-1v-3a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v3H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.41l4 4Z"></path></svg>`;
    const connectionLabel = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="connection"><path d="M8.86 6H12a6 6 0 0 1 6 6 1 1 0 0 0 2 0 8 8 0 0 0-8-8H8.86a4 4 0 1 0 0 2ZM3 5a2 2 0 1 1 2 2 2 2 0 0 1-2-2Zm16 10a4 4 0 0 0-3.86 3H12a6 6 0 0 1-6-6 1 1 0 0 0-2 0 8 8 0 0 0 8 8h3.14A4 4 0 1 0 19 15Zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2Z"></path></svg>`;
    const blogmanagementLabel = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="write"><path d="m7.11 11.52-.71 4.94c-.074.59.29 1.14 1.14 1.14l4.94-.71a.996.996 0 0 0 .57-.28c.079-.079 7.83-7.823 7.9-7.91 3.442-3.802-1.975-8.989-5.65-5.65-.087.07-7.832 7.822-7.91 7.9a.996.996 0 0 0-.28.57ZM18 4.02A1.974 1.974 0 0 1 20 6a1.932 1.932 0 0 1-.4 1.18L16.82 4.4A1.935 1.935 0 0 1 18 4.02Zm-8.96 8.11 6.34-6.33 2.82 2.82-6.33 6.34-3.3.47Z"></path><path d="M19 13.125V17a3.003 3.003 0 0 1-3 3H7a3.003 3.003 0 0 1-3-3V8a3.003 3.003 0 0 1 3-3h3.969a1 1 0 0 0 0-2H7a5.006 5.006 0 0 0-5 5v9a5.006 5.006 0 0 0 5 5h9a5.006 5.006 0 0 0 5-5v-3.875a1 1 0 0 0-2 0Z"></path></svg>`;
    const settingLabel = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="16px" height="16px"><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(8,8)"><path d="M13.1875,3l-0.15625,0.8125l-0.59375,2.96875c-0.95312,0.375 -1.8125,0.90234 -2.59375,1.53125l-2.90625,-1l-0.78125,-0.25l-0.40625,0.71875l-2,3.4375l-0.40625,0.71875l0.59375,0.53125l2.25,1.96875c-0.08203,0.51172 -0.1875,1.02344 -0.1875,1.5625c0,0.53906 0.10547,1.05078 0.1875,1.5625l-2.25,1.96875l-0.59375,0.53125l0.40625,0.71875l2,3.4375l0.40625,0.71875l0.78125,-0.25l2.90625,-1c0.78125,0.62891 1.64063,1.15625 2.59375,1.53125l0.59375,2.96875l0.15625,0.8125h5.625l0.15625,-0.8125l0.59375,-2.96875c0.95313,-0.375 1.8125,-0.90234 2.59375,-1.53125l2.90625,1l0.78125,0.25l0.40625,-0.71875l2,-3.4375l0.40625,-0.71875l-0.59375,-0.53125l-2.25,-1.96875c0.08203,-0.51172 0.1875,-1.02344 0.1875,-1.5625c0,-0.53906 -0.10547,-1.05078 -0.1875,-1.5625l2.25,-1.96875l0.59375,-0.53125l-0.40625,-0.71875l-2,-3.4375l-0.40625,-0.71875l-0.78125,0.25l-2.90625,1c-0.78125,-0.62891 -1.64062,-1.15625 -2.59375,-1.53125l-0.59375,-2.96875l-0.15625,-0.8125zM14.8125,5h2.375l0.5,2.59375l0.125,0.59375l0.5625,0.1875c1.13672,0.35547 2.16797,0.95703 3.03125,1.75l0.4375,0.40625l0.5625,-0.1875l2.53125,-0.875l1.1875,2.03125l-2,1.78125l-0.46875,0.375l0.15625,0.59375c0.12891,0.57031 0.1875,1.15234 0.1875,1.75c0,0.59766 -0.05859,1.17969 -0.1875,1.75l-0.125,0.59375l0.4375,0.375l2,1.78125l-1.1875,2.03125l-2.53125,-0.875l-0.5625,-0.1875l-0.4375,0.40625c-0.86328,0.79297 -1.89453,1.39453 -3.03125,1.75l-0.5625,0.1875l-0.125,0.59375l-0.5,2.59375h-2.375l-0.5,-2.59375l-0.125,-0.59375l-0.5625,-0.1875c-1.13672,-0.35547 -2.16797,-0.95703 -3.03125,-1.75l-0.4375,-0.40625l-0.5625,0.1875l-2.53125,0.875l-1.1875,-2.03125l2,-1.78125l0.46875,-0.375l-0.15625,-0.59375c-0.12891,-0.57031 -0.1875,-1.15234 -0.1875,-1.75c0,-0.59766 0.05859,-1.17969 0.1875,-1.75l0.15625,-0.59375l-0.46875,-0.375l-2,-1.78125l1.1875,-2.03125l2.53125,0.875l0.5625,0.1875l0.4375,-0.40625c0.86328,-0.79297 1.89453,-1.39453 3.03125,-1.75l0.5625,-0.1875l0.125,-0.59375zM16,11c-2.75,0 -5,2.25 -5,5c0,2.75 2.25,5 5,5c2.75,0 5,-2.25 5,-5c0,-2.75 -2.25,-5 -5,-5zM16,13c1.66797,0 3,1.33203 3,3c0,1.66797 -1.33203,3 -3,3c-1.66797,0 -3,-1.33203 -3,-3c0,-1.66797 1.33203,-3 3,-3z"></path></g></g></svg>`;

    dc.getTypes().forEach((elType) => {
      let { model: oldModel, view: oldView } = elType;
      if (elType.id !== 'wrapper') {
        dc.addType(elType.id, {
          model: oldModel.extend({
            initToolbar() {
              oldModel.prototype.initToolbar.apply(this);
              const toolbar = this.get('toolbar');
              if (!toolbar.filter((tlb) => tlb.id === new_toolbar_id).length) {
                toolbar.unshift({
                  id: new_toolbar_id,
                  command: 'save-component',
                  label: htmlLabel
                });
                this.set('toolbar', toolbar);
              }

              toolbar.unshift({
                id: 'connect-collection',
                command: 'connect-collection',
                label: connectionLabel
              });

              if (
                elType.id === 'post-list-large' ||
                elType.id === 'post-card-large' ||
                elType.id === 'post-list-sidebar' ||
                elType.id === 'recent-post' ||
                elType.id === 'category-menu' ||
                elType.id === 'archive-menu'
              ) {
                toolbar.unshift({
                  id: 'blog-management',
                  command: 'blog-management',
                  label: blogmanagementLabel
                });
              }
              if (
                elType.id === 'gridproductgallery' ||
                elType.id === 'sliderproductgallery' ||
                elType.id === 'relatedproducts'
              ) {
                toolbar.unshift({
                  id: 'setting-product',
                  command: 'setting-product',
                  label: settingLabel
                });
                toolbar.unshift({
                  id: 'manage-products',
                  command: 'manage-products',
                  label: connectionLabel
                });
              }
              if (elType.id === 'productpage') {
                toolbar.unshift({
                  id: 'setting-productpage',
                  command: 'setting-productpage',
                  label: settingLabel
                });
              }
              if (elType.id === 'addtocartbutton') {
                toolbar.unshift({
                  id: 'setting-addcartbutton',
                  command: 'setting-addcartbutton',
                  label: settingLabel
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

  useEffect(() => {
    if (formTheme) {
    }
  }, [formTheme]);

  useEffect(() => {
    if (customwidth && customwidth != 480 && customwidth != 768 && customwidth != 1680) {
      const device_name = (Math.random() + 1).toString();
      const command_name = (Math.random() + 2).toString();
      editor?.runCommand('set-device-mobile');
      editor?.DeviceManager.add({
        id: device_name,
        name: device_name,
        width: customwidth.toString() + 'px'
      });
      editor.Commands.add(command_name, (editor) => {
        editor?.setDevice(device_name);
      });
      editor?.runCommand(command_name);
    } else {
      if (customwidth === 320) {
        editor?.runCommand('set-device-mobile');
      } else if (customwidth === 768) {
        editor?.runCommand('set-device-tablet');
      } else {
        editor?.runCommand('set-device-desktop');
      }
    }
  }, [customwidth]);

  useEffect(() => {
    if (isclear) {
      if (editor) {
        editor.Components.clear();
        editor.CssComposer.clear();
      }
      setIsClear(false);
    }
  }, [isclear]);

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

  useEffect(async () => {
    if (editor) {
      const current_page = editor.Pages.getSelected();
      const html = editor.getHtml({ current_page });
      const css = editor.getCss({ current_page });
      console.log(editor);
      const popups = getPopups(editor);
      const payload = {
        page: page?._id,
        html: html,
        css: css,
        popups
      };
      if (isback) {
        dispatch(updatePageAction(id, payload));
        history.goBack();
        setIsBack(false);
      }
      if (isSave) {
        let res = await dispatch(updatePageAction(id, payload));
        setIsSave(false);
      }
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
    }
  }, [ispreview, ispublish, isback, isSave]);

  useEffect(async () => {
    if (page) {
      setIsLoading(true);
      setIsStoreLoading(true);
      dispatch(getPageAction(storeRef.current.currentPage._id)).then((res) => {
        if (res) {
          if (editor) {
            editor.setComponents(res);
          }
          setIsLoading(false);
          setIsStoreLoading(false);
          
          const interval = setInterval(() => {
            if (editor) {
              const current_page = editor.Pages.getSelected();
              const html = editor.getHtml({ current_page });
              const css = editor.getCss({ current_page });
              const popups = getPopups(editor);
              const payload = {
                page: page?._id,
                html: html,
                css: css,
                popups
              };
              dispatch(updatePageAction(id, payload));
            }
          }, 1000 * 120);
          return () => clearInterval(interval);

        } else {
          setIsLoading(false);
          setIsStoreLoading(false);
        }
      });
    }
  }, [page?._id]);

  useEffect(() => {
    if (editor) {
      const head = editor?.Canvas?.getDocument()?.head;
      if (head) {
        const css = editor.Css;
        css.addRules(`.gjs-row {
          display: flex;
          justify-content: flex-start;
          align-items: stretch;
          flex-wrap: nowrap;
          padding: 10px;
        }
        @media (max-width: 768px) {
          .gjs-row {
            flex-wrap: wrap;
          }
        }
              
        .gjs-cell {
          min-height: 75px;
          flex-grow: 1;
          flex-basis: 100%;
        }`);
        formTheme?.buttons?.map((_button) => {
          let attributes = _button.attributes;
          let btnAttr = {};
          const keys = Object.keys(attributes);
          const values = Object.values(attributes);
          for (let i = 0; i < keys.length; i++) {
            const newKey = property[keys[i]];
            btnAttr[newKey] = values[i];
          }
          let btnStyle = '<style>';
          const newKeys = Object.keys(btnAttr);
          if (_button.type === 'Primary') {
            btnStyle += '.theme-button-primary{';
            for (let i = 0; i < keys.length; i++) {
              btnStyle += `${newKeys[i]}:${btnAttr[newKeys[i]]};`;
            }
          } else if (_button.type === 'Secondary') {
            btnStyle += '.theme-button-secondary{';
            for (let i = 0; i < keys.length; i++) {
              btnStyle += `${newKeys[i]}:${btnAttr[newKeys[i]]};`;
            }
          }
          btnStyle += '}</style>';
          head.insertAdjacentHTML('beforeend', `${btnStyle}`);
        });
        formTheme?.fonts?.map((_font) => {
          let attributes = _font.attributes;
          let fontAttr = {};
          const keys = Object.keys(attributes);
          const values = Object.values(attributes);
          for (let i = 0; i < keys.length; i++) {
            const newKey = property[keys[i]];
            fontAttr[newKey] = values[i];
          }
          let fontStyle = '<style>';
          const newKeys = Object.keys(fontAttr);
          if (_font.type === 'DFLT') {
            fontStyle += '.theme-text-default{';
          } else if (_font.type === 'PAR') {
            fontStyle += '.theme-text-paragraph{';
          } else if (_font.type === 'H1') {
            fontStyle += '.theme-text-h1{';
          } else if (_font.type === 'H2') {
            fontStyle += '.theme-text-h2{';
          } else if (_font.type === 'H3') {
            fontStyle += '.theme-text-h3{';
          } else if (_font.type === 'H4') {
            fontStyle += '.theme-text-h4{';
          } else if (_font.type === 'H5') {
            fontStyle += '.theme-text-h5{';
          } else if (_font.type === 'H6') {
            fontStyle += '.theme-text-h6{';
          }
          for (let i = 0; i < keys.length; i++) {
            fontStyle += `${newKeys[i]}:${fontAttr[newKeys[i]]};`;
          }
          fontStyle += '}</style>';
          head.insertAdjacentHTML('beforeend', `${fontStyle}`);
        });
        if (formTheme?.image) {
          let attributes = formTheme.image.attributes;
          let imgAttr = {};
          const keys = Object.keys(attributes);
          const values = Object.values(attributes);
          for (let i = 0; i < keys.length; i++) {
            const newKey = property[keys[i]];
            imgAttr[newKey] = values[i];
          }
          let imgStyle = '<style>';
          const newKeys = Object.keys(imgAttr);
          imgStyle += '.theme-image{';
          for (let i = 0; i < keys.length; i++) {
            imgStyle += `${newKeys[i]}:${imgAttr[newKeys[i]]};`;
          }
          imgStyle += '}</style>';
          head.insertAdjacentHTML('beforeend', `${imgStyle}`);
        }
        let menuStyle = `
          <style>
          .trait-menu-item-container{
            &:hover{
              .trait-submenus-container{
                display: block;
              }
            }
          }
          </style>
      `;
        if (head) {
          head.insertAdjacentHTML('beforeend', `${menuStyle}`);
        }
      }
      store.webElements.map((el, idx) => {
        if (el?.category[0]?.name === 'New Form') {
          let formItem = {
            isComponent: (el) => el.tagName === 'FORM' && el.classList.contains('new-form'),
            model: {
              defaults: {
                tagName: 'form',
                draggable: true,
                droppable: true,
                selectable: true,
                components: (props) => {
                  return <div></div>;
                },
                attributes: { class: 'new-form', type: 'GET' },
                formType: '',
                traits: [
                  {
                    type: 'form-type',
                    name: 'Type',
                    changeProp: true,
                    min: 1
                  }
                ],
                styles: `.new-form {height:fit-content; width:500px; background-color:white}`,
                stylable: [
                  'width',
                  'height',
                  'background-color',
                  'margin',
                  'align-items',
                  'border',
                  'justify-content',
                  'display'
                ]
              }
            },
            view: {
              init() {
                this.listenTo(this.model, 'change:formType', this.handleChangeType);
              },
              handleChangeType(e) {
                let formType = this.model.get('formType');
                this.model.attributes.type = formType;
                this.render();
              }
            }
          };
          editor.DomComponents.addType('new-form', formItem);
          editor.BlockManager.add(
            `${el?.category[0]?.mainMenu}-${el?.category[0]?.subMenu}-${el?.category[0]?.name}-${idx}`,
            {
              label: el?.category[0]?.name,
              content: { type: 'new-form' },
              media: el.imageUrl,
              category: `${el?.category[0]?.mainMenu}-${el?.category[0]?.subMenu}-${el?.category[0]?.name}`,
              menu: `${el?.category[0]?.mainMenu}-${el?.category[0]?.subMenu}`,
              mainMenu: `${el?.category[0]?.mainMenu}`,
              refcategory: `${el?.category[0]?.name}`,
              submenu: el?.category[0]?.subMenu
            }
          );
        }
        if (el?.category[0]?.name === 'Add Existing Form') {
          let formItem = {
            isComponent: (el) => el.tagName === 'FORM' && el.classList.contains('add-form'),
            model: {
              defaults: {
                tagName: 'form',
                draggable: true,
                droppable: true,
                selectable: true,
                components: (props) => {
                  return <div></div>;
                },
                attributes: { class: 'add-form' },
                styles: `.add-form {min-height: 300px; width:500px; background-color:white}`,
                stylable: [
                  'width',
                  'height',
                  'background-color',
                  'margin',
                  'align-items',
                  'border',
                  'justify-content',
                  'display'
                ]
              }
            }
          };
          editor.DomComponents.addType('add-form', formItem);
          editor.BlockManager.add(
            `${el?.category[0]?.mainMenu}-${el?.category[0]?.subMenu}-${el?.category[0]?.name}-${idx}`,
            {
              label: el?.category[0]?.name,
              content: { type: 'add-form' },
              media: el.imageUrl,
              category: `${el?.category[0]?.mainMenu}-${el?.category[0]?.subMenu}-${el?.category[0]?.name}`,
              menu: `${el?.category[0]?.mainMenu}-${el?.category[0]?.subMenu}`,
              mainMenu: `${el?.category[0]?.mainMenu}`,
              refcategory: `${el?.category[0]?.name}`,
              submenu: el?.category[0]?.subMenu
            }
          );
        }
        if (el?.category[0]?.subMenu === 'repeater') {
          const parser = new DOMParser();
          let htmlCmp = parser.parseFromString(el.html, 'text/html');
          const style = htmlCmp.head;
          const firstChild = htmlCmp.body.firstChild;
          if (firstChild.className) {
            firstChild.className += ' repeater';
          } else {
            firstChild.className += 'repeater';
          }
          const elements = firstChild.children;
          if (elements && elements.length > 0) {
            for (let i = 0; i < elements.length; i++) {
              if (elements[i].className) {
                elements[i].className += ' repeater-item';
              } else {
                elements[i].className += 'repeater-item';
              }
              elements[i].style.backgroundColor = 'white';
              elements[i].style.minHeight = '0px';
            }
          }
          editor.BlockManager.add(
            `${el?.category[0]?.mainMenu}-${el?.category[0]?.subMenu}-${el?.category[0]?.name}-${idx}`,
            {
              label: el?.category[0]?.name,
              content: htmlCmp.head.innerHTML + htmlCmp.body.innerHTML,
              media: el.imageUrl,
              category: `${el?.category[0]?.mainMenu}-${el?.category[0]?.subMenu}-${el?.category[0]?.name}`,
              menu: `${el?.category[0]?.mainMenu}-${el?.category[0]?.subMenu}`,
              mainMenu: `${el?.category[0]?.mainMenu}`,
              refcategory: `${el?.category[0]?.name}`,
              submenu: el?.category[0]?.subMenu
            }
          );
        }
        if (el?.category[0]?.subMenu === 'iframe') {
          const parser = new DOMParser();
          let htmlCmp = parser.parseFromString(el.html, 'text/html');
          const firstChild = htmlCmp.body.firstChild;
          if (firstChild.className) {
            firstChild.className += ' iframe-element';
          } else {
            firstChild.className += 'iframe-element';
          }
          editor.BlockManager.add(
            `${el?.category[0]?.mainMenu}-${el?.category[0]?.subMenu}-${el?.category[0]?.name}-${idx}`,
            {
              label: el?.category[0]?.name,
              content: htmlCmp.head.innerHTML + htmlCmp.body.innerHTML,
              media: el.imageUrl,
              category: `${el?.category[0]?.mainMenu}-${el?.category[0]?.subMenu}-${el?.category[0]?.name}`,
              menu: `${el?.category[0]?.mainMenu}-${el?.category[0]?.subMenu}`,
              mainMenu: `${el?.category[0]?.mainMenu}`,
              refcategory: `${el?.category[0]?.name}`,
              submenu: el?.category[0]?.subMenu
            }
          );
        }
        if (el?.category[0]?.subMenu === 'social-bar') {
          const parser = new DOMParser();
          let htmlCmp = parser.parseFromString(el.html, 'text/html');
          const firstChild = htmlCmp.body.firstChild;
          if (firstChild.className) {
            firstChild.className += ' social-bar';
          } else {
            firstChild.className = 'social-bar';
          }
          editor.BlockManager.add(
            `${el?.category[0]?.mainMenu}-${el?.category[0]?.subMenu}-${el?.category[0]?.name}-${idx}`,
            {
              label: el?.category[0]?.name,
              content: htmlCmp.head.innerHTML + htmlCmp.body.innerHTML,
              media: el.imageUrl,
              category: `${el?.category[0]?.mainMenu}-${el?.category[0]?.subMenu}-${el?.category[0]?.name}`,
              menu: `${el?.category[0]?.mainMenu}-${el?.category[0]?.subMenu}`,
              mainMenu: `${el?.category[0]?.mainMenu}`,
              refcategory: `${el?.category[0]?.name}`,
              submenu: el?.category[0]?.subMenu
            }
          );
        }
        if (el?.category[0]?.subMenu === 'gallery') {
          const parser = new DOMParser();
          let htmlCmp = parser.parseFromString(el.html, 'text/html');
          const firstChild = htmlCmp.body.firstChild;
          if (firstChild.className) {
            firstChild.className += ' gallery';
          } else {
            firstChild.className = 'gallery';
          }
          const elements = firstChild.children;
          if (elements && elements.length > 0) {
            for (let i = 0; i < elements.length; i++) {
              if (elements[i].className) {
                elements[i].className += ' gallery-item';
              } else {
                elements[i].className = 'gallery-item';
              }
            }
          }
          editor.BlockManager.add(
            `${el?.category[0]?.mainMenu}-${el?.category[0]?.subMenu}-${el?.category[0]?.name}-${idx}`,
            {
              label: el?.category[0]?.name,
              content: htmlCmp.head.innerHTML + htmlCmp.body.innerHTML,
              media: el.imageUrl,
              category: `${el?.category[0]?.mainMenu}-${el?.category[0]?.subMenu}-${el?.category[0]?.name}`,
              menu: `${el?.category[0]?.mainMenu}-${el?.category[0]?.subMenu}`,
              mainMenu: `${el?.category[0]?.mainMenu}`,
              refcategory: `${el?.category[0]?.name}`,
              submenu: el?.category[0]?.subMenu
            }
          );
        } else {
          const parser = new DOMParser();
          let htmlCmp = parser.parseFromString(el.html, 'text/html');
          editor.BlockManager.add(
            `${el?.category[0]?.mainMenu}-${el?.category[0]?.subMenu}-${el?.category[0]?.name}-${idx}`,
            {
              index: el?._id,
              user: el?.userId,
              label: el?.category[0]?.name,
              content: htmlCmp.head.innerHTML + htmlCmp.body.innerHTML,
              media: el.imageUrl,
              category: `${el?.category[0]?.mainMenu}-${el?.category[0]?.subMenu}-${el?.category[0]?.name}`,
              menu: `${el?.category[0]?.mainMenu}-${el?.category[0]?.subMenu}`,
              mainMenu: `${el?.category[0]?.mainMenu}`,
              refcategory: `${el?.category[0]?.name}`,
              submenu: el?.category[0]?.subMenu,
              mediaType: el?.mediaType || '',
              mediaName: el?.name || ''
            }
          );
        }
      });
    }
  }, [store.webElements, editor]);

  useEffect(() => {
    if (editor) {
      editor?.on('component:add', (component) => {
        const customBlogs = store.webBlogs.filter((webBlog) => webBlog.isTemplate === false);
        let blogs;
        if (customBlogs.length > 0) {
          blogs = customBlogs;
        } else {
          blogs = store.webBlogs;
        }
        if (blogs.length) {
          if (
            component.get('type') === 'post-list-large' ||
            component.get('type') === 'post-card-large' ||
            component.get('type') === 'post-list-sidebar'
          ) {
            component.set('blogs', blogs);
          }
          if (component.get('type') === 'recent-post') {
            let recentBlogs = [];
            recentBlogs.push(blogs[blogs.length - 1]);
            component.set('blogs', recentBlogs);
          }
          if (component.get('type') === 'category-menu') {
            component.set('num', blogs.length);
          }
          if (component.get('type') === 'archive-menu') {
            let postList = [];
            for (let i = 0; i < 12; i++) {
              const blogs = blogs.filter((blog) => new Date(blog.updatedAt).getMonth() === i);
              const amount = blogs.length;
              if (amount > 0) {
                const month = new Date(blogs[0].updatedAt).getMonth() + 1;
                const year = new Date(blogs[0].updatedAt).getFullYear();
                const date = month.toString() + '/' + year.toString();
                postList.push({ date: date, amount: amount });
              }
            }
            component.set('postList', postList);
          }
        }
      });
      let blogs;
      const customBlogs = store.webBlogs.filter((webBlog) => webBlog.isTemplate === false);
      if (customBlogs.length > 0) {
        blogs = customBlogs;
      } else {
        blogs = store.webBlogs;
      }
      const components = editor.getWrapper().components().models;
      for (let i = 0; i < components.length; i++) {
        const component = components[i];
        if (
          component.get('type') === 'post-list-large' ||
          component.get('type') === 'post-card-large' ||
          component.get('type') === 'post-list-sidebar'
        ) {
          component.set('blogs', blogs);
        }
        if (component.get('type') === 'recent-post') {
          let recentBlogs = [];
          recentBlogs.push(blogs[blogs.length - 1]);
          component.set('blogs', recentBlogs);
        }
        if (component.get('type') === 'category-menu') {
          component.set('num', blogs.length);
        }
        if (component.get('type') === 'archive-menu') {
          let postList = [];
          for (let i = 0; i < 12; i++) {
            const blogs = blogs.filter((blog) => new Date(blog.updatedAt).getMonth() === i);
            const amount = blogs.length;
            if (amount > 0) {
              const month = new Date(blogs[0].updatedAt).getMonth() + 1;
              const year = new Date(blogs[0].updatedAt).getFullYear();
              const date = month.toString() + '/' + year.toString();
              postList.push({ date: date, amount: amount });
            }
          }
          component.set('postList', postList);
        }
      }
    }
  }, [store.webBlogs]);

  window.addEventListener('popstate', () => {
    if (editor) {
      const current_page = editor.Pages.getSelected();
      const html = editor.getHtml({ current_page });
      const css = editor.getCss({ current_page });
      const payload = {
        page: page?._id,
        html: html,
        css: css
      };
      console.log('popstate============0', payload);
      dispatch(updatePageAction(id, payload));
    }
  });

  useEffect(() => {
    if (selectedFont && editor) {
      const head = editor?.Canvas?.getDocument()?.head;
      let attributes = selectedFont.attributes;
      let fontAttr = {};
      const keys = Object.keys(attributes);
      const values = Object.values(attributes);
      for (let i = 0; i < keys.length; i++) {
        const newKey = property[keys[i]];
        fontAttr[newKey] = values[i];
      }
      let fontStyle = '<style>';
      const newKeys = Object.keys(fontAttr);
      if (selectedFont.type === 'DFLT') {
        fontStyle += '.theme-text-default{';
      } else if (selectedFont.type === 'PAR') {
        fontStyle += '.theme-text-paragraph{';
      } else if (selectedFont.type === 'H1') {
        fontStyle += '.theme-text-h1{';
      } else if (selectedFont.type === 'H2') {
        fontStyle += '.theme-text-h2{';
      } else if (selectedFont.type === 'H3') {
        fontStyle += '.theme-text-h3{';
      } else if (selectedFont.type === 'H4') {
        fontStyle += '.theme-text-h4{';
      } else if (selectedFont.type === 'H5') {
        fontStyle += '.theme-text-h5{';
      } else if (selectedFont.type === 'H6') {
        fontStyle += '.theme-text-h6{';
      }
      for (let i = 0; i < keys.length; i++) {
        fontStyle += `${newKeys[i]}:${fontAttr[newKeys[i]]};`;
      }
      fontStyle += '}</style>';
      head.insertAdjacentHTML('beforeend', `${fontStyle}`);

      // const elType=selectedFont.type;
      // let newElType;
      // if(editor && selectedCmp){
      //   switch(elType){
      //     case 'PAR':
      //       newElType='p';
      //       break;
      //     case 'H1':
      //       newElType='h1';
      //       break;
      //     case 'H2':
      //       newElType='h2';
      //       break;
      //     case 'H3':
      //       newElType='h3';
      //       break;
      //     case 'H4':
      //       newElType='h4';
      //       break;
      //     case 'H5':
      //       newElType='h5';
      //       break;
      //     case 'H6':
      //       newElType='h6';
      //       break;
      //     default:
      //       newElType='default';
      //       break;
      //   }
      //   let wrapper=selectedCmp.getEl();
      //   const attributes=selectedFont.attributes;
      //   const values=Object.values(attributes);
      //   if(newElType==='default'){
      //     attributes && Object.keys(attributes).map((_attribute,i)=>{
      //       wrapper.style[_attribute]=values[i];
      //     })
      //   }
      //   else{
      //     let elements=wrapper.getElementsByTagName(newElType);
      //     if(elements){
      //       for (let element of elements){
      //         attributes && Object.keys(attributes).map((_attribute,i)=>{
      //           element.style[_attribute]=values[i];
      //         })
      //       }
      //     }
      //   }
      // }
    }
  }, [selectedFont]);

  useEffect(() => {
    if (selectedColor) {
      const head = editor?.Canvas?.getDocument()?.head;
      const name = selectedColor.name;
      const value = selectedColor.value;
      let newColors =
        formTheme &&
        formTheme?.colors?.map((_color) => {
          if (_color._id === selectedColor._id) {
            let tempColor = JSON.parse(JSON.stringify(_color));
            tempColor.value = value;
            return tempColor;
          } else {
            return _color;
          }
        });
      let newButtons =
        formTheme &&
        formTheme?.buttons?.map((_button) => {
          let tempButton = JSON.parse(JSON.stringify(_button));
          if (
            tempButton.attributes.themeBackgroundColor &&
            tempButton.attributes.themeBackgroundColor === name
          ) {
            tempButton.attributes.backgroundColor = value;
          }
          if (
            tempButton.attributes.themeBackgroundColor &&
            tempButton.attributes.themeColor === name
          ) {
            tempButton.attributes.color = value;
          }
          let attributes = tempButton.attributes;
          let btnAttr = {};
          const keys = Object.keys(attributes);
          const values = Object.values(attributes);
          for (let i = 0; i < keys.length; i++) {
            const newKey = property[keys[i]];
            btnAttr[newKey] = values[i];
          }
          let btnStyle = '<style>';
          const newKeys = Object.keys(btnAttr);
          if (tempButton.type === 'Primary') {
            btnStyle += '.theme-button-primary{';
            for (let i = 0; i < keys.length; i++) {
              btnStyle += `${newKeys[i]}:${btnAttr[newKeys[i]]};`;
            }
          } else if (tempButton.type === 'Secondary') {
            btnStyle += '.theme-button-secondary{';
            for (let i = 0; i < keys.length; i++) {
              btnStyle += `${newKeys[i]}:${btnAttr[newKeys[i]]};`;
            }
          }
          btnStyle += '}</style>';
          head.insertAdjacentHTML('beforeend', `${btnStyle}`);
          return tempButton;
        });
      let newFonts =
        formTheme &&
        formTheme?.fonts?.map((_font) => {
          let tempFont = JSON.parse(JSON.stringify(_font));
          if (tempFont.attributes.themeColor && tempFont.attributes.themeColor === name) {
            tempFont.attributes.color = value;
          }
          let attributes = tempFont.attributes;
          let fontAttr = {};
          const keys = Object.keys(attributes);
          const values = Object.values(attributes);
          for (let i = 0; i < keys.length; i++) {
            const newKey = property[keys[i]];
            fontAttr[newKey] = values[i];
          }
          let fontStyle = '<style>';
          const newKeys = Object.keys(fontAttr);
          if (tempFont.type === 'DFLT') {
            fontStyle += '.theme-text-default{';
          } else if (tempFont.type === 'PAR') {
            fontStyle += '.theme-text-paragraph{';
          } else if (tempFont.type === 'H1') {
            fontStyle += '.theme-text-h1{';
          } else if (tempFont.type === 'H2') {
            fontStyle += '.theme-text-h2{';
          } else if (tempFont.type === 'H3') {
            fontStyle += '.theme-text-h3{';
          } else if (tempFont.type === 'H4') {
            fontStyle += '.theme-text-h4{';
          } else if (tempFont.type === 'H5') {
            fontStyle += '.theme-text-h5{';
          } else if (tempFont.type === 'H6') {
            fontStyle += '.theme-text-h6{';
          }
          for (let i = 0; i < keys.length; i++) {
            fontStyle += `${newKeys[i]}:${fontAttr[newKeys[i]]};`;
          }
          fontStyle += '}</style>';
          head.insertAdjacentHTML('beforeend', `${fontStyle}`);
          return tempFont;
        });
      let newImage;
      if (formTheme && formTheme.image) {
        let newImage = JSON.parse(JSON.stringify(formTheme.image));
        if (newImage.attributes.themeColor && newImage.attributes.themeColor === name) {
          newImage.attributes.borderColor = value;
        }
        let attributes = newImage.attributes;
        let imgAttr = {};
        const keys = Object.keys(attributes);
        const values = Object.values(attributes);
        for (let i = 0; i < keys.length; i++) {
          const newKey = property[keys[i]];
          imgAttr[newKey] = values[i];
        }
        let imgStyle = '<style>';
        const newKeys = Object.keys(imgAttr);
        imgStyle += '.theme-image{';
        for (let i = 0; i < keys.length; i++) {
          imgStyle += `${newKeys[i]}:${imgAttr[newKeys[i]]};`;
        }
        imgStyle += '}</style>';
        head?.insertAdjacentHTML('beforeend', `${imgStyle}`);
      }
      const payload = {
        colors: newColors,
        buttons: newButtons,
        fonts: newFonts,
        image: newImage
      };
      const themeId = formTheme._id;
      dispatch(updateWebBuilderThemeAction(themeId, payload));
    }
  }, [selectedColor]);

  useEffect(() => {
    if (selectedButton && editor) {
      const head = editor?.Canvas?.getDocument()?.head;
      let attributes = selectedButton.attributes;
      let btnAttr = {};
      const keys = Object.keys(attributes);
      const values = Object.values(attributes);
      for (let i = 0; i < keys.length; i++) {
        const newKey = property[keys[i]];
        btnAttr[newKey] = values[i];
      }
      let btnStyle = '<style>';
      const newKeys = Object.keys(btnAttr);
      if (selectedButton.type === 'Primary') {
        btnStyle += '.theme-button-primary{';
        for (let i = 0; i < keys.length; i++) {
          btnStyle += `${newKeys[i]}:${btnAttr[newKeys[i]]};`;
        }
      } else if (selectedButton.type === 'Secondary') {
        btnStyle += '.theme-button-secondary{';
        for (let i = 0; i < keys.length; i++) {
          btnStyle += `${newKeys[i]}:${btnAttr[newKeys[i]]};`;
        }
      }
      btnStyle += '}</style>';
      head.insertAdjacentHTML('beforeend', `${btnStyle}`);

      // if(editor && selectedCmp){
      //   let wrapper=selectedCmp.getEl();
      //   const attributes=selectedButton.attributes;
      //   const values=Object.values(attributes);
      //     let elements = wrapper.querySelectorAll("input[type=button]");
      //     if(elements){
      //       for (let element of elements){
      //         attributes && Object.keys(attributes).map((_attribute,i)=>{
      //           element.style[_attribute]=values[i];
      //         })
      //       }
      //     }
      //   }
    }
  }, [selectedButton]);

  useEffect(() => {
    if (selectedImage) {
      const head = editor?.Canvas?.getDocument()?.head;
      if (head) {
        let newImage = JSON.parse(JSON.stringify(selectedImage));
        let attributes = newImage.attributes;
        let imgAttr = {};
        const keys = Object.keys(attributes);
        const values = Object.values(attributes);
        for (let i = 0; i < keys.length; i++) {
          const newKey = property[keys[i]];
          imgAttr[newKey] = values[i];
        }
        let imgStyle = '<style>';
        const newKeys = Object.keys(imgAttr);
        imgStyle += '.theme-image{';
        for (let i = 0; i < keys.length; i++) {
          imgStyle += `${newKeys[i]}:${imgAttr[newKeys[i]]};`;
        }
        imgStyle += '}</style>';
        head.insertAdjacentHTML('beforeend', `${imgStyle}`);
      }
    }
  }, [selectedImage]);

  return (
    <div className="d-flex">
      <div className="expanded-sidebar shadow-lg" hidden={VisibleMenu}>
        <PerfectScrollbar
          options={{ suppressScrollX: true }}
          style={{ height: `calc(100vh - 120px)` }}
        >
          {selectedMainNav === 'elements' && (
            <div className="d-flex">
              <Sidebar
                sidebarData={sidebarData}
                setSidebarData={setSidebarData}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                handleClick={handleOnclick}
                editor={editor}
              />
              <Collapse
                isOpen={sidebarData.isOpen}
                horizontal={true}
                delay={{ show: 10, hide: 20 }}
                style={{ height: '100%' }}
              >
                <div style={{ height: '100%', overflow: 'scroll', minWidth: '230px' }}>
                  <div className="expanded-header">
                    <span className="me-1">
                      {sidebarData.menu.name === 'CMS' ? (
                        'Add Content Elements'
                      ) : sidebarData.menu.name === 'Compositions' ? (
                        'Section Template'
                      ) : sidebarData.menu.name === 'Theme' ? (
                        <div className="d-flex align-items-center text-uppercase">
                          {themeEditing ? (
                            <>
                              <div
                                onClick={(e) => setThemeEditing(false)}
                                className="cursor-pointer"
                              >
                                <ChevronLeft size={20} />
                              </div>
                              {selectedSubMenu}
                            </>
                          ) : (
                            <div>Theme</div>
                          )}
                        </div>
                      ) : (
                        sidebarData.menu.name
                      )}
                    </span>
                    <span className="header-icon" onClick={handleSidebarOpen}>
                      <X size={16} color="#6e6b7b" style={{ cursor: 'hand' }} />
                    </span>
                  </div>
                  <div className="expanded-content">
                    <div id="blocks">
                      {sidebarData.menu.id === 'quick-add' && (
                        <div className="quick-add">
                          {editor?.BlockManager.blocks
                            .filter((e) => e.get('category') === 'Basic')
                            .map((block) => {
                              if (
                                block.getLabel() != 'Link' &&
                                block.getLabel() != 'Link Block' &&
                                block.getId() != 'image'
                              )
                                return (
                                  <div
                                    key={block.getId()}
                                    draggable
                                    className="d-flex flex-column align-items-center border border-secondary rounded cursor-pointer py-2 px-1 transition-colors mt-1 mb-1"
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
                                      style={{ width: 30, height: 30 }}
                                      dangerouslySetInnerHTML={{ __html: block.getMedia() }}
                                    />
                                    <div
                                      className="text-sm text-center w-full mt-1"
                                      title={block.getLabel()}
                                    >
                                      {block.getLabel()}
                                    </div>
                                  </div>
                                );
                            })}
                        </div>
                      )}
                      {sidebarData.menu.id === 'decorative' && (
                        <div className="submenu-and-element d-flex">
                          <div className="submenu-list pt-0">
                            {sidebarData?.menu?.subMenu?.map((sub, index) => {
                              const categories = [];
                              const tempBlocks = [];
                              editor?.BlockManager.blocks.map((e) => {
                                if (
                                  e.get('menu') === `${sidebarData.menu.id}-${sub.id}` &&
                                  categories.findIndex(
                                    (c) =>
                                      c === `${sidebarData.menu.id}-${sub.id}-${e.get('label')}`
                                  ) === -1
                                ) {
                                  categories.push(
                                    `${sidebarData.menu.id}-${sub.id}-${e.get('label')}`
                                  );
                                  tempBlocks.push(e);
                                }
                              });

                              const returnComponent = (
                                <>
                                  <div
                                    className="d-flex align-items-center px-50 border-bottom border-top"
                                    onClick={() => {
                                      handleOnclick(index);
                                    }}
                                  >
                                    <div
                                      hidden={
                                        OpenCategory.index == index ? OpenCategory.value : false
                                      }
                                    >
                                      <IoMdArrowDropright color="black" size={18} />
                                    </div>
                                    <div
                                      hidden={
                                        OpenCategory.index == index ? !OpenCategory.value : true
                                      }
                                    >
                                      <IoMdArrowDropdown color="black" size={18} />
                                    </div>
                                    <div className="ps-50">
                                      <h5 className="submenu-item ps-0">{sub.name}</h5>
                                    </div>
                                  </div>

                                  {tempBlocks.map((b, ix) => {
                                    return (
                                      <Collapse
                                        isOpen={
                                          OpenCategory.index == index ? OpenCategory.value : false
                                        }
                                      >
                                        <div
                                          key={ix}
                                          className={
                                            selectedCategory ===
                                            `${sidebarData.menu.id}-${sub.id}-${b.get('label')}`
                                              ? 'selected-submenu-category'
                                              : 'submenu-category'
                                          }
                                          onClick={() => {
                                            setSelectedCategory(
                                              `${sidebarData.menu.id}-${sub.id}-${b.get('label')}`
                                            );
                                          }}
                                        >
                                          {b.get('label')}
                                        </div>
                                      </Collapse>
                                    );
                                  })}
                                </>
                              );
                              return returnComponent;
                            })}
                          </div>
                          <div className="element-container">
                            <div
                              style={{ width: 300, flexWrap: 'wrap' }}
                              className="d-flex align-items-center text-center border-bottom"
                            >
                              {blockManager?.blocks
                                ?.filter((e) => e.get('category').id === selectedCategory)
                                .map((b, ix, array) => {
                                  return (
                                    <Col
                                      sm={2}
                                      className={` p-50 ${
                                        array.length - 6 > ix + 1
                                          ? 'border-bottom'
                                          : ix + 1 == array.length
                                          ? (ix + 1) % 6 == 0
                                            ? 'border-bottom'
                                            : ''
                                          : 'border-bottom'
                                      }`}
                                    >
                                      {b.get('media').match('image') ? (
                                        <div>
                                          <img width="40" height="40" src={b.get('media')} />
                                        </div>
                                      ) : null}
                                      <i className={b.get('media')} style={{ fontSize: 40 }}></i>
                                      <div
                                        draggable
                                        onDragStart={(e) => {
                                          e.stopPropagation();
                                          blockManager.dragStart(b, e.nativeEvent);
                                        }}
                                        onDragEnd={(e) => {
                                          e.stopPropagation();
                                          if (b.get('label') === 'New Form') {
                                            createForm();
                                            blockManager.dragStop(false);
                                          }
                                          if (b.get('label') === 'Add Existing Form') {
                                            setAddFormMdl(true);
                                            blockManager.dragStop(false);
                                          }
                                        }}
                                      ></div>
                                    </Col>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      )}
                      {sidebarData.menu.id === 'compositions' && (
                        <div className="submenu-and-element d-flex ">
                          <div className="submenu-list pt-0 ">
                            {sidebarData?.menu?.subMenu?.map((sub, index) => {
                              const categories = [];
                              const tempBlocks = [];
                              // if(sub?.subMenu?.length>0){
                              //   sub?.subMenu?.map((item) =>{
                              //     console.log
                              //   })
                              // }
                              editor?.BlockManager.blocks.map((e) => {
                                if (
                                  e.get('menu') === `${sidebarData.menu.id}-${sub.id}` &&
                                  categories.findIndex(
                                    (c) =>
                                      c === `${sidebarData.menu.id}-${sub.id}-${e.get('label')}`
                                  ) === -1
                                ) {
                                  categories.push(
                                    `${sidebarData.menu.id}-${sub.id}-${e.get('label')}`
                                  );
                                  tempBlocks.push(e);
                                }
                              });

                              const returnComponent = (
                                <>
                                  <div
                                    className="d-flex align-items-center px-50 border-bottom border-top "
                                    onClick={() => {
                                      handleOnclick(index);
                                    }}
                                  >
                                    <div
                                      hidden={
                                        OpenCategory.index == index ? OpenCategory.value : false
                                      }
                                    >
                                      <IoMdArrowDropright color="black" size={18} className=" " />
                                    </div>
                                    <div
                                      hidden={
                                        OpenCategory.index == index ? !OpenCategory.value : true
                                      }
                                    >
                                      <IoMdArrowDropdown color="black" size={18} className=" " />
                                    </div>
                                    <div className="ps-50">
                                      <h5 className="submenu-item ps-0">{sub.name}</h5>
                                    </div>
                                  </div>
                                  {tempBlocks.map((b, ix) => {
                                    return (
                                      <Collapse
                                        isOpen={
                                          OpenCategory.index == index ? OpenCategory.value : false
                                        }
                                      >
                                        <div
                                          key={ix}
                                          className={
                                            selectedCategory ===
                                            `${sidebarData.menu.id}-${sub.id}-${b.get('label')}`
                                              ? 'selected-submenu-category'
                                              : 'submenu-category'
                                          }
                                          onClick={() => {
                                            setSelectedCategory(
                                              `${sidebarData.menu.id}-${sub.id}-${b.get('label')}`
                                            );
                                          }}
                                        >
                                          {b.get('label')}
                                        </div>
                                      </Collapse>
                                    );
                                  })}
                                </>
                              );
                              return returnComponent;
                            })}
                          </div>
                          <div className="element-container">
                            {blockManager?.blocks
                              ?.filter((e) => e.get('category').id === selectedCategory)
                              .map((b, ix) => {
                                return (
                                  <div className="element" key={ix}>
                                    <img
                                      width="280"
                                      src={`https://storage.googleapis.com/mymember-storage/website-builder/menu-image/${b.get(
                                        'media'
                                      )}`}
                                    />
                                    <div
                                      draggable
                                      onDragStart={(e) => {
                                        e.stopPropagation();
                                        blockManager.dragStart(b, e.nativeEvent);
                                      }}
                                      onDragEnd={(e) => {
                                        e.stopPropagation();
                                        if (b.get('label') === 'New Form') {
                                          createForm();
                                        }
                                        if (b.get('label') === 'Add Existing Form') {
                                          setAddFormMdl(true);
                                        }
                                        blockManager.dragStop(false);
                                      }}
                                    ></div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      )}
                      {sidebarData.menu.id === 'contact-forms' && (
                        <div className="submenu-and-element d-flex">
                          <div className="submenu-list pt-0">
                            {sidebarData?.menu?.subMenu?.map((sub, index) => {
                              const categories = [];
                              const tempBlocks = [];
                              editor?.BlockManager.blocks.map((e) => {
                                if (
                                  e.get('menu') === `${sidebarData.menu.id}-${sub.id}` &&
                                  categories.findIndex(
                                    (c) =>
                                      c === `${sidebarData.menu.id}-${sub.id}-${e.get('label')}`
                                  ) === -1
                                ) {
                                  categories.push(
                                    `${sidebarData.menu.id}-${sub.id}-${e.get('label')}`
                                  );
                                  tempBlocks.push(e);
                                }
                              });

                              const returnComponent = (
                                <>
                                  <div
                                    className="d-flex align-items-center px-50 border-bottom border-top"
                                    onClick={() => {
                                      handleOnclick(index);
                                    }}
                                  >
                                    <div
                                      hidden={
                                        OpenCategory.index == index ? OpenCategory.value : false
                                      }
                                    >
                                      <IoMdArrowDropright size={18} />
                                    </div>
                                    <div
                                      hidden={
                                        OpenCategory.index == index ? !OpenCategory.value : true
                                      }
                                    >
                                      <IoMdArrowDropdown size={18} />
                                    </div>
                                    <div className="ps-50">
                                      <h5 className="submenu-item ps-0">{sub.name}</h5>
                                    </div>
                                  </div>
                                  {tempBlocks.map((b, ix) => {
                                    return (
                                      <Collapse
                                        isOpen={
                                          OpenCategory.index == index ? OpenCategory.value : false
                                        }
                                      >
                                        <div
                                          key={ix}
                                          className={
                                            selectedCategory ===
                                            `${sidebarData.menu.id}-${sub.id}-${b.get('label')}`
                                              ? 'selected-submenu-category'
                                              : 'submenu-category'
                                          }
                                          onClick={() => {
                                            setSelectedCategory(
                                              `${sidebarData.menu.id}-${sub.id}-${b.get('label')}`
                                            );
                                          }}
                                        >
                                          {b.get('label')}
                                        </div>
                                      </Collapse>
                                    );
                                  })}
                                </>
                              );
                              return returnComponent;
                            })}
                          </div>
                          <div className="element-container">
                            {blockManager?.blocks
                              ?.filter((e) => e.get('category').id === selectedCategory)
                              .map((b, ix) => {
                                return (
                                  <div className="element" key={ix}>
                                    <img width="280" src={b.get('media')} />
                                    <div
                                      draggable
                                      onDragStart={(e) => {
                                        e.stopPropagation();
                                        blockManager.dragStart(b, e.nativeEvent);
                                      }}
                                      onDragEnd={(e) => {
                                        e.stopPropagation();
                                        if (b.get('label') === 'New Form') {
                                          createForm();
                                        }
                                        if (b.get('label') === 'Add Existing Form') {
                                          setAddFormMdl(true);
                                        }
                                        blockManager.dragStop(false);
                                      }}
                                    ></div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      )}
                      {sidebarData.menu.id !== 'decorative' &&
                        sidebarData.menu.id != 'quick-add' &&
                        sidebarData.menu.id != 'blog' &&
                        sidebarData.menu.id != 'theme' &&
                        sidebarData.menu.id !== 'quick-add' &&
                        sidebarData.menu.id !== 'blog' &&
                        sidebarData.menu.id !== 'cms' &&
                        sidebarData.menu.id !== 'store' &&
                        sidebarData.menu.id !== 'assets' &&
                        sidebarData.menu.id !== 'compositions' &&
                        sidebarData.menu.id !== 'contact-forms' &&
                        sidebarData.menu.id !== 'content' &&
                        sidebarData.menu.id !== 'media' && (
                          <div className="submenu-and-element d-flex">
                            <div className="submenu-list pt-0">
                              {sidebarData?.menu?.subMenu?.map((sub, index) => {
                                const categories = [];
                                const tempBlocks = [];
                                editor?.BlockManager.blocks.map((e) => {
                                  if (
                                    e.get('menu') === `${sidebarData.menu.id}-${sub.id}` &&
                                    categories.findIndex(
                                      (c) =>
                                        c === `${sidebarData.menu.id}-${sub.id}-${e.get('label')}`
                                    ) === -1
                                  ) {
                                    categories.push(
                                      `${sidebarData.menu.id}-${sub.id}-${e.get('label')}`
                                    );
                                    tempBlocks.push(e);
                                  }
                                });

                                const returnComponent = (
                                  <>
                                    <div
                                      className="d-flex align-items-center px-50 border-bottom border-top"
                                      onClick={() => {
                                        handleOnclick(index);
                                      }}
                                    >
                                      <div
                                        hidden={
                                          OpenCategory.index == index ? OpenCategory.value : false
                                        }
                                      >
                                        <IoMdArrowDropright color="black" size={18} />
                                      </div>
                                      <div
                                        hidden={
                                          OpenCategory.index == index ? !OpenCategory.value : true
                                        }
                                      >
                                        <IoMdArrowDropdown color="black" size={18} />
                                      </div>
                                      <div className="ps-50">
                                        <h5 className="submenu-item ps-0">{sub.name}</h5>
                                      </div>
                                    </div>
                                    {tempBlocks.map((b, ix) => {
                                      return (
                                        <Collapse
                                          isOpen={
                                            OpenCategory.index == index ? OpenCategory.value : false
                                          }
                                        >
                                          <div
                                            key={ix}
                                            className={
                                              selectedCategory ===
                                              `${sidebarData.menu.id}-${sub.id}-${b.get('label')}`
                                                ? 'selected-submenu-category'
                                                : 'submenu-category'
                                            }
                                            onClick={() => {
                                              setSelectedCategory(
                                                `${sidebarData.menu.id}-${sub.id}-${b.get('label')}`
                                              );
                                            }}
                                          >
                                            {b.get('label')}
                                          </div>
                                        </Collapse>
                                      );
                                    })}
                                  </>
                                );
                                return returnComponent;
                              })}
                            </div>
                            <div className="element-container">
                              {blockManager?.blocks
                                ?.filter((e) => e.get('category').id === selectedCategory)
                                .map((b, ix) => {
                                  return (
                                    <div className="element" key={ix}>
                                      <img
                                        width="280"
                                        src={`https://storage.googleapis.com/mymember-storage/website-builder/menu-image/${b.get(
                                          'media'
                                        )}`}
                                      />
                                      <div
                                        draggable
                                        onDragStart={(e) => {
                                          e.stopPropagation();
                                          blockManager.dragStart(b, e.nativeEvent);
                                        }}
                                        onDragEnd={(e) => {
                                          e.stopPropagation();
                                          if (b.get('label') === 'New Form') {
                                            createForm();
                                          }
                                          if (b.get('label') === 'Add Existing Form') {
                                            setAddFormMdl(true);
                                          }
                                          blockManager.dragStop(false);
                                        }}
                                      ></div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        )}
                      {sidebarData.menu.id === 'theme' && (
                        <>
                          {!themeEditing && (
                            <div className="theme-container p-1">
                              <div className="color-container" style={{ width: '200px' }}>
                                <div
                                  className="submenu-item d-flex justify-content-between align-items-center"
                                  onClick={(e) => {
                                    setSelectedSubMenu('colors');
                                  }}
                                >
                                  <span className="fw-bold fs-6">COLORS</span>
                                  <span>
                                    <ChevronRight size={20} color="black" />
                                  </span>
                                </div>
                                <div className="d-flex flex-wrap align-items-center">
                                  {formTheme &&
                                    formTheme.colors &&
                                    formTheme.colors.map((_color) => {
                                      return (
                                        <div
                                          className="theme-color-panel d-flex justify-content-around align-items-center"
                                          style={{
                                            border:
                                              selectedColor?.name === _color?.name
                                                ? '1px solid red'
                                                : 'none'
                                          }}
                                          onClick={(e) => {
                                            setSelectedColor(_color);
                                            setSelectedSubMenu('colors');
                                          }}
                                        >
                                          <Input
                                            type="color"
                                            value={_color?.value}
                                            className="color-picker-element"
                                            onChange={(e) => {
                                              handleThemeColor(e.target.value, _color);
                                            }}
                                          />
                                        </div>
                                      );
                                    })}
                                  <div onClick={(e) => addNewThemeColor()}>
                                    <Plus size={20} />
                                  </div>
                                </div>
                              </div>
                              <div className="buttons-container mt-1">
                                <div
                                  className="submenu-item d-flex justify-content-between align-items-center py-1"
                                  onClick={(e) => {
                                    setSelectedSubMenu('buttons');
                                    setThemeEditing(true);
                                  }}
                                >
                                  <span className="fw-bold fs-6">BUTTONS</span>
                                  <span>
                                    <IoMdArrowDropright size={20} color="black" />
                                  </span>
                                </div>
                                <div className="d-flex justify-content-around align-items-center buttons-list">
                                  {formTheme &&
                                    formTheme.buttons &&
                                    formTheme.buttons.map((_button) => {
                                      return (
                                        <button
                                          style={{ ..._button.attributes }}
                                          onClick={(e) => {
                                            setSelectedButton(_button);
                                            setSelectedSubMenu('buttons');
                                            setThemeEditing(true);
                                          }}
                                        >
                                          {_button.type}
                                        </button>
                                      );
                                    })}
                                </div>
                                <div></div>
                              </div>
                              <div className="text-container mt-1">
                                <div className="submenu-item d-flex justify-content-between align-items-center py-1">
                                  <span className="fw-bold fs-6">TEXT</span>
                                  <span>
                                    <IoMdArrowDropright size={20} color="black" />
                                  </span>
                                </div>
                                <div className="text-elements">
                                  {formTheme &&
                                    formTheme.fonts &&
                                    formTheme.fonts.map((_font) => {
                                      return (
                                        <div
                                          className="d-flex align-items-center cursor-pointer"
                                          style={{ marginBottom: '10px' }}
                                          onClick={(e) => {
                                            setSelectedFont(_font);
                                            setSelectedSubMenu('text');
                                            setThemeEditing(true);
                                          }}
                                        >
                                          <div>{_font.type}</div>
                                          <div
                                            className="ms-1 fw-bold"
                                            style={{ ..._font.attributes }}
                                          >
                                            {_font.attributes.fontFamily}{' '}
                                            {_font.attributes.fontSize.slice(0, -2)}
                                          </div>
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                              <div className="images-container">
                                <div
                                  className="submenu-item d-flex justify-content-between align-items-center py-1"
                                  onClick={(e) => {
                                    setSelectedSubMenu('images');
                                    setThemeEditing(true);
                                  }}
                                >
                                  <span className="fw-bold fs-6">IMAGES</span>
                                  <span>
                                    <IoMdArrowDropright size={20} color="black" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                          {themeEditing && (
                            <>
                              {selectedSubMenu === 'text' && (
                                <TextTheme
                                  store={store}
                                  selectedColor={selectedColor}
                                  selectedFont={selectedFont}
                                  setSelectedFont={setSelectedFont}
                                />
                              )}
                              {selectedSubMenu === 'images' && (
                                <ImageTheme
                                  store={store}
                                  selectedColor={selectedColor}
                                  selectedImage={selectedImage}
                                  setSelectedImage={setSelectedImage}
                                />
                              )}
                              {selectedSubMenu === 'buttons' && (
                                <ButtonTheme
                                  store={store}
                                  selectedColor={selectedColor}
                                  selectedButton={selectedButton}
                                  setSelectedButton={setSelectedButton}
                                />
                              )}
                            </>
                          )}
                        </>
                      )}
                      {sidebarData.menu.id === 'assets' && (
                        <div className="submenu-and-element d-flex">
                          <div className="submenu-list pt-0">
                            {sidebarData?.menu?.subMenu?.map((sub, index) => {
                              const categories = [];
                              const tempBlocks = [];
                              editor?.BlockManager.blocks.map((e) => {
                                if (
                                  e.get('menu') === `${sidebarData.menu.id}-${sub.id}` &&
                                  categories.findIndex(
                                    (c) =>
                                      c === `${sidebarData.menu.id}-${sub.id}-${e.get('label')}`
                                  ) === -1 &&
                                  user.id === e.get('user')
                                ) {
                                  categories.push(
                                    `${sidebarData.menu.id}-${sub.id}-${e.get('label')}`
                                  );
                                  tempBlocks.push(e);
                                }
                              });

                              const returnComponent = (
                                <>
                                  <div
                                    className="d-flex align-items-center px-50 border-bottom border-top"
                                    onClick={() => {
                                      handleOnclick(index);
                                    }}
                                  >
                                    <div
                                      hidden={
                                        OpenCategory.index == index ? OpenCategory.value : false
                                      }
                                    >
                                      <IoMdArrowDropright color="black" size={18} />
                                    </div>
                                    <div
                                      hidden={
                                        OpenCategory.index == index ? !OpenCategory.value : true
                                      }
                                    >
                                      <IoMdArrowDropdown color="black" size={18} />
                                    </div>
                                    <div className="ps-50">
                                      <h5 className="submenu-item ps-0">{sub.name}</h5>
                                    </div>
                                  </div>
                                  {tempBlocks.map((b, ix) => {
                                    return (
                                      <Collapse
                                        isOpen={
                                          OpenCategory.index == index ? OpenCategory.value : false
                                        }
                                      >
                                        <div
                                          key={ix}
                                          className={
                                            selectedCategory ===
                                            `${sidebarData.menu.id}-${sub.id}-${b.get('label')}`
                                              ? 'd-flex justify-content-between align-items-center selected-submenu-category'
                                              : 'd-flex justify-content-between align-items-center submenu-category'
                                          }
                                          onClick={() => {
                                            setSelectedCategory(
                                              `${sidebarData.menu.id}-${sub.id}-${b.get('label')}`
                                            );
                                          }}
                                        >
                                          <div>{b.get('label')}</div>
                                          <div className="assets-action">
                                            <UncontrolledDropdown>
                                              <DropdownToggle tag="div" className="btn btn-sm">
                                                <MoreVertical
                                                  size={14}
                                                  className="cursor-pointer"
                                                />
                                              </DropdownToggle>
                                              <DropdownMenu positionFixed={true}>
                                                <DropdownItem
                                                  tag="span"
                                                  className="w-100"
                                                  onClick={() => handleRename(b)}
                                                >
                                                  <Edit size={14} className="me-50" />
                                                  <span className="align-middle">Rename</span>
                                                </DropdownItem>
                                                <DropdownItem
                                                  tag="span"
                                                  className="w-100"
                                                  onClick={() => handleRemove(b)}
                                                >
                                                  <Trash2 size={14} className="me-50" />
                                                  <span className="align-middle">Delete</span>
                                                </DropdownItem>
                                              </DropdownMenu>
                                            </UncontrolledDropdown>
                                          </div>
                                        </div>
                                      </Collapse>
                                    );
                                  })}
                                </>
                              );
                              return returnComponent;
                            })}
                          </div>
                          <div className="element-container">
                            {blockManager?.blocks
                              ?.filter((e) => e.get('category').id === selectedCategory)
                              .map((b, ix) => {
                                if (b.get('menu') == `assets-videos`) {
                                  return (
                                    <div key={ix} className="p-1 border-bottom">
                                      <video
                                        style={{
                                          maxWidth: '100%',
                                          width: '320px',
                                          margin: '0 auto'
                                        }}
                                        playsInline
                                        loop
                                        muted
                                        controls
                                        alt="All the devices"
                                        src={b.get('media')}
                                      />
                                      <div
                                        draggable
                                        onDragStart={(e) => {
                                          e.stopPropagation();
                                          blockManager.dragStart(b, e.nativeEvent);
                                        }}
                                        onDragEnd={(e) => {
                                          e.stopPropagation();
                                          if (b.get('label') === 'New Form') {
                                            createForm();
                                          }
                                          if (b.get('label') === 'Add Existing Form') {
                                            setAddFormMdl(true);
                                          }
                                          blockManager.dragStop(false);
                                        }}
                                      ></div>
                                    </div>
                                  );
                                } else if (b.get('menu') == `assets-images`) {
                                  return (
                                    <div key={ix} className="p-1 border-bottom">
                                      <img width="280" src={b.get('media')} />
                                      <div
                                        draggable
                                        onDragStart={(e) => {
                                          e.stopPropagation();
                                          blockManager.dragStart(b, e.nativeEvent);
                                        }}
                                        onDragEnd={(e) => {
                                          e.stopPropagation();
                                          if (b.get('label') === 'New Form') {
                                            createForm();
                                          }
                                          if (b.get('label') === 'Add Existing Form') {
                                            setAddFormMdl(true);
                                          }
                                          blockManager.dragStop(false);
                                        }}
                                      ></div>
                                    </div>
                                  );
                                } else if (b.get('menu') == `assets-audios`) {
                                  return (
                                    <div key={ix} className="p-1 border-bottom">
                                      <div>
                                        <audio controls autoplay muted>
                                          <source src={b.get('media')} type="audio/ogg" />
                                          Your browser does not support the audio element.
                                        </audio>
                                      </div>
                                      <div
                                        draggable
                                        onDragStart={(e) => {
                                          e.stopPropagation();
                                          blockManager.dragStart(b, e.nativeEvent);
                                        }}
                                        onDragEnd={(e) => {
                                          e.stopPropagation();
                                          if (b.get('label') === 'New Form') {
                                            createForm();
                                          }
                                          if (b.get('label') === 'Add Existing Form') {
                                            setAddFormMdl(true);
                                          }
                                          blockManager.dragStop(false);
                                        }}
                                      ></div>
                                    </div>
                                  );
                                }
                              })}
                          </div>
                        </div>
                      )}
                      {sidebarData.menu.id === 'media' && (
                        <div className="submenu-and-element d-flex">
                          <div className="submenu-list pt-0">
                            {sidebarData?.menu?.subMenu?.map((sub, index) => {
                              const categories = [];
                              const tempBlocks = [];
                              editor?.BlockManager.blocks.map((e) => {
                                if (
                                  e.get('menu') === `${sidebarData.menu.id}-${sub.id}` &&
                                  categories.findIndex(
                                    (c) =>
                                      c === `${sidebarData.menu.id}-${sub.id}-${e.get('label')}`
                                  ) === -1
                                ) {
                                  categories.push(
                                    `${sidebarData.menu.id}-${sub.id}-${e.get('label')}`
                                  );
                                  tempBlocks.push(e);
                                }
                              });

                              const returnComponent = (
                                <>
                                  <div
                                    className="d-flex align-items-center px-50 border-bottom border-top"
                                    onClick={() => {
                                      handleOnclick(index);
                                    }}
                                  >
                                    {sub.name == 'Upload Media' ? (
                                      <div className="d-flex pt-1">
                                        <div
                                          hidden={
                                            OpenCategory.index == index ? OpenCategory.value : false
                                          }
                                        >
                                          <IoMdArrowDropright size={18} />
                                        </div>
                                        <div
                                          hidden={
                                            OpenCategory.index == index ? !OpenCategory.value : true
                                          }
                                        >
                                          <IoMdArrowDropdown size={18} />
                                        </div>
                                        <div className="px-50 ">
                                          <h5 className="submenu-item px-0 pt-0 mt-0">
                                            {sub.name}
                                          </h5>
                                          <Collapse
                                            isOpen={
                                              OpenCategory.index == index
                                                ? OpenCategory.value
                                                : false
                                            }
                                          >
                                            <div className="mb-1">
                                              <Button
                                                color="primary"
                                                outline
                                                className="w-100"
                                                size="sm"
                                                onClick={() => {
                                                  setOpenUploadModal(!openUploadModal);
                                                }}
                                              >
                                                Upload
                                              </Button>
                                            </div>
                                          </Collapse>
                                        </div>
                                      </div>
                                    ) : (
                                      <>
                                        <div
                                          hidden={
                                            OpenCategory.index == index ? OpenCategory.value : false
                                          }
                                        >
                                          <IoMdArrowDropright size={18} />
                                        </div>
                                        <div
                                          hidden={
                                            OpenCategory.index == index ? !OpenCategory.value : true
                                          }
                                        >
                                          <IoMdArrowDropdown size={18} />
                                        </div>
                                        <div className="ps-50">
                                          <h5 className="submenu-item ps-0">{sub.name}</h5>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                  {tempBlocks.map((b, ix) => {
                                    return (
                                      <Collapse
                                        isOpen={
                                          OpenCategory.index == index ? OpenCategory.value : false
                                        }
                                      >
                                        <div
                                          key={ix}
                                          className={
                                            selectedCategory ===
                                            `${sidebarData.menu.id}-${sub.id}-${b.get('label')}`
                                              ? 'selected-submenu-category'
                                              : 'submenu-category'
                                          }
                                          onClick={() => {
                                            setSelectedCategory(
                                              `${sidebarData.menu.id}-${sub.id}-${b.get('label')}`
                                            );
                                          }}
                                        >
                                          {b.get('label')}
                                        </div>
                                      </Collapse>
                                    );
                                  })}
                                </>
                              );
                              return returnComponent;
                            })}
                          </div>
                          <div className="element-container">
                            {blockManager?.blocks
                              ?.filter((e) => e.get('category').id === selectedCategory)
                              .map((b, ix) => {
                                return (
                                  <div className="element" key={ix}>
                                    {b.get('mediaType').startsWith('video') && (
                                      <>
                                        <video width="280" controls>
                                          <source src={b.get('media')} type={b.get('mediaType')} />
                                          Your browser does not support HTML video.
                                        </video>
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
                                        ></div>
                                      </>
                                    )}

                                    {b.get('mediaType').startsWith('audio') && (
                                      <div style={{ width: 140, position: 'relative' }}>
                                        <div style={{ width: 140 }}>
                                          <img
                                            width="140"
                                            src={require('@src/assets/images/audio.png').default}
                                          />
                                          <div>{b.mediaName}</div>
                                        </div>
                                        <div
                                          style={{
                                            position: 'absolute',
                                            top: 0,
                                            width: 140,
                                            height: 150
                                          }}
                                          draggable
                                          onDragStart={(e) => {
                                            e.stopPropagation();
                                            blockManager.dragStart(b, e.nativeEvent);
                                          }}
                                          onDragEnd={(e) => {
                                            e.stopPropagation();
                                            blockManager.dragStop(false);
                                          }}
                                        ></div>
                                      </div>
                                    )}

                                    {b.get('mediaType').startsWith('image') && (
                                      <>
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
                                        ></div>
                                      </>
                                    )}
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      )}
                      {sidebarData.menu.id === 'cms' && (
                        <>
                          {store?.form?.addedCms && (
                            <div className="cms-element" style={{ width: 350 }}>
                              {sidebarData?.menu?.subMenu?.map((sub, ix) => {
                                return (
                                  <div className="my-1" key={ix}>
                                    {sub.menu && (
                                      <h5 className="ps-1 pt-2" color="black">
                                        {sub.menu}
                                      </h5>
                                    )}
                                    {sub.data.map((e, ei) => {
                                      return (
                                        <div
                                          key={ei}
                                          className="d-flex align-items-center px-2 py-1 cms-menu-item"
                                          onClick={() => {
                                            if (e.id === 'add-preset') {
                                              toggleAddPresetMdl();
                                            }
                                            if (e.id === 'create-collection') {
                                              createColMdlToggle();
                                            }
                                            if (e.id === 'dataset') {
                                              createDatasetToggle();
                                            }
                                            if (e.id === 'form-dataset') {
                                              createDatasetToggle({ isFormDataset: true });
                                            }
                                            if (e.id === 'rich-content') {
                                            }
                                          }}
                                        >
                                          <img
                                            className="me-1"
                                            width="70"
                                            height="70"
                                            src={e.icon}
                                          />
                                          <div>
                                            <div
                                              style={{
                                                color: 'black',
                                                fontWeight: 500,
                                                fontSize: 15
                                              }}
                                            >
                                              {e.title}
                                            </div>
                                            <div style={{ fontSize: 13 }}>{e.description}</div>
                                          </div>
                                          <div
                                            style={{ width: 50, height: 50 }}
                                            className="d-flex align-items-center"
                                          >
                                            {e.id === 'add-preset' ||
                                            e.id === 'create-collection' ? (
                                              <CiCircleChevRight
                                                className="ms-1 cms-menu-icon"
                                                size={27}
                                              />
                                            ) : (
                                              <CiCirclePlus
                                                className="ms-1 cms-menu-icon"
                                                size={27}
                                              />
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          {!store?.form?.addedCms && (
                            <div className="cms-element d-flex flex-column align-items-center">
                              <img width="350" src={cmsimg} />
                              <h2 className="mt-3">Use the CMS</h2>
                              <h4 className="mb-3">Easily manage your site content</h4>
                              <div>
                                <h6 className="mt-1">
                                  <Check size={20} color="green" /> Set up content collections
                                </h6>
                                <h6 className="mt-1">
                                  <Check size={20} color="green" /> Create 100s of dynamic pages
                                </h6>
                                <h6 className="mt-1">
                                  <Check size={20} color="green" /> Collect info from site visitors
                                </h6>
                              </div>
                              <Button
                                color="primary"
                                className="round mt-3"
                                onClick={() => {
                                  dispatch(updateFormAction(store.form._id, { addedCms: true }));
                                }}
                              >
                                Add to Site
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                      {sidebarData.menu.id === 'blog' && (
                        <div className="submenu-and-element d-flex">
                          <div className="submenu-list pt-0">
                            {sidebarData?.menu?.subMenu?.map((sub) => {
                              const returnComponent = (
                                <>
                                  <div
                                    className="submenu-item cursor-pointer"
                                    onClick={() => scrollToTarget(sub.name)}
                                  >
                                    {sub.name}
                                  </div>
                                </>
                              );
                              return returnComponent;
                            })}
                          </div>
                          <div className="element-container">
                            {sidebarData.menu.id === 'blog' &&
                              sidebarData?.menu?.subMenu?.map((sub) => {
                                let tempblocks = [];
                                blockManager?.blocks
                                  ?.filter((e) => e.get('label') === sub.name)
                                  .map((b) => {
                                    tempblocks.push(b);
                                  });
                                const returnComponent = (
                                  <>
                                    <div className="fw-bold text-black p-2" id={sub.name}>
                                      {sub.name}
                                    </div>
                                    {sub.name != 'RSS Button' && (
                                      <div className="">
                                        {tempblocks.map((b, bi) => {
                                          return (
                                            <div className="element" key={bi}>
                                              <img width="280" src={b.get('media')} />
                                              {/* <iframe srcDoc={b.get('content')}/> */}
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
                                              ></div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )}

                                    {sub.name === 'RSS Button' && (
                                      <div className="d-flex">
                                        {tempblocks &&
                                          tempblocks.map((b, bi) => {
                                            return (
                                              <div
                                                key={bi}
                                                className="element"
                                                style={{ marginBottom: '10px' }}
                                              >
                                                <img width="40" src={b.get('media')} />
                                                {/* <iframe srcDoc={b.get('content')}/> */}
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
                                                ></div>
                                              </div>
                                            );
                                          })}
                                      </div>
                                    )}
                                  </>
                                );
                                return returnComponent;
                              })}
                          </div>
                        </div>
                      )}
                      {sidebarData.menu.id === 'store' && (
                        <div className="submenu-and-element d-flex">
                          <div className="submenu-list pt-0">
                            {sidebarData?.menu?.subMenu?.map((sub) => {
                              const returnComponent = (
                                <>
                                  <div
                                    className="submenu-item cursor-pointer"
                                    onClick={() => scrollToTarget(sub.menu)}
                                  >
                                    {sub.menu}
                                  </div>
                                </>
                              );
                              return returnComponent;
                            })}
                          </div>
                          <div className="store-add">
                            {editor?.BlockManager.blocks
                              .filter((e) => e.get('category') === 'Store')
                              .map((block) => (
                                <div
                                  key={block.getId()}
                                  draggable
                                  className="store-item cursor-pointer"
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
                                  <div className="text-sm w-full mt-1" title={block.getLabel()}>
                                    {block.getLabel()}
                                    <span class="info-icon-tooltip">
                                      <svg
                                        width="18"
                                        height="18"
                                        preserveAspectRatio="xMidYMid"
                                        viewBox="1.5 1.5 18 18"
                                        class="symbol symbol-infoIcon"
                                      >
                                        <g id="infoIconSvg">
                                          <circle
                                            cx="10.5"
                                            cy="10.5"
                                            r="8"
                                            fill="transparent"
                                          ></circle>
                                          <path
                                            id="path-1"
                                            fill-rule="evenodd"
                                            d="M10.5 19.5a9 9 0 01-9-9 9 9 0 019-9 9 9 0 019 9 9 9 0 01-9 9zm-8-9c0 4.411 3.589 8 8 8s8-3.589 8-8-3.589-8-8-8-8 3.589-8 8zm10 5h-4l1-2v-3h-1l1-2h2v5l1 2zm-3-10h2v2h-2v-2z"
                                          ></path>
                                        </g>
                                      </svg>
                                      <div className="tooltip-content">
                                        <div className="tooltip-title">{block.getLabel()}</div>
                                        <div className="tooltip-text">
                                          {block.getContent().text}
                                        </div>
                                      </div>
                                    </span>
                                  </div>
                                  <img
                                    src={`/assets/images/elements/${block.getMedia()}.png`}
                                    style={{ marginLeft: '14px', marginRight: '14px' }}
                                  />
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                      {sidebarData.menu.id === 'content' && (
                        <ContentSideBar store={store} openCreateModalToggle={createColMdlToggle} />
                      )}
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
          )}
          {selectedMainNav === 'pages' && (
            <Collapse
              isOpen={addSideBarOpen}
              horizontal={true}
              delay={{ show: 10, hide: 20 }}
              style={{ height: '100%' }}
            >
              <div style={{ height: '100%', overflow: 'scroll' }}>
                <div className="sidebar-header px-1">
                  <span className="px-1 fs-5 fw-bolder text-black">{'Pages'}</span>
                  <span>
                    <X
                      size={20}
                      onClick={(e) => {
                        setAddSideBarOpen(false);
                      }}
                      style={{ cursor: 'hand' }}
                    />
                  </span>
                </div>
                <PageSidebar id={id} store={store} editor={editor} setEditor={setEditor} />
              </div>
            </Collapse>
          )}
          {selectedMainNav === 'cms' && (
            <Collapse
              isOpen={addSideBarOpen}
              horizontal={true}
              delay={{ show: 10, hide: 20 }}
              style={{ height: '100%' }}
            >
              <div className="h-100">
                <CMS
                  store={store}
                  setAddSideBarOpen={setAddSideBarOpen}
                  openEditCollection={openEditCollection}
                  setOpenEditCollection={setOpenEditCollection}
                  openCreateModal={openCreateColMdl}
                  openCreateModalToggle={createColMdlToggle}
                  openAddPresetMdl={openAddPresetMdl}
                  toggleAddPresetMdl={toggleAddPresetMdl}
                  setSelectedMainNav={setSelectedMainNav}
                  sidebarData={sidebarData}
                  setSidebarData={setSidebarData}
                />
              </div>
            </Collapse>
          )}
        </PerfectScrollbar>
      </div>
      <div className="w-100 border">
        {isLoading ? (
          <div
            className="d-flex  justify-content-center mb-2 mt-2"
            style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 10 }}
          >
            <Spinner color="secondary">Loading...</Spinner>
          </div>
        ) : (
          <></>
        )}
        <div id="editor"></div>
      </div>
      {/* {isStoreLoading ? (
        <div className="loadingLayer">
          <div
            className="d-flex  justify-content-center mb-2 mt-2"
            style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 10 }}
          >
            <Spinner color="secondary">Loading...</Spinner>
          </div>
        </div>
      ) : (
        <></>
      )} */}
      <div className="property-sidebar" hidden={rsidebarOpen ? false : true}>
        <PerfectScrollbar
          className="scrollable-content"
          options={{ suppressScrollX: true }}
          style={{ height: `calc(100vh - 120px)` }}
        >
          <div className="d-flex">
            <div className="col-6  text-center text-dark " hidden={tab == 'Layers' ? true : false}>
              <Button
                color={tab === 'Styles' ? 'primary' : 'secondary'}
                className="w-100 rounded-0"
                onClick={() => {
                  setTab('Styles');
                }}
              >
                <CgStyle size={14} /> Styles
              </Button>
            </div>
            <div className="col-6 text-center  text-dark" hidden={tab == 'Layers' ? true : false}>
              <Button
                color={tab === 'Settings' ? 'primary' : 'secondary'}
                className="w-100 rounded-0"
                onClick={() => {
                  setTab('Settings');
                }}
              >
                <Settings size={14} /> Settings
              </Button>
            </div>
          </div>
          <div style={{ display: tab === 'Styles' ? 'block' : 'none' }}>
            <div id="selector-manager-container" />
            <div id="style-manager-container" />
          </div>
          <div style={{ display: tab === 'Layers' ? 'block' : 'none' }}>
            <div id="layer-manager-container" />
          </div>
          <div style={{ display: tab === 'Settings' ? 'block' : 'none' }}>
            <div id="trait-manager-container" />
          </div>
        </PerfectScrollbar>
      </div>
      <ImportModal editor={editor} setEditor={setEditor} open={open} toggle={toggle} />
      <PublishModal publishUrl={publishUrl} isOpen={isPublishModal} toggle={togglePublish} />
      <AddElementModal
        editor={editor}
        setEditor={setEditor}
        openAddElementMdl={openAddElementMdl}
        setOpenAddElementMdl={setOpenAddElementMdl}
      />
      <UploadMediaModal
        editor={editor}
        setEditor={setEditor}
        openUploadModal={openUploadModal}
        setOpenUploadModal={setOpenUploadModal}
      />
      <RenameModal store={store} isOpen={renameMdl} toggle={_toggleRename} />
      <CreateFormModal open={createMdl} store={store} dispatch={dispatch} />
      <SelectFormModal
        open={addFormMdl}
        store={store}
        toggle={selectFormToggle}
        saveFormBlock={saveFormBlock}
      />
      <DuplicateModal store={store} isOpen={duplicateMdl} toggle={_toggleDuplicate} />
      <InvitationModal store={store} isOpen={isinvite} toggle={setIsInvite} />
      <Modal
        isOpen={formeditorMdl}
        centered
        className="form-builder-modal"
        fullscreen
        scrollable
        style={{ overflowX: 'hidden' }}
      >
        <FormEditorModal
          toggle={(e) => setFormEditorMdl(e)}
          store={store}
          saveFormBlock={saveFormBlock}
        />
      </Modal>
      <CreateCollectionModal
        store={store}
        open={openCreateColMdl}
        toggle={createColMdlToggle}
        editCollectionToggle={toggleOpenEditCollection}
      />
      <CreateDatasetModal
        store={store}
        mdlData={openCreateDatasetMdl}
        toggle={createDatasetToggle}
      />
      <EditCollectionModal
        store={store}
        openCollection={openEditCollection}
        setOpenEditCollection={setOpenEditCollection}
        toggle={toggleOpenEditCollection}
      />
      <ConnectCollectionModal
        store={store}
        connectData={connectData}
        setConnectData={setConnectData}
        getProductDataset={getProductDataset}
        datasetConnect={datasetConnect}
        setDatasetConnect={setDatasetFields}
        handleSelectChangeDataSet={handleSelectChangeDataSet}
        selectedDataSet={selectedDataSet}
        setSelectedDataSet={setSelectedDataSet}
        selectedCmp={selectedCmp}
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
        createDatasetToggle={createDatasetToggle}
      />
      <CreateAssetModal
        store={store}
        isOpen={openCreateAssetMdl}
        editor={editor}
        toggle={setOpenCreateAssetMdl}
      />
      <RenameAssetModal
        store={store}
        webElement={selectedWebElement}
        isOpen={openRenameAssetMdl}
        editor={editor}
        toggle={setOpenRenameAssetMdl}
      />
      <EditProductsModal
        store={store}
        showEditProductsModal={showEditProductsModal}
        setShowEditProductsModal={setShowEditProductsModal}
      />
      <ProductsSettingModal
        store={store}
        storeProducts={storeProducts}
        showProductsSettingModal={showProductsSettingModal}
        setShowProductsSettingModal={setShowProductsSettingModal}
        selectedProductCategory={selectedProductCategory}
        handleChangeSelectedProductCategory={handleChangeSelectedProductCategory}
        selectedCmp={selectedCmp}
      />
      <ProductPageSettingModal
        store={store}
        storeProducts={storeProducts}
        showProductPageSettingModal={showProductPageSettingModal}
        setShowProductPageSettingModal={setShowProductPageSettingModal}
        selectedCmp={selectedCmp}
      />
      <CustomerDatasetModal
        showCustomerDatasetModal={showCustomerDatasetModal}
        setShowCustomerDatasetModal={setShowCustomerDatasetModal}
        customerCollectId={customerCollectId}
      />
      <ConnectProductDataSetModal
        store={store}
        storeProducts={storeProducts}
        showProductDataSetModal={showProductDataSetModal}
        setShowProductDataSetModal={setShowProductDataSetModal}
        modelsToConnect={modelsToConnect}
        datasetConnect={datasetConnect}
        setDatasetFields={setDatasetFields}
      />
      <AddCartButtonModal
        store={store}
        storeProducts={storeProducts}
        showAddCartButtonModal={showAddCartButtonModal}
        setShowAddCartButtonModal={setShowAddCartButtonModal}
        productId={cartProductId}
        handleChangeProductId={handleChangeProductId}
      />
      <BlogModal store={store} isOpen={isblog} toggle={toggleBlog} />
      <RoleModal store={store} isOpen={roleMdl} toggle={toggleRoleMdl} />
      <AddPresetModal
        store={store}
        mdlData={openAddPresetMdl}
        toggle={toggleAddPresetMdl}
        editCollectionToggle={toggleOpenEditCollection}
      />
    </div>
  );
}
