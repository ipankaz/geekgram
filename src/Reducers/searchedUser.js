import { userConstants } from "../Actions/constants"

const initState = {
    searchedQuery:[],
    loading:false
}

const searchedUserReducer=  (state = initState, action) => {
    switch(action.type){
       
            
            case userConstants.GET_USER_BY_FIRSTNAME_REQUEST:
                state = {
                    ...state,
                    loading:true
                }
                break;
            case userConstants.GET_USER_BY_FIRSTNAME_SUCCESS:
                state = {
                    ...state,
                    loading:false,
                    searchedQuery:action.payload.users
                }
                break;
            case userConstants.GET_USER_BY_FIRSTNAME_FAILURE:
                state = {
                    ...state,
                    loading:false,
                    error:action.payload.error
                }
                break;

            default :state={...state}
    }

    return state;
}
export default searchedUserReducer