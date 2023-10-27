import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Pagination,
  PaginationLink,
  PaginationItem
} from 'reactstrap';
import * as Icon from 'react-feather';
import { MdOutlineManageAccounts, MdOutlineUpcoming } from 'react-icons/md';
import OneImage from '../../../../assets/images/avatars/avatar-blank.png';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from '../../../calendar/event/store';
import { getUserData } from '../../../../utility/Utils';
import moment from 'moment';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const EcommerceTransactions = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); // Add currentPage state

  useEffect(() => {
    dispatch(getEvents(getUserData()?.id));
  }, []);

  const events = useSelector((state) => state.event.events);
  const eventsPerPage = 6;
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events?.slice(indexOfFirstEvent, indexOfLastEvent);
  const [visibleEvents, setVisibleEvents] = useState(eventsPerPage);

  const totalPages = Math.ceil(events?.length / eventsPerPage);

  const loadMoreEvents = () => {
    setVisibleEvents(visibleEvents + eventsPerPage);
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleViewClick = (id) => {
    window.open(`/event-view/${id}`);
  };

  return (
    <Card style={{ height: '40rem' }}>
      <div className="d-flex" style={{ padding: '15px 15px 0px 15px' }}>
        <MdOutlineUpcoming size={20} className="light-primary" />
        <h4 style={{ marginLeft: '10px' }}>Upcoming Events</h4>
      </div>
      <div className="event-dashboard">
        {events.slice(0, visibleEvents).map((item, i) => (
          <Card className="border mb-0" style={{ padding: '5px', margin: '10px' }} key={i}>
            <div
              key={i}
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
            >
              <div className="d-flex align-items-center">
                <img
                  alt={'image'}
                  src={item.eventBanner === '' ? OneImage : item.eventBanner}
                  width={32}
                  height={32}
                  style={{ borderRadius: '25px' }}
                />
                <div style={{ marginLeft: '10px' }}>
                  <h5 style={{ fontWeight: 'bolder', color: '#000' }} className="mb-50">
                    {item.title}
                    <br />
                    <div className="d-flex" style={{ marginTop: '5px' }}>
                      <div>
                        <Badge className="text-capitalize" color="light-success">
                          {item.eventCategory}
                        </Badge>
                        <Badge
                          className="text-capitalize"
                          color="light-warning"
                          style={{ marginLeft: '5px' }}
                        >
                          {item.type}
                        </Badge>
                      </div>
                      <span style={{ fontSize: 'small', fontWeight: 'normal', marginLeft: '5px' }}>
                        {moment(item.end).format('MM/DD/YYYY h:mm A')}
                      </span>
                    </div>
                  </h5>
                </div>
              </div>
              <UncontrolledDropdown>
                <DropdownToggle tag="div" className="btn btn-sm">
                  <Icon.MoreVertical size={18} className="cursor-pointer" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem tag="span" className="w-100">
                    <div onClick={() => handleViewClick(item._id)}>
                      <MdOutlineManageAccounts size={14} className="me-50" />
                      <span className="align-middle">View</span>
                    </div>
                  </DropdownItem>
                  <DropdownItem tag="span" className="w-100">
                    <Link to={{ pathname: `/event-view-list/${item._id}` }} className='text-dark'>
                      <MdOutlineManageAccounts size={14} className="me-50" />
                      <span className="align-middle">Manage</span>
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </Card>
        ))}
      </div>
      {visibleEvents < events.length && (
        <div className="text-center  p-2">
          <button className="btn btn-sm btn-primary" onClick={loadMoreEvents}>
            Load More
          </button>
        </div>
      )}
    </Card>
  );
};

export default EcommerceTransactions;
