import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/actions";
import { toast } from "react-toastify";

const ChangePasswordModal = ({ showModal, handleClosePasswordModal }) => {
  const [passwordForm, setPasswordForm] = useState({
    currentPass: "",
    newPass: "",
    confirmNewPass: "",
  });
  const [currentPassVisible, setCurrentPassVisible] = useState(false);
  const [newPassVisible, setNewPassVisible] = useState(false);
  const [confirmNewPassVisible, setConfirmNewPassVisible] = useState(false);
  const dispatch = useDispatch();
  const isPasswordRight = useSelector((state) => state.auth.isPasswordRight);
  const subLoading = useSelector((state) => state.auth.subLoading);
  const [next, setNext] = useState(false);

  const [typeCurrentPass, setTypeCurrentPass] = useState("password");
  const [typeNewPass, setTypeNewPass] = useState("password");
  const [typeConfirmPass, setTypeConfirmPass] = useState("password");

  const showHideCurrentPassword = () => {
    if (currentPassVisible) {
      setTypeCurrentPass("password");
      setCurrentPassVisible(false);
    } else {
      setTypeCurrentPass("text");
      setCurrentPassVisible(true);
    }
  };

  const showHideNewPassword = () => {
    if (newPassVisible) {
      setTypeNewPass("password");
      setNewPassVisible(false);
    } else {
      setTypeNewPass("text");
      setNewPassVisible(true);
    }
  };

  const showHideConfirmPassword = () => {
    if (confirmNewPassVisible) {
      setTypeConfirmPass("password");
      setConfirmNewPassVisible(false);
    } else {
      setTypeConfirmPass("text");
      setConfirmNewPassVisible(true);
    }
  };

  const currentEyeOrSlash = currentPassVisible ? (
    <FontAwesomeIcon
      icon="eye-slash"
      size="1x"
      onClick={showHideCurrentPassword}
      className="eye-icon"
    />
  ) : (
    <FontAwesomeIcon
      icon="eye"
      size="1x"
      onClick={showHideCurrentPassword}
      className="eye-icon"
    />
  );

  const newEyeOrSlash = newPassVisible ? (
    <FontAwesomeIcon
      icon="eye-slash"
      size="1x"
      onClick={showHideNewPassword}
      className="eye-icon"
    />
  ) : (
    <FontAwesomeIcon
      icon="eye"
      size="1x"
      onClick={showHideNewPassword}
      className="eye-icon"
    />
  );

  const confirmEyeOrSlash = confirmNewPassVisible ? (
    <FontAwesomeIcon
      icon="eye-slash"
      size="1x"
      onClick={showHideConfirmPassword}
      className="eye-icon"
    />
  ) : (
    <FontAwesomeIcon
      icon="eye"
      size="1x"
      onClick={showHideConfirmPassword}
      className="eye-icon"
    />
  );

  const handleChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  console.log("password form: ", passwordForm);

  const handleValidatePassword = (e) => {
    e.preventDefault();
    const { currentPass } = passwordForm;
    dispatch(authActions.validateCurrentPassword(currentPass));
  };

  const submitNewPassword = (e) => {
    e.preventDefault();
    const { newPass, confirmNewPass } = passwordForm;
    if (newPass !== confirmNewPass) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(authActions.updateProfile({ password: newPass }));
    handleClosePasswordModal();
  };

  const ValidatePasswordModal = (
    <Modal
      show={showModal}
      onHide={() => {
        handleClosePasswordModal();
        setPasswordForm({ currentPass: "", newPass: "", comfirmNewPass: "" });
      }}
      className="password-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Validate Password</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleValidatePassword}>
        <Modal.Body>
          <Form.Group className="password-form-group">
            <Form.Control
              type={typeCurrentPass}
              required
              name="currentPass"
              value={passwordForm.currentPass}
              onChange={handleChange}
              placeholder="Enter current password"
            />
            {currentEyeOrSlash}
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button type="submit" variant="info" disabled={isPasswordRight}>
            Validate Password
          </Button>
          <Button
            variant="success"
            onClick={() => setNext(true)}
            disabled={!isPasswordRight}
          >
            Next
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );

  const ChangeNewPasswordModal = (
    <Modal
      show={showModal}
      onHide={handleClosePasswordModal}
      className="password-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>

      <Form onSubmit={submitNewPassword}>
        <Modal.Body>
          <Form.Group className="password-form-group">
            <Form.Control
              type={typeNewPass}
              required
              name="newPass"
              value={passwordForm.newPass}
              onChange={handleChange}
              placeholder="Enter new password"
            />
            {newEyeOrSlash}
          </Form.Group>

          <Form.Group className="password-form-group">
            <Form.Control
              type={typeConfirmPass}
              required
              name="confirmNewPass"
              value={passwordForm.confirmNewPass}
              onChange={handleChange}
              placeholder="Confirm new password"
            />
            {confirmEyeOrSlash}
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePasswordModal}>
            Cancel
          </Button>
          <Button type="submit" variant="success">
            Save Password
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
  return (
    <>
      {!subLoading && (
        <>{next ? ChangeNewPasswordModal : ValidatePasswordModal}</>
      )}
    </>
  );
};

export default ChangePasswordModal;
