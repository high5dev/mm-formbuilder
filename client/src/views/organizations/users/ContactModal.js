import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import ContactsTable from './ContactsTable';
import SelectedContactsTable from './SelectedContactsTable';

import {
  Badge,
  Button,
  Col,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from 'reactstrap';


import { useDispatch, useSelector } from 'react-redux';


const ContactModal = (props) => {
  const { contactsModal, setContactsModal, toggle, active ,recipients,setRecipients } = props;
  
  const [contactData, setContactData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [colors, setColors] = useState([]);

  const dispatch = useDispatch();
  const totalStore = useSelector((state) => state.totalContacts);

  const handleTabChanged = (value) => {
    const contacts = totalStore.contactList.list

    setContactData(contacts.filter(x=>x.contactType.includes(value)));
  };
  const handleSelectRowChanged = (state) => {
    setSelectedData(state.selectedRows);
  };
  
  const handleApply = () => {
    if (selectedData.length > 0) {
      let temp = selectedData;
      let r = recipients;
      temp = temp.map((x) => {
        let b = x;
        return {
          ...x,
          
          active: false,
          name: b.fullName,
          id: b._id,

        };
      });
      if (r.length > 0) {
        r = r.filter((x) => x.name !== '');
      }
      if (r.length === 0) {
        temp[0].active = true;
      }
      setRecipients([...r, ...temp]);
    }
    setContactsModal(!contactsModal);
  };
  
  useEffect(() => {
    setContactData(totalStore.contactList.list.filter(x=>x.contactType._id===totalStore.contactTypeList[0]._id));
  }, [totalStore]);

  useEffect(() => {
    if (recipients.length > 0) {
      let temp = [];
      for (const r of recipients) {
        temp.push(r.color);
      }
      setColors(temp);
    }
  }, []);

  return (
    <div>
      <Modal
        isOpen={contactsModal}
        className="modal-lg"
        toggle={() => setContactsModal(!contactsModal)}
      >
        <ModalHeader toggle={() => setContactsModal(!contactsModal)}>
          Select Recipients From Contacts
        </ModalHeader>
        <ModalBody>
          <Nav tabs>
            <NavItem>
              <NavLink
                active={active === '1'}
                onClick={() => {
                  toggle('1');
                }}
              >
                My Contacts
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === '2'}
                onClick={() => {
                  toggle('2');
                }}
              >
                Selected ({selectedData.length})
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent className="py-50" activeTab={active}>
            <TabPane tabId="1">
              <Row>
                <Col md={4}>
                  <ListGroup tag="div" className="list-group-labels">
                  {
                      totalStore?.contactTypeList?.map((x,idx) =>{
                        return (
                          <ListGroupItem key={idx}
                          tag={Link}
                  
                          action
                          onClick={() => handleTabChanged(x._id)}
                        >
                          <span className="bullet bullet-sm bullet-warning me-1"></span>
                          {x?.name}
                          <Badge className="float-end" color="light-primary" pill>
                            {totalStore?.contactList.list.filter(y=>y.contactType.includes(x._id).length)}
                          </Badge>
                        </ListGroupItem>
                        )
                      })
                    }
                  </ListGroup>
                </Col>
                <Col md={8}>
                  <ContactsTable
                    data={contactData}
                    handleSelectRowChanged={handleSelectRowChanged}
                  />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <SelectedContactsTable data={selectedData} />
            </TabPane>
          </TabContent>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleApply}>
            Apply Selected
          </Button>
          <Button color="flat-danger" onClick={() => setContactsModal(!contactsModal)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ContactModal;
