import { postConstants } from "../Actions/constants";

const initialState = {
    posts: [],
    loading:false
};

const postReducer =  (state = initialState, action) => {
    switch(action.type){
        case postConstants.GET_ALL_POST_SUCCESS:
            state = {
                ...state,
                loading:false,
                posts: action.payload.posts
            }
            break;
        case postConstants.GET_ALL_POST_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        case postConstants.GET_ALL_POST_FAILURE:
            state = {
                ...state,
               error:action.payload.error,
               loading:false
            }
            break;
         default : state={...state}
    }
    

    return state;
}

export default postReducer