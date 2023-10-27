import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledDropdown,
  UncontrolledTooltip
} from 'reactstrap';
import OneImage from '../../../../assets/images/avatars/1.png';
import blankAvatar from '@src/assets/images/avatars/avatar-blank.png';
import Avatar from '@components/avatar';
import Select from 'react-select';
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import { ChevronDown, Edit, MoreVertical, Plus, TrendingUp } from 'react-feather';
import { selectThemeColors } from '@utils';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { formatDateTime } from '../../../../utility/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { activeWorkspaceSetAction } from '../../../taskngoals/store/actions';
import { fetchWorkspaceApi, handleSelectTask } from '../../../apps/workspace/store';
import { BsListTask } from 'react-icons/bs';
import SelectCreateModal from '../../../tasks/task-list/template/SelectCreateModal';
import NewModal from '../../../taskngoals/NewModal';
import classnames from 'classnames';
import { updateTaskStatus } from '../../../apps/kanban/store';
import ReactConfetti from 'react-confetti';
import { TbNewSection, TbStatusChange } from 'react-icons/tb';
import { FiEdit3 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { CgRowFirst } from 'react-icons/cg';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { cvtColor } from '../../../contacts/contact-list/constants';
import TaskSidebar from '../../../tasks/task-list/TaskSidebar';
// import { activeWorkspaceSetAction } from '../../../taskngoalsMain/taskngoals/store/actions';

const data = [
  {
    id: 1,
    title: 'task',
    createdAt: '03/05/2023, 02:20',
    dueDate: '03/05/2023, 02:20',
    assign: '',
    status: 'DONE'
  },
  {
    id: 2,
    title: 'Hotel Management',
    createdAt: '03/05/2023, 02:20',
    dueDate: '03/05/2023, 02:20',
    assign: '',
    status: 'PENDING'
  },
  {
    id: 3,
    title: 'task',
    createdAt: '03/05/2023, 02:20',
    dueDate: '03/05/2023, 02:20',
    assign: '',
    status: 'TODO'
  },
  {
    id: 4,
    title: 'task',
    createdAt: '03/05/2023, 02:20',
    dueDate: '03/05/2023, 02:20',
    assign: '',
    status: 'DONE'
  },
  {
    id: 5,
    title: 'task',
    createdAt: '03/05/2023, 02:20',
    dueDate: '03/05/2023, 02:20',
    assign: '',
    status: 'CANCEL'
  }
];
const ReactSelect = styled(Select)`
  .Select-control {
    z-index: 999;
    height: 26px;
    font-size: small;
    .Select-placeholder {
      line-height: 26px;
      font-size: small;
    }

    .Select-value {
      line-height: 26px;
    }

    .Select-input {
      height: 26px;
      font-size: small;
    }
  }
`;

const optionColors = {
  DONE: 'rgb(40, 199, 111)',
  PENDING: 'rgb(255, 159, 67)',
  TODO: 'rgb(23, 74, 231)',
  CANCEL: 'rgb(234, 84, 85)'
};

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: optionColors[state.data.value] || 'transparent',
    color: state.isSelected ? '#fff' : '#fff'
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff'
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: optionColors[state.selectProps?.value?.value] || 'transparent',
    borderColor: optionColors[state.selectProps?.value?.value] || '#ced4da',
    boxShadow: 'none',
    '&:hover': {
      borderColor: optionColors[state.selectProps?.value?.value] || '#ced4da'
    }
  })
};
const dataTableStyle = {
  headCells: {
    style: {
      textTransform: 'uppercase',
      borderColor: '#f3f2f7',
      backgroundColor: '#f3f2f7',
      // fontSize : '19px'
      fontWeight :'600',
      color : '#6e6b7b'
    }
  }
};
const paginationComponentOptions = {
  noRowsPerPage: true
};
const renderAssignee = (row) => {
  let target = `t${row?.title
    ?.replace(/[^\w ]/g, '')
    .split(' ')
    .join('-')}`;
  let tmpValue = 0;
  if (row?.title) {
    Array.from(row?.title).forEach((x, index) => {
      tmpValue += x.codePointAt(0) * (index + 1);
    });
  }

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

  return (
    <div className="own-avatar">
      {row.title ? (
        <UncontrolledTooltip placement={row?.placement} target={target}>
          {row?.title}
        </UncontrolledTooltip>
      ) : null}
      {row?.img ? (
        <Avatar
          // className={classnames('pull-up', {
          //   [row.className]: row.className
          // })}
          img={row.img}
          width="32"
          height="32"
          {...(row.title
            ? {
                id: target
              }
            : {})}
        />
      ) : (
        <Avatar
          color={color || 'primary'}
          // className={classnames('pull-up', {
          //   [row.className]: row.className
          // })}
          content={row.title || 'John Doe'}
          {...(row.title
            ? {
                id: target
              }
            : {})}
          width="32"
          height="32"
          initials
        />
      )}
    </div>
  );
};

const renderAssignees = (data) => {
  return <div className="own-avatar-group">{data?.map((row) => renderAssignee(row))}</div>;
};
const renderAvatar = (obj) => {
  const item = obj.assignedTo;

  return item.length ? (
    <div>{renderAssignees(item)}</div>
  ) : (
    <Avatar img={blankAvatar} imgHeight="32" imgWidth="32" />
  );
};

function MyTask() {
  const store = useSelector((state) => {
    return {
      ...state.workspace,
      ...state.label,
      ...state.myGoals
    };
  });
  const { boards, tasks, activity } = useSelector((state) => state?.workspace?.selectedWorkspace);
  const workspaceId = useSelector((state) => state?.workspace?.selectedWorkspace?._id);
  const isShared = useSelector((state) => state?.workspace?.selectedWorkspace?.isShared || false);

  // Hooks are stated here
  const [taskSearchResult, setTaskSearchResult] = useState(tasks);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [openCreate, setOpenCreate] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isTabletView, setIsTabletView] = useState(false);
  const [isDesktopView, setIsDesktopView] = useState(false);
  const [modalType, setModalType] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [statusRowID, setStatusRowID] = useState(null);
  const [mytask, setMystask] = useState(null);

  const toggleCreate = () => setOpenCreate(!openCreate);

  const handleOpenCreate = () => {
    toggleCreate();
  };

  const itemsPerPage = 5;
  const pageCount = Math.ceil(data?.length / itemsPerPage); // Calculate the total number of pages

  const CustomPagination = ({ currentPage, setCurrentPage }) => {
    return (
      <Card className="d-flex justify-content-end">
        <ReactPaginate
          previousLabel={''}
          nextLabel={''}
          pageCount={pageCount}
          activeClassName="active"
          forcePage={currentPage}
          pageClassName={'page-item'}
          nextLinkClassName={'page-link'}
          nextClassName={'page-item next'}
          previousClassName={'page-item prev'}
          previousLinkClassName={'page-link'}
          pageLinkClassName={'page-link'}
          containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
        />
      </Card>
    );
  };
  const statusOptions = (boardId) => {
    const currentWorkspaceId = boards.find((board) => board._id == boardId)?.workspaceId;
    const filteredBoards = boards.filter((board) => board.workspaceId == currentWorkspaceId);
    return filteredBoards?.map((x) => ({
      value: x._id,
      label: x.title
    }));
  };

  const renderActivity = (activity) => {
    switch (activity) {
      case 'Task Created':
        return (
          <>
            <TbNewSection size={16} style={{ marginInlineEnd: '5px' }} />
            {activity}
          </>
        );
      case 'Task Updated':
        return (
          <>
            <FiEdit3 size={16} style={{ marginInlineEnd: '5px' }} />
            {activity}
          </>
        );
      case 'Task Status':
        return (
          <>
            <TbStatusChange size={16} style={{ marginInlineEnd: '5px' }} />
            {activity}
          </>
        );
      case 'Status Created':
        return (
          <>
            <TbNewSection size={16} style={{ marginInlineEnd: '5px' }} />
            {activity}
          </>
        );
      case 'Status Updated':
        return (
          <>
            <FiEdit3 size={16} style={{ marginInlineEnd: '5px' }} />
            {activity}
          </>
        );
      case 'Status Removed':
        return (
          <>
            <AiOutlineDelete size={16} style={{ marginInlineEnd: '5px' }} />
            {activity}
          </>
        );
      default:
        return (
          <>
            <CgRowFirst size={16} style={{ marginInlineEnd: '5px' }} />
            {activity}
          </>
        );
    }
  };

  const getOptionLabel = (option) => option.label;
  const getOptionValue = (option) => option.value;

  const [labelColorData, setLabelColorData] = useState();
  const [openTaskSidebar, setOpenTaskSidebar] = useState(false);
  const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar);

  const handleTaskClick = (obj) => {
    if (isShared) {
      return;
    }
    dispatch(handleSelectTask(obj));
    handleTaskSidebar();
  };

  useEffect(() => {
    if (store && store.labels) {
      let temp = {};
      for (let i = 0; i < store.labels.length; i++) {
        const { title, color } = store.labels[i];
        temp[title] = color;
      }
      setLabelColorData(temp);
    }
  }, [store?.labels]);
  const truncateTaskName = (text, maxWords) => {
    const words = text && text.length;
    if (words > maxWords) {
      const truncatedText = text.slice(0, maxWords) + ' ...';
      return truncatedText;
    } else {
      return text;
    }
  };

  const columns = [
    {
      key: 'taskName',
      name: 'TASK NAME',
      sortable: true,
      minWidth: '160px',
      selector: (row) => row.title,
      cell: (row) => {
        let startDate = row.createdAt ? formatDateTime(row.createdAt) : 'N/A';
        let endDate = row.dueDate ? formatDateTime(row.dueDate) : 'N/A';

        return (
          <div className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
            <div>
              <div style={{ fontWeight: '600' }}>{truncateTaskName(row.title, 70)}</div>
              {`${startDate} ${endDate}`}
            </div>
          </div>
        );
      }
    },

    {
      name: 'Assignees',
      width: '93px',
      selector: (row) => (row.assignedTo ? renderAvatar(row) : null)
    },
    {
      key: 'status',
      name: 'STATUS',
      sortable: true,
      maxWidth: '20%',
      minWidth: '165px',
      selector: (row) => boards?.filter((x) => x._id === row.boardId)[0]?.title || '',
      cell: (row) => {
        return (
          <div
            className="project-status-container"
            style={{
              position: 'relative',
              cursor: 'pointer',
              color: '#fff',
              width: '150px'
            }}
          >
            <ReactSelect
              style={{ width: '150px !important' }}
              options={statusOptions(row?.boardId)}
              value={statusOptions(row?.boardId).find((x) => x.value == row?.boardId)}
              onChange={(data) => {
                // Update Status
                document.body.style.cursor = 'wait';
                dispatch(
                  updateTaskStatus({
                    isShared,
                    taskId: row?._id,
                    boardId: row?.boardId,
                    newBoardId: data?.value,
                    workspaceId: workspaceId
                  })
                )
                  .then((res) => {
                    if (res?.payload?.status == 200) {
                      if (data.label == 'DONE') {
                        setShowConfetti(true);
                        setStatusRowID(row._id);
                      }
                      const emails = row?.assignedTo.map((x) => x.email);
                      socket.emit('updatedSharedTask', { emails });
                    }
                    document.body.style.cursor = 'default';
                  })
                  .catch(() => {
                    document.body.style.cursor = 'default';
                  });
                // Activity
              }}
              getOptionLabel={getOptionLabel}
              getOptionValue={getOptionValue}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              isSearchable={true}
              styles={customStyles}
              menuPortalTarget={document.body}
            />
            {showConfetti && statusRowID === row._id ? (
              <ReactConfetti
                width={200}
                height={50}
                recycle={false}
                numberOfPieces={500}
                gravity={0.2}
                initialVelocityX={{ min: -10, max: 10 }}
                initialVelocityY={{ min: -10, max: 10 }}
                onConfettiComplete={() => setShowConfetti(false)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            ) : null}
          </div>
        );
      }
    },

    {
      key: 'lastActivity',
      name: 'LAST ACTIVITY',
      minWidth: '170px',
      selector: (row) => row?.lastActivity,
      cell: (row) => {
        const filteredActivity = activity
          ?.filter((x) => x.kanbanId == row?._id)
          .sort((a, b) => {
            new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime();
          });
        return (
          <>
            {filteredActivity.length ? (
              <div className="d-flex flex-column">
                <div className="me-1">
                  {renderActivity(filteredActivity[0]?.activity)}{' '}
                  {filteredActivity[0]?.column == 'Shared' && (
                    <b>({filteredActivity[0]?.fullName})</b>
                  )}
                </div>
                <div>
                  {filteredActivity[0]?.prev ? (
                    <div className="d-flex align-items-center">
                      <div
                        style={{
                          backgroundColor: cvtColor[filteredActivity[0]?.prevColor || 'secondary'],
                          color: filteredActivity[0]?.prevColor?.includes('light')
                            ? cvtColor[filteredActivity[0]?.prevColor?.slice(6)]
                            : '#fff',
                          padding: '4px 8px',
                          borderRadius: '5px',
                          textAlign: 'center',
                          fontSize: 10,
                          fontWeight: 500
                        }}
                      >
                        {filteredActivity[0]?.prev}
                      </div>
                      <div style={{ paddingInline: '2px' }}>
                        <MdOutlineKeyboardArrowRight size={18} />
                      </div>
                      <div
                        style={{
                          backgroundColor:
                            cvtColor[filteredActivity[0]?.currentColor || 'secondary'],
                          color: filteredActivity[0]?.currentColor.includes('light')
                            ? cvtColor[filteredActivity[0]?.currentColor?.slice(6)]
                            : '#fff',
                          padding: '4px 8px',
                          borderRadius: '5px',
                          textAlign: 'center',
                          fontSize: 10,
                          fontWeight: 500
                        }}
                      >
                        {truncateTaskName(filteredActivity[0]?.current, 70)}
                      </div>
                    </div>
                  ) : filteredActivity[0]?.currentColor ? (
                    <div
                      style={{
                        backgroundColor: cvtColor[filteredActivity[0]?.currentColor || 'secondary'],
                        color: filteredActivity[0]?.currentColor.includes('light')
                          ? cvtColor[filteredActivity[0]?.currentColor?.slice(6)]
                          : '#fff',
                        padding: '4px 8px',
                        borderRadius: '5px',
                        textAlign: 'center',
                        fontSize: 10,
                        fontWeight: 500
                      }}
                    >
                      {truncateTaskName(filteredActivity[0]?.current, 70)}
                    </div>
                  ) : (
                    <b> {truncateTaskName(filteredActivity[0]?.current, 70)}</b>
                  )}
                </div>
              </div>
            ) : null}
          </>
        );
      }
    },

    !isShared && {
      key: 'action',
      name: 'ACTION',
      width: '80px',
      cell: (row) => {
        return (
          <div className="column-action" style={{ marginLeft: '1.2rem' }}>
            <UncontrolledDropdown>
              <DropdownToggle
                className="btn btn-sm"
                tag="div"
                href="/"
                onClick={(e) => e.preventDefault()}
              >
                <MoreVertical className="text-body" size={16} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem
                  tag={'span'}
                  className="w-100"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTaskClick(row);
                  }}
                >
                  <Edit size={'14px'} style={{ marginRight: '10px' }} />
                  Edit
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        );
      }
    }
  ];
  useEffect(() => {
    let resultData = tasks;
    // if (selectedStatus?.status?._id) {
    //   resultData = tasks.filter((x) => x.boardId == selectedStatus?.status?._id);
    // }
    setTaskSearchResult(resultData);
  }, [tasks]);

  useEffect(() => {
    dispatch(fetchWorkspaceApi());
  }, []);
  const handleWorkspaceClick = (e) => {
    dispatch(activeWorkspaceSetAction(JSON.parse(e.target.value)));
    setTaskSearchResult(JSON.parse(e.target.value)?.tasks);
  };

  //Mobile View
  useEffect(() => {
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
  return (
    <>
      {/* <div className="content-body"> */}
        <Card style={{ height: '40rem' }}>
          <div className="p-1 d-flex justify-content-between">
            <div className="d-flex">
              <BsListTask size={20} className="light-primary" />
              <h4 style={{ marginLeft: '10px' }}>My Task</h4>
            </div>
            <div className="d-flex me-1">
              <Button color="primary" onClick={handleOpenCreate}>
                <Plus size={14} /> Create Task
              </Button>
              <Input
                type="text"
                placeholder="Search Task"
                style={{ width: '150px', marginLeft: '5px' }}
              />
              <Input
                type="select"
                name="select"
                style={{ width: '150px', marginLeft: '5px' }}
                onChange={handleWorkspaceClick}
              >
                <option value={JSON.stringify('')}>Select Status</option>
                {store.workspace?.map((workspace, index) => {
                  return <option value={JSON.stringify(workspace)}>{workspace?.title}</option>;
                })}
              </Input>
            </div>
          </div>
          <div className="">
            <DataTable
            customStyles={dataTableStyle}
              noHeader
              sortIcon={<ChevronDown />}
              responsive
              // paginationServer
              columns={columns}
              data={taskSearchResult}
              className=""
              paginationComponentOptions={paginationComponentOptions} 
              pagination
              paginationPerPage = {6}
            />
          </div>
        </Card>
        <SelectCreateModal
          toggle={toggleCreate}
          open={openCreate}
          dispatch={dispatch}
          setModalType={setModalType}
        />

        <NewModal
          store={store}
          dispatch={dispatch}
          modalType={modalType}
          setModalType={setModalType}
        />

        {store && (
          <TaskSidebar
            labelColors={labelColorData}
            store={store}
            sidebarOpen={openTaskSidebar}
            selectedTask={store.selectedTask}
            handleTaskSidebarToggle={handleTaskSidebar}
            className="task-dashboard-sidebar"
          />
        )}
      {/* </div> */}
    </>
  );
}

export default MyTask;