import React from "react";
import { Card, CardImg } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RecipeOutlineCard = ({ recipe, handleClick }) => {
  return (
    <Card
      onClick={() => handleClick(recipe._id)}
      className="recipe-outline-card mb-5"
    >
      <CardImg
        variant="top"
        className="recipe-photo"
        src={
          recipe?.images?.length
            ? recipe.images[recipe.images.length - 1]
            : "https://via.placeholder.com/160x100"
        }
      />

      <div className="recipe-info">
        <div className="name">
          <h4>
            {recipe.name.length >= 40
              ? recipe.name.slice(0, 39) + "..."
              : recipe.name}
          </h4>
          <img
            src={recipe?.author?.avatarUrl}
            alt="profile-icon"
            className="profile-picture-icon"
          />
          <small>
            <span className="author-name"> {recipe?.author?.name}</span>
          </small>
        </div>

        <div className="reaction-comment">
          <p>
            <FontAwesomeIcon icon="heart" size="2x" /> {recipe?.reactions?.love}
          </p>
          <p>
            <FontAwesomeIcon icon="comment" size="2x" /> {recipe?.commentCount}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default RecipeOutlineCard;
