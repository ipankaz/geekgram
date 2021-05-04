import React, { useState } from 'react'
import './style.css'
import userMale from '../../Media/user-male.gif'
import userFemale from '../../Media/user-female.gif'
import { useHistory, useLocation } from 'react-router'
import { useDispatch } from 'react-redux'
import { signup } from "../../Actions/user.action";
/**
* @author
* @function SignupProcess
**/

const SignupProcess = (props) => {

    const [mediaError,setMediaError] = useState(false)
    const [gender,setGender] = useState("")
    const [dob,setDob] = useState("")
    const [bio,setBio] = useState("")
    const [mediaPreview, setMediaPreview] = useState(null);
    const [profilePicture,setProfilePicture] = useState(null)
    const [userPreview,setUserPreview] = useState(userMale)
    const location = useLocation()
    const dispatch = useDispatch()
    const history = useHistory()

    const handleMediaUploadModal = (event) => {
        const selected = event.target.files[0];
       
        setMediaError(false);
        const allowedTypes = [
          "image/jpg",
          "image/png",
          "image/gif",
          "image/jpeg"
        ];
        if (selected && allowedTypes.includes(selected.type)) {
          setProfilePicture(selected);
          let reader = new FileReader();
          reader.onloadend = () => {
            setMediaPreview(reader.result);
          };
          reader.readAsDataURL(selected);
        } else {
          setMediaError(true);
        }
      };

      const handleGender = (e) =>{
         setGender(e.target.value)
         if(e.target.value==="Female"){
             setUserPreview(userFemale)
         }else{
            setUserPreview(userMale)
         }
      }

      const handleUserBio = (e)=>{
          setBio(e.target.value)
      }

      const handleUserDob = (e)=>{
          setDob(e.target.value)
      }


      const handleSignup = ()=>{
          const signupForm = location.state.form
          console.log(signupForm.firstName);
          const form = new FormData();
          form.append("firstName",signupForm.firstName)
          form.append("lastName",signupForm.lastName)
          form.append("email",signupForm.email)
          form.append("username",signupForm.username)
          form.append("contactNumber",signupForm.contactNumber)
          form.append("password",signupForm.password)
        
          form.append("profilePicture",profilePicture)
          form.append("gender",gender)
          form.append("dob",dob)
          form.append("bio",bio)
          
          dispatch(signup(form))
          setBio("")
          setDob("")
          setGender("")
          setProfilePicture(null)
          history.push("/login",{userDone:true})
      }

  return(
    <div className="completetion-container">
         <div className="title-132">
             <h2>LAST STEP</h2>
         </div>

         <div className="input-items">
             <div className="center">
               <div className="media-preview">
                 <img src={mediaPreview ? mediaPreview : userPreview} alt="media preview"></img>
                 <div className="change-profile-pic-icon">
                 <label htmlFor="file-input">
                  <ion-icon name="camera-outline"></ion-icon>
                  </label>
                  <input
                   id="file-input"
                   type="file"
                   onChange={handleMediaUploadModal}
                   />
                </div>
             </div>
             {mediaError && 
             <div className="media-error">
             <p>Image format not supported</p>
             </div>
             }

              
             </div>

             <div className="gender-radio">
                 <span>Gender</span>
                 <input type="radio" id="genderChoice1"
                  name="gender" value="Male" onChange={handleGender}></input>
                 <label className="male-label" htmlFor="genderChoice1">Male</label>

                <input type="radio" id="genderChoice2"
                 name="gender" value="Female" onChange={handleGender}></input>
                <label  className="female-label"  htmlFor="genderChoice2">Female</label>

                <input type="radio" id="genderChoice3"
                 name="gender" value="Others" onChange={handleGender}></input>
                <label className="other-label"  htmlFor="genderChoice3">Others</label>
             </div>

             <div className="user-dob">
                 <span>DOB</span>
                 <input value={dob} onChange={handleUserDob} type="date"></input>
             </div>

             <div className="user-bio">
                <textarea onChange={handleUserBio} maxLength="100" rows="3" value={bio}
                placeholder="Something about yourself..."></textarea>
             </div>
         </div>
         <div className="user-signup">
         <button onClick={handleSignup}>SIGNUP</button>
         </div>
        
    </div>
   )

 }

export default SignupProcess