import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../../../utility/context/Socket';
import { getUserData, formatToShortName, formatDateToMonthShort } from '../../../../utility/Utils';

export default function useTaskSearch(notificationSelected, notificationTaskCount, openSection) {
  const [loadingTask, setLoadingTask] = useState(false);
  const [errorTask, setErrorTask] = useState(false);
  const [hasMoreTask, setHasMoreTask] = useState(false);
  const notificationTask = useSelector((state) => state.totalContacts.notificationTaskList);
  const socket = useContext(SocketContext);
  useEffect(() => {
    if (
      openSection &&
      openSection === 'task' &&
      (notificationTask?.totalTaskCount === null || notificationTask.length === 0)
    ) {
      setHasMoreTask(false);
      setLoadingTask(false);
    } else if (openSection && openSection === 'task') {
      setErrorTask(false);
      let cancel;
      if (
        notificationTask?.length > 0 &&
        notificationTask?.thisMonth.length === notificationTask?.thisMonthTaskCount
      ) {
        return;
      } else {
        setLoadingTask(true);
        socket.emit('tasksNotification', getUserData().id, notificationTaskCount, 1);
      }
      if (notificationSelected === 'thisMonth') {
        if (
          notificationTask?.thisMonth.length == notificationTask?.thisMonthTaskCount ||
          notificationTask?.thisMonthTaskCount === 0
        ) {
          setHasMoreTask(false);
          setLoadingTask(false);
        } else {
          setTimeout(() => {
            if (notificationTask?.thisMonth.length < notificationTask?.thisMonthTaskCount) {
              setHasMoreTask(true);
              setLoadingTask(false);
            }
          }, 2000);
        }
      } else if (notificationSelected === 'today') {
        if (
          notificationTask?.todays.length == notificationTask?.todaysTaskCount ||
          notificationTask?.todaysTaskCount === 0
        ) {
          setHasMoreTask(false);
          setLoadingTask(false);
        } else {
          setTimeout(() => {
            if (notificationTask?.todays.length < notificationTask?.todaysTaskCount) {
              setHasMoreTask(true);
              setLoadingTask(false);
            }
          }, 2000);
        }
      } else if (notificationSelected === 'tomorrow') {
        if (
          notificationTask?.tommorrow.length == notificationTask?.tommorrowTaskCount ||
          notificationTask?.tommorrowTaskCount === 0
        ) {
          setHasMoreTask(false);
          setLoadingTask(false);
        } else {
          setTimeout(() => {
            if (notificationTask?.tommorrow.length < notificationTask?.tommorrowTaskCount) {
              setHasMoreTask(true);
              setLoadingTask(false);
            }
          }, 2000);
        }
      } else if (notificationSelected === 'thisWeek') {
        if (
          notificationTask?.sevenDays.length == notificationTask?.sevenDaysTask ||
          notificationTask?.sevenDaysTask === 0
        ) {
          setHasMoreTask(false);
          setLoadingTask(false);
        } else {
          setTimeout(() => {
            if (notificationTask?.sevenDays.length < notificationTask?.sevenDaysTask) {
              setHasMoreTask(true);
              setLoadingTask(false);
            }
          }, 2000);
        }
      }
    }
  }, [notificationTaskCount, notificationSelected, openSection]);

  return { loadingTask, hasMoreTask, setLoadingTask };
}
