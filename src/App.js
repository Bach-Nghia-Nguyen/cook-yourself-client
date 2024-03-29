import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Routes from "./containers/Routes";

import { authActions } from "./redux/actions";
import { ClipLoader } from "react-spinners";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEdit,
  faPlus,
  faTrashAlt,
  faChevronLeft,
  faSort,
  faCheckSquare,
  faUser,
  faRegistered,
  faSignInAlt,
  faSignOutAlt,
  faImage,
  faChartLine,
  faEye,
  faEyeSlash,
  faHeart,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import {
  fab,
  faFacebook,
  faGithub,
  faYoutube,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

library.add(
  fab,
  faEdit,
  faPlus,
  faTrashAlt,
  faChevronLeft,
  faSort,
  faCheckSquare,
  faUser,
  faRegistered,
  faSignInAlt,
  faSignOutAlt,
  faImage,
  faChartLine,
  faEye,
  faEyeSlash,
  faFacebook,
  faGithub,
  faYoutube,
  faLinkedin,
  faHeart,
  faComment
);

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== "undefined") {
      dispatch(authActions.getCurrentUser(accessToken));
    } else {
      dispatch(authActions.logout());
    }
  }, [dispatch]);

  return (
    <div>
      {isAuthenticated === undefined ? (
        <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
          <ClipLoader color="#f86c6b" size={150} loading={true} />
        </div>
      ) : (
        <Router>
          <Routes />
        </Router>
      )}
    </div>
  );
};

export default App;
