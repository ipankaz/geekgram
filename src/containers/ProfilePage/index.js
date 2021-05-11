import React,{useEffect} from "react";
import "./style.css";
import NavBar from "../../components/UI/NavBar";
import BannerBox from "../../components/BannerBox";
import coverPhoto from "../../Media/cover-photo.jpeg";
import profilePic from "../../Media/profilePic.jpg";
import { useSelector,useDispatch } from "react-redux";
import {getUserByUserName, getUserPosts} from '../../Actions/user.action.js'
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/core";
/**
 * @author
 * @function ProfilePage
 **/

 const override = css`
 border-color: red;
 z-index:1000;
 position:absolute;
 top:50%;
 left:48%;
`;

const ProfilePage = (props) => {

  const dispatch = useDispatch();

  const pathname = window.location.pathname;
  const pathnameArray = pathname.split("/");
  const profileUsername = pathnameArray[2];

  useEffect(() => {
    dispatch(getUserByUserName(profileUsername))
  },[profileUsername,dispatch]);

  const user = useSelector((state) => state.user);

  useEffect(()=>{
    if(user.searchedUser.length>0){
      dispatch(getUserPosts(user.searchedUser[0]._id))
    }
  },[user.searchedUser,dispatch])

  return (
    <div className="profile-page">
      <BounceLoader color={'#007bff'} loading={user.loading} css={override} size={40}></BounceLoader>
      {!user.loading && 
      <>
      <NavBar></NavBar>
      <BannerBox
        user={user.searchedUser.length>0 ? user.searchedUser[0] : null}
        coverPic = {coverPhoto}
        profilePic={profilePic}
        posts={user.posts.length>0 && user.posts}
      ></BannerBox>
      </>
      }
    </div>
  );
};

export default ProfilePage;
