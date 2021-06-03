import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  ButtonGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../../redux/actions";

import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import ChangePasswordModal from "../../components/ChangePasswordModal";

const ProfilePage = () => {
  const currentUser = useSelector((state) => state.auth.user);

  const loading = useSelector((state) => state.auth.loading);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    avatarUrl: currentUser.avatarUrl,
  });
  const [showModal, setShowModal] = useState(false);

  const handleClosePasswordModal = () => setShowModal(false);
  const handleShowPasswordModal = () => setShowModal(true);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, avatarUrl } = formData;
    dispatch(authActions.updateProfile({ name, avatarUrl }));
    setEditable(false);
    // reload the page after submit to render newly updated user info
    history.go(0);
  };

  useEffect(() => {
    // the user info did not lose when refresh the page
    if (currentUser) {
      setFormData({
        name: currentUser.name,
        email: currentUser.email,
        avatarUrl: currentUser.avatarUrl,
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormData({
      ...formData,
      name: currentUser.name,
      email: currentUser.email,
      avatarUrl: currentUser.avatarUrl,
    });
    setEditable(false);
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
        console.log("result update avatar is: ", result);
        if (
          result.data &&
          result.data.info &&
          result.data.info.files &&
          result.data.info.files.length
        ) {
          setFormData({
            ...formData,
            avatarUrl: result.data.info.files[0].uploadInfo.secure_url,
          });
        }
        if (error) console.log("Errors in profile photo: ", error);
      }
    );
  };

  return (
    <Container className="dashboard-page">
      <br />
      <Row>
        <Col>
          <h4>Profile Page</h4>
        </Col>
        <Col className="d-flex justify-content-end align-items-start">
          <Button
            variant="warning"
            className="change-password-btn"
            onClick={handleShowPasswordModal}
            disabled={!editable}
          >
            Change Password
          </Button>
          <Button variant="primary" onClick={() => setEditable(true)}>
            <FontAwesomeIcon icon="edit" size="1x" /> Edit
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <ClipLoader color="#f86c6b" size={150} loading={true} />
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <div className="text-center">
                  {formData.avatarUrl && (
                    <div className="mb-3">
                      <img
                        src={formData.avatarUrl}
                        alt="User avatar"
                        className="avatar-image"
                      />
                    </div>
                  )}
                  <Button
                    variant="info"
                    onClick={uploadWidget}
                    disabled={!editable}
                  >
                    Edit avatar
                  </Button>
                </div>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Name"
                    name="name"
                    value={formData?.name}
                    onChange={handleChange}
                    disabled={!editable}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col>
                  <Form.Control
                    type="email"
                    required
                    placeholder="Email"
                    name="email"
                    value={formData?.email}
                    disabled={true}
                  />
                </Col>
              </Form.Group>

              <br />

              {editable && (
                <ButtonGroup className="d-flex mb-3">
                  {loading ? (
                    <Button
                      className="mr-3"
                      variant="primary"
                      type="button"
                      disabled
                    >
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Submitting...
                    </Button>
                  ) : (
                    <Button className="mr-3" type="submit" variant="primary">
                      Submit
                    </Button>
                  )}
                  <Button
                    variant="light"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              )}
            </Form>
          )}
        </Col>
      </Row>

      <ChangePasswordModal
        showModal={showModal}
        handleClosePasswordModal={handleClosePasswordModal}
      />
    </Container>
  );
};

export default ProfilePage;
