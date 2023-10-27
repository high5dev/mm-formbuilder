// ** Navigation imports
import dashboards from './dashboards';

import tasks from './tasks';
import calendar from './calendar';
import business from './business';
import shop from './shop';
import finance from './finance';
import settings from './settings';
import documents from './documents';
import filemanager from './filemanager';
import mysocial from './mysocial';
import statistics from './statistics';
import marketing from './marketing';
import organizations from './organizations';
import { useContacts } from './contacts';

// ** Merge & Export
const verticals = () =>{
  const {contacts} = useContacts()
  return [
    ...dashboards,
    ...organizations,
    ...contacts,
    ...tasks,
    ...calendar,
    ...documents,
    ...marketing,
    ...mysocial,
    ...business,
    ...statistics,
    ...shop,
    ...finance,
    ...filemanager,
    ...settings,
  ];
}

export default verticals;

