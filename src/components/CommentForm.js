import React from "react";
import { Form } from "react-bootstrap";

const CommentForm = ({
  commentText,
  user,
  handleInputChange,
  handleSubmitComment,
  loading,
}) => {
  return (
    <Form onSubmit={handleSubmitComment} className="comment-form">
      <Form.Group className="comment-form-group">
        <Form.Label htmlFor="comment">
          <img
            src={user.avatarUrl}
            alt="Profile icon"
            className="profile-picture-icon"
          />{" "}
          {user.name}
        </Form.Label>

        <Form.Control
          id="comment"
          type="text"
          placeholder="Write a comment"
          value={commentText}
          onChange={handleInputChange}
          className="comment-input"
        />

        {loading ? (
          <button type="button" disabled>
            <span
              className="spinner-border spinner-border-sm submit-comment-btn"
              role="status"
              aria-hidden="true"
            ></span>
            Submitting...
          </button>
        ) : (
          <button
            type="submit"
            className="submit-comment-btn"
            disabled={!commentText}
          >
            Comment
          </button>
        )}
      </Form.Group>
    </Form>
  );
};

export default CommentForm;
