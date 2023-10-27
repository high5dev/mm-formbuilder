import * as api from './api';
import { toast } from 'react-toastify';

import {
  contactsReducer,
  selectContactReducer,
  contactNoteFetch,
  allNotesReducer,
  promotedClientData,
  progressionListClient,
  contactRankListSuccess,
  setTagsReducer,
  setStagesReducer,
  setLeadsReducer,
  getProgressionHistoryData,
  getProgressionAllData,
  progressionFetchData,

  // ===============Contact Fields====================
  getContactFieldSuccess,
  // ** update Employee
  employeeUpdateIdSuccess,
  // Category
  getAllCategorySuccess,
  // Work Attendance
  getAttendEmployeeSuccess,
  setPositionsReducer,
  setAllWorkHistory,
  getActivityReducer,
  contactsTypeReducer,
  contractsReducer,
  getClientRankReducer,
  setAllRanks,
  totalContactsCountReducer,
  chunkContactsReducer,
  contactsLoadingReducer,
  birthdayContactsReducer,
  birthdayTabReducer,
  retentionContactsReducer,
  retentionTabReducer,
  getProgressionAllDataWithPagination,
  progressionTabReducer,
  progressionTabCategorySidebarReducer,
  progressionContactsReducer,
  setPositionsByCategoryReducer,
  contactsPaginationReducer,
  getProgramStatisticsReducer,
  getAllEmployeeLaborReducer,
  getEmployeeLaborByContactIdReducer
} from './reducer';

/**
 * Contact Action Method
 * @param {Object} payload json object contact data get in database
 * @returns
 */

// export const contactsAction = (params) => async (dispatch) => {
//   try {
//     const { data } = await api.getTotalContactsCounts();
//     let list = [];
//     let noOfPage = 0;
//     let total = 0;

//     console.log(data.total);
//     while (data.total!==0 && total < data.total) {
//       const { data: contactList } = await api.getContacts({ skip: total, pageSize: 2000 });
//       list = [...list, ...contactList.list];
//       noOfPage = noOfPage + 1;
//       total = total + contactList.total;
//       console.log(total);
//       dispatch(contactsReducer({ list: list, noOfPage: noOfPage, total: total }));
//     }
//   } catch (err) {
//     //toast.error(err)
//     toast.error('Something went wrong');
//   }
// };
export const getChunkContactsAction = (params) => async (dispatch) => {
  try {
    dispatch(contactsLoadingReducer(true));
    const { data: contactList } = await api.getContacts(params);
    dispatch(chunkContactsReducer(contactList?.list));
    dispatch(contactsLoadingReducer(false));
    return contactList?.list;
  } catch (err) {
    console.log(err);
    dispatch(contactsLoadingReducer(false));
    toast.error('Something went wrong');
  }
};
export const getChunkContactsPaginationAction = (params) => async (dispatch) => {
  try {
    const { data: contactList } = await api.getContactsPagination(params);
    dispatch(contactsPaginationReducer(contactList?.data));
    return contactList?.list;
  } catch (err) {
    console.log(err);
    dispatch(contactsLoadingReducer(false));
    toast.error('Something went wrong');
  }
};

export const getTotalContactsCountsActions = (params) => async (dispatch) => {
  try {
    const { data } = await api.getTotalContactsCounts(params);
    dispatch(totalContactsCountReducer(data));
  } catch (err) {
    toast.error('Something went wrong');
  }
};
export const getContactTypesAction = () => async (dispatch) => {
  try {
    const { data } = await api.getContactTypes();
    dispatch(contactsTypeReducer(data));
  } catch (error) {}
};
export const getContactsByNameAction = (searchString) => async (dispatch) => {
  try {
    const { data } = await api.getContactsByName({ searchString: searchString });
    //dispatch(contactsTypeReducer(data));
    return data;
  } catch (error) {}
};

export const contactByIdAction =
  ({ _id }) =>
  async (dispatch) => {
    try {
      const { data } = await api.getContactById(_id);
      //dispatch(selectContactAction(data));
      return data;
    } catch (error) {}
  };

// ** Business Statistics
export const getRetentionStatisticsData = (params) => async (dispatch) => {
  try {
    const { data } = await api.getRetentionStatisticsData(params);
    dispatch(retentionTabReducer(data));
  } catch (err) {
    console.log(err);
    dispatch(contactsLoadingReducer(false));
    toast.error('Something went wrong');
  }
};

export const getContactsByRetention = (params) => async (dispatch) => {
  try {
    dispatch(contactsLoadingReducer(true));
    const { data } = await api.getContactsByRetention(params);
    dispatch(retentionContactsReducer(data));
    dispatch(contactsLoadingReducer(false));
  } catch (err) {
    console.log(err);
    dispatch(contactsLoadingReducer(false));
    toast.error('Something went wrong');
  }
};

export const getBirthdayStatisticsData = (params) => async (dispatch) => {
  try {
    const { data } = await api.getBirthdayStatisticsData(params);
    dispatch(birthdayTabReducer(data));
  } catch (err) {
    console.log(err);
    dispatch(contactsLoadingReducer(false));
    toast.error('Something went wrong');
  }
};

export const getContactsByBirthday = (params) => async (dispatch) => {
  try {
    dispatch(contactsLoadingReducer(true));
    const { data } = await api.getContactsByBirthday(params);
    dispatch(birthdayContactsReducer(data));
    dispatch(contactsLoadingReducer(false));
  } catch (err) {
    console.log(err);
    dispatch(contactsLoadingReducer(false));
    toast.error('Something went wrong');
  }
};

export const getProgressionStatisticsDataAction = (params) => async (dispatch) => {
  try {
    const { data } = await api.getProgressionStatisticsData(params);
    dispatch(progressionTabReducer(data));
  } catch (err) {
    console.log(err);
    dispatch(contactsLoadingReducer(false));
    toast.error('Something went wrong');
  }
};

export const getProgressionStatisticsCategorySidebarDataAction = (params) => async (dispatch) => {
  try {
    const { data } = await api.getProgressionStatisticsCategorySidebarData(params);
    dispatch(progressionTabCategorySidebarReducer(data));
  } catch (err) {
    console.log(err);
    dispatch(contactsLoadingReducer(false));
    toast.error('Something went wrong');
  }
};

export const getContactsByProgression = (params) => async (dispatch) => {
  try {
    dispatch(contactsLoadingReducer(true));
    const { data } = await api.getContactsByProgression(params);
    dispatch(progressionContactsReducer(data));
    dispatch(contactsLoadingReducer(false));
  } catch (err) {
    console.log(err);
    dispatch(contactsLoadingReducer(false));
    toast.error('Something went wrong');
  }
};

export const getContactStatisticsById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getStatistics(id);
    return data;
  } catch (error) {}
};
export const getInvoicesByContactIdAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getInvoiceByContactId(id);
    return data;
  } catch (error) {}
};

export const getStripeCardsAction = (customerId) => async (dispatch) => {
  try {
    const { data } = await api.getContactStripeCards(customerId);
    return data;
  } catch (error) {}
};
export const insertContactStripeCardsAction = (customerId, payload) => async (dispatch) => {
  try {
    const { data } = await api.insertContactStripeCards(customerId, payload);
    if (data && data.success === true) {
      toast.success('Card saved successfully');
      return dispatch(getStripeCardsAction(customerId));
    } else {
      toast.error('Please try again');
    }
  } catch (error) {}
};
export const updateStripeCardsAction =
  (paymentMethodId, payload, customerId) => async (dispatch) => {
    try {
      const { data } = await api.updateContactStripeCards(paymentMethodId, payload);
      if (data && data.success === true) {
        return dispatch(getStripeCardsAction(customerId));
      } else {
        toast.error('Please try again');
      }
    } catch (error) {}
  };

export const addContactAction = (payload) => async (dispatch) => {
  try {
    const data = await api.addContact(payload);

    if (data.status == 200) {
      dispatch(getChunkContactsAction({ contactType: payload.contactType[0] }));

      const { data: countdata } = await api.getTotalContactsCounts({
        contactType: payload.contactType[0]
      });
      dispatch(totalContactsCountReducer(countdata));

      toast.success('Contact created successfully');
      return data.data;
    } else {
      toast.error('Contact create failed');
      return data.data;
    }
  } catch (err) {
    toast.error('Contact create failed');
  }
};
export const addBulkContactAction = (payload) => async (dispatch) => {
  try {
    const data = await api.addBulkContact(payload);
    if (data.status == 200) {
      dispatch(getChunkContactsAction({ contactType: payload.contactType }));
      toast.success('Contact created successfully');
      return data.data;
    } else {
      toast.error('Contact create failed');
      return data.data;
    }
  } catch (err) {
    console.log(err);
    toast.error('Contact create failed');
  }
};
export const addBulkFamilyAction = (contactId, payload) => async (dispatch) => {
  try {
    const data = await api.addBulkFamily(contactId, payload);

    if (data.status == 200) {
      dispatch(getChunkContactsAction({ contactType: payload[0].contactType[0] }));
      toast.success('Contact created successfully');

      return data.data;
    } else {
      toast.error('Contact create failed');
      return data.data;
    }
  } catch (err) {
    toast.error('Contact create failed');
  }
};
export const addBuyerAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addBuyer(payload);
    if (data.success == true) {
      toast.success('Contact created successfully');
      return data.buyer;
    } else {
      toast.error('Contact create failed');
      return data.data;
    }
  } catch (err) {
    toast.error('Contact create failed');
  }
};

export const addUpdateBuyerAction = (contactId, payload) => async (dispatch) => {
  try {
    const { data } = await api.addUpdateBuyer(contactId, payload);
    if (data.success == true) {
      dispatch(getChunkContactsAction({ contactType: payload[0].contactType[0] }));
      toast.success('Contact created successfully');
      return data.buyer;
    } else {
      toast.error('Contact create failed');
      return data.data;
    }
  } catch (err) {
    toast.error('Contact create failed');
  }
};

export const getFamilyMembersAction = (contactId) => async (dispatch) => {
  try {
    const { data } = await api.getFamilyMembers(contactId);
    if (data.success === true) {
      let family = [];
      data.family.map((x) => {
        family.push({ ...x.id, relation: x.relation });
      });
      return family;
    } else {
      return [];
    }
  } catch (error) {
    toast.error('An error occured! please refresh and try again');
  }
};

export const updateContactAction = (payload, contactTypeId) => async (dispatch) => {
  try {
    const data = await api.updateContact(payload);
    if (data.status == 200) {
      !payload?.noNotification && toast.success('Contact updated successfully');

      dispatch(
        getChunkContactsAction({
          contactType: contactTypeId
            ? contactTypeId
            : payload.contactType
            ? payload.contactType[0]
            : null
        })
      );
      const { data: countData } = await api.getTotalContactsCounts({
        contactType: contactTypeId
          ? contactTypeId
          : payload.contactType
          ? payload.contactType[0]
          : null
      });
      dispatch(totalContactsCountReducer(countData));

      dispatch(contactByIdAction({ _id: payload._id }));
      return data;
    } else {
      !payload?.noNotification && toast.error('Contact update failed');
      return data;
    }
  } catch (err) {
    !payload?.noNotification && toast.error('Contact update failed');
  }
};

export const updateEmployeesRoleAction = (payload) => async (dispatch) => {
  try {
    const data = await api.updateEmployeesRole(payload);

    if (data.status == 200) {
      toast.success('Contact updated successfully');
      dispatch(
        getChunkContactsAction({ contactType: payload.contactType ? payload.contactType : null })
      );
      return data;
    } else {
      toast.error('Contact update failed');
      return data;
    }
  } catch (err) {
    toast.error('Contact update failed');
  }
};

export const updateFieldValueContactAction = (payload) => async (dispatch) => {
  try {
    const data = await api.updateFieldValueContact(payload);

    if (data.status == 200) {
      // success('Contact updated successfully');

      return data;
    } else {
      toast.error('Contact update failed');
      return data;
    }
  } catch (err) {
    toast.error('Contact update failed');
  }
};

export const deleteContactAction = (payload) => async (dispatch) => {
  try {
    const data = await api.deleteContact({ ids: payload.ids });

    if (data.status == 200) {
      dispatch(getChunkContactsAction({ contactType: payload.contactType }));
      const { data: countData } = await api.getTotalContactsCounts(params);
      dispatch(totalContactsCountReducer(countData));

      toast.success('Contact deleted successfully');
      return data.data;
    } else {
      toast.error('Contact delete failed');
      return data.data;
    }
  } catch (err) {
    toast.error('Contact delete failed');
  }
};

/**
 * Contact Select Method
 * @param {Object} payload json object selected contact data
 * @returns
 */
export const selectContactAction = (payload) => async (dispatch) => {
  try {
    dispatch(selectContactReducer(payload));
  } catch (err) {}
};

/**
 * Get Note Method
 * @param {String} id contact _id
 * @returns
 */
export const contactNoteFetchAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.contactNoteById(id);
    dispatch(contactNoteFetch(data));
  } catch (error) {}
};

export const getAllNotesAction = () => async (dispatch) => {
  try {
    const { data } = await api.contactNoteList();
    dispatch(allNotesReducer(data));
  } catch (error) {}
};

/**
 * Add Contact Note Method
 * @param {Object} newNote json object data of notes
 * @param {*} id client _id
 * @returns
 */
export const contactNoteAddAction = (newNote, id, contactType) => async (dispatch) => {
  try {
    const { data } = await api.contactNoteAdd(newNote, id);
    dispatch(getChunkContactsAction({ contactType: contactType ? contactType : null }));
    dispatch(contactNoteFetchAction(id));
  } catch (error) {}
};

/**
 * Delete Contact Note Method
 * @param {String} id note _id
 * @param {String} parentId note parentId
 * @returns
 */
export const contactNoteDeleteAction = (id, parentId) => async (dispatch) => {
  try {
    const { data } = await api.contactNoteDelete(id);
    dispatch(contactNoteFetchAction(parentId));
  } catch (error) {}
};

/**
 * Edit Contact Note Method
 * @param {Object} newNote note data for update
 * @param {String} parentId note parentId
 * @returns
 */
export const contactNoteEditAction = (newNote, parentId) => async (dispatch) => {
  try {
    const { data } = await api.contactNoteEdit(newNote);
    dispatch(contactNoteFetchAction(parentId));
  } catch (error) {}
};

//GET CONTACT MEMBERSHIP CONTRACTS
export const getContactMembershipContractsAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getContactContractsApi(id);
    if (data.success === true) {
      dispatch(contractsReducer(data.data));
      return data.data;
    }
  } catch (error) {}
};

//tags
export const getTagsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getTags();
    if (data) {
      dispatch(setTagsReducer(data));
    }
  } catch (error) {}
};

export const updateTagsAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateTag(id, payload);
    if (data) {
      dispatch(getTagsAction());
    }
  } catch (error) {}
};

export const deleteTagsAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteTag(id);
    if (data) {
      dispatch(getTagsAction());
    }
  } catch (error) {}
};

export const createTagsAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createTag(payload);
    if (data) {
      dispatch(getTagsAction());
    }
  } catch (error) {
    toast.error('Tag create failed');
  }
};

// Stages
export const getStagesAction = () => async (dispatch) => {
  try {
    const { data } = await api.getStages();
    if (data) {
      dispatch(setStagesReducer(data));
    }
  } catch (error) {}
};

export const updateStageAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateStage(id, payload);
    if (data) {
      dispatch(getStagesAction());
      toast.success('Stage updated successfully');
    }
  } catch (error) {
    toast.error('Update Stage failed');
  }
};

export const deleteStageAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteStage(id);
    if (data) {
      toast.success('Stage removed successfully');
      dispatch(getStagesAction());
    }
  } catch (error) {}
};

export const createStageAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createStage(payload);
    if (data) {
      dispatch(getStagesAction());
      toast.successsuccess('Stage created successfully');
    }
  } catch (err) {
    toast.error('Stage create failed');
  }
};

export const reorderStageAction = (oldIndex, newIndex) => async (dispatch) => {
  try {
    const { data } = await api.reorderStage(oldIndex, newIndex);
    if (data) {
      dispatch(getStagesAction());
      toast.success('Stages have been reordered successfully');
    }
  } catch (err) {
    toast.error('Reorder stage failed');
  }
};

//lead source
export const getLeadsSourceAction = () => async (dispatch) => {
  try {
    const { data } = await api.getLeadSource();
    if (data) {
      dispatch(setLeadsReducer(data));
    }
  } catch (error) {}
};
export const createLeadsSourceAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addLeadSource(payload);
    if (data) {
      dispatch(getLeadsSourceAction());
    }
  } catch (error) {}
};
export const deleteLeadsSourceAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteLeadSource(id);
    if (data) {
      dispatch(getLeadsSourceAction());
    }
  } catch (error) {}
};
export const updateLeadsSourceAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateLeadSource(id, payload);
    if (data) {
      dispatch(getLeadsSourceAction());
    }
  } catch (error) {}
};

export const progressionFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProgression();
    dispatch(progressionFetchData(data?.data));
  } catch (error) {}
};
export const getAllRanksAction = () => async (dispatch) => {
  try {
    const { data } = await api.getAllRanks();
    dispatch(setAllRanks(data?.data));
  } catch (error) {}
};

export const activityAction = (clientId) => async (dispatch) => {
  try {
    const { data } = await api.activity(clientId);
    dispatch(getActivityReducer(data?.data));
  } catch (error) {}
};

//=====================NEW Client ranks ====================
export const getRanksByContactIdAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getRankByContactId(id);
    if (data) {
      dispatch(getProgressionHistoryData(data.data));
    }
  } catch (error) {
    console.log(error);
  }
};
export const getRanksByCategoryAndContactIdsAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.getRanksByCategoryAndContactIds(payload);
    if (data) {
      dispatch(getProgressionAllData(data.data));
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getRanksByCategoryAndContactIdsWithPaginationAction =
  (payload) => async (dispatch) => {
    try {
      const { data } = await api.getRanksByCategoryAndContactIdsWithPagination(payload);
      if (data) {
        dispatch(getProgressionAllDataWithPagination(data.data));
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };
export const insertRankAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.insertRank(payload);
    if (data) {
      toast.success(data.msg);
      dispatch(getRanksByContactIdAction(payload.contactId));
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateRankAction = (id, contactId, payload, contactType) => async (dispatch) => {
  try {
    const { data } = await api.updateRank(id, payload);
    //save in reducer
    if (data) {
      toast.success('Rank Updated Successfully');
      dispatch(getRanksByContactIdAction(contactId)).then((res) => {
        dispatch(getChunkContactsAction({ contactType: contactType ? contactType : null }));
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteRankAction = (id, contactId, contactType) => async (dispatch) => {
  try {
    const { data } = await api.deleteRankHistory(id);
    //save in reducer
    if (data) {
      toast.success('Rank deleted Successfully');
      dispatch(getRanksByContactIdAction(contactId)).then(async (res) => {
        await dispatch(getChunkContactsAction({ contactType: contactType ? contactType : null }));
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const insertRankBulkAction = (payload, contactType) => async (dispatch) => {
  try {
    const { data } = await api.insertBulkRank(payload);
    //save in reducer
    if (data) {
      toast.success(data.msg);
      dispatch(getChunkContactsAction({ contactType: contactType ? contactType : null }));
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

// ====================contact types====================
export const addContactTypeAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addContactType(payload);
    if (data) {
      toast.success('contact type added successfully');
    }

    return data;
  } catch (error) {}
};

export const updateContactTypeByIdAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateContactType(id, payload);
    if (data) {
      toast.success('contact type updated successfully');
    }

    return data;
  } catch (error) {}
};

export const deleteContactTypeByIdAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.deleteContactType(id, payload);
    if (data) {
      toast.success('contact type deleted successfully');
    }
    return data;
  } catch (error) {}
};

// =====================Contact Fields===================
export const addContactFieldAction = (payload) => async (dispatch) => {
  try {
    let finalPayload = payload;
    let organization = localStorage.getItem('organization');
    if (organization) {
      organization = JSON.parse(organization);
      finalPayload = { ...payload, organizationId: organization._id };
    }
    const { data } = await api.addContactField(finalPayload);
    if (data) {
      toast.success('Contact field added successfully');
      dispatch(getContactFieldByTypeAction(payload.contactType));
    }
    return data;
  } catch (error) {}
};

export const getContactFieldByTypeAction = (contactTypeId) => async (dispatch) => {
  try {
    const { data } = await api.getContactFieldByType(contactTypeId);
    dispatch(getContactFieldSuccess(data.data.columns));
  } catch (error) {
    toast.error(error?.message);
  }
};
export const programStatisticsAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.getProgramStatistics(payload);
    dispatch(getProgramStatisticsReducer(data.data));
  } catch (error) {}
};

export const updateContactFieldOrderAction = (payload) => async (dispatch) => {
  try {
    let finalPayload = payload;
    let organization = localStorage.getItem('organization');
    if (organization) {
      organization = JSON.parse(organization);
      finalPayload = { ...payload, organization: organization._id };
    }
    const { data } = await api.updateContactFieldOrder(finalPayload);
    if (data) {
      toast.success('Order Updated successfully');
      //dispatch(getContactFieldByTypeAction(payload.contactType))
    }
  } catch (error) {
    toast.error(error?.message);
  }
};
export const updateContactFieldWidthAction = (payload) => async (dispatch) => {
  try {
    let finalPayload = payload;
    let organization = localStorage.getItem('organization');
    if (organization) {
      organization = JSON.parse(organization);
      finalPayload = { ...payload, organization: organization._id };
    }
    const { data } = await api.updateContactFieldWidth(finalPayload);
    if (data) {
      toast.success('Width Updated successfully');
      //dispatch(getContactFieldByTypeAction(payload.contactType))
    }
  } catch (error) {
    toast.error(error?.message);
  }
};
export const addContactFieldValueAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addContactFieldValue(payload);
    if (data) {
      toast.success('Value updated successfully');

      dispatch(getChunkContactsAction({ contactType: payload.contactType }));
    }
  } catch (error) {
    toast.error(error?.message);
  }
};

export const deleteContactFieldAction = (payload) => async (dispatch) => {
  try {
    let finalPayload = payload;
    let organization = localStorage.getItem('organization');
    if (organization) {
      organization = JSON.parse(organization);
      finalPayload = { ...payload, organization: organization._id };
    }
    const { data } = await api.deleteContactFieldByType(finalPayload);
    if (data) {
      dispatch(getContactFieldByTypeAction(payload.contactType));
      toast.success('Contact field deleted successfully');
    }
    return data;
  } catch (error) {}
};

export const updateContactFieldAction = (payload) => async (dispatch) => {
  try {
    let finalPayload = payload;
    let organization = localStorage.getItem('organization');
    if (organization) {
      organization = JSON.parse(organization);
      finalPayload = { ...payload, organization: organization._id };
    }
    const { data } = await api.updateContactFieldByType(finalPayload);
    if (data) {
      dispatch(getContactFieldByTypeAction(payload.contactType));
      toast.success('Contact field updated successfully');
    }
    return data;
  } catch (error) {}
};

// =====================Client Reducer===================

// contact import actions

export const contactImportAction =
  (payload, contactType, pageSize) => async (dispatch, getState) => {
    try {
      const { data } = await api.importContactReqeust(payload);
      dispatch(importProcessingFinish(data));
      await dispatch(getChunkContactsAction({ contactType: contactType, pageSize: pageSize }));
      if (data === 'Imported') {
        toast.success('Contact imported successfully');
      }
    } catch (error) {}
  };

export const contactUpdateByIdAction = (contact) => async (dispatch) => {
  try {
    const { data } = await api.updateContact(contact);
    dispatch(employeeUpdateIdSuccess(data));
    // Refetch Employee
    dispatch(contactByIdAction({ _id: contact?._id }));
  } catch (error) {}
  // Reset After 3 sec
};

// ** Total Active Employee Count

// ** Selected employee save
export const saveEmpArrToMapAction = (payload, contactType, pageSize) => async (dispatch) => {
  try {
    await api.saveEmpArrToMap(payload);
    await dispatch(getChunkContactsAction({ contactType: contactType, pageSize: pageSize }));
  } catch (error) {}
};

// ** Work history
export const getAllWorkHistory = (payload) => async (dispatch) => {
  try {
    const { data } = await api.getAllWorkHistory(payload);
    dispatch(setAllWorkHistory(data));
  } catch (error) {
    //
  }
};
//--------------------- check till here

export const getAllEmployeeCategoryAction = () => async (dispatch) => {
  try {
    const { data } = await api.getAllEmployeeCategory();
    dispatch(getAllCategorySuccess(data));
  } catch (error) {}
};

export const createCategoryAction = (newCategory) => async (dispatch) => {
  try {
    await api.createCategory(newCategory);
  } catch (error) {}
};

export const updateCategoryAction = (newCategory) => async (dispatch) => {
  try {
    await api.updateCategory(newCategory);
  } catch (error) {}
};

export const deleteCategoryAction = (id) => async (dispatch) => {
  try {
    await api.deleteCategory(id);
  } catch (error) {}
};

// Attendance actions

export const getEmployeeAttendanceAction = () => async (dispatch) => {
  try {
    const { data } = await api.getAllAttendEmployee();
    dispatch(getAttendEmployeeSuccess(data));
  } catch (error) {}
};

export const saveAttendEmployeeAction = (newAttend) => async (dispatch) => {
  try {
    await api.saveAttendEmployee(newAttend).then((res) => {
      dispatch(getEmployeeAttendanceAction());
    });
  } catch (error) {}
};

export const checkOutEmployeeAction = (id) => async (dispatch) => {
  try {
    await api.checkOutEmployee(id).then((res) => {
      dispatch(getEmployeeAttendanceAction());
    });
  } catch (error) {}
};

//------------CONTACT POSITIONS
export const getPositionsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getPositions();
    dispatch(setPositionsReducer(data.data));
  } catch (error) {}
};

export const getPositionsByCategoryAction = (categoryId) => async (dispatch) => {
  try {
    const { data } = await api.getPositionsByCategory(categoryId);
    dispatch(setPositionsByCategoryReducer(data.data));
  } catch (error) {
    console.log('error--------------------', error);
  }
};

export const createPositionsAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createPosition(payload);
    if (data) {
      toast.success('Position created successfully');
      dispatch(getPositionsAction());
    }
  } catch (error) {}
};
export const updatePositionsAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updatePosition(id, payload);

    if (data) {
      toast.success('Position updated successfully');
      dispatch(getPositionsAction());
    }
  } catch (error) {}
};

//ROLES
export const getEmployeePermissionAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getEmployeeRolesAndPermissions(id);
    return data;
  } catch (error) {}
};
// ** PUNCH ID
export const autogeneratePunchIdAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.autoGeneratePunchId(id);
    if (data?.success === true) {
      toast.success(data?.message);
      dispatch(contactByIdAction({ _id: id }));
    }
    return data;
  } catch (error) {}
};
export const updatePunchIdAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.updatePunchId(payload);
    if (data?.success === true) {
      toast.success(data?.message);
      dispatch(contactByIdAction({ _id: payload.contactId }));
    } else if (data?.success === false) {
      toast.error(data?.message);
      dispatch(contactByIdAction({ _id: payload.contactId }));
    }
    return data;
  } catch (error) {}
};

// CONTACT STATISTICS
export const getContactClassesAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getContactClasses(id);
    if (data) {
      return data.data;
    }
  } catch (error) {}
};
export const getContactBookingStatusAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.getContactBookingStatus(payload);
    if (data) {
      return data.data;
    }
  } catch (error) {}
};

// ________________SHOULD CHANGE TO CONTACT
export const checkMemberAction = (id) => async (dispatch) => {
  try {
    await api.checkMember(id).then((res) => {
      dispatch(contactListRequest());
    });
  } catch (error) {}
};

// All Employee labor
export const getAllEmployeeLaborAction = () => async (dispatch) => {
  try {
    await api.getAllEmployeeLabor().then((res) => {
      if (res.data) dispatch(getAllEmployeeLaborReducer(res.data));
    });
  } catch (error) {}
};

// Employee labor by contact id
export const getEmployeeLaborByContactIdAction = (id) => async (dispatch) => {
  try {
    await api.getEmployeeLaborByContactId(id).then((res) => {
      if (res.data) dispatch(getEmployeeLaborByContactIdReducer(res.data));
    });
  } catch (error) {}
};
