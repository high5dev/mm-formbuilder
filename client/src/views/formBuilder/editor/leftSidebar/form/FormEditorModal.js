import React, { useEffect, useState, useRef } from 'react';
import websitePlugin from 'grapesjs-preset-webpage';
import PerfectScrollbar from 'react-perfect-scrollbar';
import basicBlockPlugin from 'grapesjs-blocks-basic';
import {useDispatch, useSelector} from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  Collapse,
  Button,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
  Col
} from 'reactstrap';
import { toast } from 'react-toastify';
import { Plus, PlusCircle, X, Trash2, Command, Book, ArrowLeft, Trash, Edit, MoreVertical} from 'react-feather';
import '@src/assets/styles/web-builder.scss';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import { formBuilderPlugin } from '../../elements/formBuilderPlugin';
import '@src/assets/styles/form-builder.scss';
import { formblocks } from '../../elements/FormBlocks';
import ConditionItem from '../form/rules/ConditionItem';
import RuleItem from '../form/rules/RuleItem';
import OperatorItem from '../form/rules/OperatorItem';
import PreviewFormModal from './PreviewFormModal';
import {setChildFormReducer, setFormRuleReducer} from '../../../store/reducer'
import {createFormRuleAction, updateFormRuleAction, deleteFormRuleAction, editChildFormAction, createFormPageAction, removeFormPageAction, getFormPageAction} from '../../../store/action';

export default function Index({store, toggle, page}) {
  const dispatch=useDispatch();
  const history=useHistory();
  const [currentFormPage, setCurrentFormPage]=useState();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formEditor, setFormEditor]=useState();
  const [blockManager, setBlockManager]=useState();
  const [selectedComponent, setSelectedComponent]=useState();
  const [attributes, setAttributes]=useState();
  const [sidebarItem, setSidebarItem]=useState();
  const [rules,setRules]=useState([]);
  const [selectedRule, setSelectedRule]=useState();
  const [ruleEditing, setRuleEditing]=useState(false);
  const [components, setComponents]=useState([]);
  const [previewMdl, setPreviewMdl]=useState(false);
  const [ruleConditions, setRuleConditions]=useState([
    {
      field:{label:'', value:''},
      condition:{label:'', value:''},
      value:''
    }
  ]);
  const [ruleOperators, setRuleOperators]=useState([]);
  const [ruleResults, setRuleResults]=useState([
    {
      field:[{label:'', valule:''}],
      value:{label:'', value:''}
    }
  ]);
  const [title, setTitle]=useState('');
  const [options, setOptions]=useState([]);
  const saveForm = () => {
    if(formEditor){
      const _components=formEditor.getWrapper().components().models;
      let elements=[];
      for(let i=0; i<_components.length;i++){
        const _component=_components[i];
        const elementType=_component.get('type');
        if(elementType){
          const inputElements=_component.get('elProps').map((item)=>{
            return{
              id:item.id,
              name:item.name,
              type:item.type
            }
          });
          const _element={
            elementType,
            inputElements
          };
          elements.push(_element);
        }
      };
      const current_page=formEditor.Pages.getSelected();
      const websiteId=store.form._id;
      const pageId=page._id;
      const id=store.childForm._id;
      const html = formEditor.getHtml({ current_page });
      const css = formEditor.getCss({ current_page });
      const currentPage=currentFormPage?._id;
      const payload={
        websiteId,
        pageId,
        html,
        css,
        currentPage,
        elements
      };
      dispatch(editChildFormAction(id, payload)).then((res)=>{
        if(res){
           let formPages=store.childForm.formPages;
           formPages=formPages?.map((_formPage)=>{
            if(_formPage._id===currentPage){
              return {
                ..._formPage,
                html,
                css
              }
            }
            else{
              return _formPage;
            }
           });
           const newForm={...res, formPages};
           dispatch(setChildFormReducer(newForm));
        }
      })
    }
  };

  const previewForm = () => {
    if(formEditor){
      const _components=formEditor.getWrapper().components().models;
      let elements=[];
      for(let i=0; i<_components.length;i++){
        const _component=_components[i];
        const elementType=_component.get('type');
        if(elementType){
          const inputElements=_component?.get('elProps')?.map((item)=>{
            return{
              id:item.id,
              name:item.name,
              type:item.type
            }
          });
          const _element={
            elementType,
            inputElements
          };
          elements.push(_element);
        }
      };
      const current_page=formEditor.Pages.getSelected();
      const websiteId=store.form._id;
      const pageId=page?._id;
      const id=store.childForm._id;
      const html = formEditor.getHtml({ current_page });
      const css = formEditor.getCss({ current_page });
      const currentPage=currentFormPage?._id;
      const payload={
        websiteId,
        pageId,
        html,
        css,
        currentPage,
        elements
      };
      dispatch(editChildFormAction(id, payload)).then((res)=>{
        if(res){
           let formPages=store.childForm.formPages;
           const newForm={...res, formPages};
           dispatch(setChildFormReducer(newForm));
           setPreviewMdl(true);
        }
      })
    }
  };

  const clearEditor = () =>{
    if(formEditor){
      formEditor.Components.clear();
    }
  }

  const addRuleCondition = (e) => {
    let newRuleConditions=ruleConditions;
    newRuleConditions=[...newRuleConditions, {
      field:{label:'', value:''},
      condition:{label:'', value:''},
      value:''
    }];
    let newRuleOperators=ruleOperators;
    newRuleOperators=[...newRuleOperators, {
      label:'And',
      value:'and',
    }];
    setRuleOperators([...newRuleOperators]);
    setRuleConditions([...newRuleConditions]);
  };

  const addRuleResult= (e) =>{
    let newRuleResult=ruleResults;
    newRuleResult=[...newRuleResult, {
      field:[{label:'', value:''}],
      value:{label:'', value:''}
    }];
    setRuleResults([...newRuleResult]);

  }

  const addNewOption =(e) =>{
    if(selectedComponent.get('type') ==='single-choice'){
      const newOption={
        id: "single_choice"+ Math.random().toString(36).substring(2,7),
        label: "Option"+(options.length+1).toString(),
        name: "Option"+(options.length+1).toString(),
        type:'radio',
        checked:false,
      };
      const newOptions=[...options, newOption];
      setOptions([...newOptions]);
      selectedComponent.set('elProps', newOptions);
    }
    if(selectedComponent.get('type') ==='multi-choice'){
      const newOption={
        id: "multi_choice"+ Math.random().toString(36).substring(2,7),
        label: "Option"+(options.length+1).toString(),
        name: "Option"+(options.length+1).toString(),
        type:'radio',
        checked:false,
      };
      const newOptions=[...options, newOption];
      setOptions([...newOptions]);
      selectedComponent.set('elProps', newOptions);
    }
    if(selectedComponent.get('type') ==='dropdown'){
      const newOption={
        label: "Option"+(options.length+1).toString(),
        value:"Option"+(options.length+1).toString(),
      };
      const newOptions=[...options, newOption];
      setOptions([...newOptions]);
      selectedComponent.set('elProps', newOptions);
    }
  }

  const changeAttributes=(obj) =>{
    setAttributes(attributes => ({...attributes, ...obj}));
    let _elProps=[];
    _elProps.push({...attributes, ...obj});
    selectedComponent.set('elProps', _elProps);
  }

  const changeCondition =(index, condition)=>{
    const newRuleConditons=ruleConditions;
    newRuleConditons[index]=condition;
    setRuleConditions([...newRuleConditons]);
  } 

  const removeCondition=(index)=>{
    let newRuleConditons=ruleConditions;
    newRuleConditons.splice(index, 1);
    let newRuleOperators=ruleOperators;
    newRuleOperators.splice(index, 1);
    setRuleOperators([...newRuleOperators]);
    setRuleConditions([...newRuleConditons]);
  }

  const changeRuleResult =(index, result) =>{
    const newRuleResult=ruleResults;
    newRuleResult[index]=result;
    setRuleResults([...newRuleResult]);
  }

  const removeRule=(index) =>{
    let newRuleResult=ruleResults;
    newRuleResult.splice(index, 1);
    setRuleResults([...newRuleResult]);
  }

  const onChangeOperator=(index, operator) =>{
    const newRuleOperators=ruleOperators;
    newRuleOperators[index]=operator;
    setRuleOperators([...newRuleOperators]);
  }

  const createFormRule =() =>{
    const formId=store?.childForm?._id;
    const input=ruleConditions;
    const operators=ruleOperators;
    const output=ruleResults;
    let payload={
      input,
      operators,
      output
    };
    console.log('payload', payload);
   if(selectedRule?._id){
    const id=selectedRule._id;
    dispatch(updateFormRuleAction(id, payload)).then((res)=>{
      if(res){
        let formRules=store.formRules;
        formRules=formRules.map((formRule)=>{
          if(formRule._id===res._id){
            return res
          }
          else{
            return formRule;
          }
        })
        dispatch(setFormRuleReducer(formRules));
        setRuleConditions([{
          field:{label:'', value:''},
          condition:{label:'', value:''},
          value:''
        }]);
        setRuleOperators([]);
        setRuleResults([{
          field:[{label:'', valule:''}],
          value:{label:'', value:''}
        }])
        setRuleEditing(false);
      }
     })
   }
   else{
    payload={...payload, formId:formId}
    dispatch(createFormRuleAction(payload)).then((res)=>{
      if(res){
        let formRules=store.formRules;
        formRules=[...formRules, res];
        dispatch(setFormRuleReducer(formRules));
        setRuleConditions([{
          field:{label:'', value:''},
          condition:{label:'', value:''},
          value:''
        }]);
        setRuleOperators([]);
        setRuleResults([{
          field:[{label:'', valule:''}],
          value:{label:'', value:''}
        }])
        setRuleEditing(false);
      }
     })
   }

  }

  const handleRemove =(_rule) =>{
    dispatch(deleteFormRuleAction(_rule._id)).then(res=>{
      if(res){
        let newRules=store.formRules.filter((formRule)=>formRule._id!=_rule._id);
        dispatch(setFormRuleReducer(newRules));
      }

    })
  }

  const handleEdit =(_rule) =>{
    setSelectedRule({..._rule});
    const input=_rule.input;
    const output=_rule.output;
    const operators=_rule.operators;
    setRuleConditions([...input]);
    setRuleOperators([...operators]);
    setRuleResults([...output]);
    setRuleEditing(true);
  }

  const defaultBlocks=formblocks.map((block)=>{
    const label=block.label;
    const type=block.content.type;
    return({
      label:label,
      value:type
    })
  });

  const handleInputText=(inputData, operators) =>{
    let input_description='If ';
    for(let i=0; i<inputData.length; i++){
      const inputItem=inputData[i];
      input_description=input_description+' '+inputItem.field.label+' '+inputItem.condition.label+' '+inputItem.value;
      if(i<operators.length){
        input_description=input_description+' '+operators[i].label
      }
    }
    return input_description;
  }

  const handleOutputText=(outputData) =>{
    let output_description='Then ';
    for(let i=0; i<outputData.length;i++){
      const outputItem=outputData[i];
      let fields=outputItem.field.map((_field)=>{
        return _field.label
      });
      fields=fields.join(',');
      output_description=output_description+fields+' '+'is'+' '+outputItem.value.label
    }
    return output_description;
  }

  const addFormPage =(e) =>{
    const childForm=store.childForm;
    const payload={
      formId:childForm._id
    };
    dispatch(createFormPageAction(payload)).then((res)=>{
      if(res){
        const childForm=store.childForm;
        const newFormPage={...res};
        let formPages=store.childForm.formPages;
        formPages=[...formPages, newFormPage];
        const newForm={...childForm, formPages};
        dispatch(setChildFormReducer(newForm));
      }
    })
  }

  const removeFormPage=(id)=>{
    dispatch(removeFormPageAction(id)).then((res)=>{
      if(res){
        const childForm=store.childForm;
        let formPages=store.childForm.formPages;
        formPages=formPages.filter((formPage)=>formPage._id!=id);
        const newForm={...childForm, formPages};
        dispatch(setChildFormReducer(newForm));
      }
    })
  }

  const backToRule=()=>{
    setRuleConditions([
      {
        field:{label:'', value:''},
        condition:{label:'', value:''},
        value:''
      }
    ]);
    setRuleOperators([]);
    setRuleResults(
      [{
        field:[{label:'', valule:''}],
        value:{label:'', value:''}
      }
    ]);
    setRuleEditing(false)
  }

  useEffect(() => {
    const form_gjsEditor = grapesjs.init({
      container: '#form-editor',
      width:600,
      plugins: [(editor) => formBuilderPlugin(editor), websitePlugin],
      richTextEditor: {
        actions: []
      },
      blockManager: {
        custom: true,
      },
      panels: {
        defaults: []
      },
      commands: {
        defaults: [{}]
      },
    });
    form_gjsEditor.on('block:custom', props => {
      // The `props` will contain all the information you need in order to update your UI.
      // props.blocks (Array<Block>) - Array of all blocks
      // props.dragStart (Function<Block>) - A callback to trigger the start of block dragging.
      // props.dragStop (Function<Block>) - A callback to trigger the stop of block dragging.
      // props.container (HTMLElement) - The default element where you can append your UI

      // Here you would put the logic to render/update your UI.

      setBlockManager(props);
    });

    form_gjsEditor.on('component:selected', (cmp) => {
        if(cmp && cmp.get('elProps') && cmp.get('elProps').length===1){
          setOptions([]);
          setAttributes(cmp.get('elProps')[0]);
          setTitle(cmp.get('title'));
          setSelectedComponent(cmp);
        }
        if(cmp && cmp.get('elProps') && cmp.get('elProps').length>1){
          setAttributes(null);
          const newOptions=[...cmp.get('elProps')];
          setOptions([...newOptions]);
          setTitle(cmp.get('title'));
          setSelectedComponent(cmp);
        }
    });

    form_gjsEditor.on('block:drag:stop', (cmp) =>{
      if(cmp && cmp.get('elProps') && cmp.get('elProps').length===1){
        setOptions([]);
        setAttributes(cmp.get('elProps')[0]);
        setTitle(cmp.get('title'));
        setSelectedComponent(cmp);
      }
      if(cmp && cmp.get('elProps') && cmp.get('elProps').length>1){
        setAttributes(null);
        const newOptions=[...cmp.get('elProps')];
        setOptions([...newOptions]);
        setTitle(cmp.get('title'));
        setSelectedComponent(cmp);
      }
    })

    form_gjsEditor.on('component:add', (cmp) =>{
      if(cmp && cmp.get('type')){
        const item=defaultBlocks.find((defaultBlock)=>{
          if(defaultBlock.value===cmp.get('type')){
            return true
          }
          else{
            return false
          }
        });
        if(item){
          setComponents(prevCmps=>[...prevCmps, item]);
        }
       
      }
    })


    form_gjsEditor.on('component:remove', (cmp)=>{
      // console.log('components', components);
      // if(cmp && cmp.get('type')){
      //   const item=defaultBlocks.find((defaultBlock)=>{
      //     if(defaultBlock.value===cmp.get('type')){
      //       return true
      //     }
      //     else{
      //       return false
      //     }
      //   });
      //   if(item){
      //     console.log('components', components);
      //     const index=components && components.findIndex((component)=>{
            
      //       if(component.value===cmp.get('type')){
      //         return true
      //       }
      //       else{
      //         return false
      //       }
      //     })
      //     console.log('index---------', index)
      //   }
      // }
    })
    if(store.childForm && store.childForm.formPages){
      setCurrentFormPage(store.childForm.formPages[0]);
    }
    setFormEditor(form_gjsEditor);
  }, []);

  useEffect(()=>{
    if(store.formRules.length>0){
      const rules=store.formRules.map((formRule)=>{
        const input_description=handleInputText(formRule.input, formRule.operators);
        const output_description=handleOutputText(formRule.output);
         const _rule={
          ...formRule,
          input_description:input_description,
          output_description:output_description
         };
         return _rule
      });
      setRules([...rules]);
    }
    else{
      setRules([])
    } 
  }, [store.formRules])

  useEffect(()=>{
    if(currentFormPage){
      dispatch(getFormPageAction(currentFormPage._id)).then((res)=>{
        if(res){
          if(formEditor){
            formEditor.setComponents(res);
          };
        }  
      })
    }
  }, [currentFormPage?._id])

  return (
    <div>
      <div className="form-builder-navbar d-flex justify-content-end align-items-center p-1">
        <Trash2 size={24} color={'white'} onClick={(e) =>{clearEditor()}}/>
        <Button
          className='ms-3'
          color="primary"
          outline
          onClick={(e) => previewForm()}
          style={{ width: '100px', color:'white' }}
        >
          Preview
        </Button>
        <Button color="primary ms-3" onClick={(e) => saveForm()} style={{ width: '100px' }}>
          Save
        </Button>
        <div className="ms-1">
            <X size={24} onClick={(e)=>toggle(false)}/>
        </div>

      </div>
      <div className="form-builder-body d-flex justify-content-between">
        <div className="form-builder-sidebar d-flex" style={{ width: '450px', height:window.innerHeight-70+'px' }}>
          <div className='bg-white' style={{height:window.innerHeight-80+'px' }}>
            <div
              className="form-sidebar-action d-flex flex-column align-items-center pt-3"
              onClick={(e) => {
                setSidebarOpen(true);
                setSidebarItem('Add');
              }}
              style={{ width: '50px'}}
            >
              <div className='action-icon text-black'>
                <Plus size={20} color={'black'}/>
              </div>
              <div className="item-event text-black fw-bolder">Add</div>
            </div>
            <div
              className="form-sidebar-action d-flex flex-column align-items-center pt-3"
              onClick={(e) => {
                setSidebarItem('Rules')
                setRuleEditing(false);
                setSidebarOpen(true);
              }}
              style={{ width: '50px'}}
            >
              <div className='action-icon text-black'>
                <Command size={20} color={'black'}/>
              </div>
              <div className="item-event text-black fw-bolder">Rules</div>
            </div>
            <div
              className="form-sidebar-action d-flex flex-column align-items-center pt-3"
              onClick={(e) => {
                setSidebarItem('Pages');
                setSidebarOpen(true)
              }}
              style={{ width: '50px'}}
            >
                <div className='action-icon text-black'>
                  <Book size={20} color={'black'}/>
                  </div>
                <div className="item-event text-black fw-bolder">Pages</div>
                
            </div>
          </div>
          <PerfectScrollbar
            options={{ suppressScrollX: true }}
            style={{ height: window.innerHeight-80+'px' }}
          >
          {
            sidebarItem ==='Add' &&               
            <Collapse isOpen={sidebarOpen} horizontal={true} delay={{ show: 10, hide: 20 }}>
            <div className="form-expanded-sidebar p-1" style={{ width: '320px'}}>
              <div className="form-expanded-header fw-bolder text-black p-1 d-flex justify-content-between">
                <span>{'Add Form Fields'}</span>
                <div>
                  <span className="form-header-icon" onClick={(e) => setSidebarOpen(false)}>
                    <X size={16} />
                  </span>
                </div>
              </div>
              <div className="form-expanded-content fs-6 text-black mt-2">
              <div className='fw-bold'>Contact Fields</div>
                <div id="form-blocks">
                    {formEditor?.BlockManager.blocks.map((block) => (
                        block.get('category')==='Form' && <div
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
                        style={{width:'85px', height:'85px'}}
                        >
                        <div
                            style={{width: 20, height: 20}}
                            dangerouslySetInnerHTML={{ __html: block.getMedia() }}
                        />
                        <div
                            className="text-sm text-center w-full mt-1 fw-bold"
                            title={block.getLabel()}
                            style={{fontSize:'10px'}}
                        >
                            {block.getLabel()}
                        </div>
                        </div>
                    ))}
                </div>
                <div className='fw-bold'>General Fields</div>
                  <div id="form-blocks">
                        {formEditor?.BlockManager.blocks.map((block) => (
                            block.get('category')==='General' && <div
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
                            style={{width:'85px', height:'85px'}}
                            >
                            <div
                                style={{width: 20, height: 20}}
                                dangerouslySetInnerHTML={{ __html: block.getMedia() }}
                            />
                            <div
                                className="text-sm text-center w-full mt-1 fw-bold"
                                title={block.getLabel()}
                                style={{fontSize:'10px'}}
                            >
                                {block.getLabel()}
                            </div>
                            </div>
                        ))}
                  </div>
              </div>

            </div>
            </Collapse>
          }
          {
            sidebarItem === 'Rules' && 
            <Collapse isOpen={sidebarOpen} horizontal={true} delay={{ show: 10, hide: 20 }}>               
              <div className="form-expanded-sidebar p-1" style={{ width: '320px', minHeight: window.innerHeight-80+'px'}}>
                <div className="form-expanded-header fw-bolder text-black p-1 d-flex justify-content-between">
                  <span>{'Conditional rules'}</span>
                  <div>
                    <span className="form-header-icon" onClick={(e) => setSidebarOpen(false)}>
                      <X size={16} />
                    </span>
                  </div>
                </div>
                <div className="form-expanded-content fs-6 text-black mt-2">
                  {
                    !ruleEditing?
                    <div>
                      {
                        rules && rules.map((_rule)=>{
                          return(
                            <div className='rule-card d-flex mb-1 justify-content-between'>
                              <div>
                                  <div className='fw-bold mb-1'>
                                    {_rule.input_description}
                                  </div>
                                  <div>
                                    {_rule.output_description}
                                  </div>
                              </div>
                              <div className='rule-action'>
                              <UncontrolledDropdown>
                                  <DropdownToggle tag="div" className="btn btn-sm">
                                    <MoreVertical size={14} className="cursor-pointer" />
                                  </DropdownToggle>
                                  <DropdownMenu positionFixed={true}>
                                      <DropdownItem tag="span" className="w-100" onClick={() => handleEdit(_rule)}>
                                        <Edit size={14} className="me-50" />
                                        <span className="align-middle">Edit</span>
                                      </DropdownItem>
                                      <DropdownItem tag="span" className="w-100" onClick={() => handleRemove(_rule)}>
                                        <Trash size={14} className="me-50"/>
                                        <span className="align-middle">Remove</span>
                                      </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>
                          </div>
                          )
                        })
                      }
                      <div className='d-flex justify-content-around mt-1'>
                        <Button color='primary' onClick={(e)=>{setRuleEditing(true);setSelectedRule({})}}>Add Rule</Button>
                      </div>
                    </div>:
                    <div>
                      <span className='text-primary fs-6 d-flex align-items-center cursor-pointer mb-2' onClick={(e)=>backToRule()}>
                        <ArrowLeft size={20} color={'#174ae7'}/>
                        <div>Back To Rules</div>
                      </span>
                      <div>
                          <div className='text-primary'>
                            If
                          </div>
                          <div className='content-container' style={{padding:'10px', borderLeft:'1px solid #174ae7'}}>
                              {
                                ruleConditions && ruleConditions.map((ruleCondition, idx) =>{
                                  return(
                                    <div>
                                      <ConditionItem formEditor={formEditor} ruleCondition={ruleCondition} index={idx} components={components} changeCondition={changeCondition} removeCondition={removeCondition}/>
                                      {
                                        ruleOperators && ruleOperators.length>0 && ruleOperators[idx] && <OperatorItem operatorItem={ruleOperators[idx]} index={idx} onChangeOperator={onChangeOperator}/> 
                                      }
                                    </div>
                                  )
                                })
                              }
                              <div className='d-flex justify-content-around mt-2'>
                                <span className='d-flex align-items-center'>
                                  <Plus color={'#174ae7'} size={20}/>
                                  <div className='text-primary cursor-pointer' onClick={(e)=>addRuleCondition(e)}>Add Condition</div>
                                </span>
                              </div>

                          </div>
                      </div>
                      <div className='mt-2'>
                            <div className='text-primary'>
                              Then
                            </div>
                            <div className='rule-container' style={{padding:'10px', borderLeft:'1px solid #174ae7'}}>
                              {
                                ruleResults && ruleResults.map((ruleResult, idx)=>{
                                  return(<RuleItem ruleResult={ruleResult} index={idx} components={components} changeRuleResult={changeRuleResult} removeRule={removeRule}/>)
                                })
                              }
                              <div className='d-flex justify-content-around mt-2'>
                                <span className='d-flex align-items-center'>
                                  <Plus color={'#174ae7'} size={20}/>
                                  <div className='text-primary cursor-pointer' onClick={(e)=>addRuleResult(e)}>Add Rule</div>
                                </span>
                              </div>
                            </div>
                      </div>
                      <div className='d-flex justify-content-around mt-2'>
                        <Button color='primary' className='rule-btn' onClick={(e)=>createFormRule()}>Save</Button>
                        <Button color='secondary' className='rule-btn' onClick={(e)=>backToRule()}>Cancel</Button>
                      </div>   
                    </div>
                  }

                </div>
              </div>
            </Collapse>
          }
          {
            sidebarItem === 'Pages' && 
            <Collapse isOpen={sidebarOpen} horizontal={true} delay={{ show: 10, hide: 20 }}>
            <div className="form-expanded-sidebar p-1" style={{ width: '320px', height: window.innerHeight-80+'px'}}>
              <div className="form-expanded-header fw-bolder text-black p-1 d-flex justify-content-between">
                <span>{'Pages'}</span>
                <div>
                  <span className="form-header-icon" onClick={(e) => setSidebarOpen(false)}>
                    <X size={16} />
                  </span>
                </div>
              </div>
              <div className="form-expanded-content fs-6 text-black mt-2">
                <div>Add, delete pages on your form.</div>
                <div className='d-flex flex-column align-items-center'>
                {
                    store.childForm.formPages && store.childForm.formPages.map((formPage, i)=>{
                      return(
                        <div className='d-flex align-items-center'>
                          <div className={formPage._id===currentFormPage._id?'page-card-active m-1':'page-card m-1'}>
                            <div onClick={(e)=>setCurrentFormPage({...formPage})}>
                              {`Page ${i}`}
                            </div>
                          </div>
                          <Trash size={20} color={'red'} onClick={(e)=>removeFormPage(formPage._id)}/>
                        </div>
)
                    })
                  }
                <div className='d-flex justify-content-around mt-2'>
                  <span className='d-flex align-items-center'>
                    <Plus color={'#174ae7'} size={20}/>
                    <div className='text-primary cursor-pointer' onClick={(e)=>addFormPage(e)}>Add Page</div>
                  </span>
                </div>
                </div>

              </div>
            </div>
            </Collapse>
          }
          </PerfectScrollbar>
        </div>
        <div id="form-editor"></div>
        <div class="style-manager" style={{width:'21%',backgroundColor:'white', zIndex:10, border:'1px solid lightgray'}}>
            <div class="form-trait-header p-1 fw-bold text-dark fs-5" style={{borderBottom:'1px solid lightgray'}}>Attributes</div>
            <div className="form-attributes p-1">
                {
                    selectedComponent && selectedComponent.get('type') !='submit' && selectedComponent.get('type') !='birthday' && attributes && Object.keys(attributes).map((key)=>{
                    if(key!='type'){
                      return(
                      <div className={typeof attributes[key]==='boolean'? 'd-flex justify-content-between align-items-center':'mb-2'}>
                        <div className='text-capitalize fs-5 fw-bolder'>
                          <Label>
                            {key}
                          </Label>
                        </div>
                        {
                          (typeof attributes[key]!="boolean") && 
                          <Input type='text' value={attributes[key]} style={{padding:'5px'}} onChange={(e)=>{
                            var obj = {};
                            obj[key] = e.target.value;
                            setAttributes(attributes => ({...attributes, ...obj}));
                              let _elProps=[];
                              _elProps.push({...attributes, ...obj});
                              selectedComponent.set('elProps', _elProps);
                          }}/>
                        }
                        {
                          (typeof attributes[key]==="boolean") && 
                          <div className='d-flex justify-content-around'>
                              <Input type='checkbox' checked={attributes[key]} style={{padding:'5px'}} onChange={(e)=>{
                                var obj = {};
                                obj[key] = e.target.checked;
                                setAttributes(attributes => ({...attributes, ...obj}));
                                  let _elProps=[];
                                  _elProps.push({...attributes, ...obj});
                                  selectedComponent.set('elProps', _elProps);
                              }}/>
                          </div>
              
                        }     
                      </div>
                      )
                    }
                  })
                }
                {
                    selectedComponent && selectedComponent.get('type') ==='birthday'&& 
                      <div className={typeof attributes[key]==='boolean'? 'd-flex justify-content-between align-items-center':'mb-2'}>
                        <div className='text-capitalize fs-5 fw-bolder'>
                          <Label>
                            Label
                          </Label>
                          <Input type='text' value={attributes['label']} onChange={(e)=>{
                            changeAttributes({label:e.target.value})
                          }}/>
                        </div>
                        <div className="link-section">
                        <div className='mb-2 mt-2'>Default View</div>
                        <div className='d-flex mb-1'>
                          <input type='radio' id="submit-button" checked={attributes['type'] ==='placeholder'?true:false} onChange={(e)=>{
                            if(e.target.checked){
                              changeAttributes({type:'placeholder'});
                            }
                          }}/>
                          <label className='ms-1' htmlFor='submit-button'>Placeholder text</label>
                        </div>
                        <div className='d-flex mb-1'>
                          <input type='radio' id="link-button" checked={attributes['type'] ==='current'? true: false} onChange={(e)=>{
                            if(e.target.checked){
                              changeAttributes({type:'current'});
                            }
                          }}/>
                          <label className="ms-1" htmlFor='link-button'>Current Date</label>
                        </div>
                        <div className='d-flex mb-1'>
                          <input type='radio' id="link-button" checked={attributes['type'] ==='blank'? true: false} onChange={(e)=>{
                            if(e.target.checked){
                              changeAttributes({type:'blank'});
                            }
                          }}/>
                          <label className="ms-1" htmlFor='link-button'>Leave Blank</label>
                        </div>
                      </div>

                      </div>
                  }
                {
                    selectedComponent && selectedComponent.get('type') ==='submit' && (
                    <>
                      <div className="label-section mb-1">
                        <Label>Submit button text</Label>
                        <Input type='text' value={attributes.label} onChange={(e) =>{
                          changeAttributes({label:e.target.value})
                        }}/>
                      </div>
                      <div className="link-section">
                        <div className='mb-2'>When a visitor submits a form</div>
                        <div className='d-flex mb-1'>
                          <input type='radio' id="submit-button" checked={!attributes.isUrl} onChange={(e)=>{
                            if(e.target.checked){
                              changeAttributes({isUrl:false});
                            }
                          }}/>
                          <label className='ms-1' htmlFor='submit-button'>Show a message</label>
                        </div>
                        <div className='d-flex mb-1'>
                          <input type='radio' id="link-button" checked={attributes.isUrl} onChange={(e)=>{
                            if(e.target.checked){
                              changeAttributes({isUrl:true});
                            }
                          }}/>
                          <label className="ms-1" htmlFor='link-button'>Redirect to an external URL</label>
                        </div>
                      </div>
                      {
                        attributes.isUrl?                
                        <div>
                            <Label>
                              Redirect URL
                            </Label>
                            <Input type='text' value={attributes.url} placeholder='e.g.https://www.mysite.com' onChange={(e)=>{
                              changeAttributes({url:e.target.value})
                            }}
                            />
                          <div className='direct-section mt-1'>
                              <Label>Redirect to</Label>
                              <div className='d-flex justify-content-between'>
                                <div className='tab-button' style={{color:`${attributes.isNewTab?'#174ae7':''}`, border:`${attributes.isNewTab?'1px solid #174ae7':''}`}} onClick={(e)=>{
                                  changeAttributes({isNewTab:true})
                                }}>
                                    New tab
                                </div>
                                <div className='tab-button' style={{color:`${!attributes.isNewTab?'#174ae7':''}`, border:`${!attributes.isNewTab?'1px solid #174ae7':''}`}} onClick={(e) =>{
                                  changeAttributes({isNewTab:false})
                                }}>
                                    Same tab
                                </div>
                              </div>
                          </div>
                        </div>:
                        <div className='description-section'>
                            <Label>Submission message</Label>
                            <Input
                              value={attributes.description}
                              name="description"
                              placeholder="A bit of description about your page"
                              type="textarea"
                              onChange={(e)=>{
                                changeAttributes({description:e.target.value})
                              }}
                            />
                        </div>
                      }
                    </>
                  )
                    // if(key!='type'){
                    //   return(
                    //   <div className={typeof attributes[key]==='boolean'? 'd-flex justify-content-between align-items-center':'mb-2'}>
                    //     <div className='text-capitalize fs-5 fw-bolder'>
                    //       <Label>
                    //         {key}
                    //       </Label>
                    //     </div>
                    //     {
                    //       (typeof attributes[key]!="boolean") && 
                    //       <Input type='text' value={attributes[key]} style={{padding:'5px'}} onChange={(e)=>{
                    //         var obj = {};
                    //         obj[key] = e.target.value;
                    //         setAttributes(attributes => ({...attributes, ...obj}));
                    //           let _elProps=[];
                    //           _elProps.push({...attributes, ...obj});
                    //           selectedComponent.set('elProps', _elProps);
                    //       }}/>
                    //     }
                    //     {
                    //       (typeof attributes[key]==="boolean") && 
                    //       <div className='d-flex justify-content-around'>
                    //           <Input type='checkbox' checked={attributes[key]} style={{padding:'5px'}} onChange={(e)=>{
                    //             var obj = {};
                    //             obj[key] = e.target.checked;
                    //             setAttributes(attributes => ({...attributes, ...obj}));
                    //               let _elProps=[];
                    //               _elProps.push({...attributes, ...obj});
                    //               selectedComponent.set('elProps', _elProps);
                    //           }}/>
                    //       </div>
              
                    //     }     
                    //   </div>
                    //   )
                    // }
                  }
                
                
                { 
                  options && options.length>0 &&(
                    <div>
                      {
                        options && options.length && options.map((option, i) =>{
                          return(
                            <div class='d-flex justify-content-between align-items-center mb-1'>
                            {
                              option && Object.keys(option).map((key)=>{
                                if(key==='label' || key==='checked'){
                                  return(
                                  <div className="d-flex justify-content-between align-items-center">
                                    {
                                      (option && typeof option[key]!="boolean") && 
                                      <Input type='text' className='ms-1' value={option[key]} style={{padding:'5px'}} onChange={(e)=>{
                                        var obj = {};
                                        obj[key] = e.target.value;
                                        const newOptions=options;
                                        newOptions[i]={...option, ...obj};                      
                                        setOptions([...newOptions]);
                                        selectedComponent.set('elProps', newOptions);
                                      }}/>
                                    }
                                    {
                                      (option && typeof option[key]==="boolean") && 
                                      <div className='d-flex justify-content-around'>
                                          <Input type='checkbox' className='ms-1' checked={option[key]} style={{padding:'5px'}} onChange={(e)=>{
                                            var obj = {};
                                            obj[key] = e.target.checked;
                                            let newOptions=options;
                                            if(selectedComponent.get('type') ==='single-choice'){
                                              if(e.target.checked){
                                                newOptions=newOptions.map((option) =>{
                                                  option[key]=false;
                                                  return option;
                                                });
                                                newOptions[i]={...option, ...obj};
                                                setOptions([...newOptions]);
                                              }
                                              else{
                                                newOptions[i]={...option, ...obj};
                                                setOptions([...newOptions]);   
                                              } 
                                              selectedComponent.set('elProps', newOptions);
                                            }
                                            if(selectedComponent.get('type') ==='multi-choice'){
                                                newOptions[i]={...option, ...obj};
                                                setOptions([...newOptions]);   
                                                selectedComponent.set('elProps', newOptions);
                                            }  
                                          }}/>
                                      </div>
                                    }     
                                  </div>
                                  )
                                }
                              })
                            }
                          </div>
                          )
                          })
                      }
                      <div className='d-flex align-items-center justify-content-around'>
                        <Button color='primary' onClick={(e)=>addNewOption(e)}>Add Option</Button>
                      </div>
                    </div>
                  )
                }
              </div>
        </div>
      </div>
      <Modal isOpen={previewMdl} centered className='form-builder-modal' fullscreen scrollable style={{ overflowX: 'hidden'}}>
        <PreviewFormModal toggle={(e)=>setPreviewMdl(e)} store={store} currentFormPage={currentFormPage}/>
      </Modal>
    </div>
    
  );
}
