import React, { useEffect, useState, useRef } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
export default function Index({store, isOpen, toggle}) {
  const [emails, setEmails]=useState([]);
  const [roles, setRoles]=useState([]);
  const [selectedRoles, setSelectedRoles]=useState([]);
  const defaultRoles=[
    {
        name:"Owner",
        description:"Has access to edit, publish and manage site, including billing, payment & financial info, domains and inviting people"
    },
    {
        name:"Manager",
        description:"Has access to manage, edit & publish site, but cannot manage billing, delete, duplicate or transfer site."
    },
    {
        name:"Designer",
        description:"Can edit the site, manage settings and apps but cannot access Inbox, contacts and other sensitive info."
    },
    {
        name:"SEO",
        description:"Can connect and manage domains but cannot make purchases"
    },
    {
        name:"Marketing",
        description:"   Can manage all marketing tools, contacts, automation, and view site analytics."
    }
  ]
  const _toggle = () => {
    toggle(!isOpen);

  };

  function isValidEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  const onEmailChange =(e) =>{
    const _emails=e.target.value.split(',');
    setEmails([..._emails]);
  };


  const onRoleChange =(e, i) =>{
    let temp_roles=selectedRoles;
    if(e.target.checked){
        temp_roles.push(roles[i]);
    }
    else{
      temp_roles.splice(i, 1);
    }
    setSelectedRoles([...temp_roles]);
  }

  const sendInvite =() =>{
    let isValid=true;
    if(!emails.length){
        isValid=false;
        toast.error('Please input an email');
        return;
    }
    else{
        for(let i=0; i<emails.length; i++){
            if(!isValidEmail(emails[i])){
                toast.error('Please input emails correctly');
                isValid=false;
                break;
            }  
        };
        if(isValid){
            if(!selectedRoles.length){
                isValid=false;
                toast.error('Please select roles');  
                return
            }
            else{
            }
        }
    }
  }

  useEffect(() =>{
    setRoles([...defaultRoles]);
  }, [])

  return (
    <>
      <Modal isOpen={isOpen} toggle={_toggle} centered size="lg">
        <ModalHeader toggle={_toggle} className="font-medium-5 p-2 modal-title text-primary">
          <span className='fs-3 fw-bold'>Invite Collaborators</span>
        </ModalHeader>
        <ModalBody className="">
             <span className='fs-4 fw-bold'>Emails</span>
             <p>To add multiple invitees, enter each email separated by a comma.</p>
             <Row>
                <Col md={8}>
                    <Input type='text' placeholder="name@example.com" onChange={onEmailChange}/>
                </Col>
                <Col md={4}>
                   <Button color='primary' onClick={()=>sendInvite()}>Send Invite</Button>
                </Col>
             </Row>
           
            <div className='mt-3'>
                <div>
                    <span className='fs-4 fw-bold'>Role(s) *</span>
                    <p>Select one or more roles for the people you're inviting.</p>
                </div>
            </div>
            <div>
                {roles && roles.map((role, index) =>{
                    return(
                        <div className="role-item">
                        <div className="d-flex align-items-center">
                            <input type="checkbox" className="form-check-input" onChange={(e) =>onRoleChange(e, index)}/>
                            <span className='rolename fs-5 fw-bold'>{role.name}</span>
                        </div>
                        <div className='role-description mt-1'>
                            {role.description}
                        </div>
                    </div>
                    )
                })}
            </div>
        </ModalBody>
      </Modal>
    </>
  );
}
