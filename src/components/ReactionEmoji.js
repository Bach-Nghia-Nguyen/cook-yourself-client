import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { reactionActions } from "../redux/actions";

const ReactionEmoji = ({ reactionsData, targetType, targetId, size }) => {
  const subLoading = useSelector((state) => state.recipe.subLoading);
  const dispatch = useDispatch();

  const handleClick = (emoji) => {
    dispatch(reactionActions.sendReaction(targetType, targetId, emoji));
  };

  return (
    <ul className="emoji-list">
      <li>
        <button onClick={() => handleClick("love")} disabled={subLoading}>
          <FontAwesomeIcon icon="heart" size={size} color="firebrick" />
        </button>{" "}
        {reactionsData.love}
      </li>
    </ul>
  );
};

export default ReactionEmoji;
