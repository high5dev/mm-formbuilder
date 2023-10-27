import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupText,
  Label
} from 'reactstrap';
import { updateOrgAction } from '../../../../store/action';
import {
  getOrgCustomDomain,
  registerCustomDomain,
  registerOrgCustomDomain,
  verifyCustomDomain,
  verifyOrgCustomDomain
} from '../../../../../shops/store/api';
import { toast } from 'react-toastify';

export default function SettingsTab({ selectedOrg, dispatch, store }) {
  const [form, setForm] = useState(selectedOrg);
  const [isValid, setIsValid] = useState(true);
  const { id } = useParams();

  const [customDomain, setCustomDomain] = useState();

  useEffect(() => {
    if (!selectedOrg || !selectedOrg.path) return;
    (async () => {
      const result = await getOrgCustomDomain(selectedOrg.path);
      if (result.status === 200) {
        setCustomDomain(result.data.dest);
      }
    })();
  }, [selectedOrg]);

  const handleInputChanged = (e) => {
    if (e.target.name === 'path') {
      const exists = store.myOrgs.filter((x) => x.path === e.target.value);
      if (exists.length > 0) {
        if (exists[0]._id === form._id) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } else {
        setIsValid(true);
      }
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(updateOrgAction(id, form));
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <CardTitle>Organization Details</CardTitle>
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter Org Name"
              value={form.name}
              onChange={handleInputChanged}
              disabled
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="text"
              name="email"
              placeholder="Enter Org Email"
              value={form.email}
              onChange={handleInputChanged}
              disabled
            />
          </div>
          <div>
            <Label>Contact</Label>
            <Input
              type="number"
              name="contact"
              placeholder="Enter Org Contact Number"
              value={form.contact}
              onChange={handleInputChanged}
              disabled
            />
          </div>
          <div>
            <Label>Full Address</Label>
            <Input
              type="text"
              name="address"
              placeholder="Enter Org Full Address"
              value={form.address}
              onChange={handleInputChanged}
              disabled
            />
          </div>
          <div>
            <Label>Location Signup Link</Label>
            <InputGroup>
              <InputGroupText>www.mymanager.com/</InputGroupText>
              <Input
                type="text"
                placeholder="Org Name"
                name="path"
                value={form.path}
                onChange={handleInputChanged}
                invalid={!isValid}
                valid={isValid}
                disabled
              />
              <InputGroupText>/signup</InputGroupText>
              <FormFeedback valid={isValid}>
                {isValid ? 'Sweet! Name is available' : 'Oh no! Name is taken'}
              </FormFeedback>
            </InputGroup>
          </div>
          <div>
            {customDomain !== undefined ? (
              <>
                {' '}
                <Label>Your custom domain</Label>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Org Name"
                    // name="path"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    // invalid={!isValid}
                    // valid={isValid}
                  />
                  <Button
                    onClick={async () => {
                      try {
                        const result = await registerOrgCustomDomain(form.path, customDomain);
                        if (result.status === 200) {
                          toast.success('Successfully registered');
                        }
                      } catch (e) {
                        toast.error('Domain registration failed');
                      }
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    onClick={async () => {
                      try {
                        const result = await verifyOrgCustomDomain(form.path, customDomain);
                        if (result.status === 200) {
                          toast.success('Successfully verified');
                        }
                      } catch (e) {
                        toast.error('Domain verification failed');
                      }
                    }}
                  >
                    Verify
                  </Button>
                </InputGroup>
              </>
            ) : (
              <Button onClick={() => setCustomDomain('')}>Add custom domain</Button>
            )}
          </div>
          <div className="d-flex justify-content-center mt-50">
            <p>To update organization details please contact support</p>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle>Admin of Organization</CardTitle>
        </CardBody>
      </Card>
    </Fragment>
  );
}
