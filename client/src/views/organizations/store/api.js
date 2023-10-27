import { customInterIceptors } from "../../../lib/AxiosProvider"

const API = customInterIceptors();

export const addOrg = (payload)=>{ //
    return API.post('/organization',payload)
}

export const getOrgs = ()=>{//
    return API.get('/organization')
}

export const getOrg = (id)=>{//
    return API.get(`/organization/${id}`)
}

export const getOrgByPath = (path)=>{
    return API.get(`/organization/path/${path}`)
}

export const updateOrg = (id,payload) =>{
    return API.put(`/organization/${id}`,payload)
}

export const isOrgAvailable =(payload)=>{
    return API.get('/organization/check/availability',payload)
}
export const deleteUserFromOrganization =(payload)=>{
    return API.put('/organization/delete/user',payload)
}

//------- permissions
export const addPermission = (payload) =>{
    return API.post('/permission/',payload)
}

export const getOrgPermissions=()=>{
    return API.get('/permission/')
}

export const updateOrgPermissions = (id) =>{
    return API.put(`/permission/${id}`)
}

//-------- elements


export const getDefaultElements =()=>{
    return API.get('/default-elements/')
}
export const getContactElements =()=>{
    return API.get('/default-elements/contact')
}
export const addNewElement = (payload)=>{
    return API.post('/default-elements/',payload)
}
export const updateElement = (payload)=>{
    return API.put('/default-elements/',payload)
}

export const updatePlanElement = (id,payload)=>{
    return API.put(`/subscription-plan/element/${id}`,payload)
}


//---------- plans
export const createPlan =(payload)=>{
    return API.post('/subscription-plan/',payload)
}

export const getPlans =()=>{
    return API.get('/subscription-plan/')
}

export const getplanById =(id)=>{
    return API.get(`/subscription-plan/${id}`)
}

export const getPlanByOrg =(orgId)=>{
    return API.get(`/subscription-plan/organization/${orgId}`)
}

export const updatePlanById =(id,payload)=>{
    return API.patch(`/subscription-plan/${id}`,payload)
}

export const deletePlanById =(id)=>{
    return API.delete(`/subscription-plan/${id}`)
}

//subscription bought
export const createOrganizationSubscription = (payload)=>{
    return API.post('/subscription-bought/organization',payload)
}
export const updateOrganizationSubscription = (id,payload)=>{
    return API.put(`/subscription-bought/organization/${id}`,payload)
}
export const getOrganizationSubscription = (id,payload)=>{
    return API.get(`/subscription-bought/organization/${id}`,payload)
}

//----------send email
export const sendEmail =(payload)=>{
    return API.post('/organization/send-email',payload)
}

export const sendBulkEmail =(payload)=>{
    return API.post('/organization/send-bulk',payload)
}

//----------- users
export const getAdmin = (id) =>{
    return API.get(`/user/get-admin/${id}`)
}
export const updateUserDetails = (userId,payload) =>{
    return API.put(`/user/profile/${userId}`,payload)
}
export const updateLocationName = (payload) =>{
    return API.put(`/user/organization/location`,payload)
}
export const getSuperAdminDetails = (id)=>{
    ///get-super/:id
    return API.get(`/user/get-super/${id}`)
}
export const getuserById = (id)=>{
    ///get-super/:id
    return API.get(`/user/${id}`)
}

//---------- theming

//---------- contact types
export const getContactTypeByOrg = (id) => {
    return API.get(`contact-type/getByOrg/${id}`);
};

//------------user notes
export const getUserNotes = (belongsTo)=>{
    return API.get(`/user-notes/${belongsTo}`)
}
export const createUserNotes = (payload)=>{
    return API.post(`/user-notes/`,payload)
}
export const updateUserNotes = (id,payload)=>{
    return API.put(`/user-notes/${id}`,payload)
}

//-------------local storage
//** these are the functions that only use when changing organization */
export const getLocalStorage = (token)=>{
    return API.get(`/local-storage/${token}`)
}
export const addUpdateLocalStorage = (payload)=>{
    return API.post(`/local-storage/`,payload)
}