import React from "react";
import { Card } from "react-bootstrap";

const RecipeOutlineCard = ({ recipe, handleClick }) => {
  return (
    <Card onClick={() => handleClick(recipe._id)} className="recipe-card">
      <Card.Img
        variant="top"
        src={
          recipe?.images?.length
            ? recipe.images[recipe.images.length - 1]
            : "https://via.placeholder.com/160x100"
        }
      />

      <Card.Body>
        <Card.Title>{recipe.name}</Card.Title>
        <Card.Text>
          {recipe.description.length <= 99
            ? recipe.description
            : recipe.description.slice(0, 99) + "..."}
        </Card.Text>
      </Card.Body>

      <Card.Footer className="recipe-card-footer">
        <img
          src={recipe?.author?.avatarUrl}
          alt="profile-icon"
          className="profile-picture-icon"
        />
        <small className="text-muted">
          <span className="text-muted author-name">
            {" "}
            {recipe?.author?.name}{" "}
          </span>{" "}
          wrote
        </small>
      </Card.Footer>
    </Card>
  );
};

export default RecipeOutlineCard;
