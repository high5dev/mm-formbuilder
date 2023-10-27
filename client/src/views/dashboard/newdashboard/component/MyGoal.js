import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Progress,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Badge
} from 'reactstrap';
import OneImage from '../../../../assets/images/avatars/1.png';
import { AiFillSetting } from 'react-icons/ai';

// ** Custom Components Imports
import { selectThemeColors } from '@utils';
import Select from 'react-select';
import CreateGoalModal from './CreateGoalModal';
import { useDispatch, useSelector } from 'react-redux';
import { allGoalAction } from '../../../finance/store/actions';
import habit from '../../../../assets/images/banner/habit.png';
import * as Icon from 'react-feather';
import Avatar from '@components/avatar';
import {
  completedSubGoals,
  generateMaxValueOfCurrentProgress,
  generatePercentageForCurrentProgress,
  generateProgressOfCurrentProgress,
  percentageOfSubgoals,
  renderProgress,
  totalSubGoals
} from '../../../goals/helpers/renderProgressData';
import { currentStatusCalculator } from '../../../goals/helpers/habitCalculation';
import moment from 'moment';
import { BsClipboardCheck } from 'react-icons/bs';
const monthOption = [
  { value: 'This Month', label: 'This Month' },
  { value: 'Last Month', label: 'Last Month' },
  { value: 'Yesterday', label: 'Yesterday' }
];

const CrmActiveProjects = () => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const allGoal = useSelector((state) => state.finance.goalList);
  const [filterValue, setFilterValue] = useState(monthOption[0]);
  let goalPerPage = 3;
  const goalWorkspaceList = useSelector((state) => state.goals.goalWorkspace);
  const [visibleGoal, setVisibleGoal] = useState(goalPerPage);

  const toggle = () => setModal(!modal);
  const [goalTable, setGoalTable] = useState([]);
  useEffect(() => {
    const dueCurrentMoth = allGoal.filter((item, i) => {
      const endDate = moment(item.endDate);
      return (
        endDate.isSameOrBefore(moment().endOf('month')) &&
        endDate.isSameOrAfter(moment().startOf('month'))
      );
    });
    const dueLastMoth = allGoal.filter((item, i) => {
      const lastMonth = moment().subtract(1, 'months');
      const endDate = moment(item.endDate);
      return (
        endDate.isSameOrBefore(lastMonth.endOf('month')) &&
        endDate.isSameOrAfter(lastMonth.startOf('month'))
      );
    });
    const dueYesterday = allGoal.filter((item, i) => {
      const endDate = moment(item.endDate);
      const yesterday = moment().subtract(1, 'days');
      return endDate.isSame(yesterday, 'day');
    });
    if (filterValue?.value === 'This Month') {
      setGoalTable(dueCurrentMoth);
    } else if (filterValue?.value === 'Last Month') {
      setGoalTable(dueLastMoth);
    } else if (filterValue?.value === 'Yesterday') {
      setGoalTable(dueYesterday);
    }
  }, [allGoal, filterValue]);
  const loadMoreGoal = () => {
    setVisibleGoal(visibleGoal + goalPerPage);
  };
  return (
    <Card style={{ height: '50vh' }}>
      <div className="d-flex justify-content-between p-1">
        <div className="d-flex">
          <BsClipboardCheck size={18} className="light-primary" />

          <h4 style={{ marginLeft: '10px' }}>My Goal</h4>
        </div>
        <div className="d-flex gap-1" style={{ marginTop: '-5px' }}>
          <Select
            className="react-select ms-1 mobile-view-responsive-ybusiness-react-select"
            classNamePrefix="select"
            theme={selectThemeColors}
            options={monthOption}
            onChange={(data) => setFilterValue(data)}
            value={filterValue}
          />
          <AiFillSetting
            size={18}
            onClick={toggle}
            style={{ marginTop: '10px', cursor: 'pointer' }}
          />
        </div>
      </div>
      <div className="goal-dashboard-content">
        {goalTable.slice(0, visibleGoal)?.map((item, i) => {
          const workSpaceName = goalWorkspaceList?.find((itemGoal, i) => {
            return itemGoal?._id === item?.workSpace;
          });
          return workSpaceName?.title ? (
            <div
              className="border mb-0 rounded"
              key={i}
              style={{ overflow: 'hidden', padding: '7px', margin: '10px' }}
            >
              <div style={{ cursor: '', justifyContent: 'space-between' }}>
                <div className="d-flex align-items-center">
                  <img
                    alt={'image'}
                    src={item?.pictureUrl ? item?.pictureUrl : habit}
                    width={40}
                    height={40}
                    style={{ borderRadius: '50%' }}
                  />
                  <div style={{ marginLeft: '20px' }}>
                    <h5 style={{ fontWeight: 'bolder', color: '#000' }} className="mb-50">
                      {item.name}
                    </h5>
                    <div className="d-flex">
                      <Badge className="text-capitalize" color="light-primary">
                        {item.type}
                      </Badge>
                      <Badge className="text-capitalize ms-1" color="light-warning">
                        {workSpaceName?.title}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div style={{ alignItems: 'center', paddingTop: '10px', display: 'flex' }}>
                  {item.type === 'target' && item.progressType === 'CurrentProgress' && (
                    <>
                      <Progress
                        value={generateProgressOfCurrentProgress(item)}
                        max={generateMaxValueOfCurrentProgress(item)}
                        style={{ marginRight: '1rem', height: '6px', width: '100%' }}
                      />
                      <p className="text-muted" style={{ marginBottom: '0px' }}>
                        {generatePercentageForCurrentProgress(item)}%
                      </p>
                    </>
                  )}
                  {item.type === 'target' && item.progressType !== 'CurrentProgress' && (
                    <>
                      <Progress
                        value={completedSubGoals(item.status)}
                        max={totalSubGoals(item.status)}
                        style={{ marginRight: '1rem', height: '6px', width: '100%' }}
                      />
                      <p className="text-muted" style={{ marginBottom: '0px' }}>
                        {percentageOfSubgoals(item.status) || 0}%
                      </p>
                    </>
                  )}
                  {item.type === 'habit' && (
                    <>
                      <Progress
                        value={renderProgress(item, currentStatusCalculator)}
                        max={100}
                        style={{ marginRight: '1rem', height: '6px', width: '100%' }}
                      />
                      <p className="text-muted" style={{ marginBottom: '0px' }}>
                        {renderProgress(item, currentStatusCalculator)}%
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : null;
        })}
      </div>
      {visibleGoal < goalTable.length && (
        <div className="text-center p-2">
          <button className="btn btn-sm btn-primary" onClick={loadMoreGoal}>
            Load More
          </button>
        </div>
      )}

      <CreateGoalModal isOpen={modal} toggle={toggle} />
    </Card>
  );
};

export default CrmActiveProjects;
