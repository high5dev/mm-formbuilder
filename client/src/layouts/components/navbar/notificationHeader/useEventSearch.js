import { useContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../../../utility/context/Socket';
import { getUserData, formatToShortName, formatDateToMonthShort } from '../../../../utility/Utils';

export default function useEventSearch(notificationSelected, notificationEventCount, openSection) {
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [errorEvent, setErrorEvent] = useState(false);
  const [hasMoreEvent, setHasMoreEvent] = useState(false);
  const notificationEvent = useSelector((state) => state.totalContacts.notificationEventList);
  const socket = useContext(SocketContext);
  useEffect(() => {
    if (
      openSection &&
      openSection === 'events' &&
      (notificationEvent?.totalEventsCount === null || notificationEvent.length === 0)
    ) {
      setHasMoreEvent(false);
      setLoadingEvent(false);
    } else if (openSection && openSection === 'events') {
      setErrorEvent(false);
      let cancel;
      if (
        notificationEvent?.length > 0 &&
        notificationEvent?.thisMonthBirthdays.length === notificationEvent?.thisMonthBirthdaysCount
      ) {
        return;
      } else {
        setLoadingEvent(true);
        socket.emit('eventsNotification', getUserData().id, notificationEventCount, 1);
      }
      if (notificationSelected === 'thisMonth') {
        if (
          notificationEvent?.thisMonth.length == notificationEvent?.thisMonthEventsCount ||
          notificationEvent?.thisMonthEventsCount === 0
        ) {
          setHasMoreEvent(false);
          setLoadingEvent(false);
        } else {
          setTimeout(() => {
            if (notificationEvent?.thisMonth.length < notificationEvent?.thisMonthEventsCount) {
              setHasMoreEvent(true);
              setLoadingEvent(false);
            }
          }, 2000);
        }
      }
      if (notificationSelected === 'today') {
        if (
          notificationEvent?.todays?.length == notificationEvent?.todaysEventsCount ||
          notificationEvent?.todaysEventsCount === 0
        ) {
          setHasMoreEvent(false);
          setLoadingEvent(false);
        } else {
          setTimeout(() => {
            if (notificationEvent?.todays.length < notificationEvent?.todaysEventsCount) {
              setHasMoreEvent(true);
              setLoadingEvent(false);
            }
          }, 2000);
        }
      }
      if (notificationSelected === 'tomorrow') {
        if (
          notificationEvent?.tommorrow.length == notificationEvent?.tommorrowEventsCount ||
          notificationEvent?.tommorrowEventsCount === 0
        ) {
          setHasMoreEvent(false);
          setLoadingEvent(false);
        } else {
          setTimeout(() => {
            if (notificationEvent?.tommorrow.length < notificationEvent?.tommorrowEventsCount) {
              setHasMoreEvent(true);
              setLoadingEvent(false);
            }
          }, 2000);
        }
      }
      if (notificationSelected === 'thisWeek') {
        if (
          notificationEvent?.sevenDays.length == notificationEvent?.sevenDaysEventsCount ||
          notificationEvent?.sevenDaysEventsCount === 0
        ) {
          setHasMoreEvent(false);
          setLoadingEvent(false);
        } else {
          setTimeout(() => {
            if (notificationEvent?.sevenDays.length < notificationEvent?.sevenDaysEventsCount) {
              setHasMoreEvent(true);
              setLoadingEvent(false);
            }
          }, 2000);
        }
      }
    }
  }, [notificationEventCount, notificationSelected, openSection]);

  return { loadingEvent, hasMoreEvent, setLoadingEvent };
}
