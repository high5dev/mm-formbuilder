import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bold, X, Trash2, Check, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Plus,  Edit,
  MoreVertical, Settings } from 'react-feather';
import { CgStyle } from 'react-icons/cg';
import { IoMdArrowDropright,IoMdArrowDropdown  } from "react-icons/io";
import { RiQuestionMark } from 'react-icons/ri';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Link, useHistory, useParams } from 'react-router-dom';
import { SlArrowDown } from "react-icons/sl";
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
  Input
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
  createCustomerCollectAction,
  getWaitingClientsAction,
  confirmCustomerDatasetAction,
  updateFormAction,
  getGoogleFontsAction,
  createShopPagesAction
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
import { ImCheckmark, ImCross } from "react-icons/im";

export default function Editor(
  {
  isblog,
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
}) 
{
  const [openCreateForm, setOpenCreateForm] = useState();
  const { id } = useParams();
  const form = store.form;
  const formTheme=store.formTheme;
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
  const [themeEditing, setThemeEditing]=useState(false);
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
  const [selectedColor, setSelectedColor]=useState();
  const [selectedButton, setSelectedButton]=useState();
  const [selectedFont, setSelectedFont]=useState();
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
    if(store.webCollections) {
      store.webCollections.map((collection) => {
        if(collection.category == "store") {
          setStoreProducts(collection);
          return;
        }
      })
    }
  }, [store.webCollections])

  const [productDataset, setProductDataset] = useState({});
  const [datasetConnect, setDatasetConnect] = useState([]);
  const [selectedDataSet, setSelectedDataSet] = useState({});
  const [showProductDataSetModal, setShowProductDataSetModal] = useState(false);
  const [showEditProductsModal, setShowEditProductsModal] = useState(false);
  const [showProductsSettingModal, setShowProductsSettingModal] = useState(false);
  const [showProductPageSettingModal, setShowProductPageSettingModal] = useState(false);
  const [showAddCartButtonModal, setShowAddCartButtonModal] = useState(false);
  const [cartProductId, setCartProductId] = useState("");
  const [customerDataset, setCustomerDataset] = useState({ type: "", collectionId: "" });
  const [showCustomerDatasetModal, setShowCustomerDatasetModal] = useState(false);
  const [cdCheckedItems, setCDCheckedItems] = useState({});
  const [customerCollectId, setCustomerCollectId] = useState("");
  const toggleCreateForm = () => setOpenCreateForm(!openCreateForm);

  const loadedRef = useRef();
  const storeRef = useRef();
  const productRef = useRef();
  loadedRef.current = isStoreLoading;
  storeRef.current = store;
  productRef.current = storeProducts;

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
              element.set(
                'content',
                storeProducts?.values[index][data[existingItemIndex].name]
              );
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
  }

  const handleCDCheckboxChange = (field, isChecked) => {
    setCDCheckedItems({
      ...cdCheckedItems,
      [`${customerDataset.type}-${customerDataset.collectionId}`]: {
        ...cdCheckedItems[`${customerDataset.type}-${customerDataset.collectionId}`],
        [field]: isChecked
      }
    })
  }

  const collectFromClient = async () => {
    const data = await dispatch(createCustomerCollectAction({
      websiteId: store?.form?._id,
      fields: cdCheckedItems[`${customerDataset.type}-${customerDataset.collectionId}`],
      type: customerDataset.type,
      collectionId: customerDataset.collectionId
    }));
    setCustomerCollectId(data.data._id);
    setShowCustomerDatasetModal(true);
  }

  const handleConfirmCustomerDataset = (id, payload) => {
    dispatch(confirmCustomerDatasetAction(id, payload));
  }

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
  }
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

  const addNewThemeColor=()=>{
    if(formTheme?._id && formTheme?.colors){
      const themeId=formTheme._id;
      const colors=formTheme.colors;
      const payload={
        name:'Color #'+colors.length.toString(),
        value:"#000000",
      };
      dispatch(addWebBuilderThemeColorAction(themeId, payload)).then(res=>{
        if(res){
          setSelectedSubMenu('colors');
          setThemeEditing(true);
        }
      })

    }
  }




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
    dispatch(getChildFormsAction(store?.form?._id));
    dispatch(getBlogsAction(store?.form?._id));
    dispatch(getWebsiteAction(id)).then((res) => {
      if (res) {
        dispatch(setCurrentPage(res.find(e => e._id === page?._id)));
      }
    });
    const gjsEditor = grapesjs.init({
      container: '#editor',
      height: window.innerHeight - 117,
      plugins: [basicBlockPlugin, (editor) => webBuilderPlugin(editor), websitePlugin],
      fromElement: 1,
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
        // componentFirst: true,
        appendTo: document.querySelector('#selector-manager-container')
      },
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
      if(!component) return;
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
    gjsEditor.on('block:drag:start', function (model) { });
    gjsEditor.on('block:drag:stop', function (model) {
      setSidebarData({
        ...sidebarData,
        isOpen: false
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
      if(defaultToolbar.filter((tlb) => tlb.id === new_toolbar_id)){
        defaultToolbar.unshift({
          id: `RightSidebar-new_toolbar_id`,
          command: 'RightSidebar-component',
          label: settingLabel
        });
      }
      
      setSelectedCmp(cmp);
      console.log('cmp-------------------', cmp);
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
        console.log('connection ---------------------');
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
      setTab('Settings');
      
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

    rte.add('fontFamily', {
      icon: `
          <select class="gjs-field" style="width: 100px">
              ${fontFamilies.map(font => `<option value="${font.value}">${font.name}</option>`).join('')}
          </select>
      `,
      event: 'change',
      result: (rte, action) => {
        const fontFamilyValue = action.btn.childNodes[1].value;
        rte.exec('fontName', fontFamilyValue);
      },
      update: (rte, action) => {
        const value = rte.doc.queryCommandValue("fontName");
        console.log(value);
        if (value) {
          action.btn.firstChild.value = value.replace(/['"]+/g, ''); // Remove quotes
        }
      }
    });

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
          const hex = rgbValues.map(val => val.toString(16).padStart(2, '0')).join('');
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
              if (elType.id === 'repeater' || elType.id === 'gallery') {
                toolbar.unshift({
                  id: 'connect-collection',
                  command: 'connect-collection',
                  label: connectionLabel
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
    if (customwidth && customwidth != 320 && customwidth != 768 && customwidth != 1280) {
      const device_name = (Math.random() + 1).toString();
      const command_name = (Math.random() + 2).toString();
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

  useEffect(() => {
    if (editor) {
      const current_page = editor.Pages.getSelected();
      const html = editor.getHtml({ current_page });
      const css = editor.getCss({ current_page });
      const payload = {
        page: page?._id,
        html: html,
        css: css
      };
      if (isback) {
        dispatch(updatePageAction(id, payload)).then((res) => {
          if (res) {
            history.goBack();
          }
        });
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
  }, [ispreview, ispublish, isback]);

  useEffect(() => {
    if (page) {
      setIsLoading(true);
      setIsStoreLoading(true);
      dispatch(getPageAction(page._id)).then((res) => {
        if (res) {
          if (editor) {
            editor.setComponents(res);
          }
          setIsLoading(false);
          setIsStoreLoading(false);
        }
      });
      const interval = setInterval(() => {
        if (editor) {
          const current_page = editor.Pages.getSelected();
          const html = editor.getHtml({ current_page });
          const css = editor.getCss({ current_page });
          const payload = {
            page: page?._id,
            html: html,
            css: css
          };
          dispatch(updatePageAction(id, payload));
        }
      }, 1000 * 30);

      //Clearing the interval
      return () => clearInterval(interval);
    }
  }, [page?._id]);

  useEffect(() => {
    if (editor) {
      store.webElements.map((el, idx) => {
        if (el?.category[0]?.name === 'New Form') {
          let formItem = {
            isComponent: (el) => el.tagName === 'DIV' && el.classList.contains('new-form'),
            model: {
              defaults: {
                tagName: 'div',
                draggable: true,
                droppable: true,
                selectable: true,
                components: (props) => {
                  return <div></div>;
                },
                attributes: { class: 'new-form' },
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
            isComponent: (el) => el.tagName === 'DIV' && el.classList.contains('add-form'),
            model: {
              defaults: {
                tagName: 'div',
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
          editor.BlockManager.add(`${el?.category[0]?.mainMenu}-${el?.category[0]?.subMenu}-${el?.category[0]?.name}-${idx}`, {
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
          });
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
      dispatch(updatePageAction(id, payload));
    }
  });

  return (
    <div className="d-flex">
      <div className="expanded-sidebar shadow-lg" hidden={VisibleMenu}>
        <PerfectScrollbar
          options={{ suppressScrollX: true }}
          style={{ height: `calc(100vh - 120px)` }}
        >
          {selectedMainNav === 'elements' && (
            <div className="d-flex" >
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
                <div style={{ height: '100%', overflow: 'scroll', width:'300px' }}>
                  <div className="expanded-header">
                    <span className="me-1">
                      {sidebarData.menu.name === 'CMS'
                        ? 'Add Content Elements'
                        : sidebarData.menu.name === 'Compositions'
                        ? 'Section Template'
                        : sidebarData.menu.name === 'Theme' ?
                        <div className='d-flex align-items-center text-uppercase'>
                          {
                            themeEditing ?
                            <>
                            <div onClick={(e)=>setThemeEditing(false)} className='cursor-pointer'>
                              <ChevronLeft size={20}/>
                            </div>
                            {selectedSubMenu}
                            </> 
                            :
                            <div>Theme</div>
                          }
                        </div>:
                        sidebarData.menu.name
                      }
                    </span>
                    <span className="header-icon" onClick={handleSidebarOpen}>
                      <X size={16} color="#6e6b7b" style={{ cursor: "hand" }} />
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
                                    className="d-flex align-items-center px-50 border-bottom border-top border-bottom border-top "
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
                            <div style={{ width: 300, display: 'flex', flexWrap: 'wrap' }}>
                              {blockManager?.blocks
                                ?.filter((e) => e.get('category').id === selectedCategory)
                                .map((b, ix) => {
                                  return (
                                    <div
                                      className="element"
                                      style={{
                                        width: 'fit-content',
                                        height: 'fit-content',
                                        margin: 0,
                                        padding: 5
                                      }}
                                      key={ix}
                                    >
                                      {/* <img width="50" height="50" src={b.get('media')} /> */}
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
                                    </div>
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
                                    className="d-flex align-items-center px-50 border-bottom border-top border-bottom border-top "
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
                                    <img width="280" src={`https://storage.googleapis.com/mymember-storage/website-builder/menu-image/${b.get('media')}`} />
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
                                      <ChevronDown size={18} />
                                    </div>
                                    <div
                                      hidden={
                                        OpenCategory.index == index ? !OpenCategory.value : true
                                      }
                                    >
                                      <ChevronUp size={18} />
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
                        sidebarData.menu.id !='theme'&&
                        sidebarData.menu.id !== 'quick-add' &&
                        sidebarData.menu.id !== 'blog' &&
                        sidebarData.menu.id !== 'cms' &&
                        sidebarData.menu.id !== 'store' &&
                        sidebarData.menu.id !== 'assets' &&
                        sidebarData.menu.id !== 'compositions' &&
                        sidebarData.menu.id !== 'contact-forms' &&
                        sidebarData.menu.id !== 'content' && (
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
                                      <img width="280" src={`https://storage.googleapis.com/mymember-storage/website-builder/menu-image/${b.get('media')}`} />
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
                        {
                          !themeEditing &&
                          <div className='theme-container p-1'>
                            <div className='color-container'>
                              <div className='submenu-item d-flex justify-content-between align-items-center' onClick={(e)=>{
                                  setSelectedSubMenu('colors');
                                  setThemeEditing(true);
                              }}>
                                <span className='fw-bold fs-6'>COLORS</span>
                                <span>
                                  <ChevronRight size={20} color="black"/>
                                </span>
                              </div>
                              <div style={{display:'grid', gridTemplateColumns:'auto auto auto auto auto'}}>
                                {
                                  formTheme && formTheme.colors && formTheme.colors.map((_color)=>{
                                    return (
                                      <div className='d-flex color-outline-element d-flex justify-content-around align-items-center mt-1' onClick={(e)=>{
                                        setSelectedColor(_color);
                                        setSelectedSubMenu('colors');
                                        setThemeEditing(true);

                                      }}>
                                        <div className='color-item' style={{backgroundColor:_color.value}}>
                                        </div>
                                      </div>
                                    )
                                  })
                                }
                                <div className='d-flex color-outline-element d-flex justify-content-around align-items-center mt-1' onClick={(e)=>addNewThemeColor()}>
                                  <div className='plus-item'>
                                    <Plus size={20}/>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='buttons-container mt-1'>
                              <div className='submenu-item d-flex justify-content-between align-items-center py-1' onClick={(e)=>{
                                setSelectedSubMenu('buttons');
                                setThemeEditing(true);
                            }}>
                                <span className='fw-bold fs-6'>BUTTONS</span>
                                <span>
                                  <ChevronRight size={20} color="black"/>
                                </span>
                              </div>
                              <div className='d-flex justify-content-around align-items-center buttons-list'>
                                {
                                  formTheme && formTheme.buttons && formTheme.buttons.map((_button)=>{
                                    return(
                                      <button style={{..._button.attributes}} onClick={(e)=>{
                                        setSelectedButton(_button);
                                        setSelectedSubMenu('buttons');
                                        setThemeEditing(true);
                                      }}>{_button.type}</button>
                                    )
                                  })
                                }
                             
                              </div>
                              <div>

                              </div>
                            </div>
                            <div className='text-container mt-1'>
                              <div className='submenu-item d-flex justify-content-between align-items-center py-1'>
                                <span className='fw-bold fs-6'>TEXT</span>
                                <span>
                                  <ChevronRight size={20} color="black"/>
                                </span>
                              </div>
                              <div className='text-elements'>
                                {
                                  formTheme && formTheme.fonts && formTheme.fonts.map((_font)=>{
                                    return(
                                      <div className='d-flex align-items-center cursor-pointer' style={{marginBottom:'10px'}} onClick={(e)=>{
                                        setSelectedFont(_font);
                                        setSelectedSubMenu('text');
                                        setThemeEditing(true);
                                      }}>
                                        <div>
                                          {_font.type}
                                        </div>
                                        <div className='ms-1 fw-bold' style={{..._font.attributes}}>
                                          {_font.attributes.fontFamily} {_font.attributes.fontSize.slice(0, -2)}
                                        </div>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </div>
                            <div className='images-container'>
                              <div className='submenu-item d-flex justify-content-between align-items-center py-1' onClick={(e)=>{
                                    setSelectedSubMenu('images');
                                    setThemeEditing(true);
                              }}>
                                <span className='fw-bold fs-6'>IMAGES</span>
                                <span>
                                  <ChevronRight size={20} color="black"/>
                                </span>
                              </div>
                            </div>
                            <div className='background-container'>
                              <div className='submenu-item d-flex justify-content-between align-items-center py-1' onClick={(e)=>{
                                setSelectedSubMenu('backgrounds');
                                setThemeEditing(true);
                              }}>
                                <span className='fw-bold fs-6'>BACKGROUNDS</span>
                                <span>
                                  <ChevronRight size={20} color="black"/>
                                </span>
                              </div>
                            </div>
                          </div>
                        }
                        {
                          themeEditing && 
                          <>
                            {
                              selectedSubMenu === 'colors' &&
                              <ColorTheme store={store} selectedColor={selectedColor}/>
                            }
                            {
                              selectedSubMenu === 'text' &&
                              <TextTheme store={store} selectedFont={selectedFont} setSelectedFont={setSelectedFont}/>
                            }
                            {
                              selectedSubMenu === 'buttons' &&
                              <ButtonTheme store={store} selectedButton={selectedButton} setSelectedButton={setSelectedButton}/>
                            }
                            {
                              selectedSubMenu === 'images' &&
                              <ImageTheme store={store}/>
                            }
                            {
                              selectedSubMenu === 'rows & columns' &&
                              <RowsTheme/>
                            }
                            {
                              selectedSubMenu === 'backgrounds' &&
                              <BackgroundTheme store={store}/>
                            }
                          </>
                        }
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
                                  ) === -1 && user.id === e.get('user')
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
                                      <IoMdArrowDropdown color='black' size={18} />
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
                                          <div>
                                            {b.get('label')}
                                          </div>
                                          <div className='assets-action'>
                                            <UncontrolledDropdown>
                                              <DropdownToggle tag="div" className="btn btn-sm">
                                                <MoreVertical size={14} className="cursor-pointer" />
                                              </DropdownToggle>
                                              <DropdownMenu positionFixed={true}>
                                                <DropdownItem tag="span" className="w-100" onClick={() => handleRename(b)}>
                                                  <Edit size={14} className="me-50" />
                                                  <span className="align-middle">Rename</span>
                                                </DropdownItem>
                                                <DropdownItem tag="span" className="w-100" onClick={() => handleRemove(b)}>
                                                  <Trash size={14} className="me-50" />
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
                          <div className='h-100 d-flex flex-column'>
                            <div className='d-flex justify-content-center align-items-center p-2 flex-column'>
                              <div>Send link to customer to manage dataset</div>
                              <div className='round p-1 mt-1' style={{ border: '1px solid', cursor: 'pointer' }} onClick={collectFromClient}>+ Collect From Client</div>
                            </div>
                            <div className='mt-2 pe-3' style={{ flex: 1, overflow: "scroll" }}>
                              <div className='ms-1 font-medium-5'>Collections</div>
                              {
                                store?.webCollections?.map(collection => {
                                  return (
                                    <div className='ms-2 mt-1'>
                                      <div className='d-flex align-items-center justify-content-between' style={{ cursor: 'pointer' }} onClick={() => { handleChangeCustomerDataset("cms", collection._id) }} >
                                        <div className='font-medium-6'>{collection.name} Collection</div>
                                        <SlArrowDown size={16} />
                                      </div>
                                      {
                                        customerDataset.type === "cms" && customerDataset.collectionId === collection._id &&
                                        (<div className='mt-1'>
                                          {collection?.fields?.map((field, idx) => {
                                            return (<div className='d-flex'>
                                              <Input type="checkbox" id={collection._id + field.name + idx} checked={cdCheckedItems[`cms-${collection._id}`]?.[field.name]} onChange={(e) => { handleCDCheckboxChange(field.name, e.target.checked) }} />
                                              <Label className='ms-1' for={collection._id + field.name + idx}>{field.name}</Label>
                                            </div>);
                                          })}
                                        </div>)
                                      }
                                    </div>
                                  );
                                })
                              }
                              <div className='ms-1 font-medium-5 mt-2'>Waiting Clients</div>
                              {
                                store?.waitingClients.map((client) => {
                                  return (
                                    <div className='d-flex align-items-center justify-content-between ms-1 mt-2 w-100'>
                                      <div className=''>{client.user.firstName} {client.user.lastName}</div>
                                      <div className=''>
                                        <Button color='success' className='me-1' onClick={() => { handleConfirmCustomerDataset(client._id, { isApproved: true, isDeclined: false }) }}><ImCheckmark /></Button>
                                        <Button onClick={() => { handleConfirmCustomerDataset(client._id, { isApproved: true, isDeclined: true }) }}><ImCross /></Button>
                                      </div>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          </div>
                      )}

                    </div>
                  </div>
                </div>
              </Collapse>
            </div>)
          }
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
                    />
                  </span>
                </div>
                <PageSidebar
                  id={id}
                  store={store}
                  editor={editor}
                  setEditor={setEditor}
                />
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
      {isStoreLoading ? (
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
      )}
      <div className="property-sidebar" hidden={rsidebarOpen?false:true}>
        <PerfectScrollbar
          className="scrollable-content"
          options={{ suppressScrollX: true }}
          style={{ height: `calc(100vh - 120px)` }}
        >
          <div className="d-flex" >
            <div className="col-6  text-center text-dark " hidden={tab=="Layers"? true:false}>
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
            <div className="col-6 text-center  text-dark" hidden={tab=="Layers"? true:false}>
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
          <div style={{ display: tab === 'Styles' ? 'block' : 'none' }} >
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
      <CreateAssetModal store={store} isOpen={openCreateAssetMdl} editor={editor} toggle={setOpenCreateAssetMdl} />
      <RenameAssetModal store={store} webElement={selectedWebElement} isOpen={openRenameAssetMdl} editor={editor} toggle={setOpenRenameAssetMdl} />
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
    </div >
  );
}
