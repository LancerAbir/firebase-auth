import firebase from "firebase/app";
import "firebase/auth";
import React, { useState } from "react";
import firebaseConfig from "../firebaseConfig";

// Initialize Firebase
if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
} else {
   firebase.app(); // if already initialized, use that one
}

const Register = () => {
   const [user, setUser] = useState({
      isSignedIn: false,
      displayName: "",
      email: "",
      password: "",
      phoneNumber: "",
      photoURL: "",
      error: "",
      success: false,
   });

   // Register From Submit Handler
   const submitHandler = (e) => {
      e.preventDefault();
      if (user.displayName && user.email && user.password) {
         firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
               // Signed in
               var user = userCredential.user;
               // ...

               const newUserInfo = { ...user };
               newUserInfo.error = "";
               newUserInfo.success = true;
               setUser(newUserInfo);
            })
            .catch((error) => {
               var errorCode = error.code;
               var errorMessage = error.message;
               const newUserInfo = { ...user };
               newUserInfo.error = errorMessage;
               newUserInfo.success = false;
               setUser(newUserInfo);
            });
      }
   };

   // onChange handler
   const handlerBlur = (e) => {
      let isFromValid = true;
      if (e.target.name === "displayName") {
         isFromValid = e.target.value.length > 3;
      }
      if (e.target.name === "email") {
         isFromValid = /\S+@\S+\.\S+/.test(e.target.value);
      }
      if (e.target.name === "password") {
        isFromValid = e.target.value.length > 5;
      }
      if (isFromValid) {
         const newUserInfo = { ...user };
         newUserInfo[e.target.name] = e.target.value;
         setUser(newUserInfo);
      }
   };

   return (
      <form onSubmit={submitHandler}>
         <h3>Sign Up</h3>

         <p style={{ color: "red" }}>{user.error}</p>
         {user.success && (
            <p style={{ color: "green" }}>New User Has Successfully Created</p>
         )}

         <div className="form-group">
            <label>User Name</label>
            <input
               type="text"
               onBlur={handlerBlur}
               name="displayName"
               className="form-control"
               placeholder="User Name"
            />
         </div>

         <div className="form-group">
            <label>Email address</label>
            <input
               type="email"
               onBlur={handlerBlur}
               name="email"
               className="form-control"
               placeholder="Enter email"
            />
         </div>

         <div className="form-group">
            <label>Password</label>
            <input
               onBlur={handlerBlur}
               type="password"
               name="password"
               className="form-control"
               placeholder="Enter password"
            />
         </div>

         <button type="submit" className="btn btn-primary btn-block">
            Sign Up
         </button>
         <p className="forgot-password text-right">
            Already registered <a href="#">sign in?</a>
         </p>
      </form>
   );
};

export default Register;
