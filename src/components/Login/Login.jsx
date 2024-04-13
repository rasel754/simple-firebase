import React, { useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.init";

const Login = () => {
  const [user, setUser] = useState();
  const auth = getAuth(app);
  console.log(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGithubSignIn =()=>{
    signInWithPopup(auth , githubProvider)
    .then(result =>{
      const loginUser=result.user;
      console.log(loginUser);
      setUser(loginUser);
    })
    .catch(error =>{
      console.log(error);
    });

  }

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loginUser = result.user;
        console.log(loginUser);
        setUser(loginUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {" "}
      {user ?<button onClick={handleSignOut}>sign out</button>:
      <div>
        <button onClick={handleGoogleSignIn}>google login</button>
        <button onClick={handleGithubSignIn}>github login</button>
      </div>
}
      
      {user && (
        <div>
          <h2>Users:{user.displayName}</h2>
          <p>
            user img :<img src={user.photoURL} alt="this is users image   " />
          </p>
          <p>email:{user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
