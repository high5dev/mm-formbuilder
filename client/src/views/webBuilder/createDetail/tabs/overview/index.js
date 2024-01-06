// ** React Imports
import { useHistory, useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge
} from 'reactstrap';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ResponsiveContainer
} from 'recharts';
// ** Third Party Components
import { ImAddressBook } from 'react-icons/im';
import { FiUser, FiUsers } from 'react-icons/fi';
import { MdOutlineDomainAdd, MdDriveFileRenameOutline  } from "react-icons/md";
import { FaInternetExplorer } from 'react-icons/fa';
import { BsArrowLeftShort, BsArrowRightShort, BsGraphUp } from 'react-icons/bs';
import DataTable from 'react-data-table-component';
import { Edit, Eye, File, FileText, Menu, MoreVertical, Share, Trash, Upload } from 'react-feather';

// ** Styles
import '@styles/react/apps/app-email.scss';
import moment from 'moment';

const OverviewStep = ({ store, isMobileView, isTabletView, dispatch }) => {
  const chartWidth = isMobileView ? window.innerWidth - 40 : 900;
  const chartHeight = isMobileView ? 250 : 400;
  const chartData = [
    { key: 0, month: 'Jan', value: 100 },
    { key: 1, month: 'Feb', value: 30 },
    { key: 2, month: 'march', value: 40 },
    { key: 3, month: 'Apr', value: 0 },
    { key: 4, month: 'May', value: 0 },
    { key: 5, month: 'June', value: 0 },
    { key: 6, month: 'Jul', value: 0 },
    { key: 7, month: 'Aug', value: 0 },
    { key: 8, month: 'Sept', value: 0 },
    { key: 9, month: 'Oct', value: 0 },
    { key: 10, month: 'Nov', value: 0 },
    { key: 11, month: 'Dec', value: 0 }
  ];
  return (
    <>
      {store && (
        <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
          <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
            <div className="tasks-border">
              <div className="tasks-area" style={{ maxWidth: '100%', width: '100%' }}>
                <div className="">
                  <div className="px-1 pt-1">
                    <Row>
                      <Col md="8">
                        <Card className="cursor-pointer">
                          <CardBody>
                            <div className="d-flex justify-content-between">
                              <span className='fs-4'>Analytics</span>
                            </div>
                            <Row>
                              <Col md={6}>
                                <div className='p-1'>
                                  <div className="d-flex align-items-center">
                                    <div>Pages</div>
                                    <span className="fw-bold ms-3 text-primary">2</span>
                                  </div>
                                    <div className="mt-1 fw-bold">Viewed Amount Per Page</div>
                                    <div className="d-flex align-items-center py-1">
                                      <div>Home Page</div>
                                      <span className="fw-bold ms-3 text-primary">2</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <div>Contact Page</div>
                                      <span className="fw-bold ms-3 text-primary">2</span>
                                    </div>
                                </div>
                              </Col>
                              <Col md={6}>
                                <div>
                                  <div className="d-flex align-items-center">
                                    <div>Forms</div>
                                    <span className="fw-bold ms-3 text-primary">2</span>
                                  </div>
                                  <div className="mt-1 fw-bold">Filled Amount Per Form</div>
                                  <div className="">
                                    <div className="d-flex align-items-center py-1">
                                      <div>Form1</div>
                                      <span className="fw-bold ms-3 text-primary">2</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <div className=''>Form2</div>
                                      <span className="fw-bold ms-3 text-primary">2</span>
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col md="4">
                        <Card className="cursor-pointer">
                            <CardBody>
                              <div className="d-flex justify-content-between">
                                <span>Rename Website</span>
                                <span>
                                  <MdDriveFileRenameOutline  size={30} />
                                </span>
                              </div>
                            </CardBody>
                          </Card>
                          <Card className="cursor-pointer">
                            <CardBody>
                              <div className="d-flex justify-content-between">
                                <span>Connect Domain</span>
                                <span>
                                  <MdOutlineDomainAdd size={30} />
                                </span>
                              </div>
                            </CardBody>
                          </Card>
                      </Col>
                    </Row>
                  </div>
                  <div className="px-1 pt-1">
                    <Row>
                      <Col md="4">
                        <Card className="cursor-pointer">
                          <CardBody>
                            <div className="d-flex justify-content-between">
                              <span>Site viewed</span>
                              <span>
                                <FiUsers size={30} />
                              </span>
                            </div>
                            <div className="fw-bold">100</div>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col md="4">
                        <Card className="cursor-pointer">
                          <CardBody>
                            <div className="d-flex justify-content-between">
                              <span>Unique Visitors</span>
                              <span>
                                <FiUser size={30} />
                              </span>
                            </div>
                            <div className="fw-bold">52</div>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col md="4">
                        <Card className="cursor-pointer">
                          <CardBody>
                            <div className="d-flex justify-content-between">
                              <span>Connect to GSC</span>
                              <span>
                                <FaInternetExplorer size={30} />
                              </span>
                            </div>
                            <div style={{ height: '20px' }}></div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                  <div className="px-1 pt-1">
                    <Row>
                      <Col md="12">
                        <Card className="cursor-pointer">
                          <CardBody>
                            <div className="d-flex justify-content-between">
                              <span>Activity Feed</span>
                            </div>
                            <div className="d-flex align-items-center mt-2 text-center justify-content-around">
                              No recent activity to show
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                  <div className="px-1 pt-1 mt-1">
                    <Row>
                      <Col md="12" xl="12">
                        <Card className="cursor-pointer">
                          <CardBody>
                            <div>
                              <div className="d-flex">
                                <BsGraphUp size={18} className="light-primary" />
                                <h4 style={{ marginLeft: '10px' }}>Business Report</h4>
                              </div>
                              <span>Yearly Business Overview</span>
                            </div>
                            <div className='d-flex justify-content-around'>
                                <div className='d-flex'>
                                                                    <div className='d-flex flex-column align-items-center justify-content-around site' style={{width:'80px', height:'80px', border:'1px solid blue', borderRadius:'10%'}}>
                                        <div>
                                            Site
                                        </div>
                                        <FiUsers size={20} />

                                </div>
                                <div className='d-flex flex-column align-items-center justify-content-around site ms-2' style={{width:'80px', height:'80px', border:'1px dashed lightgray', borderRadius:'10%'}}>
                                        <div>
                                            Visitors
                                        </div>
                                        <FiUsers size={20} />
                                </div>
                                </div>
                              </div>
                            <div className="d-flex justify-content-around mt-2">
                              <div>
                                <ResponsiveContainer width={800} aspect={2.8}>
                                  <BarChart
                                    id="unique-chart"
                                    width={chartWidth}
                                    height={chartHeight}
                                    data={chartData}
                                  >
                                    <CartesianGrid
                                      stroke="rgb(218 218 218)"
                                      strokeDasharray="0"
                                      horizontal={true}
                                      vertical={false}
                                    />
                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                    <YAxis />
                                    <Bar dataKey="value" barSize={25}>
                                      {chartData.map((entry, index) => (
                                        <Cell key={index} fill={'rgb(1, 132, 255)'} />
                                      ))}
                                    </Bar>
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default OverviewStep;
