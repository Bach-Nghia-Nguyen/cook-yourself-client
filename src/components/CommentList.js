import React from "react";
import Moment from "react-moment";
import ReactionEmoji from "./ReactionEmoji";

const CommentContent = ({ comment }) => {
  return (
    <div className="comment">
      <div className="author">
        <div>
          <img
            src={comment.user.avatarUrl}
            alt="avatar"
            className="profile-picture-icon"
          />
          <span className="comment_author">{comment.user.name}</span>
        </div>
        <ReactionEmoji
          reactionsData={comment.reactions}
          targetType="Comment"
          targetId={comment._id}
          size="1x"
        />
        <Moment fromNow>{comment.createdAt}</Moment>
      </div>

      <div className="comment-body">{comment.content}</div>
    </div>
  );
};

const CommentList = ({ comments }) => {
  return (
    <div className="comment-list">
      <h4>Comments:</h4>
      {comments && comments.length > 0 ? (
        <ul className="list-unstyled">
          {comments.map((comment) => (
            <CommentContent comment={comment} key={comment._id} />
          ))}
        </ul>
      ) : (
        <p>There is no comment</p>
      )}
    </div>
  );
};

export default CommentList;
