import * as api from './api'
import { bookingsReducer, myBuilderReducer } from './reducer';

export const getNotificationsByCategoryAction = (payload) => async(dispatch) =>{
    try {
        const {data} = await api.getNotificationsByCategory(payload)
        console.log(data)
        if(data && data.success === true){
            switch (payload.category) {
                case 'MyBuilder':
                    dispatch(myBuilderReducer(data.data))
                    break;
                case 'Booking':
                    dispatch(bookingsReducer(data.data))
                    break;
            
                default:
                    break;
            }
        }
    } catch (error) {
        
    }
}