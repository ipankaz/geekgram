import React, { useState, useEffect } from "react";
import "./style.css";
import profilePic from "../../Media/profilePic.jpg";
import Modal from "../../components/UI/Modal";
import NavBar from "../../components/UI/NavBar";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  deletePostById,
  getPosts,
  editPostById,
} from "../../Actions/post.action";
import { getUserPosts } from "../../Actions/user.action";
import PostFeed from "../../components/UI/PostFeed";
import CommentBox from "../../components/UI/CommentBox";
import LikeBox from "../../components/UI/LikeBox";
import { generatePublicUrl } from "../../urlConfig";
import userPicture from "../../Media/default-user.png";
import PacmanLoader from "react-spinners/PacmanLoader";
import { css } from "@emotion/core";
/**
 * @author
 * @function HomePage
 **/
let data = true;
const override = css`
  border-color: red;
  z-index: 1000;
  position: absolute;
  top: 50%;
  left: 40%;
`;
const HomePage = (props) => {
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaError, setMediaError] = useState(false);
  const [postPictures, setPostPictures] = useState([]);
  const [commentModal, setCommentModal] = useState(false);
  const [likeModal, setLikeModal] = useState(false);
  const [confirmPostDelete, setConfirmPostDelete] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [postMedia, setPostMedia] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [postDeletionId, setPostDeletionId] = useState(null);
  const [childPost, setChildPost] = useState(null);
  const [likedUser, setLikedUser] = useState(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const pathname = window.location.pathname;

  useEffect(() => {
    if (auth.authenticate && data) {
      dispatch(getPosts());
      if (props.user) {
        dispatch(getUserPosts(props.user._id));
      }
      data = false;
    }
  }, [auth.authenticate, dispatch, props.user]);

  const allPosts = useSelector((state) => state.post);
  const userPosts = useSelector((state) => state.user);
  const decidedPosts = pathname === "/" ? allPosts : userPosts;

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setMediaPreview(null);
    setMediaError(false);
    setDescription("");
  };

  const handleModalDescription = (event) => {
    setDescription(event.target.value);
  };

  const submitCreatePostForm = () => {
    if (description === "" && postPictures.length === 0) {
      alert("Empty Fields");
      return;
    }

    const form = new FormData();
    form.append("description", description);
    postPictures.forEach((picture, index) => {
      form.append("pictures", picture);
    });

    dispatch(createPost(form));
    setDescription("");
    setPostPictures([]);
    handleClose();
  };

  const handleMediaUploadModal = (event) => {
    const selected = event.target.files[0];
    // setPostPictures(...postPictures, selected);
    setMediaError(false);
    const allowedTypes = [
      "image/jpg",
      "image/png",
      "image/gif",
      "image/jpeg",
      "video/mp4",
      "video/mov",
      "video/3gp",
      "video/mkv",
    ];
    if (selected && allowedTypes.includes(selected.type)) {
      setPostPictures([...postPictures, selected]);
      let reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      setMediaError(true);
    }
  };

  const handleCommentBoxModal = (post) => {
    setCommentModal(true);
    setChildPost(post);
  };

  const handleLikeBoxaModal = (post) => {
    setLikeModal(true);
    setLikedUser(post);
  };

  const handleCloseCommentBoxModal = () => {
    setCommentModal(false);
  };

  const handleCloseLikeBoxModal = () => {
    setLikeModal(false);
  };

  const handleCloseDeletePostModal = () => {
    setConfirmPostDelete(false);
  };

  const handleDeletePostModal = (id) => {
    setPostDeletionId(id);
    setConfirmPostDelete(true);
  };

  const deletePost = () => {
    dispatch(deletePostById(postDeletionId));
    setConfirmPostDelete(false);
  };

  const handleEditPostModal = (post) => {
    setEditingPost(post);
    setDescription(post.description);
    setEditPost(true);
    setPostMedia(true);
    setMediaError(false);
  };

  const handleCloseEditPostModal = () => {
    setEditPost(false);
    setDescription("");
  };

  const editPostAction = () => {
    if (description === "" && postPictures.length === 0) {
      alert("Empty Fields");
      return;
    }

    const form1 = new FormData();

    if (description !== "") {
      form1.append("description", description);
    }
    if (postPictures.length > 0) {
      postPictures.forEach((picture, index) => {
        form1.append("pictures", picture);
      });
    }
    const updatedPost = {
      _id: editingPost._id,
      form: form1,
    };

    dispatch(editPostById(updatedPost));
    setDescription("");
    setPostPictures([]);
    handleCloseEditPostModal();
  };

  const renderCreatePostModal = () => {
    return (
      <Modal
        //  size="sm"
        // modalTitle={"Create Post"}
        show={show}
        handleCloseModal={handleClose}
        onHide={handleClose}
        action={submitCreatePostForm}
        _task={"Post"}
        centered="centered"
        color="primary"
        className="my-modal"
      >
        <Container fluid>
          <div className="createPostModal">
            <div className="profileModal">
              <div className="profilePic-1">
                <img
                  src={
                    auth.user.profilePicture &&
                    auth.user.profilePicture.img !== ""
                      ? generatePublicUrl(auth.user.profilePicture.img)
                      : userPicture
                  }
                  alt="profile pic"
                ></img>
              </div>
              <span className="usernameModal">
                {auth.user.firstName} {auth.user.lastName}
              </span>
            </div>
            <input
              onChange={handleModalDescription}
              value={description}
              type="textarea"
              className="descriptionModal"
              placeholder={`What's on your mind, ${auth.user.firstName}?`}
            ></input>
            <div className="mediaPreview">
              {mediaError && (
                <p className="errorMessage"> Media not supported</p>
              )}
              {mediaPreview && (
                <>
                  <img src={mediaPreview} alt="selected media"></img>
                  <div className="removeMediaPreview">
                    <ion-icon
                      onClick={() => setMediaPreview(null)}
                      name="close-outline"
                    ></ion-icon>
                  </div>
                </>
              )}
            </div>
            <div className="addMediaModal">
              <span className="mediaSpan">Add to your post</span>
              <label htmlFor="file-input">
                <ion-icon
                  name="images-outline"
                  className="mediaIcon"
                ></ion-icon>
              </label>
              <input
                id="file-input"
                type="file"
                onChange={handleMediaUploadModal}
              />
            </div>
          </div>
        </Container>
      </Modal>
    );
  };

  const renderCommentBoxModal = () => {
    return (
      <Modal
        show={commentModal}
        // modalTitle={"Comments"}
        handleCloseModal={handleCloseCommentBoxModal}
        onHide={handleCloseCommentBoxModal}
        centered="centered"
        color="primary"
        className="my-modal"
      >
        {childPost && (
          <Container fluid>
            <div className="allUserComments">
              {childPost.comments.map((comment, index) => (
                <CommentBox
                  key={index}
                  profilePic={profilePic}
                  postComment={comment.comment}
                  user={comment.user}
                  originalPost={childPost}
                  id={comment._id}
                />
              ))}
            </div>
          </Container>
        )}
      </Modal>
    );
  };

  const renderLikeBoxModal = () => {
    return (
      <Modal
        show={likeModal}
        handleCloseModal={handleCloseLikeBoxModal}
        onHide={handleCloseLikeBoxModal}
        centered="centered"
        color="primary"
        className="my-modal"
      >
        {likedUser && (
          <Container fluid>
            <div className="allUserLikes">
              {likedUser.likes.map((like, index) => (
                <LikeBox key={index} user={like.user} profilePic={profilePic} />
              ))}
            </div>
          </Container>
        )}
      </Modal>
    );
  };

  const renderConfirmPostDeleteModal = () => {
    return (
      <Modal
        show={confirmPostDelete}
        handleCloseModal={handleCloseDeletePostModal}
        onHide={handleCloseDeletePostModal}
        centered="centered"
        color="danger"
        className="my-modal"
        _task={"Delete Post"}
        action={deletePost}
      >
        <Container fluid>
          <div>
            <span>Are you Sure ?</span>
          </div>
        </Container>
      </Modal>
    );
  };

  const renderEditPostModal = () => {
    return (
      <Modal
        show={editPost}
        handleCloseModal={handleCloseEditPostModal}
        onHide={handleCloseEditPostModal}
        centered="centered"
        color="success"
        className="my-modal"
        _task={"Save Changes"}
        action={editPostAction}
      >
        <Container fluid>
          <div className="createPostModal">
            <div className="profileModal">
              <div className="profilePic-1">
                <img src={profilePic} alt="profile pic"></img>
              </div>
              {editingPost && (
                <span className="usernameModal">{`${editingPost.user.firstName} ${editingPost.user.lastName}`}</span>
              )}
            </div>
            <input
              onChange={editingPost && handleModalDescription}
              value={editingPost && description}
              type="textarea"
              className="descriptionModal"
              placeholder="What's on your mind, Pankaj?"
            ></input>
            {!postMedia ? (
              <div className="mediaPreview">
                {mediaError && (
                  <p className="errorMessage"> Media not supported</p>
                )}
                {mediaPreview && (
                  <>
                    <img src={mediaPreview} alt="selected media"></img>
                    <div className="removeMediaPreview">
                      <ion-icon
                        onClick={() => setMediaPreview(null)}
                        name="close-outline"
                      ></ion-icon>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="mediaPreview">
                {editingPost && (
                  <>
                    <img
                      src={generatePublicUrl(editingPost.pictures[0].img)}
                      alt="selected media"
                    ></img>
                    <div className="removeMediaPreview">
                      <ion-icon
                        onClick={function () {
                          setPostMedia(false);
                          setMediaPreview(null);
                        }}
                        name="close-outline"
                      ></ion-icon>
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="addMediaModal">
              <span className="mediaSpan">Add to your post</span>
              <label htmlFor="file-input">
                <ion-icon
                  name="images-outline"
                  className="mediaIcon"
                ></ion-icon>
              </label>
              <input
                id="file-input"
                type="file"
                onChange={handleMediaUploadModal}
              />
            </div>
          </div>
        </Container>
      </Modal>
    );
  };

  return (
    <>
      {pathname === "/" && <NavBar></NavBar>}
      {pathname === "/" && (
        <PacmanLoader
          color={"#007bff"}
          loading={allPosts.loading}
          css={override}
          size={50}
        ></PacmanLoader>
      )}
      {!allPosts.loading && (
        <div className="container-1">
          <div className="feed-1">
            {!props.differentUser && (
              <div className="createPostSection-1">
                <div className="profilePic-1">
                  <img
                    src={
                      auth.user.profilePicture &&
                      auth.user.profilePicture.img !== ""
                        ? generatePublicUrl(auth.user.profilePicture.img)
                        : userPicture
                    }
                    alt="profile pic"
                  ></img>
                </div>
                <div className="createBtn">
                  <p onClick={handleShow}>Write something here...</p>
                </div>
              </div>
            )}
            <div className="posts-1">
              {/* All Post Feed goes here */}

              {decidedPosts.posts.length > 0 ? (
                decidedPosts.posts.map((post, index) => {
                  return (
                    <PostFeed
                      post={post}
                      id={post._id}
                      key={index}
                      index={index}
                      user={post.user}
                      src={
                        post.user.profilePicture &&
                        post.user.profilePicture.img !== ""
                          ? generatePublicUrl(post.user.profilePicture.img)
                          : userPicture
                      }
                      description={post.description && post.description}
                      uploadedMedia={
                        post.pictures.length > 0 && post.pictures[0].img
                      }
                      fullName={`${post.user.firstName} ${post.user.lastName}`}
                      likes={post.likes}
                      comments={post.comments}
                      onChange={handleCommentBoxModal}
                      onLikeChange={handleLikeBoxaModal}
                      onDeleteChange={handleDeletePostModal}
                      onEditChange={handleEditPostModal}
                    />
                  );
                })
              ) : (
                <div className="no-post-slogan">
                  <span>Oopps! Such Empty.</span>
                </div>
              )}
            </div>
          </div>
          {renderCreatePostModal()}
          {renderCommentBoxModal()}
          {renderLikeBoxModal()}
          {renderConfirmPostDeleteModal()}
          {renderEditPostModal()}
        </div>
      )}
    </>
  );
};

export default HomePage;
