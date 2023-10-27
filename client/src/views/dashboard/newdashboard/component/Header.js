import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Folder } from 'react-feather';
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Row,
  UncontrolledDropdown
} from 'reactstrap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import './style.css';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getContactsByRetention } from '../../../contacts/store/actions';
function Header({ attendanceThisWeek }) {
  attendanceThisWeek.forEach((item) => {
    const attendedDate = new Date(item.attendedDateTime);
    const dayOfWeek = attendedDate.getDay();
    data[dayOfWeek].Attended++;
  });
  const invoiceList = useSelector((state) => state.userInvoice?.invoiceList);
  const [paidCurrentMain, setPaidCurrentMain] = useState(0);
  const [paidPercent, setPaidPercent] = useState(0);
  const [dueCurrentMain, setDueCurrentMain] = useState(0);
  const [duePercent, setDuePercent] = useState(0);
  const [scheduledCurrentMain, setScheduledCurrentMain] = useState(0);
  const [scheduledPercent, setScheduledPercent] = useState(0);
  const retentionData = useSelector((state) => state?.totalContacts?.retentionContacts);
  const dispatch = useDispatch();
  const [retention] = useState([
    { label: 'Last Attended', value: 'Last Attended' },
    { label: 'Last Contacted', value: 'Last Contacted' }
  ]);
  const [selectedOption, setSelectedOption] = useState('Last Attended');
  const retentionUser = retention.find((user) => user.value === selectedOption);
  const retentionLabel = retentionUser ? retentionUser.label : 'Last Attended';
  const handleOptionChange = (selected) => {
    setSelectedOption(selected.value);
  };

  const [data, setData] = useState([
    { key: 0, name: 'Sun', Attended: 0 },
    { key: 1, name: 'Mon', Attended: 0 },
    { key: 2, name: 'Tue', Attended: 0 },
    { key: 3, name: 'Wed', Attended: 0 },
    { key: 4, name: 'Thu', Attended: 0 },
    { key: 5, name: 'Fri', Attended: 0 },
    { key: 6, name: 'Sat', Attended: 0 }
  ]);
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useMemo(() => {
    if (retentionData && retentionData?.list && retentionData?.list.length > 0) {
      const updatedData = [
        { key: 0, name: 'Sun', Attended: 0 },
        { key: 1, name: 'Mon', Attended: 0 },
        { key: 2, name: 'Tue', Attended: 0 },
        { key: 3, name: 'Wed', Attended: 0 },
        { key: 4, name: 'Thu', Attended: 0 },
        { key: 5, name: 'Fri', Attended: 0 },
        { key: 6, name: 'Sat', Attended: 0 }
      ];
      const filterType = selectedOption === 'Last Attended' ? 'createdAt' : 'lastContacted';

      retentionData.list.forEach((item) => {
        const lastContactedDate = new Date(item[filterType]);
        const dayOfWeek = lastContactedDate.getUTCDay();
        const dayIndex = dayOfWeek;
        if (dayIndex >= 0 && dayIndex < updatedData.length) {
          updatedData[dayIndex] = {
            ...updatedData[dayIndex],
            Attended: updatedData[dayIndex].Attended + 1
          };
        }
      });
      setData(updatedData);
    }
  }, [retentionData]);
  useEffect(() => {
    if (invoiceList.length > 0) {
      const paidCurrent = invoiceList
        .filter((x) => {
          return x.status === 'PAID' && moment(x.date).month() == moment().month();
        })
        .map((x) => x?.paidAmount)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
      const paidAll = invoiceList
        .filter((x) => {
          return x.status === 'PAID';
        })
        .map((x) => x?.paidAmount)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
      setPaidCurrentMain(paidCurrent);
      setPaidPercent(Math.round((paidCurrent / paidAll) * 100));
      const scheduledCurrent = invoiceList
        .filter((x) => {
          return x.status === 'PAID' && moment(x.date).month() == moment().month();
        })
        .map((x) => x?.totalAmount - x?.paidAmount)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);

      const scheduledAll = invoiceList
        .filter((x) => {
          return x.status === 'PAID';
        })
        .map((x) => x?.totalAmount - x?.paidAmount)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
      setScheduledCurrentMain(scheduledCurrent);
      setScheduledPercent(Math.round((scheduledCurrent / scheduledAll) * 100));
      const dueCurrent = invoiceList
        .filter((x) => {
          return (
            x.status === 'DUE' &&
            moment(x.date).year() === moment().year() &&
            moment(x.date).month() == moment().month()
          );
        })
        .map((x) => x?.totalAmount - x?.paidAmount)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
      const dueAll = invoiceList
        .filter((x) => {
          return x.status === 'DUE';
        })
        .map((x) => x?.totalAmount - x?.paidAmount)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
      setDueCurrentMain(dueCurrent);
      setDuePercent(Math.round((dueCurrent / dueAll) * 100));
    }
  }, [invoiceList]);
  const CustomTooltip = ({ active, label, payload }) => {
    if (active && payload) {
      return (
        <div
          className="pt-1  border"
          style={{ background: '#ffffff', paddingLeft: '10px', paddingRight: '10px' }}
        >
          {<p>{weekDays[payload[0]['payload']['key']]}</p>}
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
  useEffect(() => {
    let params = {
      isFormer: false,
      isAttendance: selectedOption === 'Last Attended' ? true : false,
      start: 1
    };
    dispatch(getContactsByRetention(params));
  }, [selectedOption]);

  return (
    <Fragment>
      <Row>
        <Col md={5}>
          <h4 className="text-white" style={{ marginLeft: '40px' }}>
            Payments this month
          </h4>
          <Row className="m-2 mobile-view-payment-dash">
            <Col
              md={4}
              className="text-white progress-bar-dashboard mobile-view-payment-dash-progressbar"
            >
              <CircularProgressbarWithChildren
                value={scheduledPercent}
                styles={buildStyles({
                  pathColor: '#05BFDB',
                  trailColor: '#DAF5FF'
                })}
                style={{ width: '10px', height: '100px' }}
              >
                <div style={{ fontSize: 16, marginTop: -5, color: '#fff' }}>
                  <strong className="mobile-view-text-size-strong">${scheduledCurrentMain}</strong>
                </div>
              </CircularProgressbarWithChildren>
              <Label
                className="text-white mobile-view-payment-dash-text"
                style={{ fontSize: 16, marginTop: '15px', marginLeft: '10px' }}
              >
                Scheduled
              </Label>
            </Col>
            <Col
              md={4}
              className="text-white progress-bar-dashboard mobile-view-payment-dash-progressbar"
            >
              <CircularProgressbarWithChildren
                value={paidPercent}
                styles={buildStyles({
                  pathColor: '#5D9C59',
                  trailColor: '#DAF5FF'
                })}
                style={{ width: '100px !important', height: '100px' }}
              >
                <div style={{ fontSize: 16, marginTop: -5, color: '#fff' }}>
                  <strong className="mobile-view-text-size-strong">${paidCurrentMain}</strong>
                </div>
              </CircularProgressbarWithChildren>
              <Label
                className="text-white mobile-view-payment-dash-text"
                style={{ fontSize: 16, marginTop: '15px', marginLeft: '30px' }}
              >
                Paid
              </Label>
            </Col>
            <Col
              md={4}
              className="text-white progress-bar-dashboard mobile-view-payment-dash-progressbar"
            >
              <CircularProgressbarWithChildren
                value={duePercent}
                styles={buildStyles({
                  pathColor: 'red',
                  trailColor: '#DAF5FF'
                })}
                style={{ width: '100px', height: '100px' }}
              >
                <div style={{ fontSize: 16, marginTop: -5, color: '#fff' }}>
                  <strong className="mobile-view-text-size-strong">${dueCurrentMain}</strong>
                </div>
              </CircularProgressbarWithChildren>
              <Label
                className="text-white mobile-view-payment-dash-text"
                style={{ fontSize: 16, marginTop: '15px', marginLeft: '20px' }}
              >
                Overdue
              </Label>
            </Col>
          </Row>
        </Col>
        <Col md={6} className="mobile-view-atetendance">
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ width: '100%', maxWidth: '560px', marginBottom: '3px' }}
          >
            <div>
              <h4 className="text-white mobile-view-txt-dash">Retention</h4>
            </div>
            <div>
              <UncontrolledDropdown
                className="retention-dropdown retention-dropdown-white"
                size="md"
              >
                <DropdownToggle className="finance-dark-mode" color="outline-primary" caret>
                  {retentionLabel}
                </DropdownToggle>
                <DropdownMenu>
                  {retention.map((retentionData) => (
                    <DropdownItem
                      key={retentionData.value}
                      className="w-100"
                      active={selectedOption === retentionData.value}
                      onClick={() => handleOptionChange(retentionData)}
                    >
                      {retentionData.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>

          <div style={{ width: '100%', maxWidth: '700px' }} className="chart-container">
            <BarChart width={560} className="chart" id="header-chart" height={180} data={data}>
              <XAxis dataKey="name" stroke="#fff" />
              <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
              <CartesianGrid
                stroke="rgb(218 218 218"
                strokeDasharray="0"
                horizontal={true}
                vertical={false}
              />
              <Bar dataKey="Attended" barSize={30} fill="url(#colorGradient)" />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B9EDDD" />
                  <stop offset="95%" stopColor="#8696FE" />
                </linearGradient>
              </defs>
            </BarChart>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
}

export default Header;
