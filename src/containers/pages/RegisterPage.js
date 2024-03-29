import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../../redux/actions";
import { routeActions } from "../../redux/actions";
import cameraIcon from "../../images/icons/camera.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    avatarUrl: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const loading = useSelector((state) => state.auth.loading);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, password2, avatarUrl } = formData;

    if (password !== password2) {
      setErrors({ ...errors, password2: "Passwords do not match" });
      return;
    }

    if (avatarUrl) {
      dispatch(authActions.register({ name, email, password, avatarUrl }));
    } else {
      dispatch(authActions.register({ name, email, password }));
    }
  };

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
        cropping: true,
        tags: ["CookYourself", "userAvatar"],
      },
      function (error, result) {
        if (result) console.log("result:", result);
        if (result.event === "success" && result.info) {
          setFormData({
            ...formData,
            avatarUrl: result.info.secure_url,
          });
        }
        if (error) console.log("Errors in register avatar: ", error);
      }
    );
  };

  useEffect(() => {
    if (redirectTo) {
      if (redirectTo === "__GO_BACK__") {
        history.goBack();
        dispatch(routeActions.removeRedirectTo());
      } else {
        history.push(redirectTo);
        dispatch(routeActions.removeRedirectTo());
      }
    }
  }, [dispatch, history, redirectTo]);

  return (
    <Container className="register-page">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="text-center mb-3">
            <h1 className="text-primary">Sign Up</h1>
            <p className="lead">
              <FontAwesomeIcon icon="user" size="1x" /> Create Your Account
            </p>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="upload-avatar">
              <div onClick={uploadWidget} className="upload-avatar-btn">
                <img src={cameraIcon} alt="camera" className="camera-btn" />
              </div>

              {formData.avatarUrl && (
                <img
                  src={formData.avatarUrl}
                  className="avatar-img"
                  alt="avatar"
                />
              )}
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <small className="form-text text-danger">{errors.name}</small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <small className="form-text text-danger">{errors.email}</small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <small className="form-text text-danger">
                  {errors.password}
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
              />
            </Form.Group>

            {loading ? (
              <Button
                className="btn-block"
                variant="primary"
                type="button"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </Button>
            ) : (
              <Button className="btn-block" type="submit" variant="primary">
                Register
              </Button>
            )}

            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
