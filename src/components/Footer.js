import React from "react";
import cookYourselfLogo from "../images/cook_yourself_white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="web-footer">
      <div className="footer-content">
        <img src={cookYourselfLogo} alt="Cook Yourself Logo" width="270px" />
        <p className="slogan">
          Feel free to discover whatever the taste you love and share whatever
          the dish you are the most proud of
        </p>

        <ul className="socials">
          <li>
            {" "}
            <a href="#facebook">
              {" "}
              <FontAwesomeIcon
                icon={["fab", "facebook"]}
                size="2x"
                className="icon"
                color="white"
              />{" "}
            </a>{" "}
          </li>

          <li>
            {" "}
            <a href="#github">
              {" "}
              <FontAwesomeIcon
                icon={["fab", "github"]}
                size="2x"
                color="white"
                className="icon"
              />{" "}
            </a>{" "}
          </li>

          <li>
            {" "}
            <a href="#youtube">
              {" "}
              <FontAwesomeIcon
                icon={["fab", "youtube"]}
                size="2x"
                color="white"
                className="icon"
              />{" "}
            </a>{" "}
          </li>

          <li>
            {" "}
            <a href="#linkedin">
              {" "}
              <FontAwesomeIcon
                icon={["fab", "linkedin"]}
                size="2x"
                color="white"
                className="icon"
              />{" "}
            </a>{" "}
          </li>
        </ul>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          Copyright &copy; 2021 Cook Yourself. Designed by{" "}
          <span>Nguyen Bach Nghia</span>{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
