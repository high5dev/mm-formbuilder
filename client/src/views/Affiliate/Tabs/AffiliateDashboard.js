// ** React Imports
import React, { Fragment, useContext, useEffect, useState } from 'react';
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  InputGroup,
  InputGroupText,
  Input,
  Button,
  DropdownToggle,
  Collapse,
  Table
} from 'reactstrap';
import { renderClient } from '../../../utility/Utils';

import { FaUserCircle, FaCheck } from 'react-icons/fa';
import { FaSquareTwitter, FaSquareFacebook } from 'react-icons/fa6';
import { FaCaretDown } from 'react-icons/fa';
const AffiliateDashboard = () => {
  const [LinkOpen, setLinkOpen] = useState(false);
  const [showmore, setShowmore] = useState(false);
  return (
    <Fragment>
      <Row className=" g-1">
        {/* <Col sm={12}>
          <Card>
            <CardBody className=" d-flex">
              <div className="h5 me-50">{'Viewing:'}</div>
              <div className="d-flex row justify-content-between flex-1">
                <div className="h4 text-primary" style={{ maxWidth: 'fit-content' }}>
                  {'HighLevel Affiliate Program'}
                </div>
                <div
                  className="text-primary text-decoration-underline cursor-pointer h5"
                  style={{ maxWidth: 'fit-content' }}
                >{`View another campaign`}</div>
              </div>
            </CardBody>
          </Card>
        </Col> */}
        <Col sm={12}>
          <Card>
            <CardBody>
              <Row className="align-items-center d-flex justify-content-center g-1">
                <Col sm={12} md={6} lg={6} style={{ maxWidth: 'fit-content' }}>
                  <div className=" flex-column text-center align-items-center">
                    <div className="ms-1 mb-50">
                      {renderClient({ fullName: 'Cai HongChi', size: 'xl' })}
                    </div>
                  </div>
                </Col>
                <Col sm={12} md={4} lg={3}  >
                  <div className=" d-flex  text-center justify-content-center ">
                    <div className=' col-6 pe-1'>
                      <div  className="h1 text-primary">
                        {'0'}
                      </div>
                      <div  className=" text-muted">
                        <strong>{'REFERRALS'}</strong>
                      </div>
                    </div>
                    <div  className='border-start ps-1 col-6'>
                      <div  className="h1 text-primary">
                        {'0'}
                      </div>
                      <div className=" text-muted">
                        <strong>{'CUSTOMERS'}</strong>
                      </div>
                    </div>
                  </div>
                  <div className=" d-flex  text-center justify-content-center align-items-center pt-50 ">
                    <div className=' col-6 pe-1'>
                      <div  className="h1 text-primary">
                        {'1'}
                      </div>
                      <div  className=" text-muted">
                        <strong>{'CLICKS'}</strong>
                      </div>
                    </div>
                    <div  className='border-start ps-1 col-6'>
                      <div  className="h1 text-primary">
                        {'0'}
                      </div>
                      <div  className=" text-muted">
                        <strong>{'UNPAID EARNINGS'}</strong>
                      </div>
                    </div>
                  </div>
                  
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col sm={12}>
          <Card>
            <CardBody className=" flex-column">
              <div className=" d-flex row g-50 align-items-center justify-content-center  border-bottom p-2">
                <div className="text-info" style={{ maxWidth: 'fit-content' }}>
                  <FaUserCircle size={80} />
                </div>
                <div className="h4 text-center" style={{ maxWidth: 'fit-content' }}>
                  {`You get `} <strong>{' 40% recurring commission '}</strong>{' '}
                  {'referring customers to'} <strong>{' HighLevel plans '}</strong>
                </div>
              </div>
              <div className=" d-flex align-items-center text-center justify-content-center p-2">
                <div className="h4">
                  {`Recruit affiliates and get `} <strong>{' 5% override commission '}</strong>{' '}
                  {'from their earnings'}
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm={12}>
          <Card>
            <CardBody className=" flex-column">
              <div className=" d-flex justify-content-center mb-1 align-items-center h4">
                <strong>{'Share on social media'}</strong>
              </div>
              <div className="d-flex justify-content-center align-items-center mb-2">
                <div className="me-50 text-primary cursor-pointer">
                  <FaSquareFacebook size={50} />
                </div>
                <div className="text-info cursor-pointer">
                  <FaSquareTwitter size={50} />
                </div>
              </div>
              <div className=" d-flex g-50 row justify-content-center mb-1 align-items-center mb-1 h4">
                <strong className="px-0 text-center" style={{ width: 'fit-content' }}>
                  {'Share this referral link to your friends and followers '}
                </strong>
                <strong
                  className="px-0 text-center"
                  style={{ minWidth: 'fit-content', width: 'fit-content' }}
                >
                  {'('}
                  <a className="text-decoration-underline text-primary cursor-pointer">
                    {' customize link '}
                  </a>
                  {')'}
                </strong>
              </div>
              <div className=" d-flex justify-content-center mb-1 align-items-center">
                <InputGroup size="lg row g-1">
                  <Button
                    size="md "
                    className=" d-flex align-items-center justify-content-center px-50 col-sm-12 col-md-1 col-12 order-sm-3 order-md-1 order-3 rounded text-center"
                    onClick={() => {
                      setLinkOpen(!LinkOpen);
                    }}
                  >
                    <strong className="me-50">{'Link'}</strong>
                    <small className="me-50">{`(${4})`}</small>
                      <FaCaretDown size={18} />
                  </Button>
                  <Input className='col-sm-12 col-12 col-md-10 order-sm-1 order-md-2 order-1' bsSize={'lg'} type={'url'} disabled value={`https://www.gohighlevel.com/?fp_ref=cai28`}></Input>
                  <Button size="md" className='px-50 col-sm-12 col-md-1 col-xs-12 col-12 order-sm-2 order-md-3 order-2 rounded' color="primary">
                    Copy
                  </Button>
                </InputGroup>
              </div>
              <div className=" d-flex justify-content-center text-center mb-1 align-items-center">
                {`Click the "Links" button above to view all available referral links. You can also create your own links with sub-ids.`}
              </div>
              <Collapse isOpen={LinkOpen}>
                <Table striped className="mb-1">
                  <thead>
                    <tr>
                      <th>
                        <strong className="h4 ">{'Link'}</strong>
                      </th>
                      <th>
                        <strong className="h4">{'SubId	'}</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <div className="text-decoration-underline text-primary cursor-pointer h5">{`Default`}</div>
                      </th>
                      <td>
                        <div className=" text-success">
                          <FaCheck />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <div className="text-decoration-underline text-primary cursor-pointer h5">{`Link to Refer People to the HighLevel Starter Annual Plan`}</div>
                      </th>
                      <td>
                        <div className="text-primary cursor-pointer h5">{`Select`}</div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <div className="text-decoration-underline text-primary cursor-pointer h5">{`Link to Refer People to the HighLevel Starter OR Unlimited Annual Plans`}</div>
                      </th>
                      <td>
                        <div className="text-primary cursor-pointer h5">{`Select`}</div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <div className=" d-flex justify-content-center mb-1">
                  <Button className="me-2" color={'primary'}>
                    Add Link
                  </Button>
                  <Button
                    color={'primary'}
                    outline
                    onClick={() => {
                      setLinkOpen(false);
                    }}
                  >
                    {' '}
                    Cance
                  </Button>
                </div>
                <div className=" d-flex justify-content-center mb-1 align-items-center text-center">
                  {`Click 'Select' to make the link easier to copy and to share by email or on social media. Tracking for the other links will not be affected.`}
                </div>
              </Collapse>
            </CardBody>
          </Card>
        </Col>
        <Col sm={12}>
          <Card>
            <CardBody className=" flex-column">
              <div className=" d-flex justify-content-center h3 mb-2">
                <strong>Frequently Asked Questions</strong>
              </div>
              <div className="mb-3">
                <div>
                  <strong>{`Can I sign up using my own referral link?`}</strong>
                </div>
                <div>
                  {' '}
                  Payments are released on the 10th to 15th of every month. Check out ou{' '}
                  <a className="text-primary text-decoration-underline cursor-pointer">
                    {' Affiliate Payment Article'}
                  </a>{' '}
                  for all frequently asked questions about payments.
                </div>
              </div>
              <Collapse isOpen={showmore}>
                <div className="mb-1">
                  <div>
                    <strong>{`Can I sign up using my own referral link?`}</strong>
                  </div>
                  <div>
                    No. Self-referrals are strictly prohibited. The aim of a referral program is to
                    encourage affiliates to spread the word about HighLevel, not to get discounts.
                  </div>
                </div>
                <div className="mb-1">
                  <div>
                    <strong>{`Can I sign up using my own referral link?`}</strong>
                  </div>
                  <div>
                    No. Self-referrals are strictly prohibited. The aim of a referral program is to
                    encourage affiliates to spread the word about HighLevel, not to get discounts.
                  </div>
                </div>
                <div className="mb-1">
                  <div>
                    <strong>{`Can I sign up using my own referral link?`}</strong>
                  </div>
                  <div>
                    No. Self-referrals are strictly prohibited. The aim of a referral program is to
                    encourage affiliates to spread the word about HighLevel, not to get discounts.
                  </div>
                </div>
                <div className="mb-1">
                  <div>
                    <strong>{`Can I sign up on behalf of my clients through my own referral link?`}</strong>
                  </div>
                  <div>
                    Customers must sign up for HighLevel themselves to confirm the terms &
                    conditions. If they need help signing up, we recommend guiding them through
                    clicking your link and signing up using their computer.
                  </div>
                </div>
                <div className="mb-1">
                  <div>
                    <strong>{`My friend/client signed up without using the referral link. What can I do?`}</strong>
                  </div>
                  <div>
                    Have them reach out to our 24/7 support team while they're still in trial. Visit
                    <a className="text-primary text-decoration-underline cursor-pointer">
                      {' https://gohighlevel.com/support '}
                    </a>{' '}
                    for more information about how to contact support. They will need their login
                    email and your affiliate link.
                  </div>
                </div>
              </Collapse>
              <div
                className="text-primary text-decoration-underline cursor-pointer h4 text-center"
                onClick={() => {
                  setShowmore(!showmore);
                }}
              >
                {showmore ? 'Show Less' : 'Show More'}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default AffiliateDashboard;
