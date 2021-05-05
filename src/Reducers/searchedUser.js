import { userConstants } from "../Actions/constants"

const initState = {
    searchedQuery:[]
}

const searchedUserReducer=  (state = initState, action) => {
    switch(action.type){
       
            
            case userConstants.GET_USER_BY_FIRSTNAME_REQUEST:
                state = {
                    ...state,
                }
                break;
            case userConstants.GET_USER_BY_FIRSTNAME_SUCCESS:
                state = {
                    ...state,
                    searchedQuery:action.payload.users
                }
                break;
            case userConstants.GET_USER_BY_FIRSTNAME_FAILURE:
                state = {
                    ...state,
                    error:action.payload.error
                }
                break;

            default :state={...state}
    }

    return state;
}
export default searchedUserReducer