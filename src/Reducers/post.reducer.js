import { postConstants } from "../Actions/constants";

const initialState = {
    posts: []
};

const postReducer =  (state = initialState, action) => {
    switch(action.type){
        case postConstants.GET_ALL_POST_SUCCESS:
            state = {
                ...state,
                posts: action.payload.posts
            }
            break;
        case postConstants.GET_ALL_POST_REQUEST:
            state = {
                ...state,
            }
            break;
        case postConstants.GET_ALL_POST_FAILURE:
            state = {
                ...state,
               error:action.payload.error
            }
            break;
         default : state={...state}
    }
    

    return state;
}

export default postReducer