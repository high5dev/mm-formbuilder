import React, { useState } from 'react';
import {
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row
} from 'reactstrap';

import { Copy } from 'react-feather';

//import { searchDomainAvailableAction } from '../../../../../store/action';
// import {
//   registerFormCustomDomain,
//   verifyFunnelCustomDomain
// } from '../../../../../../shops/store/api';
import { toast } from 'react-toastify';

export default function ConnectDomainTab({ dispatch, store }) {
  const organization = JSON.parse(localStorage.getItem('organization'));
  const [domain, setDomain] = useState();
  // const handleSearchDomain = () => {
  //   dispatch(searchDomainAvailableAction(domain)).then((res) => {
  //     if (res?.success === true) {
  //       if (res?.data?._pendingData.startsWith('DOMAIN')) {
  //         //console.log('available to connect')
  //       }
  //     }
  //   });
  // };

  const handleCopyUrl = (step) => {
    navigator.clipboard.writeText(
      `https://${organization ? organization.path : 'me'}.mymanager.com/web-preview/${
        store.form._id
      }&path=${step.path}`
    );
    toast.success('URL copied!');
  };

  return (
    <div className="p-1">
      <Container>
        <h2>Add a custom domain to your form</h2>
        {store.form &&
          store?.form?.formData?.map((step) => {
            return (
              <>
                <Row>
                  <Col lg={6} md={6} sm={12}>
                    <div className="d-flex justify-content-between mt-1 mb-2">
                      <InputGroup size="md">
                        <Input
                          value={`https://${
                            organization ? organization.path : 'me'
                          }.mymanager.com/web-preview/${store.form._id}&path=${step.path}`}
                          disabled="true"
                        />
                        <InputGroupText>
                          <Button color="link" className="p-0" onClick={() => handleCopyUrl(step)}>
                            <Copy />
                          </Button>
                        </InputGroupText>
                      </InputGroup>
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <div className="mb-2">
                      <Label>Custom Domain</Label>
                      <Input
                        placeholder="Enter a custom Domain"
                        type="text"
                        required
                        onChange={(e) => setDomain(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
                <div style={{ marginBottom: '10px' }}>
                  <Button
                    color="primary"
                    className="mb-1"
                    onClick={async () => {
                      try {
                        // const result = await registerFormCustomDomain(
                        //   `https://${
                        //     organization ? organization.path : 'me'
                        //   }.mymanager.com/web-preview/${store.form._id}&path=${step.path}`,
                        //   domain
                        // );
                        if (result.status === 200) {
                          toast.success('Successfully registered');
                        }
                      } catch (e) {
                        toast.error('Domain registration failed');
                      }
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    color="primary"
                    className="mb-1"
                    onClick={async () => {
                      try {
                        // const result = await verifyFunnelCustomDomain(
                        //   `https://${
                        //     organization ? organization.path : 'me'
                        //   }.mymanager.com/web-preview/${store.form._id}&path=${step.path}`,
                        //   domain
                        // );
                        // if (result.status === 200) {
                        //   toast.success('Successfully verified');
                        // }
                      } catch (e) {
                        toast.error('Domain verification failed');
                      }
                    }}
                  >
                    Verify
                  </Button>
                </div>
              </>
            );
          })}
        <p>
          TIn order for your custom domain to work you'll need to log in to where you bought your
          domain and add a CNAME record that points www at target.clickfunnels.com. If you are not
          sure how to do this, please contact with support team.
        </p>
      </Container>
    </div>
  );
}
