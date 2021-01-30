import React from "react";
import { Card } from "react-bootstrap";

const RecipeCard = ({ recipe, handleClick }) => {
  return (
    <Card onClick={() => handleClick(recipe._id)}>
      <Card.Img
        variant="top"
        src={
          recipe?.images?.length
            ? recipe.images[0]
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

      <Card.Footer>
        <small className="text-muted">
          <span className="text-muted">@{recipe?.author?.name} wrote </span>
        </small>
      </Card.Footer>
    </Card>
  );
};

export default RecipeCard;
