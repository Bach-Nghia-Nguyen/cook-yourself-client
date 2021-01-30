import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { recipeActions } from "../../redux/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Markdown from "react-markdown";
import { ClipLoader } from "react-spinners";

const RecipeDetailPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipe.selectedRecipe);
  const loading = useSelector((state) => state.recipe.loading);
  const currentUser = useSelector((state) => state.auth.user);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();

  useEffect(() => {
    if (params?.id) {
      dispatch(recipeActions.getSingleRecipe(params.id));
    }
  }, [dispatch, params]);

  const handleGoBackClick = (e) => {
    history.goBack();
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <Button onClick={handleGoBackClick}>
          <FontAwesomeIcon icon="chevron-left" size="1x" /> Back
        </Button>
        {recipe?._id && currentUser?._id === recipe?.author?._id ? (
          <Link to={`/recipe/edit/${recipe._id}`}>
            <Button variant="info">
              <FontAwesomeIcon icon="edit" size="1x" /> Edit
            </Button>
          </Link>
        ) : (
          <></>
        )}
      </div>

      {loading ? (
        <div className="text-center">
          <ClipLoader color="#f86c6b" size={150} loading={loading} />
        </div>
      ) : (
        <>
          {recipe && (
            <div className="mb-5">
              <h4>{recipe.name}</h4>

              <span className="text-muted">
                @{recipe?.author?.name} wrote{""}
              </span>

              <hr />
              <Markdown source={recipe.description} />
              <hr />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default RecipeDetailPage;
