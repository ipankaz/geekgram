import {authConstants, userConstants} from '../Actions/constants'
const initAuthState = { 
    token: null,
    user: {
        _id:'',
        firstName: '',
        lastName: '',
        email: '',
        picture: '',
        username:'',
        contactNumber:'',
        gender:'',
        bio:'',
        profilePicture:'',
        dob:null,
        coverPicture:'',
        followers:[],
        following:[]

    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: ''
}

const authReducer = (state = initAuthState,action)=>{
    console.log(action);
    switch(action.type){
       
        case authConstants.LOGIN_REQUEST : 
          state = {
            ...state,
            authenticating:true
        }
        break
        case authConstants.LOGIN_SUCCESS : 
          state = {
            ...state,
            user:action.payload.user,
            token:action.payload.token,
            authenticate:true,
            authenticating:false
        }
        break
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initAuthState
            }
            break
        case authConstants.LOGOUT_FAILURE:
            state = {
                ...state,
                error:action.payload.error,
                loading:false
            }
            break
        case userConstants.UPDATE_USER_PROFILE_REQUEST:
            state = {
                ...state,
            }
            break
        case userConstants.UPDATE_USER_PROFILE_SUCCESS:
            state = {
                ...state,
                user:action.payload.updatedUser,
            }
            break;
        case userConstants.UPDATE_USER_PROFILE_FAILURE:
            state = {
                ...state
            }
            break
        case userConstants.UPDATE_USER_PROFILE_PICTURE_REQUEST:
            state = {
                ...state,
            }
            break
        case userConstants.UPDATE_USER_PROFILE_PICTURE_SUCCESS:
            state = {
                ...state,
                user:action.payload.updatedUser,
            }
            break;
        case userConstants.UPDATE_USER_PROFILE_PICTURE_FAILURE:
            state = {
                ...state
            }
            break

        case userConstants.UPDATE_USER_COVER_PICTURE_REQUEST:
            state = {
                ...state,
            }
            break
        case userConstants.UPDATE_USER_COVER_PICTURE_SUCCESS:
            state = {
                ...state,
                user:action.payload.updatedUser,
            }
            break;
        case userConstants.UPDATE_USER_COVER_PICTURE_FAILURE:
            state = {
                ...state
            }
            break

        case userConstants.ADD_USER_PUBLICITY_REQUEST:
            state = {
                ...state,
            }
            break
        case userConstants.ADD_USER_PUBLICITY_SUCCESS:
            state = {
                ...state,
                user:action.payload.updatedUser,
            }
            break;
        case userConstants.ADD_USER_PUBLICITY_FAILURE:
            state = {
                ...state
            }
            break
            
        default :state={...state}
    }
    return state
}
export default authReducer;