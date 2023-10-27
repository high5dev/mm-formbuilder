import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import { BsFillTicketDetailedFill } from 'react-icons/bs';
import { FaCompress, FaEnvelope, FaSearchPlus } from 'react-icons/fa';
import { HiPrinter } from 'react-icons/hi';
import { ImDownload3 } from 'react-icons/im';
import { IoChatbubbles } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { Card, Col, Modal, ModalBody, ModalHeader, Row, Table } from 'reactstrap';
import { getFinanceCategories } from '../../../finance/store/actions';
import { selectThemeColors } from '../../../../utility/Utils';

function Schedule() {
  const dispatch = useDispatch();

  const store = useSelector((state) => {
    return { ...state.finance, ...state.userInvoice };
  });
  const [ytd, setYtd] = useState(moment().year());
  const [month2, setMonth2] = useState(moment().month());
  const [month2TotalIncome, setMonth2TotalIncome] = useState(0);
  const [month2TotalExpense, setMonth2TotalExpense] = useState(0);
  const [incomeListByCategory, setIncomeListByCategory] = useState([]);
  const [year2, setYear2] = useState(moment().year());
  const [selectedMonth, setSelectedMonth] = useState(moment().month());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [incomeList, setIncomeList] = useState([]);

  useEffect(() => {
    if (store.IncomeList) {
      const t2 = store.IncomeList.filter(
        (item) =>
          moment(item.date).year() === Number(year2) && moment(item.date).month() === Number(month2)
      );
      const ta2 = t2
        .filter((x) => x.categoryId.type === 'income')
        .map((item) => item.amount)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
      setMonth2TotalIncome(ta2);

      const ta2Expense = t2
        .filter((x) => x.categoryId.type === 'expense')
        .map((item) => item.amount)
        .reduce((prev, current) => {
          return prev + current;
        }, 0);
      setMonth2TotalExpense(-1 * ta2Expense);

      let itemsByCat = [];
      for (const item of store.categoryList) {
        let c2 = t2.filter((x) => x.categoryId._id === item._id);
        let rows = { catId: item._id, values: [], totalMonth2: 0 };
        for (const y of c2) {
          if (y.invoiceId) {
            let items = y?.invoiceId?.items;
            for (const i of items) {
              let exists = rows.values.filter((x) => x.name === i.name);
              let tax = 0; // tax in percent
              let discount = 0; // discount in percent
              if (y.invoiceId.tax > 0) {
                tax = Number(y.invoiceId.tax) / Number(y.invoiceId.totalAmount);
              }
              if (y.invoiceId.discount > 0) {
                discount = Number(y.invoiceId.discount) / Number(y.invoiceId.totalAmount);
              }
              if (exists.length > 0) {
                if (exists[0].totalMonth2 === undefined) {
                  let index = rows.values.indexOf(exists[0]);
                  let p = Number(i.rate || 0) * Number(i.quantity || 0);
                  let price =
                    Number(rows.values[index].totalMonth2 || 0) + p - p * discount + p * tax;
                  rows.values[index] = {
                    ...rows.values[index],
                    quantity: Number(rows.values[index].quantity) + Number(i.quantity),
                    totalMonth2: price
                  };
                } else {
                  if (exists[0].invoiceId !== y.invoiceId._id) {
                    let index = rows.values.indexOf(exists[0]);
                    let p = Number(i.rate || 0) * Number(i.quantity || 0);
                    let price =
                      Number(rows.values[index].totalMonth2 || 0) + p - p * discount + p * tax;
                    rows.values[index] = {
                      ...rows.values[index],
                      quantity: Number(rows.values[index].quantity) + Number(i.quantity),
                      totalMonth2: price
                    };
                  }
                }
              } else {
                let p = Number(i.rate || 0) * Number(i.quantity || 0);
                rows.values.push({
                  ...i,
                  totalMonth2: p - discount * p + tax * p,
                  invoiceId: y.invoiceId._id
                });
              }
            }
          } else {
            let exists = rows.values.filter((x) => x.name === y.name);
            if (exists.length > 0) {
              let index = rows.values.indexOf(exists[0]);
              rows.values[index] = {
                ...rows.values[index],
                totalMonth2: (rows.values[index].totalMonth2 || 0) + Number(y.amount || 0),
                quantity: rows.values[index].quantity + 1
              };
            } else {
              rows.values.push({ name: y.name, totalMonth2: Number(y.amount || 0), quantity: 1 });
            }
          }
        }

        rows.totalMonth2 = rows.values
          .map((item) => item.totalMonth2)
          .reduce((prev, current) => {
            return Number(prev || 0) + Number(current || 0);
          }, 0);

        itemsByCat.push(rows);
      }
      setIncomeListByCategory(itemsByCat);
    }
  }, [month2, ytd, store.IncomeList]);

  useEffect(() => {
    const startDate = moment().startOf('month').add(-1, 'day').format('yyyy-MM-DD');
    const endDate = moment()
      //.add(1, 'month')
      .endOf('month')
      .add(1, 'day')
      .format('yyyy-MM-DD');
    dispatch(getFinanceCategories({ startDate: startDate, endDate: endDate })).then((res) => {
      setIncomeList(res);
    });
    dispatch(getFinanceCategories());
  }, []);
  useEffect(() => {
    if (month2 && selectedYear) {
      const startDate = moment(`${Number(selectedYear)}-${Number(month2) + 1}-01`)
        .add(-1, 'day')
        .format('yyyy-MM-DD');
      const endDate = moment(startDate)
        .add(1, 'day')
        .endOf('month')
        .add(1, 'day')
        .format('yyyy-MM-DD');
      dispatch(getFinanceCategories({ startDate: startDate, endDate: endDate })).then((res) => {
        setIncomeList(res);
      });
    }
  }, [month2, selectedYear]);
  const handleDateChange = (selectedDate) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(selectedDate);
      setEndDate(null);
    } else if (selectedDate >= startDate) {
      setEndDate(selectedDate);
      setModalOpen(false);
    }
  };
  const handleMonthChange = (value) => {
    setMonth2(value);
    setSelectedMonth(value);
  };
  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  const formateNetIncome = () => {
    const netIncome = month2TotalIncome - month2TotalExpense;
    let formattedNetIncome;

    if (Number.isInteger(netIncome)) {
      formattedNetIncome = netIncome;
    } else {
      formattedNetIncome = netIncome.toFixed(2);
    }
    return `$${formattedNetIncome}`;
  };

  return (
    <Card className="p-2" style={{ height: '32rem' }}>
      <div>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <BsFillTicketDetailedFill size={18} className="light-primary" />
            <h4 style={{ marginLeft: '10px' }}>Profit & Loss</h4>
          </div>
          <div className="d-flex">
            <div style={{}}>
              <Select
                className="react-select ms-1"
                classNamePrefix="select"
                theme={selectThemeColors}
                options={monthOptions.map((month) => ({
                  value: month.value,
                  label: month.label
                }))}
                onChange={(selectedOption) => handleMonthChange(selectedOption.value)}
                value={
                  selectedMonth
                    ? {
                        value: selectedMonth,
                        label: monthOptions.find((x) => x.value === selectedMonth).label
                      }
                    : null
                }
              />
            </div>
            <div style={{}}>
              <Select
                className="react-select ms-1"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(selectedOption) => handleYearChange(selectedOption.value)}
                options={yearOptions.map((year) => ({
                  value: year.value,
                  label: year.label
                }))}
                value={
                  selectedYear
                    ? {
                        value: selectedYear,
                        label: selectedYear
                      }
                    : null
                }
              />
            </div>
          </div>
        </div>

        <Table striped className="dashboard-table">
          <thead>
            <tr className="d-flex justify-content-between">
              <th>
                <h6>Total Net Income</h6>
              </th>
              <td>
                {' '}
                <h5 style={{ color: '#174ae7' }}> {formateNetIncome()}</h5>
              </td>
            </tr>
            {incomeList &&
              incomeList
                .filter((x) => x.type === 'income')
                .map((x, idx) => {
                  let originalString = x.title;
                  let modifiedString = originalString.replace('Sales', '');
                  return (
                    <div
                      style={{
                        marginBottom: '5px',
                        marginLeft: '25px',
                        marginRight: '25px'
                      }}
                      key={idx}
                    >
                      <div
                        style={{
                          // background: 'rgb(248 249 250)',
                          padding: '3px 5px 3px',
                          paddingBottom: 0
                        }}
                      >
                        <div className="d-flex justify-content-between">
                          <div md={3}>
                            <span>{modifiedString} Sales </span>
                          </div>

                          <div>
                            <Col md="12" className="text-left">
                              $
                              {/* {incomeListByCategory.find((j) => j.catId === x._id)?.totalYear ===
                              NaN
                                ? incomeListByCategory.find((j) => j.catId === x._id)?.totalYear
                                : 0} */}
                              {x?.amount}
                            </Col>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            <div
              style={{
                marginBottom: '5px',
                marginLeft: '25px',
                marginRight: '25px',
                marginTop: '5px'
              }}
            >
              <div
                style={{
                  padding: '3px 5px 3px',
                  paddingBottom: 0
                }}
              >
                <div className="d-flex justify-content-between">
                  <div md={3}>
                    <h5>Total Income</h5>
                  </div>

                  <div>
                    <Col md="12" className="text-left">
                      <h5 style={{ color: '#0eb73e' }}>${month2TotalIncome}</h5>
                    </Col>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginBottom: '5px',
                marginLeft: '25px',
                marginRight: '25px'
              }}
            >
              <div
                style={{
                  // background: 'rgb(248 249 250)',
                  padding: '3px 5px 3px',
                  paddingBottom: 0
                }}
              >
                <div className="d-flex justify-content-between">
                  <div md={3}>
                    <h5>Total Expense</h5>
                  </div>

                  <div>
                    <Col md="12" className="text-left">
                      <h5 style={{ color: '#0eb73e' }}>${month2TotalExpense}</h5>
                    </Col>
                  </div>
                </div>
              </div>
            </div>
          </thead>
        </Table>

        <div className="d-flex justify-content-between">
          <div className="d-flex dashboard-table-icons">
            <ImDownload3 size={22} />
            <HiPrinter size={22} />
            <IoChatbubbles size={22} />
            <FaEnvelope size={22} />
          </div>
        </div>
      </div>
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} centered>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>Select Date Range</ModalHeader>
        <ModalBody>
          <Calendar
            onChange={handleDateChange}
            value={startDate && endDate ? [startDate, endDate] : null}
            selectRange={true}
          />
        </ModalBody>
      </Modal>
    </Card>
  );
}

export default Schedule;

const monthOptions = [
  { value: 0, label: 'January' },
  { value: 1, label: 'February' },
  { value: 2, label: 'March' },
  { value: 3, label: 'April' },
  { value: 4, label: 'May' },
  { value: 5, label: 'June' },
  { value: 6, label: 'July' },
  { value: 7, label: 'August' },
  { value: 8, label: 'September' },
  { value: 9, label: 'October' },
  { value: 10, label: 'November' },
  { value: 11, label: 'December' }
];

const yearOptions = [
  { value: '2021', label: '2021' },
  { value: '2022', label: '2022' },
  { value: '2023', label: '2023' },
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' },
  { value: '2027', label: '2027' },
  { value: '2028', label: '2028' },
  { value: '2029', label: '2029' },
  { value: '2030', label: '2030' },
  { value: '2031', label: '2031' },
  { value: '2032', label: '2032' }
];
