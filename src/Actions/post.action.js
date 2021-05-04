import axios from '../Helpers/axios'
import { postConstants } from './constants';

export const createPost = (form) => {
    return async dispatch => {
        try{
            dispatch({ type: postConstants.CREATE_POST_REQUEST });
            
            const res = await axios.post(`/post/create`, form);

            if(res.status === 200){
                dispatch({
                    type: postConstants.CREATE_POST_SUCCESS,
                    payload:{ post: res.data.post} 
                    
                });
                dispatch(getPosts())
            }else{
                dispatch({
                    type: postConstants.CREATE_POST_FAILURE,
                    payload: res.data.error
                });
            }
        }catch(error){
            console.log(error);
        }
        
    }
}


export const getPosts = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: postConstants.GET_ALL_POST_REQUEST });
        const res = await axios.get(`post/getposts`);
        if (res.status === 200) {
          const { posts } = res.data;
          dispatch({
            type: postConstants.GET_ALL_POST_SUCCESS,
            payload: { posts},
          });
        } else {
          dispatch({ type: postConstants.GET_ALL_POST_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  export const updatePost = (updatedPost) => {
    return async dispatch => {
        dispatch({type:postConstants.UPDATE_POST_BY_ID_REQUEST})
  
        const res = await axios.post(`/post/update/?postId=${updatedPost._id}`, {updatePost:updatedPost});
        
        if(res.status === 201){
            dispatch({type:postConstants.UPDATE_POST_BY_ID_SUCCESS})
            dispatch(getPosts())
        }else{
            dispatch({
                type:postConstants.UPDATE_POST_BY_ID_FAILURE,
                payload:{
                    error:res.data.error
                }
            })
        }
    }
}

export const editPostById = (editedPost) => {
  return async dispatch => {
      try{
          dispatch({ type: postConstants.EDIT_POST_BY_ID_REQUEST });
          
          const res = await axios.post(`/post/edit?postId=${editedPost._id}`, editedPost.form);
         
          if(res.status === 201){
              dispatch({
                  type: postConstants.EDIT_POST_BY_ID_SUCCESS,
                  payload:{ message: res.data} 
                  
              });
              dispatch(getPosts())
          }else{
              dispatch({
                  type: postConstants.EDIT_POST_BY_ID_FAILURE,
                  payload: res.data.error
              });
          }
      }catch(error){
          console.log(error);
      }
      
  }
}

  export const deletePostById = (id) => {
    return async (dispatch) => {
      try {
        const res = await axios.post(`/post/delete/?postId=${id}`);
        dispatch({ type: postConstants.DELETE_POST_BY_ID_REQUEST });
        if (res.status === 202) {
          dispatch({ type: postConstants.DELETE_POST_BY_ID_SUCCESS });
          dispatch(getPosts());
        } else {
          const { error } = res.data;
          dispatch({
            type: postConstants.DELETE_POST_BY_ID_FAILURE,
            payload: {
              error,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };