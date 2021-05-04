import React from "react";
import { generatePublicUrl } from "../../../urlConfig";
import "./style.css";
import userPicture from "../../../Media/default-user.png";
/**
 * @author
 * @function LikeBox
 **/

const LikeBox = (props) => {
  return (
    <div className="userLikeBox">
      <div className="userProfilePic">
        <a href={`/profile/${props.user.username}`}>
          <img
            src={
              props.user.profilePicture && props.user.profilePicture.img !== ""
                ? generatePublicUrl(props.user.profilePicture.img)
                : userPicture
            }
            alt="profile"
          ></img>
        </a>
      </div>
      <a href={`/profile/${props.user.username}`}>
        <span className="username">
          {props.user.firstName} {props.user.lastName}
        </span>
      </a>
    </div>
  );
};

export default LikeBox;
