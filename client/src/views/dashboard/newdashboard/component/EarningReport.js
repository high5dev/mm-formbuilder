import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';
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
import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import Avatar from '../../../../@core/components/avatar';
import { Plus } from 'react-feather';
import { FaDollarSign, FaShoppingCart, FaFileInvoiceDollar } from 'react-icons/fa';
import { selectThemeColors } from '@utils';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { RiContactsBookUploadLine } from 'react-icons/ri';
import { IncomeFetchAction } from '../../../finance/store/actions';
import moment from 'moment';

import ReactPaginate from 'react-paginate';
import { BsArrowLeftShort, BsArrowRightShort, BsGraphUp } from 'react-icons/bs';
import { SelectTourAction, createOnboardingStatusAction } from '../../../onboarding/store/actions';
import {
  getChunkContactsAction,
  getChunkContactsPaginationAction,
  getContactFieldByTypeAction,
  getTotalContactsCountsActions
} from '../../../contacts/store/actions';

const hexToRGBA = () => {};

const getMonthLabel = (index) => {
  const monthLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  return monthLabels[index];
};

const CrmEarningReportsWithTabs = () => {
  const [value, setValue] = useState('Income');
  const [headerIds, setHeaderIds] = useState('');
  const allContacts = useSelector((state) => state?.totalContacts?.contactTypeList);

  const allContactsList = useSelector((state) => state?.totalContacts?.contactsPagination);
  const dispatch = useDispatch();
  const incomeList = useSelector((state) => state.finance.IncomeList);
  const [chartDataMain, setChartDataMain] = useState([]);

  const colors = Array(9).fill(hexToRGBA());
  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        distributed: true,
        columnWidth: '35%',
        startingShape: 'rounded',
        dataLabels: { position: 'top' }
      }
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: {
      offsetY: -15,
      formatter: (val) => `${val}k`
    },
    colors,
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    grid: {
      show: false,
      padding: {
        top: 20,
        left: -5,
        right: -8,
        bottom: -12
      }
    },
    xaxis: {
      axisTicks: { show: false },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      labels: {}
    },
    yaxis: {
      labels: {
        offsetX: -15,
        formatter: (val) => `$${val}k`
      }
    },
    responsive: [
      {
        options: {
          plotOptions: {
            bar: { columnWidth: '60%' }
          },
          grid: {
            padding: { right: 20 }
          }
        }
      }
    ]
  };
  const tabData = [
    {
      type: 'Income',
      avatarIcon: 'tabler:shopping-cart',
      backgroundColor: 'light-warning',
      color: 'warning',
      series: [{ data: [28, 10, 45, 38, 15, 30, 35, 28, 8, 0, 0, 0] }],
      headerId: ''
    },
    {
      type: 'Expense',
      avatarIcon: 'tabler:expense',
      backgroundColor: 'light-primary',
      color: 'primary',
      series: [{ data: [10, 22, 27, 33, 42, 32, 27, 22, 8, 0, 0, 0] }]
    },
    {
      type: 'Profit',
      avatarIcon: 'tabler:currency-dollar',
      backgroundColor: 'light-primary',
      color: 'primary',
      series: [{ data: [10, 22, 27, 33, 42, 32, 27, 22, 8, 0, 0, 0] }]
    }
  ];

  allContacts?.map((contact, i) => {
    tabData.push({
      type: contact?.name,
      headerId: contact?._id,
      avatarIcon: 'tabler:user',
      backgroundColor: 'light-custom',
      color: 'custom',
      series: [{ data: [10, 22, 27, 33, 42, 32, 27, 22, 8, 0, 0, 0] }],
      headerId: contact?._id,
      contactData: []
    });
  });

  const [currentPage, setCurrentPage] = useState(0);
  const tabsPerPage = 4;
  const pageCount = Math.ceil(tabData.length / tabsPerPage);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    if (headerIds) {
      dispatch(
        getChunkContactsPaginationAction({
          contactType: headerIds,
          fromYear: '2023',
          isFormer: false
        })
      );
    }
  }, [headerIds]);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  useEffect(() => {
    const chartData = [
      { key: 0, month: 'Jan', value: 0 },
      { key: 1, month: 'Feb', value: 0 },
      { key: 2, month: 'march', value: 0 },
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
    const contactData = [
      { contacts: 0, month: 'Jan', key: 0 },
      { contacts: 0, month: 'Feb', key: 1 },
      { contacts: 0, month: 'March', key: 2 },
      { contacts: 0, month: 'Apr', key: 3 },
      { contacts: 0, month: 'May', key: 4 },
      { contacts: 0, month: 'June', key: 5 },
      { contacts: 0, month: 'Jul', key: 6 },
      { contacts: 0, month: 'Aug', key: 7 },
      { contacts: 0, month: 'Sept', key: 8 },
      { contacts: 0, month: 'Oct', key: 9 },
      { contacts: 0, month: 'Nov', key: 10 },
      { contacts: 0, month: 'Dec', key: 11 }
    ];
    if (incomeList) {
      incomeList?.map((incomeItem, i) => {
        if (
          incomeItem?.categoryId?.type === value?.toLocaleLowerCase() &&
          moment(incomeItem?.date).year() === 2023
        ) {
          if (value.toLocaleLowerCase() === 'expense' || value.toLocaleLowerCase() === 'income') {
            if (moment(incomeItem.date).month() === 0) {
              value.toLocaleLowerCase() === 'expense'
                ? (chartData[0].value = chartData[0].value + -incomeItem?.amount)
                : (chartData[0].value = chartData[0].value + incomeItem?.amount);
            } else if (moment(incomeItem.date).month() === 1) {
              value.toLocaleLowerCase() === 'expense'
                ? (chartData[1].value = chartData[1].value + -incomeItem?.amount)
                : (chartData[1].value = chartData[1].value + incomeItem?.amount);
            } else if (moment(incomeItem.date).month() === 2) {
              value.toLocaleLowerCase() === 'expense'
                ? (chartData[2].value = chartData[2].value + -incomeItem?.amount)
                : (chartData[2].value = chartData[2].value + incomeItem?.amount);
            } else if (moment(incomeItem.date).month() === 3) {
              value.toLocaleLowerCase() === 'expense'
                ? (chartData[3].value = chartData[3].value + -incomeItem?.amount)
                : (chartData[3].value = chartData[3].value + incomeItem?.amount);
            } else if (moment(incomeItem.date).month() === 4) {
              value.toLocaleLowerCase() === 'expense'
                ? (chartData[4].value = chartData[4].value + -incomeItem?.amount)
                : (chartData[4].value = chartData[4].value + incomeItem?.amount);
            } else if (moment(incomeItem.date).month() === 5) {
              value.toLocaleLowerCase() === 'expense'
                ? (chartData[5].value = chartData[5].value + -incomeItem?.amount)
                : (chartData[5].value = chartData[5].value + incomeItem?.amount);
            } else if (moment(incomeItem.date).month() === 6) {
              value.toLocaleLowerCase() === 'expense'
                ? (chartData[6].value = chartData[6].value + -incomeItem?.amount)
                : (chartData[6].value = chartData[6].value + incomeItem?.amount);
            } else if (moment(incomeItem.date).month() === 7) {
              value.toLocaleLowerCase() === 'expense'
                ? (chartData[7].value = chartData[7].value + -incomeItem?.amount)
                : (chartData[7].value = chartData[7].value + incomeItem?.amount);
            } else if (moment(incomeItem.date).month() === 8) {
              value.toLocaleLowerCase() === 'expense'
                ? (chartData[8].value = chartData[8].value + -incomeItem?.amount)
                : (chartData[8].value = chartData[8].value + incomeItem?.amount);
            } else if (moment(incomeItem.date).month() === 9) {
              value.toLocaleLowerCase() === 'expense'
                ? (chartData[9].value = chartData[9].value + -incomeItem?.amount)
                : (chartData[9].value = chartData[9].value + incomeItem?.amount);
            } else if (moment(incomeItem.date).month() === 10) {
              value.toLocaleLowerCase() === 'expense'
                ? (chartData[10].value = chartData[10].value + -incomeItem?.amount)
                : (chartData[10].value = chartData[10].value + incomeItem?.amount);
            } else if (moment(incomeItem.date).month() === 11) {
              value.toLocaleLowerCase() === 'expense'
                ? (chartData[11].value = chartData[11].value + -incomeItem?.amount)
                : (chartData[11].value = chartData[11].value + incomeItem?.amount);
            }
          }
        }
      });
    }
    if (value?.toLocaleLowerCase() === 'profit') {
      setChartDataMain(chartData);
    }
    if (allContactsList) {
      allContactsList?.map((contactItem, i) => {
        contactData[moment(contactItem.createdAt).month()].contacts =
          contactData[moment(contactItem.createdAt).month()].contacts + 1;
      });
    }
    const currentSelectedId = allContacts.find((item) => {
      return item?._id === headerIds;
    });
    if (value?.toLocaleLowerCase() === 'expense' || value?.toLocaleLowerCase() === 'income') {
      setChartDataMain(chartData);
    } else if (currentSelectedId && currentSelectedId?._id === headerIds) {
      setChartDataMain(contactData);
    }
  }, [incomeList, value, headerIds, allContactsList]);

  useEffect(() => {
    dispatch(IncomeFetchAction());
  }, []);
  const CustomTooltip = ({ active, label, payload }) => {
    if (active && payload) {
      return (
        <div
          className="pt-1  border"
          style={{ background: '#ffffff', paddingLeft: '10px', paddingRight: '10px' }}
        >
          {<p>{monthNames[payload[0]['payload']['key']]}</p>}
          {payload?.map((entry) => (
            <p key={entry.dataKey}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

  const renderTabs = (tabData, value, setHeaderIds) => {
    const handleChange = (newValue, headerId) => {
      setValue(newValue);
      setHeaderIds(headerId);
    };

    const startIndex = currentPage * tabsPerPage;
    const endIndex = startIndex + tabsPerPage;
    const currentTabData = tabData.slice(startIndex, endIndex);
    return currentTabData.map((item, index) => {
      let icon;
      switch (item.avatarIcon) {
        case 'tabler:shopping-cart':
          icon = <FaShoppingCart style={{ color: 'warning' }} size={18} />;
          break;
        case 'tabler:expense':
          icon = <FaFileInvoiceDollar style={{ color: 'success' }} size={18} />;
          break;
        case 'tabler:currency-dollar':
          icon = <FaDollarSign style={{ color: 'primary' }} size={18} />;
          break;
        default:
          icon = <RiContactsBookUploadLine style={{ color: 'danger' }} size={18} />;
      }
      return (
        <div className="" key={index}>
          <NavItem className="dashboard-earning-tab" style={{ zIndex: 1 }}>
            <NavLink
              className={item.type === value ? 'active' : ''}
              onClick={() => {
                handleChange(item.type, item?.headerId);
              }}
            >
              <div
                style={{
                  width: 90,
                  height: 80,
                  borderWidth: 1,
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  borderRadius: '10px',
                  justifyContent: 'center',
                  borderStyle: item.type === value ? 'solid' : 'dashed'
                }}
              >
                <div
                  style={{
                    marginBottom: 2,
                    backgroundColor: `${item.backgroundColor} !important`,
                    color: `${item.color} !important`,
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {React.cloneElement(icon, { style: { color: item.color } })}
                </div>
                <div
                  style={{
                    fontWeight: 500,
                    color: 'text.secondary',
                    textTransform: 'capitalize',
                    fontSize: 12
                  }}
                >
                  {item.type}
                </div>
              </div>
            </NavLink>
          </NavItem>
        </div>
      );
    });
  };
  const renderTabPanels = (value) => {
    const isMobile = window.innerWidth <= 768;
    return tabData.map((item, index) => {
      const max = Math.max(...item.series[0].data);
      const chartWidth = isMobile ? window.innerWidth - 40 : 720;
      const chartHeight = isMobile ? 250 : 240;
      return (
        <TabPane key={index} tabId={item.type}>
          {item.type.toLocaleLowerCase() === 'expense' ||
          item.type.toLocaleLowerCase() === 'income' ? (
            <ResponsiveContainer width={600} aspect={2.8}>
              <BarChart
                id="unique-chart"
                width={chartWidth}
                height={chartHeight}
                data={chartDataMain}
              >
                <CartesianGrid
                  stroke="rgb(218 218 218)"
                  strokeDasharray="0"
                  horizontal={true}
                  vertical={false}
                />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
                <Bar dataKey="value" barSize={25}>
                  {chartDataMain.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        entry.month === getMonthLabel(new Date().getMonth())
                          ? 'rgb(1, 132, 255)'
                          : 'rgb(1, 132, 255)'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width={600} aspect={2.8}>
              <BarChart width={chartWidth} height={chartHeight} data={chartDataMain}>
                <CartesianGrid
                  stroke="rgb(218 218 218)"
                  strokeDasharray="0"
                  horizontal={true}
                  vertical={false}
                />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
                <Bar dataKey="contacts" barSize={25}>
                  {chartDataMain.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        entry.month === getMonthLabel(new Date().getMonth())
                          ? 'rgb(1, 132, 255)'
                          : 'rgb(1, 132, 255)'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </TabPane>
      );
    });
  };

  return (
    <Card className="p-1" style={{ height: '32rem' }}>
      <div className="d-flex justify-content-between m-2 mobile-view-responsive-ybusiness">
        <div>
          <div className="d-flex">
            <BsGraphUp size={18} className="light-primary" />
            <h4 style={{ marginLeft: '10px' }}>Business Report</h4>
          </div>
          <span>Yearly Business Overview</span>
        </div>
        <div>
          <div style={{ minWidth: '140px' }}>
            <Select
              className="react-select ms-3 mobile-view-responsive-ybusiness-drop"
              classNamePrefix="select"
              theme={selectThemeColors}
              options={[
                { value: 'all', label: 'All' },
                { value: '2021', label: '2021' },
                { value: '2022', label: '2022' },
                { value: '2023', label: '2023' },
                { value: '2024', label: '2024' },
                { value: '2025', label: '2025' },
                { value: '2026', label: '2026' }
              ]}
            />
          </div>
        </div>
      </div>
      <div className="mb-0 mt-0 mobile-view-nav-dash-card text-center" style={{ height: '100px' }}>
        <Nav tabs className="mobile-view-nav-dash d-flex justify-content-center">
          {renderTabs(tabData, value, setHeaderIds)}
          <NavItem style={{ zIndex: 1 }}>
            <NavLink>
              <div
                style={{
                  width: 90,
                  height: 80,
                  borderWidth: 1,
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '10px',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  borderStyle: 'solid'
                  // borderColor: item.type === value ? 'primary' : 'divider'
                }}
              >
                <div
                  style={{
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Plus size={18} />
                </div>
              </div>
            </NavLink>
          </NavItem>
        </Nav>
        <div
          className="d-flex justify-content-between"
          style={{ position: 'relative', top: '-80px', marginLeft: '5%', marginRight: '5%' }}
        >
          <div
            className="corosel-btn"
            onClick={() => {
              // Handle previous button click here
              const newPage = currentPage - 1;
              if (newPage >= 0) {
                setCurrentPage(newPage);
              }
            }}
            disabled={currentPage === 0}
          >
            <BsArrowLeftShort size={18} />
          </div>

          <div
            className="corosel-btn"
            onClick={() => {
              // Handle next button click here
              const newPage = currentPage + 1;
              if (newPage < pageCount) {
                setCurrentPage(newPage);
              }
            }}
            disabled={currentPage === pageCount - 1}
          >
            <BsArrowRightShort size={18} />
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-center mt-1">
        {/* <Row>
          <Col md={12}> */}
        <TabContent activeTab={value}>{renderTabPanels(value, options, colors)}</TabContent>
        {/* </Col> */}
        {/* <Col md={2}></Col> */}
        {/* </Row> */}
      </div>
    </Card>
  );
};

export default CrmEarningReportsWithTabs;
