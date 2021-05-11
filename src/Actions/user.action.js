import {userConstants,postConstants} from './constants'
import axios from '../Helpers/axios'

export const signup = (form)=>{
     console.log(form)
    return async (dispatch)=>{
        dispatch({
            type:userConstants.USER_REGISTER_REQUEST
        })
        const res = await axios.post('signup',form)
        if(res.status===201){
            dispatch({
                type:userConstants.USER_REGISTER_SUCCESS,
                payload:{
                 message:res.data.message
                }
            })
        }else{
            if(res.status===400){
                dispatch({
                    type:userConstants.USER_REGISTER_FAILURE,
                    payload:{
                       error:res.data.error,
                       message:res.data.message
                    }
                })
            }
        }


    }

}
export const signupAuthentication = (query)=>{
    return async (dispatch)=>{
        dispatch({
            type:userConstants.USER_SIGNUP_AUTHENTICATION_REQUEST
        })
        const res = await axios.post('signup/authentication',query)
        if(res.status===200){
            dispatch({
                type:userConstants.USER_SIGNUP_AUTHENTICATION_SUCCESS,
                payload:{
                 message:res.data.message
                }
            })
        }else{
            if(res.status===400){
                dispatch({
                    type:userConstants.USER_SIGNUP_AUTHENTICATION_FAILURE,
                    payload:{
                       error:res.data.error,
                       message:res.data.message
                    }
                })
            }
        }


    }

}
export const getUserPosts = (userId) => {
    return async (dispatch) => {
      try {
        dispatch({ type: postConstants.GET_ALL_USER_POST_REQUEST });
        const res = await axios.get(`post/getuserposts?userId=${userId}`);
        if (res.status === 200) {
          const { posts } = res.data;
          dispatch({
            type: postConstants.GET_ALL_USER_POST_SUCCESS,
            payload: { posts},
          });
        } else {
          dispatch({ type: postConstants.GET_ALL_USER_POST_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
export const getUserByFirstName = (firstname) => {
    return async (dispatch) => {
      try {
        dispatch({ type: userConstants.GET_USER_BY_FIRSTNAME_REQUEST });
        const res = await axios.get(`search/firstname?firstname=${firstname}`);
        if (res.status === 200) {
          const { users } = res.data;
          dispatch({
            type: userConstants.GET_USER_BY_FIRSTNAME_SUCCESS,
            payload: { users},
          });
        } else {
          dispatch({ type: userConstants.GET_USER_BY_FIRSTNAME_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
export const getUserByUserName = (username) => {
    return async (dispatch) => {
      try {
        dispatch({ type: userConstants.GET_USER_BY_USERNAME_REQUEST });
        const res = await axios.get(`search/username?username=${username}`);
        if (res.status === 200) {
          const { users} = res.data;
          dispatch({
            type: userConstants.GET_USER_BY_USERNAME_SUCCESS,
            payload: { users},
          });
        } else {
          dispatch({ type: userConstants.GET_USER_BY_USERNAME_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

export const updateUserProfile = (form) => {
    return async (dispatch) => {
      try {
        dispatch({ type: userConstants.UPDATE_USER_PROFILE_REQUEST });
        const res = await axios.post(`user/update?userId=${form.userId}`,{updateUser:form.updateUser});
        if (res.status === 201) {
          const { updatedUser} = res.data;
          localStorage.setItem('user',JSON.stringify(updatedUser))
          dispatch({
            type: userConstants.UPDATE_USER_PROFILE_SUCCESS,
            payload: { updatedUser:updatedUser},
          });
          dispatch({
            type: userConstants.GET_USER_BY_USERNAME_SUCCESS,
            payload: { users:[updatedUser]},
          });
        } else {
          dispatch({ type: userConstants.UPDATE_USER_PROFILE_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
export const updateUserProfilePicture = (form) => {
    return async (dispatch) => {
      try {
        dispatch({ type: userConstants.UPDATE_USER_PROFILE_PICTURE_REQUEST });
        const user = JSON.parse(localStorage.getItem('user'))
        const res = await axios.post(`user/update/profilePicture?userId=${user._id}`,form);
        if (res.status === 201) {
          const { updatedUser} = res.data;
          localStorage.setItem('user',JSON.stringify(updatedUser))
          dispatch({
            type: userConstants.UPDATE_USER_PROFILE_PICTURE_SUCCESS,
            payload: { updatedUser:updatedUser},
          });
          dispatch({
            type: userConstants.GET_USER_BY_USERNAME_SUCCESS,
            payload: { users:[updatedUser]},
          });
        } else {
          dispatch({ type: userConstants.UPDATE_USER_PROFILE_PICTURE_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
export const updateUserCoverPicture = (form) => {
    return async (dispatch) => {
      try {
        dispatch({ type: userConstants.UPDATE_USER_COVER_PICTURE_REQUEST });
        const user = JSON.parse(localStorage.getItem('user'))
        const res = await axios.post(`user/update/coverPicture?userId=${user._id}`,form);
        if (res.status === 201) {
          const { updatedUser} = res.data;
          localStorage.setItem('user',JSON.stringify(updatedUser))
          dispatch({
            type: userConstants.UPDATE_USER_COVER_PICTURE_SUCCESS,
            payload: { updatedUser:updatedUser},
          });
          dispatch({
            type: userConstants.GET_USER_BY_USERNAME_SUCCESS,
            payload: { users:[updatedUser]},
          });
        } else {
          dispatch({ type: userConstants.UPDATE_USER_COVER_PICTURE_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

export const addUserPublicity = (friendUserId) => {
    return async (dispatch) => {
      try {
        dispatch({ type: userConstants.ADD_USER_PUBLICITY_REQUEST });
        const user = JSON.parse(localStorage.getItem('user'))
        const res = await axios.post(`user/add/publicity?friendUserId=${friendUserId}`,{userId:user._id});
        if (res.status === 201) {
          const { updatedUser} = res.data;
          if(updatedUser!==null){
            localStorage.setItem('user',JSON.stringify(updatedUser))
            dispatch({
              type: userConstants.ADD_USER_PUBLICITY_SUCCESS,
              payload: { updatedUser:updatedUser},
            });
            // dispatch({
            //   type: userConstants.GET_USER_BY_USERNAME_SUCCESS,
            //   payload: { users:[updatedUser]},
            // });
          }else{
            console.log("already followed");
          }
        } else {
          dispatch({ type: userConstants.ADD_USER_PUBLICITY_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

export const removeUserPublicity = (friendUserId) => {
    return async (dispatch) => {
      try {
        dispatch({ type: userConstants.REMOVE_USER_PUBLICITY_REQUEST });
        const user = JSON.parse(localStorage.getItem('user'))
        const res = await axios.post(`user/remove/publicity?friendUserId=${friendUserId}`,{userId:user._id});
        if (res.status === 201) {
          const { updatedUser} = res.data;
          if(updatedUser!==null){
            localStorage.setItem('user',JSON.stringify(updatedUser))
            dispatch({
              type: userConstants.REMOVE_USER_PUBLICITY_SUCCESS,
              payload: { updatedUser:updatedUser},
            });
            // dispatch({
            //   type: userConstants.GET_USER_BY_USERNAME_SUCCESS,
            //   payload: { users:[updatedUser]},
            // });
          }else{
            console.log("already unfollowed");
          }
        } else {
          dispatch({ type: userConstants.REMOVE_USER_PUBLICITY_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
