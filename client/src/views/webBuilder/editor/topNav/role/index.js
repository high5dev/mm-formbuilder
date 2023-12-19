import React, { useEffect, useState, useRef } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, UncontrolledTooltip } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { ChevronDown, ChevronLeft, HelpCircle, Info, MoreHorizontal, Plus, Settings } from 'react-feather';
import { createWebsiteRoleAction } from '../../../store/action';

const RoleModal = ({ store, isOpen, toggle }) =>{
  const dispatch = useDispatch();
  const [content, setContent] = useState('roles'); // roles, management, invite, newRole
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDsc, setNewRoleDsc] = useState('');
  const [permissions, setPermissions] = useState({});

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} centered size='xl'>
        <ModalHeader toggle={toggle} className="font-medium-5 px-2 py-1 modal-title text-primary">
          <h4 className='m-0'>Roles & Permissions</h4>
        </ModalHeader>
        <ModalBody className='p-0'>
          {
            content === 'roles' && (
              <>
                <div className='p-4 d-flex align-items-center' style={{backgroundColor: '#eceff3'}}>
                  <div>
                    <h2>Roles & Permissions</h2>
                    <h5 className='mb-0'>Invite collaborators to work on this site, assign them roles and set their permissions.</h5>
                  </div>
                  <Button color='primary' outline className='round ms-auto me-1' onClick={() => {setContent('management')}}>
                    <Settings size={15} className='me-1'/>
                    Manage Roles
                  </Button>
                  <Button color='primary' className='d-flex align-items-center round' onClick={() => {setContent('invite')}}>
                    <Plus size={15} className='me-1'/>
                    Invite Collaborators
                  </Button>
                </div>
                <div className='px-5 pb-3' style={{backgroundColor: '#eceff3'}}>
                  {
                    // TODO: Add user list with role from WebSiteInvite of backend
                  }
                </div>
              </>
            )
          }
          {
            content === 'management' && (
              <>
                <div className='px-4 pt-3 pb-2 d-flex align-items-center' style={{backgroundColor: '#eceff3'}}>
                  <ChevronLeft size={25} className='me-1' onClick={() => {setContent('roles')}}/>
                  <div>
                    <h2>Manage Roles</h2>
                    <h5 className='mb-0'>Create, view and edit roles & permissions for this site.</h5>
                  </div>
                  <Button color='primary' className='d-flex align-items-center round ms-auto' onClick={() => {setContent('newRole')}}>
                    <Plus size={15} className='me-1'/>
                    Create New Role
                  </Button>
                </div>
                <div className='px-5 pb-3' style={{backgroundColor: '#eceff3', minHeight: '40vh', maxHeight: '60vh', overflow: 'scroll'}}>
                  {
                    store.webRoles.map((role) => {
                      return (
                        <div className='p-2 d-flex align-items-center bg-white rounded border-bottom'>
                          <div>
                            <h4>{role.name}</h4>
                            <h6 className='mb-0'>{role.description}</h6>
                          </div>
                          <Button color='primary' className='d-flex align-items-center round ms-auto me-2' onClick={() => {}}>
                            View
                          </Button>
                          <MoreHorizontal size={18} />
                        </div>
                      );
                    })
                  }
                </div>
              </>
            )
          }
          {
            content === 'invite' && (
              <>
                <div className='px-4 pt-3 pb-2 d-flex align-items-center' style={{backgroundColor: '#eceff3'}}>
                  <ChevronLeft size={25} className='me-1' onClick={() => {setContent('roles')}}/>
                  <div>
                    <h2>Invite Collaborators</h2>
                    <h5 className='mb-0'>Invite people to collaborate on this site and set their roles and permissions.</h5>
                  </div>
                  <Button color='primary' outline className='round ms-auto me-1' onClick={() => {setContent('roles')}}>
                    Cancel
                  </Button>
                  <Button color='primary' className='d-flex align-items-center round' onClick={() => {}}>
                    Send Invite
                  </Button>
                </div>
                <div className='px-5 pb-3' style={{backgroundColor: '#eceff3'}}>
                  {
                    // TODO: new invite part
                  }
                </div>
              </>
            )
          }
          {
            content === 'newRole' && (
              <div style={{backgroundColor: '#eceff3', height: '80vh'}}>
                <div className='px-4 pt-3 pb-2 d-flex align-items-center'>
                  <ChevronLeft size={25} className='me-1' onClick={() => {setContent('management')}}/>
                  <div>
                    <h2 className='m-0'>{newRoleName || 'Untitled Role'}</h2>
                  </div>
                  <Button color='primary' outline className='round ms-auto me-1' onClick={() => {setContent('management')}}>
                    Cancel
                  </Button>
                  <Button color='primary' className='d-flex align-items-center round' disabled={!newRoleName} onClick={() => {
                    dispatch(createWebsiteRoleAction({
                      name: newRoleName,
                      description: newRoleDsc,
                      permissions,
                      websiteId: store?.form?._id,
                    }))
                    setContent('management');
                    }}>
                    Save
                  </Button>
                </div>
                <div className='px-5 pb-3 d-flex flex-column flex-1'>
                  <div className='bg-white rounded mb-2'>
                    <div className='p-2 d-flex align-items-center'>
                      <div>
                        <h4>Role details</h4>
                        <h6 className='mb-0'>Give this role a title and a short description.</h6>
                      </div>
                    </div>
                    <hr className='m-0'/>
                    <div className='p-2'>
                      <div className='d-flex mb-1 align-items-center'>
                        <Label className='me-2' style={{width: 100}}>Role Title *</Label>
                        <Input id='roleTitle' className='w-50' type="text" placeholder='Untitled Role' value={newRoleName} onChange={(e) => {
                          setNewRoleName(e.target.value)
                        }} />
                      </div>
                      <div className='d-flex align-items-start'>
                        <Label className='me-2 mt-1' style={{width: 100}}>Description</Label>
                        <Input id='roleTitle' className='w-50' type='textarea' placeholder='What is this role used for' value={newRoleDsc} onChange={(e) => {
                          setNewRoleDsc(e.target.value)
                        }} />
                      </div>
                    </div>
                  </div>
                  <div className='bg-white rounded'>
                    <div className='p-2 d-flex align-items-center'>
                      <div>
                        <h4>Permissions</h4>
                        <h6 className='mb-0'>Select which actions people with this role can perform.</h6>
                      </div>
                    </div>
                    <hr className='m-0'/>
                    <div className='p-2' style={{height: '25vh', overflow: 'scroll'}}>
                      <div className='d-flex mb-2'>
                        <Input id='roleTitle' className='me-2' type="checkbox" placeholder='Untitled Role' checked={permissions.edit_content} onChange={(e) => {
                          setPermissions({...permissions, edit_content: e.target.checked});
                        }} />
                        <div>
                          <h4>Edit Content</h4>
                          <h6 className='mb-0'>Can edit text, links and media sources. In older versions of the Editor, this is equivalent to the Edit Site permission.</h6>
                        </div>
                      </div>
                      <div className='d-flex mb-2'>
                        <Input id='roleTitle' className='me-2' type="checkbox" placeholder='Untitled Role' checked={permissions.edit_site} onChange={(e) => {setPermissions({...permissions, edit_site: e.target.checked});}} />
                        <div>
                          <h4>Edit Site</h4>
                          <h6 className='mb-0'>Can edit content, site design and app settings.</h6>
                        </div>
                      </div>
                      <div className='d-flex mb-2'>
                        <Input id='roleTitle' className='me-2' type="checkbox" placeholder='Untitled Role' checked={permissions.publish_site} onChange={(e) => {setPermissions({...permissions, publish_site: e.target.checked});}} />
                        <div>
                          <h4>Publish Site</h4>
                          <h6 className='mb-0'>Can publish site. ‘Edit Content’ or ‘Edit Site’ permissions are also required.</h6>
                        </div>
                      </div>
                      <div className='d-flex mb-2'>
                        <Input id='roleTitle' className='me-2' type="checkbox" placeholder='Untitled Role' checked={permissions.invite_people} onChange={(e) => {setPermissions({...permissions, invite_people: e.target.checked});}} />
                        <div>
                          <h4>Invite People</h4>
                          <h6 className='mb-0'>Can invite people to work on a site, but can't edit their permissions.</h6>
                        </div>
                      </div>
                      <div className='d-flex mb-2'>
                        <Input id='roleTitle' className='me-2' type="checkbox" placeholder='Untitled Role' checked={permissions.view_content} onChange={(e) => {setPermissions({...permissions, view_content: e.target.checked});}} />
                        <div>
                          <h4>View Content</h4>
                          <h6 className='mb-0'>Can view content in collections.</h6>
                        </div>
                      </div>
                      <div className='d-flex mb-2'>
                        <Input id='roleTitle' className='me-2' type="checkbox" placeholder='Untitled Role' checked={permissions.add_content} onChange={(e) => {setPermissions({...permissions, add_content: e.target.checked});}} />
                        <div>
                          <h4>Add Content</h4>
                          <h6 className='mb-0'>Can add and edit content in existing collections.</h6>
                        </div>
                      </div>
                      <div className='d-flex mb-2'>
                        <Input id='roleTitle' className='me-2' type="checkbox" placeholder='Untitled Role' checked={permissions.manage_collections} onChange={(e) => {setPermissions({...permissions, manage_collections: e.target.checked});}} />
                        <div>
                          <h4>Manage Collections</h4>
                          <h6 className='mb-0'>Can add, delete and modify fields for all collections.</h6>
                        </div>
                      </div>
                      <div className='d-flex mb-2'>
                        <Input id='roleTitle' className='me-2' type="checkbox" placeholder='Untitled Role' checked={permissions.manage_site_members} onChange={(e) => {setPermissions({...permissions, manage_site_members: e.target.checked});}} />
                        <div>
                          <h4>Manage Site Members</h4>
                          <h6 className='mb-0'>Can manage, approve and block site members.</h6>
                        </div>
                      </div>
                      <div className='d-flex mb-2'>
                        <Input id='roleTitle' className='me-2' type="checkbox" placeholder='Untitled Role' checked={permissions.manage_blog} onChange={(e) => {setPermissions({...permissions, manage_blog: e.target.checked});}} />
                        <div>
                          <h4>Manage Blog</h4>
                          <h6 className='mb-0'>Can manage all settings, posts, and categories.</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </ModalBody>
      </Modal>
    </>
  );
}

export default RoleModal;
