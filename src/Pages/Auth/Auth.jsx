import React, { useState, useContext } from "react";
import classes from "./Auth.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { RingLoader } from "react-spinners/RingLoader";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState({
    singIn: false,
    singUp: false,
  });
  const navigate = useNavigate();
  const naveStateData = useLocation();
  // console.log(email, password);
  const [ {user}, dispatch] = useContext(DataContext);
  // console.log(user);

  const authHandler = async (e) => {
    e.preventDefault();
    // console.log(e.target.name);
    if (e.target.name === "singIn") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          console.log(userCredential);

          dispatch({
            type: Type.SET_USER,
            user: userCredential.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(naveStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      // firebase authentication logic
      setLoading({ ...loading, SingUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          dispatch({
            type: Type.SET_USER,
            user: userCredential.user,
          });
          setLoading({ ...loading, SingUp: false });
          navigate(naveStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, SingUp: false });
        });
    }
  };
  return (
    <section className={classes.auth_container}>
      <Link to="/">
        <img
          src="https://www.hatchwise.com/wp-content/uploads/2022/08/Amazon-Logo-2000-present-1024x576.jpeg"
          alt=""
        />
      </Link>
      <div className={classes.form_container}>
        {naveStateData?.state?.msg && (
          <small style={{ color: "red" }}>{naveStateData?.state?.msg} </small>
        )}
        <h1>Sign In</h1>
        <div className={classes.form}>
          <form action="">
            <div>
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <button
              type="submit"
              onClick={authHandler}
              name="singIn"
              className={classes.btns}
            >
              {loading.singIn ? (
                <RingLoader color="black" size={20} />
              ) : (
                "Sign In"
              )}
              {/* Sign In */}
            </button>
          </form>
          <p>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
            Sale. Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>
          <h5>New to Amazon?</h5>
          <button
            type="submit"
            onClick={authHandler}
            name="signUp"
            className={classes.btn}
          >
            {loading.singUp ? (
              <RingLoader color="black" size={20} />
            ) : (
              "Create your Amazon Account"
            )}
            {/* Create your Amazon account */}
          </button>
          {error && (
            <p style={{ color: "red", padding: "5px", fontSize: "16px" }}>
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Auth;

// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import classes from "./Auth.module.css";
// import { auth } from "../../Utility/firebase";
// import { useNavigate } from "react-router-dom";
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from "firebase/auth";
// import { Type } from "../../Utility/action.type";
// import { DataContext } from "../../Components/DataProvider/DataProvider";

// function Auth() {
//   const [Email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const [dispatch] = useContext(DataContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (e.target.name === "signIn") {
//       signInWithEmailAndPassword(auth, Email, password)
//         .then((userCredential) => {
//           // console.log(userCredential);
//           dispatch({
//             type: Type.SET_USER,
//             user: userCredential.user,
//           });
//           navigate("/")
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       createUserWithEmailAndPassword(auth, Email, password)
//         .then((userCredential) => {
//           console.log(userCredential);
//           dispatch({
//             type: Type.SET_USER,
//             user: userCredential.user,
//           });
//            navigate("/payment");
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };
//   return (
//     <section className={classes.auth_container}>
//       <Link to="/">
//         <img
//           src="https://www.hatchwise.com/wp-content/uploads/2022/08/Amazon-Logo-2000-present-1024x576.jpeg"
//           alt=""
//         />
//       </Link>
//       <div className={classes.form_container}>
//         <h2>sign In</h2>
//         <div className={classes.form}>
//           <form action="">
//             <div>
//               <label htmlFor="email"> Email</label>
//               <input
//                 value={Email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 type="text"
//                 placeholder="Email"
//               />
//             </div>
//             <div>
//               <label htmlFor="password">password</label>
//               <input
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 type="text"
//                 placeholder="password"
//               />
//             </div>
//             <button
//               type="submit"
//               name="signIn"
//               onClick={handleSubmit}
//               className={classes.btns}
//             >
//               sign In
//             </button>
//           </form>

//           <div>
//             <p>
//               By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use
//               & Sale. Please see our Privacy Notice, our Cookies Notice and our
//               Interest-Based Ads Notice.
//             </p>
//             <button
//               type="submit"
//               name="signUp"
//               onClick={handleSubmit}
//               className={classes.btn}
//             >
//               create your amazon account
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Auth;
