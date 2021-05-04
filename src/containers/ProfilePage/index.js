import React,{useEffect} from "react";
import "./style.css";
import NavBar from "../../components/UI/NavBar";
import BannerBox from "../../components/BannerBox";
import coverPhoto from "../../Media/cover-photo.jpeg";
import profilePic from "../../Media/profilePic.jpg";
import { useSelector,useDispatch } from "react-redux";
import {getUserByUserName, getUserPosts} from '../../Actions/user.action.js'

/**
 * @author
 * @function ProfilePage
 **/

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
      <NavBar></NavBar>
      <BannerBox
        user={user.searchedUser.length>0 ? user.searchedUser[0] : null}
        coverPic = {coverPhoto}
        profilePic={profilePic}
        posts={user.posts.length>0 && user.posts}
      ></BannerBox>
     
    </div>
  );
};

export default ProfilePage;
