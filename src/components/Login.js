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

const Login = () => {
   const [user, setUser] = useState({
      isSignedIn: false,
      displayName: "",
      email: "",
      phoneNumber: "",
      photoURL: "",
      success: false,
      error: "",
   });

   // LogIn From Submit Handler
   const submitHandler = (e) => {
      e.preventDefault();
      if (user.email && user.password) {
         firebase
            .auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
               // Signed in
               var user = userCredential.user;
               // ...
               const logInInfo = { ...user };
               logInInfo.success = true;
               logInInfo.error = "";
               setUser(logInInfo);
            })
            .catch((error) => {
               var errorCode = error.code;
               var errorMessage = error.message;
               const logInInfo = { ...user };
               logInInfo.success = false;
               logInInfo.error = errorMessage;
               setUser(logInInfo);
            });
      }
   };

   // onBlur handler
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
         <h3>Sign In</h3>

         {user.success && (
            <p style={{ color: "green" }}>Logging in Successfully</p>
         )}
         <div className="form-group">
            <label>Email address</label>
            <input
               onBlur={handlerBlur}
               type="email"
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

         <div className="form-group">
            <div className="custom-control custom-checkbox">
               <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
               />
               <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
               </label>
            </div>
         </div>

         <button type="submit" className="btn btn-primary btn-block">
            Submit
         </button>
         <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
         </p>
      </form>
   );
};

export default Login;
