import { customInterIceptors } from "../../../../../lib/AxiosProvider";

const API = customInterIceptors()

const createNotification = async(payload) =>{
    return 
}
export const getNotificationsByCategory = async(payload) =>{
    return API.get(`/notification/bycategory`,{params:payload})
}