import React, { useEffect, useState } from "react";
import "./style.css";
import userMale from "../../../Media/user-male.gif";
import { generatePublicUrl } from "../../../urlConfig";
import { useDispatch } from "react-redux";
import { addUserPublicity, removeUserPublicity } from "../../../Actions";

/**
 * @author
 * @function Publicity
 **/

const Publicity = (props) => {
  const dispatch = useDispatch();
  const [publicity, setPublicity] = useState([]);
  const [followUser, setFollowUser] = useState(false);
  //  const auth = useSelector(state=>state.auth)

  useEffect(() => {
    if (props.task === "following") {
      setPublicity(props.user.following);
    } else if (props.task === "followers") {
      setPublicity(props.user.followers);
    }
  }, [props.task, props.user.following, props.user.followers]);

  const handleRemoveUserPublicity = (id) => {
    dispatch(removeUserPublicity(id));
    setFollowUser(true);
  };

  const handleAddUserPublicity = (id) => {
    dispatch(addUserPublicity(id));
    setFollowUser(false);
  };

  //  const checkFollowing = (id)=>{

  //   auth.user.following.forEach(following =>{
  //     if(following.userId===props.user._id){
  //       setFollowUser(false)
  //       console.log(id);
  //     }
  // });
  // }

  return (
    <div className="publicity-container-0">
      <div className="publicity-box-0">
        {publicity.map((element, index) => (
          <div key={index} className="publicity-item-0">
            {/* {checkFollowing(element.user._id)} */}
            <div className="profile-picture-0">
              <a href="/">
                <img
                  src={
                    element.user.profilePicture
                      && element.user.profilePicture.img !== "" ?
                        generatePublicUrl(element.user.profilePicture.img)
                      : userMale
                  }
                  alt="profile"
                ></img>
              </a>
            </div>
            <div className="user-name-0">
              <a href="/">
                <span>
                  {element.user.firstName} {element.user.lastName}
                </span>
              </a>
            </div>
            <div className="publicity-change-0">
              {props.task === "following" ? (
                !followUser ? (
                  <div className="publicity-work-0">
                    <span
                      onClick={() =>
                        handleRemoveUserPublicity(element.user._id)
                      }
                    >
                      Following
                    </span>
                    <div className="publicity-icon-0">
                      <ion-icon
                        onClick={() =>
                          handleRemoveUserPublicity(element.user._id)
                        }
                        name="person-add-outline"
                      ></ion-icon>
                    </div>
                  </div>
                ) : (
                  <div className="publicity-work-0">
                    <span
                      onClick={() => handleAddUserPublicity(element.user._id)}
                    >
                      Follow
                    </span>
                    <div className="publicity-icon-0">
                      <ion-icon
                        onClick={() => handleAddUserPublicity(element.user._id)}
                        name="person-add-outline"
                      ></ion-icon>
                    </div>
                  </div>
                )
              ) : (
                <div className="publicity-work-0">
                  <span>Following</span>
                  <div className="publicity-icon-0">
                    <ion-icon name="person-add-outline"></ion-icon>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Publicity;
