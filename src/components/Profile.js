import React from "react";
import AuthService from "../services/auth.service";


const Profile = (props) => {
  const currentUser = AuthService.getCurrentUser();

  if (props.match.path === "/confirm/:confirmationCode") {
    AuthService.verifyUser(props.match.params.confirmationCode)
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>       
        <strong>Token:</strong> {currentUser.accessToken}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
    </div>
  );
};

export default Profile;
