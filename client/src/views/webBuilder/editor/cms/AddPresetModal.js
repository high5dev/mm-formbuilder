import React, { useEffect, useState } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { selectThemeColors } from '@utils'
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { createDynamicPageAction, createMultiConnectionsAction, createPageAction, createWebCollectionAction, createWebDatasetAction, getWebCollectionsAction } from '../../store/action';
import { items, itemsCss, itemsFields, itemsItemHtml, itemsItemStyle, itemsRepeaterItemChildrenIds, itemsValues } from './preset/items';
import { teamCss, teamFields, teamItemHtml, teamItemStyle, teamRepeaterItemChildrenIds, teamValues, team_members } from './preset/teamMembers';
import { projectItemHtml, projectItemStyle, projects, projectsCss, projectsFields, projectsRepeaterItemChildrenIds, projectsValues } from './preset/projects';
import { portfolio } from './preset/portfolio';
import { setFormReducer } from '../../store/reducer';

const AddPresetModal = ({ store, mdlData, toggle, editCollectionToggle }) =>{
  const dispatch = useDispatch();
  const [preset, setPreset] = useState('');

  const initState = () => {
    setPreset('');
  };

  return (
    <>
      <Modal isOpen={mdlData} toggle={toggle} centered size='lg'>
        <ModalHeader toggle={() => {toggle();}} className="font-medium-5 px-2 py-1 modal-title text-primary">
          CMS
        </ModalHeader>
        <ModalBody className="d-flex justify-content-between p-3 pb-2">
          <div className='d-flex flex-column flex-1'>
            <Label className="mdl-select-main-menu-label fs-6" for="mdl-select-main-menu">
              <h5 className='m-0 pb-0'>Choose a preset</h5>
              Use a collection to manage content and display it on dynamic pages.
            </Label>
            <div class="grid-display">
              <div className="row row-cols-3">
                <div className={`preset-item col${preset === 'custom' ? ' border border-primary' : ''}`} onClick={() => {setPreset('custom')}}>
                    <img class="shadow my-1" src={require('@src/assets/images/form-builder-svg/items.png').default} style={{width: '100%'}}/>
                    <div class="card-data">
                        <Label className="mdl-select-main-menu-label fs-6 ms-1" for="mdl-select-main-menu">
                          Custom
                        </Label>
                    </div>
                </div>
                <div className={`preset-item col${preset === 'team' ? ' border border-primary' : ''}`} onClick={() => {setPreset('team')}}>
                    <img class="shadow my-1" src={require('@src/assets/images/form-builder-svg/team_members.png').default} style={{width: '100%'}}/>
                    <div class="card-data">
                        <Label className="mdl-select-main-menu-label fs-6 ms-1" for="mdl-select-main-menu">
                          Team
                        </Label>
                    </div>
                </div>
                <div className={`preset-item col${preset === 'projects' ? ' border border-primary' : ''}`} onClick={() => {setPreset('projects')}}>
                    <img class="shadow my-1" src={require('@src/assets/images/form-builder-svg/projects.png').default} style={{width: '100%'}}/>
                    <div class="card-data">
                        <Label className="mdl-select-main-menu-label fs-6 ms-1" for="mdl-select-main-menu">
                          Projects
                        </Label>
                    </div>
                </div>
                {/* <div className={`preset-item col${preset === 'portfolio' ? ' border border-primary' : ''}`} onClick={() => {setPreset('portfolio')}}>
                    <img class="shadow my-1" src={require('@src/assets/images/form-builder-svg/portfolio.png').default} style={{width: '100%'}}/>
                    <div class="card-data">
                        <Label className="mdl-select-main-menu-label fs-6 ms-1" for="mdl-select-main-menu">
                          Portfolio
                        </Label>
                    </div>
                </div> */}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="d-flex">
          <Button color='primary' outline className="add-todo-item me-1 align-self-end" onClick={() => {toggle(); initState();}}>
            Cancel
          </Button>
          <Button
            color="primary"
            className="add-todo-item me-1 align-self-end"
            disabled={!preset}
            onClick={() => {
              const currentTime = new Date().getTime();
              let pageName = '';
              let listHtml = '';
              let listStyle = '';
              let itemHtml = '';
              let itemStyle = '';
              let fields = [];
              let values = [];
              let fieldsOfConnection = [];
              if (preset === 'custom') {
                pageName = 'item';
                listStyle = itemsCss;
                itemHtml = itemsItemHtml(currentTime);
                itemStyle = itemsItemStyle;
                fields = itemsFields;
                values = itemsValues;
                fieldsOfConnection = itemsRepeaterItemChildrenIds(currentTime);
              }

              if (preset === 'team') {
                pageName = 'team';
                listStyle = teamCss;
                itemHtml = teamItemHtml(currentTime);
                itemStyle = teamItemStyle;
                fields = teamFields;
                values = teamValues;
                fieldsOfConnection = teamRepeaterItemChildrenIds(currentTime);
              }

              if (preset === 'projects') {
                pageName = 'projects';
                listStyle = projectsCss;
                itemHtml = projectItemHtml(currentTime);
                itemStyle = projectItemStyle;
                fields = projectsFields;
                values = projectsValues;
                fieldsOfConnection = projectsRepeaterItemChildrenIds(currentTime);
              }

              const tempPages = [];
              let maxPageNum = 0;
              store?.form?.formData?.map(fd => {
                if (fd.presetName && fd.presetName.includes(pageName)) {
                  tempPages.push(parseInt(fd.presetName.replace(pageName, ''), 10));
                  maxPageNum = Math.max(...tempPages);
                }
              });

              const dynamicPageName = `${pageName}-${maxPageNum + 1}`;
              const dynamicListPageName = `${dynamicPageName}-list`;
              const dynamicItemPageName = `${dynamicPageName}-item`;

              const dynamicListPagePath = '/'+store?.form?._id+'/'+dynamicListPageName;
              const dynamicItemPagePath = '/'+store?.form?._id+'/'+dynamicItemPageName;

              if (preset === 'custom') {
                listHtml = items(currentTime, dynamicItemPagePath);
              }

              if (preset === 'team') {
                listHtml = team_members(currentTime, dynamicItemPagePath);
              }

              if (preset === 'projects') {
                listHtml = projects(currentTime, dynamicItemPagePath);
              }

              const tempValues = [];
              values.map((v, vi) => {
                const itemId = vi + 1;
                tempValues.push({
                  ...v,
                  item: dynamicItemPagePath + '/item' + itemId,
                  list: dynamicListPagePath,
                });
              });
              values = tempValues;

              const dynamicListPagePayload={
                id: store?.form?._id,
                pageData:{
                  name: dynamicListPageName,
                  path: dynamicListPagePath,
                  step: store?.form?.formData?.length,
                  presetName: `${pageName}${maxPageNum + 1}`,
                },
                html: listHtml,
                style: listStyle,
              };

              const dynamicItemPagePayload={
                id: store?.form?._id,
                pageData:{
                  name: dynamicItemPageName,
                  path: dynamicItemPagePath,
                  step: store?.form?.formData?.length,
                  presetName: `${pageName}${maxPageNum + 1}`,
                },
                html: itemHtml,
                style: itemStyle,
              };

              dispatch(createDynamicPageAction(dynamicListPagePayload)).then((res)=>{
                const formData=[...store.form.formData, res];
                const _form={
                  ...store.form,
                  formData:formData
                };
                dispatch(setFormReducer(_form));
              });

              dispatch(createDynamicPageAction(dynamicItemPagePayload)).then((res)=>{
                const formData=[...store.form.formData, res];
                const _form={
                  ...store.form,
                  formData:formData
                };
                dispatch(setFormReducer(_form));
              });

              dispatch(createWebCollectionAction({websiteId: store.form._id, name: dynamicPageName, fields, values})).then((res) => {
                if (res.success) {
                  dispatch(createWebDatasetAction({collectionId: res.data._id, name: dynamicPageName})).then((dsres) => {
                    if (dsres.success) {
                      const connectionPayloads = [];
                      fieldsOfConnection.map(f => {
                        connectionPayloads.push({
                          ...f,
                          websiteId: store.form._id,
                          datasetId: dsres.data._id,
                        });
                      });
                      dispatch(createMultiConnectionsAction(connectionPayloads)).then((cores) => {
                        if (cores.success) {
                          editCollectionToggle(res.data);
                        }
                      });
                    }
                  });
                }
              });

              toggle();

            }}>
            Add
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default AddPresetModal;
