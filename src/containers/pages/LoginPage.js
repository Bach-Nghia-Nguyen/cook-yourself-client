import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../../redux/actions";
import { FB_APP_ID, GOOGLE_CLIENT_ID } from "../../config/constants";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (password.length < 3) {
      setErrors({ ...errors, password: "Password must be longer than 3" });
      return;
    }
    dispatch(authActions.login(email, password));
  };

  const loginWithFacebook = (response) => {
    dispatch(authActions.loginFacebook(response.accessToken));
  };

  const loginWithGoogle = (response) => {
    dispatch(authActions.loginGoogle(response.accessToken));
  };

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <div className="text-center mb-3">
              <h1 className="text-primary">Sign In</h1>
              <p className="lead">
                <FontAwesomeIcon icon="user" size="1x" /> Sign Into Your Account
              </p>
            </div>

            <Form.Group>
              <Form.Control
                type="email"
                required
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
                minLength="3"
              />
              {errors.password && (
                <small className="form-text text-danger">
                  {errors.password}
                </small>
              )}
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
                Login
              </Button>
            )}

            <hr />

            <div>
              <FacebookLogin
                appId={FB_APP_ID}
                icon="fa-facebook"
                fields="name, email, picture"
                callback={loginWithFacebook}
                onFailure={(err) => {
                  console.log("FB LOGIN ERROR:", err);
                }}
                containerStyle={{
                  textAlign: "center",
                  backgroundColor: "#3b5998",
                  borderColor: "#3b5998",
                  flex: 1,
                  display: "flex",
                  color: "#fff",
                  cursor: "pointer",
                  marginBottom: "3px",
                }}
                buttonStyle={{
                  flex: 1,
                  textTransform: "none",
                  padding: "12px",
                  background: "none",
                  border: "none",
                }}
              />

              <GoogleLogin
                className="google-btn d-flex justify-content-center"
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={loginWithGoogle}
                onFailure={(err) => {
                  console.log("GOOGLE LOGIN ERROR:", err);
                }}
                cookiePolicy="single_host_origin"
              />
            </div>

            <p>
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
