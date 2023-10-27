import { useContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../../../utility/context/Socket';
import { getUserData, formatToShortName, formatDateToMonthShort } from '../../../../utility/Utils';

export default function useBirthdaySearch(
  notificationSelected,
  notificationBirthdayCount,
  openSection
) {
  const [loadingBirthday, setLoadingBirthday] = useState(false);
  const [hasMoreBirthday, setHasMoreBirthday] = useState(false);
  const notificationBirthday = useSelector((state) => state.totalContacts.notificationList);
  const socket = useContext(SocketContext);
  useEffect(() => {
    if ( openSection && openSection === 'birthday' && (notificationBirthday?.totalBirthdaysCount === null  ||  notificationBirthday.length == 0)){
      setHasMoreBirthday(false);
      setLoadingBirthday(false);
    }
    else if (openSection && openSection === 'birthday' ) {
      let cancel;
      if (
        notificationBirthday?.length > 0 &&
        (notificationBirthday.todays?.length === notificationBirthday.todaysCount ||
          notificationBirthday.tommorrow?.length === notificationBirthday.tommorrowBirthdaysCount)
      ) {
        return;
      } else {
        setLoadingBirthday(true);
        socket.emit('getNotifications', getUserData().id, notificationBirthdayCount, 1);
      }

      if (notificationSelected === 'thisMonth') {
        if (
          notificationBirthday?.thisMonthBirthdays.length ==
            notificationBirthday?.thisMonthBirthdaysCount ||
          notificationBirthday?.thisMonthBirthdaysCount === 0
        ) {
          setHasMoreBirthday(false);
          setLoadingBirthday(false);
        } else {
          setTimeout(() => {
            if (
              notificationBirthday?.thisMonthBirthdays.length <
              notificationBirthday?.thisMonthBirthdaysCount
            ) {
              setHasMoreBirthday(true);
              setLoadingBirthday(false);
            }
          }, 2000);
        }
      } else if (notificationSelected === 'today') {
        if (
          notificationBirthday?.todays &&
          (notificationBirthday?.todays.length == notificationBirthday?.todaysCount ||
            notificationBirthday?.todaysCount === 0)
        ) {
          setHasMoreBirthday(false);
          setLoadingBirthday(false);
        } else {
          setTimeout(() => {
            if (notificationBirthday?.todays.length < notificationBirthday?.todaysCount) {
              setHasMoreBirthday(true);
              setLoadingBirthday(false);
            }
          }, 2000);
        }
      } else if (notificationSelected === 'tomorrow') {
        if (
          notificationBirthday?.tommorrow.length == notificationBirthday?.tommorrowBirthdaysCount ||
          notificationBirthday?.tommorrowBirthdaysCount === 0
        ) {
          setHasMoreBirthday(false);
          setLoadingBirthday(false);
        } else {
          setTimeout(() => {
            if (
              notificationBirthday?.tommorrow.length < notificationBirthday?.tommorrowBirthdaysCount
            ) {
              setHasMoreBirthday(true);
              setLoadingBirthday(false);
            }
          }, 2000);
        }
      } else if (notificationSelected === 'thisWeek') {
        if (
          notificationBirthday?.thisWeek.length == notificationBirthday?.thisWeekBirthday ||
          notificationBirthday?.thisWeekBirthday === 0
        ) {
          setHasMoreBirthday(false);
          setLoadingBirthday(false);
        } else {
          setTimeout(() => {
            if (notificationBirthday?.thisWeek.length < notificationBirthday?.thisWeekBirthday) {
              setHasMoreBirthday(true);
              setLoadingBirthday(false);
            }
          }, 2000);
        }
      }
    }
  }, [notificationBirthdayCount, notificationSelected, openSection]);

  return { loadingBirthday, hasMoreBirthday, setLoadingBirthday };
}
