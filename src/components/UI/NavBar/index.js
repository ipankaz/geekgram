import React, { useState } from "react";
import "./style.css";
import WebsiteLogo from "../../../Media/logo.png";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByFirstName, signout } from "../../../Actions/index";
import NewModal from "../Modal";
import { Container } from "react-bootstrap";
import userMale from "../../../Media/user-male.gif";
import { generatePublicUrl } from "../../../urlConfig";

/**
 * @author
 * @function NavBar
 **/

const NavBar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [navClass, setNavClass] = useState("nav");
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const auth = useSelector((state) => state.auth);
  const searchedUser = useSelector((state) => state.user.searchedQuery);

  const showMenu = () => {
    if (navClass === "nav") {
      setNavClass("nav show");
    }
  };

  const closeMenu = () => {
    if (navClass === "nav show") {
      setNavClass("nav");
    }
  };

  const handleSignout = () => {
    history.push("/login");
    dispatch(signout());
  };

  const handleClose = () => {
    setShow(false);
    setSearchQuery("")
    dispatch(getUserByFirstName("1"));
  };

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
    if(e.target.value!==""){
      dispatch(getUserByFirstName(e.target.value));
    }else{
      dispatch(getUserByFirstName("1"));
    }
   
  };

  const renderSearchUserModal = () => {
    return (
      <NewModal
        show={show}
        handleCloseModal={handleClose}
        onHide={handleClose}
        className="my-modal"
      >
        <Container fluid>
          <div className="search-container">
            <div className="search-input">
              <input
                value={searchQuery}
                onChange={handleSearchQuery}
                type="text"
                placeholder="Search User"
              ></input>
              <div className="search-icon">
                <ion-icon name="search-outline"></ion-icon>
              </div>
            </div>

            <div className="search-result">
              {searchedUser.length > 0 ?
                searchedUser.map((element, index) => (
                  <div key={index} className="search-item">
                    <div className="profile-picture-0">
                      <a href={`/profile/${element.username}`}>
                        <img src={element.profilePicture && element.profilePicture.img!=="" ? generatePublicUrl(element.profilePicture.img) : userMale} alt="profile"></img>
                      </a>
                    </div>
                    <div className="user-name-0">
                      <a href={`/profile/${element.username}`}>
                        <span>{element.firstName} {element.lastName}</span>
                      </a>
                    </div>
                  </div>
                )) : <div className="no-result-slogan"><span> No Results</span></div>}
            </div>
          </div>
        </Container>
      </NewModal>
    );
  };

  return (
    <>
      <header className="header">
        <a href="/" className="header_logo">
          GeekGram
        </a>
        <ion-icon
          name="menu-outline"
          class="header_toggle"
          id="nav-toggle"
          onClick={showMenu}
        ></ion-icon>
        <nav className={navClass} id="nav-menu">
          <div className="nav_content bd-grid-1">
            <ion-icon
              name="close-outline"
              class="nav_close"
              id="nav-close"
              onClick={closeMenu}
            ></ion-icon>
            <div className="nav_perfil">
              <div className="nav_img">
                <img src={WebsiteLogo} alt="website logo"></img>
              </div>
              <div>
                <NavLink exact to="/" className="nav_name">
                  GeekGram
                </NavLink>
                <span className="nav_profession">Chat Application</span>
              </div>
            </div>
            <div className="nav_menu">
              <ul className="nav_list">
                <li className="nav_item">
                  <NavLink exact to="/" className="nav_link active-1">
                    Home
                  </NavLink>
                </li>
                {/* <li className="nav_item">
                <NavLink to="/chat" className="nav_link">
                  Chat
                </NavLink>
              </li> */}

                <li className="nav_item">
                  {/* <NavLink to="/search" className="nav_link"> */}
                  <span onClick={() => setShow(true)} className="nav_link">
                    Search
                  </span>
                  {/* </NavLink> */}
                  
                </li>
                <li className="nav_item">
                  <NavLink to="/about" className="nav_link">
                    About
                  </NavLink>
                </li>
                <li className="nav_item">
                <NavLink
                    to={`/profile/${auth.user && auth.user.username}`}
                    className="nav_link"
                  >
                    My Profile
                  </NavLink>
                </li>
              </ul>
            </div>
            {/* <div className="nav_social">
            <a href="" className="nav_social-icon">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
            <a href="" className="nav_social-icon">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </div> */}
            <div className="nav_signout">
              <span onClick={handleSignout} className="nav_signout-span">
                Signout
              </span>
            </div>
          </div>
        </nav>
       
      </header>
      {renderSearchUserModal()}
      {/* <Row>{props.children}</Row> */}
    </>
  );
};

export default NavBar;
