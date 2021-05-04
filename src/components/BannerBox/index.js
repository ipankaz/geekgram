import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import HomePage from "../../containers/HomePage";
import { generatePublicUrl } from "../../urlConfig";
import EditProfile from "../UI/EditProfile";
import userCoverPicture from "../../Media/default-cover.jpeg";
import userProfilePicture from "../../Media/default-user.png";
import Modal from "../../components/UI/Modal";
import "./style.css";
import {
  addUserPublicity,
  updateUserCoverPicture,
  updateUserProfilePicture,
  removeUserPublicity
} from "../../Actions";
import { Container } from "react-bootstrap";
import Publicity from "../UI/Publicity";
/**
 * @author
 * @function BannerBox
 **/

const BannerBox = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const [differentUser, setDifferentUser] = useState(true);
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const [coverPicturePreview, setCoverPicturePreview] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [mediaError, setMediaError] = useState(false);
  const [followUser,setFollowUser] = useState(true)

  useEffect(() => {
    if (props.user!==null && auth.user._id === props.user._id) {
      setDifferentUser(false);
    }
  }, [auth.user._id, props.user]);

  const pathname = window.location.pathname;

  let active1 = "";
  let active2 = "";
  let active3 = "";
  let active4 = "";

  if (props.user && pathname === `/profile/${props.user.username}`) {
    active1 = "active";
  } else if (props.user && pathname === `/profile/${props.user.username}/followers`) {
    active2 = "active";
  } else if (props.user && pathname === `/profile/${props.user.username}/following`) {
    active3 = "active";
  } else if (props.user && pathname === `/profile/${props.user.username}/edit`) {
    active4 = "active";
  }

useEffect(()=>{
  auth.user.following && auth.user.following.forEach(following => {
    if(props.user && following.userId===props.user._id){
      setFollowUser(false)
    }
});
},[auth.user.following,props.user])

  const handleChangeCoverPictureUpload = (event) => {
    const selected = event.target.files[0];

    setMediaError(false);
    const allowedTypes = ["image/jpg", "image/png", "image/gif", "image/jpeg"];
    if (selected && allowedTypes.includes(selected.type)) {
      setCoverPicture(selected);
      let reader = new FileReader();
      reader.onloadend = () => {
        setCoverPicturePreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      setMediaError(true);
    }
  };

  const handleProfilePictureUpload = (event) => {
    const selected = event.target.files[0];

    setMediaError(false);
    const allowedTypes = ["image/jpg", "image/png", "image/gif", "image/jpeg"];
    if (selected && allowedTypes.includes(selected.type)) {
      setProfilePicture(selected);
      let reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(selected);
      setShow(true);
    } else if (selected && !allowedTypes.includes(selected.type)) {
      setMediaError(true);
      setShow(true);
    }
  };

  const submitChangeCoverPicture = () => {
    const form = new FormData();
    if (coverPicture) {
      form.append("coverPicture", coverPicture);
    }
    dispatch(updateUserCoverPicture(form));
    setCoverPicture(null);
    setCoverPicturePreview(null);
    setMediaError(false);
  };

  const submitChangeProfilePicture = () => {
    const form = new FormData();
    if (profilePicture) {
      form.append("profilePicture", profilePicture);
    }
    dispatch(updateUserProfilePicture(form));
    setCoverPicture(null);
    setCoverPicturePreview(null);
    setMediaError(false);
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleAddUserPublicity = ()=>{
        dispatch(addUserPublicity(props.user._id))
  }

  const handleRemoveUserPublicity = ()=>{
    dispatch(removeUserPublicity(props.user._id))
    setFollowUser(true)
  }

  const renderProfilePicturePreviewMoal = () => {
    return (
      <Modal
        show={show}
        handleCloseModal={handleClose}
        onHide={handleClose}
        action={submitChangeProfilePicture}
        _task={"Save Changes"}
        centered="centered"
        color="success"
        className="my-modal"
      >
        <Container fluid>
          <div className="profile-preview">
            {mediaError ? (
              <span>Image format not supported</span>
            ) : (
              <img src={profilePicturePreview} alt="preview"></img>
            )}
          </div>
        </Container>
      </Modal>
    );
  };

  return (
    <>
      {props.user ?
    <div className="banner-box">
    <div className="cover-photo-blur">
      <img
        src={
          coverPicturePreview !== null
            ? coverPicturePreview
            : props.user.coverPicture && props.user.coverPicture.img !== ""
            ? generatePublicUrl(props.user.coverPicture.img)
            : userCoverPicture
        }
        alt="cover"
      ></img>

      <div className="profile-cover-photo">
        <div className="cover-photo">
          <div className="cover-pic">
            <img
              src={
                coverPicturePreview !== null
                  ? coverPicturePreview
                  : props.user.coverPicture &&
                    props.user.coverPicture.img !== ""
                  ? generatePublicUrl(props.user.coverPicture.img)
                  : userCoverPicture
              }
              alt="cover"
            ></img>
            {!differentUser && (
              <div className="change-cover">
                <label htmlFor="change-cover">
                  <span>Change Cover Photo</span>
                </label>
                <label htmlFor="change-cover">
                  <div>
                    <ion-icon name="camera"></ion-icon>
                  </div>
                </label>
                <input
                  onChange={handleChangeCoverPictureUpload}
                  id="change-cover"
                  type="file"
                ></input>
              </div>
            )}
            {coverPicturePreview && (
              <div className="save-cover">
                <span onClick={submitChangeCoverPicture}>Save Changes</span>
                <div>
                  <ion-icon
                    onClick={submitChangeCoverPicture}
                    name="checkmark"
                  ></ion-icon>
                </div>
              </div>
            )}
          </div>
          <div className="profile-photo">
            <div className="profile-icon">
              <img
                src={
                  props.user.profilePicture &&
                  props.user.profilePicture.img !== ""
                    ? generatePublicUrl(props.user.profilePicture.img)
                    : userProfilePicture
                }
                alt="profile"
              ></img>
              {!differentUser && (
                <label htmlFor="change-profile">
                  <div className="change-profile-pic-icon">
                    <ion-icon name="camera-outline"></ion-icon>
                  </div>
                </label>
              )}
              <input
                onChange={handleProfilePictureUpload}
                type="file"
                id="change-profile"
              ></input>
            </div>
          </div>
        </div>
      </div>
      {differentUser && (
        <div className="follow-unfollow">
          {followUser ? <div className="follow">
            <span onClick={handleAddUserPublicity}>Follow</span>
            <div className="follow-icon">
              <ion-icon onClick={handleAddUserPublicity} name="person-add-outline"></ion-icon>
            </div>
          </div> :
           <div className="follow" style={{width:"115px" , backgroundColor:"#1E90FF", color:"white"}}>
           <span onClick={handleRemoveUserPublicity}>Following</span>
           <div className="follow-icon">
             <ion-icon  onClick={handleRemoveUserPublicity} name="checkmark-outline"></ion-icon>
           </div>
         </div>
          }
        </div>
      )}
      <div className="username">
        <span>
          {props.user.firstName} {props.user.lastName}
        </span>
      </div>
      <div className="user-bio">
        <p>{props.user.bio}</p>
      </div>
      <div className="mini-bar">
        <div className="mini-links">
          <ul>
            <li className={`mini-bar-item ${active1}`}>
              <NavLink exact to={`/profile/${props.user.username}`}>
                Posts
              </NavLink>
            </li>
            <li className={`mini-bar-item ${active2}`}>
              <NavLink to={`/profile/${props.user.username}/followers`}>
                Followers ({ props.user.followers ? props.user.followers.length:0})
              </NavLink>
            </li>
            <li className={`mini-bar-item ${active3}`}>
              <NavLink to={`/profile/${props.user.username}/following`}>
                Following ({ props.user.following ? props.user.following.length: 0})
              </NavLink>
            </li>
            {!differentUser && (
              <li className={`mini-bar-item ${active4}`}>
                <NavLink to={`/profile/${props.user.username}/edit`}>
                  Edit Profile
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
    {active1 === "active" && (
      <HomePage
        posts={props.posts}
        user={props.user}
        differentUser={differentUser}
      ></HomePage>
    )}
    {active2 === "active" && <Publicity user={props.user} task="followers"></Publicity>}
    {active3 === "active" && <Publicity user={props.user} task="following"></Publicity>}
    {active4 === "active" && <EditProfile user={props.user} task="followers"></EditProfile>}

    {renderProfilePicturePreviewMoal()}
  </div> :
  <div className="no-user-slogan">
      <span>Ooops! No User Found</span>
  </div>  
    }
    </>
  );
};

export default BannerBox;
