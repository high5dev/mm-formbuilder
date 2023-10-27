import React from 'react';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';

export default function Pricing() {
  return (
    <div className="p-5 mx-5">
      <Row>
        <Col md="4">
          <Card className="h-100">
            <CardBody className="px-5">
              <div className="text-center">
                <h3>BASIC</h3>
                <h4 className="my-0 py-0">$ 147/mo</h4>
                <Button color="primary" className="my-1 w-100">
                  Start Free Trial
                </Button>
              </div>
              <div>
                <p>1 Website</p>
                <p>20 funnels</p>
                <p>1 Admin user</p>
                <p>1 Domain</p>
                <p>3 Courses</p>
                <p>1000 Students</p>
                <p>10000 Contacts</p>
                <p>Unlimited Workflow</p>
                <p>Unlimited Pages</p>
                <p>Unlimited Products</p>
                <p>Unlimited Email sequence</p>
                <p>Basic Analytics</p>
                <p>____</p>
                <p>____</p>
                <p>____</p>
                <p>____</p>
                <p>____</p>
              </div>
              <div className="text-center">
                <Button color="primary" className="my-1 w-100">
                  Start Free Trial
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card className="h-100">
            <CardBody className="px-5">
              <div className="text-center">
                <h3>Pro</h3>
                <h4 className="my-0 py-0">$ 197/mo</h4>
                <Button color="primary" className="my-1 w-100">
                  Start Free Trial
                </Button>
              </div>
              <div>
                <p>1 Website</p>
                <p>
                  <b>100</b> funnels
                </p>
                <p>
                  <b>5</b> Admin user
                </p>
                <p>
                  <b>3</b> Domain
                </p>
                <p>
                  <b>15</b> Courses
                </p>
                <p>
                  <b>10000</b> Students
                </p>
                <p>
                  <b>25000</b> Contacts
                </p>
                <p>Unlimited Workflow</p>
                <p>Unlimited Pages</p>
                <p>Unlimited Products</p>
                <p>Unlimited Email sequence</p>
                <p>Basic Analytics</p>
                <p>Affilite Program</p>
                <p>API Access</p>
                <p>Share Funnels</p>
                <p>Liquid theme editor</p>
                <p>CFI Maintenance mode plan</p>
              </div>
              <div className="text-center">
                <Button color="primary" className="my-1 w-100">
                  Start Free Trial
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card color="light-primary" className="text-light h-100">
            <CardBody className="px-5">
              <div className="text-center">
                <h3>Funnel Hacker</h3>
                <h6>
                  Normally<s> $ 497/mo</s>
                </h6>
                <h4>$ 297/mo</h4>
                <p className="my-0 py-0">(save $200/month)</p>
                <Button color="primary" className="my-1 w-100">
                  Start Free Trial
                </Button>
              </div>
              <div>
                <p>3 Website</p>
                <p><b>Unlimited</b> funnels</p>
                <p><b>15</b> Admin user</p>
                <p><b>9</b> Domains</p>
                <p>
                  <s>100</s> <b>200</b> Courses
                </p>
                <p><b>20000</b> Students</p>
                <p>
                  <s>100000</s> <b>200000</b> Contacts
                </p>
                <p>Unlimited Workflow</p>
                <p>Unlimited Pages</p>
                <p>Unlimited Products</p>
                <p>Unlimited Email sequence</p>
                <p><b>Advanced</b> Analytics</p>
                <p>Affilite Program</p>
                <p>API Access</p>
                <p>Share Funnels</p>
                <p>Liquid theme editor</p>
                <p>CFI Maintenance mode plan</p>
              </div>
              <div className="text-center">
                <Button color="primary" className="my-1 w-100">
                  Start Free Trial
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
