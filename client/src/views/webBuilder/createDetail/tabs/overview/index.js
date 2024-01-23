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
  Badge,
  Label,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody
} from 'reactstrap';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie
} from 'recharts';
// ** Third Party Components
import { ImAddressBook } from 'react-icons/im';
import { FiUser, FiUsers } from 'react-icons/fi';
import { MdOutlineDomainAdd, MdDriveFileRenameOutline } from 'react-icons/md';
import { FaInternetExplorer } from 'react-icons/fa';
import { BsArrowLeftShort, BsArrowRightShort, BsGraphUp } from 'react-icons/bs';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import {
  Edit,
  Eye,
  File,
  FileText,
  Menu,
  MoreVertical,
  Share,
  Trash,
  Upload,
  ChevronDown
} from 'react-feather';
const Data = [
  { value: 2, amount: 3 },
  { value: 6, amount: 4 },
  { value: 9, amount: 36 },
  { value: 21, amount: 3 },
  { value: 54, amount: 2 },
  { value: 17, amount: 9 }
];
// ** Styles
import '@styles/react/apps/app-email.scss';

const OverviewStep = ({ store, isMobileView, isTabletView, dispatch }) => {
  const formHistory = store?.formHistory;
  const childForms = store?.childForms;
  const [tab, setTab] = useState('Site');
  const [openConnectDomainnModal, setOpenConnectDomainnModal] = useState(false);
  const entryFilled = store?.formHistory?.entryFilled;
  let newEntry = [];
  entryFilled &&
    entryFilled.map((_form) => {
      const formId = _form._id;
      childForms &&
        childForms.map((_childForm) => {
          if (_childForm._id === formId) {
            newEntry.push({
              name: _childForm.name,
              amount: _form.count
            });
          }
        });
    });
  const pages = store?.form?.formData;
  const chartWidth = isMobileView ? window.innerWidth - 40 : 900;
  const chartHeight = isMobileView ? 250 : 400;
  let chartSiteViewedData = [];
  const months = [
    'Jan',
    'Feb',
    'March',
    'Apr',
    'May',
    'June',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ];
  formHistory?.countPerMonthSiteViewed &&
    formHistory?.countPerMonthSiteViewed.map((_perMonthViewed, i) => {
      chartSiteViewedData.push({
        key: i,
        month: months[i],
        value: _perMonthViewed.count
      });
    });
  let chartPageViewedData = [];
  formHistory?.countPerMonthUniqueViewed &&
    formHistory?.countPerMonthUniqueViewed.map((_perMonthUniqueViewed, i) => {
      chartPageViewedData.push({
        key: i,
        month: months[i],
        value: _perMonthUniqueViewed.count
      });
    });
  const columns = [
    {
      name: 'Name',
      sortable: 'true',
      selector: (row) => row.formName,
      cell: (row) => <span>{row.formName}</span>
    },
    {
      name: 'Created At',
      sortable: 'true',
      selector: (row) => row.createdAt,
      cell: (row) => (
        <span>
          <Badge color="light-primary" style={{ paddingTop: '6px' }}>
            {moment(row?.createdAt)?.format('MM/DD/yyyy')}
          </Badge>
        </span>
      )
    },

    {
      name: 'type',
      selector: (row) => row.memberType,
      cell: (row) => <Badge color="light-primary">{row?.type}</Badge>
    }
  ];
  return (
    <>
      {formHistory && (
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
                              <span className="fs-4">Analytics</span>
                            </div>
                            <Row>
                              <Col md={6}>
                                <div className="p-1">
                                  <div className="d-flex align-items-center">
                                    <div>Pages</div>
                                    <span className="fw-bold ms-3 text-primary">
                                      {pages.length}
                                    </span>
                                  </div>

                                  <div className="mt-1 fw-bold">Viewed Amount Per Page</div>
                                  <div>
                                    <PieChart width={280} height={400}>
                                      <Pie
                                        data={formHistory.countPageViewed}
                                        dataKey="amount"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        label
                                      />
                                    </PieChart>
                                  </div>
                                </div>
                              </Col>
                              <Col md={6}>
                                <div>
                                  <div className="d-flex align-items-center">
                                    <div>Forms</div>
                                    <span className="fw-bold ms-3 text-primary">
                                      {childForms.length}
                                    </span>
                                  </div>
                                  <div className="mt-1 fw-bold">Filled Amount Per Form</div>
                                  <div className="mt-1">
                                    <PieChart width={280} height={400}>
                                      <Pie
                                        data={Data}
                                        dataKey="amount"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        label
                                      />
                                    </PieChart>
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
                            <div className="d-flex justify-content-between align-items-end">
                              <div>
                                <Label>Rename Website</Label>
                                <Input type="text" width={200} />
                              </div>
                              <div>
                                <Button className="" color="primary">
                                  Save
                                </Button>
                              </div>
                            </div>
                          </CardBody>
                        </Card>

                        <Button
                          color="primary"
                          block
                          onClick={() => setOpenConnectDomainnModal(!openConnectDomainnModal)}
                        >
                          <MdOutlineDomainAdd size={16} className='me-1'/>
                          <span>Connect Domain</span>
                        </Button>
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
                              <LineChart width={80} height={20} data={Data}>
                                <Line
                                  type="monotone"
                                  dataKey="amount"
                                  dot={false}
                                  stroke="#8884d8"
                                  strokeWidth={2}
                                />
                              </LineChart>
                            </div>
                            <div className="fw-bold">{formHistory?.countSiteViewed}</div>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col md="4">
                        <Card className="cursor-pointer">
                          <CardBody>
                            <div className="d-flex justify-content-between">
                              <span>Unique Visitors</span>
                              {/* <span>
                                <FiUser size={30} />
                              </span> */}
                              <LineChart width={80} height={20} data={Data}>
                                <Line
                                  type="basis"
                                  dataKey="amount"
                                  dot={false}
                                  stroke="#8884d8"
                                  strokeWidth={2}
                                />
                              </LineChart>
                            </div>
                            <div className="fw-bold">{formHistory?.countUniqueViewed}</div>
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
                              {/* <LineChart width={80} height={20} data={Data}>
                                <Line
                                  type="basis"
                                  dataKey="amount"
                                  dot={false}
                                  stroke="#8884d8"
                                  strokeWidth={2}
                                />
                              </LineChart> */}
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
                            {formHistory?.activityData && formHistory?.activityData?.length ? (
                              <DataTable
                                header
                                sortServer
                                responsive
                                className="react-dataTable"
                                data={formHistory?.activityData}
                                style={{ cursor: 'pointer' }}
                                sortIcon={<ChevronDown size={14} />}
                                columns={columns}
                                pointerOnHover="cursor"
                              />
                            ) : (
                              <div
                                className="d-flex justify-content-center align-items-center"
                                style={{ fontSize: '16px' }}
                              >
                                No data available
                              </div>
                            )}
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
                            <div className="d-flex justify-content-around">
                              <div className="d-flex">
                                <div
                                  className="d-flex flex-column align-items-center justify-content-around site"
                                  style={{
                                    width: '80px',
                                    height: '80px',
                                    border:
                                      tab === 'Site' ? '1px solid blue' : '1px dashed lightgray',
                                    borderRadius: '10%'
                                  }}
                                  onClick={(e) => setTab('Site')}
                                >
                                  <div>Site</div>
                                  <FiUsers size={20} />
                                </div>
                                <div
                                  className="d-flex flex-column align-items-center justify-content-around site ms-2"
                                  style={{
                                    width: '80px',
                                    height: '80px',
                                    border:
                                      tab === 'Visitors'
                                        ? '1px solid blue'
                                        : '1px dashed lightgray',
                                    borderRadius: '10%'
                                  }}
                                  onClick={(e) => setTab('Visitors')}
                                >
                                  <div>Visitors</div>
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
                                    data={
                                      tab === 'Site' ? chartSiteViewedData : chartPageViewedData
                                    }
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
                                      {tab === 'Site'
                                        ? chartSiteViewedData &&
                                          chartSiteViewedData.map((entry, index) => (
                                            <Cell key={index} fill={'rgb(1, 132, 255)'} />
                                          ))
                                        : chartPageViewedData &&
                                          chartPageViewedData.map((entry, index) => (
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
      <Modal
        isOpen={openConnectDomainnModal}
        toggle={() => setOpenConnectDomainnModal(!openConnectDomainnModal)}
        centered
        // className={this.props.className}
      >
        <ModalHeader toggle={() => setOpenConnectDomainnModal(!openConnectDomainnModal)}>
          Connect Domain
        </ModalHeader>
        <ModalBody>
          <span> This is connect Domain Modal</span>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => setOpenConnectDomainnModal(!openConnectDomainnModal)}
          >
            Cancel
          </Button>{' '}
          <Button
            color="primary"
            onClick={() => setOpenConnectDomainnModal(!openConnectDomainnModal)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default OverviewStep;
