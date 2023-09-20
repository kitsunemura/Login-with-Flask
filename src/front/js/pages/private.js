import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = (props) => {
  const { store, actions } = useContext(Context);

  if (store.user && store.user.email) {
    console.log("User data:", store.user);
  }

  const handleLogout = () => {
    console.log("Logging out user...");
    actions.logoutUser();
  };

  const isLoggedIn = store.user && store.user.email;

  return (
    <div>
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-12">
            {isLoggedIn ? (
              <>
                <h1>
                  Welcome {store.user.email} to your profile
                </h1>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <h1>You are not logged in.</h1>
                <p>
                  <Link to="/login">Login</Link> to access your profile.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};