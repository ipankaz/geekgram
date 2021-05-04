import { userConstants ,postConstants} from "../Actions/constants"

const initState = {
    error: null,
    message: '',
    loading: false,
    done:false,
    posts:[],
    searchedUser:[],
    searchedQuery:[]
}

const userReducer=  (state = initState, action) => {
    switch(action.type){
        case userConstants.USER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                done:true,
                message: action.payload.message
            }
            break;
        case userConstants.USER_REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                done:false,
                error: action.payload.error
            }
            break;
            case postConstants.GET_ALL_USER_POST_SUCCESS:
                state = {
                    ...state,
                    posts: action.payload.posts
                }
                break;
            case postConstants.GET_ALL_USER_POST_REQUEST:
                state = {
                    ...state,
                }
                break;
            case postConstants.GET_ALL_USER_POST_FAILURE:
                state = {
                    ...state,
                   error:action.payload.error
                }
                break;
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

            case userConstants.GET_USER_BY_USERNAME_REQUEST:
                state = {
                    ...state,
                }
                break;
            case userConstants.GET_USER_BY_USERNAME_SUCCESS:
                state = {
                    ...state,
                    searchedUser:action.payload.users
                }
                break;
            case userConstants.GET_USER_BY_USERNAME_FAILURE:
                state = {
                    ...state,
                    error:action.payload.error
                }
                break;

            default :state={...state}
    }

    return state;
}
export default userReducer