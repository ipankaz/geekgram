import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router";
import { updateUserProfile } from "../../../Actions";
import "./style.css";
/**
 * @author
 * @function EditProfile
 **/

const EditProfile = (props) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()
  // const history = useHistory()
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [contactNumber, setContactNumber] = useState(user.contactNumber);
  const [bio, setBio] = useState(user.bio);

  const handleEditProfile = ()=>{
      const updateUser  = {
          firstName,
          lastName,
          contactNumber,
          username,
          bio
      }
      const form = {
          updateUser,
          userId:user._id
      }
     dispatch(updateUserProfile(form))
    //  history.push("/login")
      
  }

  return (
    <div className="edit-profile-container">
      <div className="input-items">
        <div className="user-name">
          <input
            value={firstName}
            className="profile-input"
            type="text"
            placeholder="First Name"
            onChange={(e)=>setFirstName(e.target.value)}
          ></input>
          <input
            value={lastName}
            className="profile-input"
            type="text"
            placeholder="Last Name"
            onChange={(e)=>setLastName(e.target.value)}
          ></input>
        </div>
        <div className="username-contact">
          <input
            value={username}
            className="profile-input"
            type="text"
            placeholder="username"
            onChange={(e)=>setUsername(e.target.value)}
          ></input>
          <input
            value={contactNumber}
            className="profile-input"
            type="number"
            placeholder="Contact Number"
            onChange={(e)=>setContactNumber(e.target.value)}
          ></input>
        </div>
        <div className="user-bio">
          <textarea
            rows={3}
            className="profile-input"
            placeholder=""
            value={bio}
            onChange={(e)=>setBio(e.target.value)}
          ></textarea>
        </div>
        <div className="finalize">
          <button onClick={handleEditProfile}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
