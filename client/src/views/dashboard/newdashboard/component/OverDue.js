import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input
} from 'reactstrap';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FaDollarSign } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import { selectThemeColors } from '@utils';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoicesAction } from '../../../finance/invoice/store/action';
import moment from 'moment';
import { formatDateTime, isDobInThisWeek, isDueInThisMonth } from '../../../../utility/Utils';
import { filter } from 'postcss-rtl/lib/affected-props';
import { BsArrowRepeat } from 'react-icons/bs';

const data = [
  { id: 1, name: 'Bohemia', type: 'social media' },
  { id: 2, name: 'Robin', type: 'facebook' },
  { id: 3, name: 'ROhan', type: 'instagram' },
  { id: 4, name: 'Monu', type: 'whatsapp' },
  { id: 5, name: 'Mohan Lal', type: 'chrome' },
  { id: 6, name: 'Vinod SIngh', type: 'chrome' },
  { id: 7, name: 'Ranjan', type: 'facebook' },
  { id: 8, name: 'Ranjan', type: 'facebook' },
  { id: 9, name: 'Vinod SIngh', type: 'chrome' },
  { id: 10, name: 'Ranjan', type: 'facebook' },
  { id: 11, name: 'Ranjan', type: 'facebook' }
];
const monthOption = [
  { value: 'This Month', label: 'This Month' },
  { value: 'Last Month', label: 'Last Month' },
  { value: 'Yesterday', label: 'Yesterday' }
];
const paginationComponentOptions = {
  noRowsPerPage: true
};

const columns = [
  {
    name: 'Date',
    sortable: true,
    minWidth: '100px',
    // sortField: 'fullName',
    selector: (row) => row?.dueDate,

    cell: (row) => (
      <div className="d-flex align-items-center">{moment(row?.dueDate).format('ll')}</div>
    )
  },
  {
    name: 'Name',
    width: '90px',
    sortable: true,
    sortField: 'title',
    selector: (row) => row?.customerId,
    cell: (row) => <div>{row?.customerId?.fullName}</div>
  },
  {
    name: 'Total',
    width: '90px',
    sortable: true,
    sortField: 'title',
    selector: (row) => row?.totalAmount,
    cell: (row) => <div>${row?.totalAmount - row?.paidAmount}</div>
  },
  {
    name: 'Dismiss',
    center: true,
    cell: (row) => (
      <Button className="btn btn-sm" color="primary" outline>
        View
      </Button>
    )
  }
];

function OverDue() {
  const [currentPage, setCurrentPage] = useState(0);
  const [overDueTable, setOverDueTable] = useState([]);
  const dispatch = useDispatch();
  const overDueData = useSelector((state) => state.userInvoice?.invoiceList);
  const [filterValue, setFilterValue] = useState();
  const [isMobileView, setIsMobileView] = useState(false);
  const [isTabletView, setIsTabletView] = useState(false);
  const [isDesktopView, setIsDesktopView] = useState(false);

  //Mobile View
  useEffect(() => {
    setFilterValue(monthOption[0]);
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const isMobile = windowWidth <= 767;
      const isTablet = windowWidth >= 768 && windowWidth <= 1023;
      const isDesktop = windowWidth >= 1024;

      setIsMobileView(isMobile);
      setIsTabletView(isTablet);
      setIsDesktopView(isDesktop);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (overDueData){
      const overDueDataMain = overDueData.filter((item, i) => {
        return item?.status === 'DUE';
      });
      const dueCurrentMoth = overDueDataMain.filter((item, i) => {
        const dueDate = moment(item.dueDate);
        return (
          dueDate.isSameOrBefore(moment().endOf('month')) &&
          dueDate.isSameOrAfter(moment().startOf('month'))
        );
      });
      const dueLastMoth = overDueDataMain.filter((item, i) => {
        const lastMonth = moment().subtract(1, 'months');
        const dueDate = moment(item.dueDate);
        return (
          dueDate.isSameOrBefore(lastMonth.endOf('month')) &&
          dueDate.isSameOrAfter(lastMonth.startOf('month'))
        );
      });
      const dueYesterday = overDueDataMain.filter((item, i) => {
        const dueDate = moment(item.dueDate);
        const yesterday = moment().subtract(1, 'days');
        return dueDate.isSame(yesterday, 'day');
      });
      if (filterValue?.value === 'This Month') {
        setOverDueTable(dueCurrentMoth);
      } else if (filterValue?.value === 'Last Month') {
        setOverDueTable(dueLastMoth);
      } else if (filterValue?.value === 'Yesterday') {
        setOverDueTable(dueYesterday);
      }

    }
   
  }, [filterValue,overDueData]);
  const itemsPerPage = 5;
  const offset = currentPage * itemsPerPage;
  const paginatedData = data.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(data.length / itemsPerPage);
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

  return (
    <Card style={{ height: '50vh' }}>
      <CardHeader>
        <div className="d-flex">
          <BsArrowRepeat size={20} className="light-primary" />
          <h4 style={{ marginLeft: '10px' }}>Overdue </h4>
        </div>
        <div>
          <div style={{ minWidth: '150px', marginTop: '-10px' }}>
            <Select
              className="react-select ms-1"
              classNamePrefix="select"
              theme={selectThemeColors}
              options={monthOption}
              onChange={(data) => setFilterValue(data)}
              value={filterValue}
            />
          </div>
        </div>
      </CardHeader>
      {isMobileView && (
        <Card style={{ height: 'auto' }}>
          <div style={{ padding: '5px' }}>
            {overDueTable?.map((row, index) => {
              let startDate = row.dueDate ? formatDateTime(row.createdAt) : 'Not Selected';
              return (
                <>
                  <Card
                    key={index}
                    style={{
                      border: '1px solid #ededed',
                      marginBottom: '5px !important',
                      padding: '10px'
                    }}
                    className="mb-1"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="align-items-center">
                        <div
                          className="d-flex justify-content-between"
                          style={{ fontWeight: 'bold' }}
                        >
                          {row?.customerId?.fullName}
                        </div>
                        Due Date - {startDate}
                      </div>
                    </div>

                    <div
                      style={{
                        height: '1px',
                        background: '#e0e0e0',
                        marginTop: '0px',
                        marginBottom: '10px'
                      }}
                    ></div>
                    <span
                      style={{ cursor: 'pointer', paddingTop: '6px', paddingRight: '6px' }}
                      className="d-flex"
                    >
                      <span>Total : </span>
                      <span style={{ paddingLeft: '5px' }}>
                        {row?.totalAmount - row?.paidAmount}
                      </span>
                    </span>
                    <span
                      style={{ cursor: 'pointer', paddingTop: '6px', paddingRight: '6px' }}
                      className="d-flex"
                    >
                      Dismiss :
                      <Button className="btn btn-sm" color="primary" outline>
                        View
                      </Button>
                    </span>
                  </Card>
                </>
              );
            })}
          </div>
        </Card>
      )}
      {isTabletView && (
        <Card style={{ height: 'auto' }}>
          <div style={{ padding: '5px' }}>
            {overDueTable?.map((row, index) => {
              let startDate = row.dueDate ? formatDateTime(row.createdAt) : 'Not Selected';
              return (
                <>
                  <Card
                    key={index}
                    style={{
                      border: '1px solid #ededed',
                      marginBottom: '5px !important',
                      padding: '10px',
                      width: 'calc(50% - 10px)', // Adjusted width with spacing
                      marginRight: '10px'
                    }}
                    className="mb-1"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="align-items-center">
                        <div
                          className="d-flex justify-content-between"
                          style={{ fontWeight: 'bold' }}
                        >
                          {row?.customerId?.fullName}
                        </div>
                        Due Date - {startDate}
                      </div>
                    </div>

                    <div
                      style={{
                        height: '1px',
                        background: '#e0e0e0',
                        marginTop: '0px',
                        marginBottom: '10px'
                      }}
                    ></div>
                    <span
                      style={{ cursor: 'pointer', paddingTop: '6px', paddingRight: '6px' }}
                      className="d-flex"
                    >
                      <span>Total : </span>
                      <span style={{ paddingLeft: '5px' }}>
                        {row?.totalAmount - row?.paidAmount}
                      </span>
                    </span>
                    <span
                      style={{ cursor: 'pointer', paddingTop: '6px', paddingRight: '6px' }}
                      className="d-flex"
                    >
                      Dismiss :
                      <Button className="btn btn-sm" color="primary" outline>
                        View
                      </Button>
                    </span>
                  </Card>
                </>
              );
            })}
          </div>
        </Card>
      )}
      {isDesktopView && (
        <div className="react-dataTable dashbard-notification">
          <DataTable
            noHeader
            sortIcon={<ChevronDown />}
            responsive
            paginationServer
            columns={columns}
            data={overDueTable ? overDueTable : []}
            className="react-dataTable"
            pagination
            paginationPerPage={5}
            paginationComponentOptions={paginationComponentOptions}
          />
        </div>
      )}
    </Card>
  );
}

export default OverDue;
