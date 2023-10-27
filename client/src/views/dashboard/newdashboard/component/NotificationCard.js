import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import { MdOutlineNotificationsNone } from 'react-icons/md';
import { Card, CardHeader, CardBody, Progress, Media, Button, Badge } from 'reactstrap';
import { selectThemeColors } from '@utils';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import { RiCake2Line } from 'react-icons/ri';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  isDateInNextMonth,
  isDateInThisMonth,
  isDobInThisWeek,
  isDobToday,
  renderClient
} from '../../../../utility/Utils';
import moment from 'moment';
import Avatar from '@components/avatar';
import { getContactsByBirthday } from '../../../contacts/store/actions';
const filterOptions = [
  { value: 'today', label: 'Today' },
  { value: 'this week', label: 'This Week' },
  { value: 'this month', label: 'This Month' },
  { value: 'next month', label: 'Next Month' }
];
const BirthdayNotification = () => {
  const contactList = useSelector((state) => state.totalContacts?.birthdayContacts?.list);

  const [filterValue, setFilterValue] = useState(filterOptions[0]);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const offset = currentPage * itemsPerPage;
  const [tableData, setTableDta] = useState([]);
  const totalContactTypes = useSelector((state) => state.totalContacts?.contactTypeList);

  const CustomPagination = () => {
    const count = Math.ceil(data.length);

    return (
      <div className="d-flex justify-content-end">
        <ReactPaginate
          previousLabel={''}
          nextLabel={''}
          pageCount={pageCount}
          activeClassName="active"
          forcePage={currentPage}
          onPageChange={(page) => setCurrentPage(page.selected)}
          pageClassName={'page-item'}
          nextLinkClassName={'page-link'}
          nextClassName={'page-item next'}
          previousClassName={'page-item prev'}
          previousLinkClassName={'page-link'}
          pageLinkClassName={'page-link'}
          containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
        />
      </div>
    );
  };
  useEffect(() => {
    if (startDate && endDate) {
      let params = {
        startDate,
        endDate
      };
      dispatch(getContactsByBirthday(params));
    }
  }, [startDate, endDate]);
  const renderClient = (row) => {
    let tmpValue = 0;
    Array.from(row?.fullName).forEach((x, index) => {
      tmpValue += x.codePointAt(0) * (index + 1);
    });
    const stateNum = tmpValue % 6,
      states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary'
      ],
      color = states[stateNum];

    if (row?.img) {
      return <Avatar className="me-1" img={row.img} width="32" height="32" />;
    } else {
      return (
        <Avatar
          color={color || 'primary'}
          className="me-1"
          content={row.fullName || 'John Doe'}
          initials
        />
      );
    }
  };

  const columns = [
    {
      name: 'Full Name',
      minWidth: '198px',
      selector: (row) => row?.fullName,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(row)}
          <div className="d-flex flex-column">
            <span className="fw-bolder">{row?.fullName}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Types',
      // width: '90px',
      sortField: 'title',
      selector: (row) => row.contactType,
      cell: (row) => {
        const contactType = totalContactTypes?.filter((contacttype, i) => {
          return contacttype?._id === row.contactType[0];
        });
        return <div>{contactType.length > 0 ? contactType[0]?.name : 'n/a'}</div>;
      }
    },
    {
      name: 'DOB',
      // width: '90px',
      center: true,
      cell: (row) => <div>{moment(row?.dob).format('MMM DD, YYYY')}</div>
    }
  ];
  useEffect(() => {
    birthdaySelect({ value: 'today', label: 'Today' });
  }, []);
  const birthdaySelect = (data) => {
    setFilterValue(data);
    const currentDate = new Date();

    const firstDayOfWeek = currentDate.getDate() - currentDate.getDay() + 1;
    const lastDayOfWeek = firstDayOfWeek + 6;

    const firstDateOfThisWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      firstDayOfWeek
    );
    const lastDateOfThisWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      lastDayOfWeek
    );

    const firstDateOfThisMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDateOfThisMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const firstDateOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const lastDateOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0);

    switch (data?.value) {
      case 'today':
        setStartDate(currentDate);
        setEndDate(currentDate);
        break;
      case 'this week':
        setStartDate(firstDateOfThisWeek);
        setEndDate(lastDateOfThisWeek);
        break;
      case 'this month':
        setStartDate(firstDateOfThisMonth);
        setEndDate(lastDateOfThisMonth);
        break;
      case 'next month':
        setStartDate(firstDateOfNextMonth);
        setEndDate(lastDateOfNextMonth);
        break;
      default:
        break;
    }
  };
  const paginationComponentOptions = {
    noRowsPerPage: true
  };

  return (
    <Card style={{ height: '50vh' }}>
      <CardHeader>
        <div>
          <h4 className="mb-1">
            {' '}
            <RiCake2Line size={18} className="light-primary" />
            <span className="ml-1"> Birthdays</span>
          </h4>
        </div>
        <div style={{ minWidth: '150px', marginTop: '-10px' }}>
          <Select
            className="react-select ms-1"
            classNamePrefix="select"
            theme={selectThemeColors}
            onChange={birthdaySelect}
            options={filterOptions}
            placeholder="Filter by Date"
            value={filterValue}
          />
        </div>
      </CardHeader>
      <div className="react-dataTable">
        <DataTable
          noHeader
          sortIcon={<ChevronDown />}
          responsive
          // paginationServer
          columns={columns}
          // data={tableData ? tableData : []}
          data={contactList}
          className="react-dataTable"
          // paginationComponent={CustomPagination}
          paginationPerPage={5}
          pagination
          paginationComponentOptions={paginationComponentOptions}
        />
      </div>
    </Card>
  );
};

export default BirthdayNotification;
