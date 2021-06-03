import React, { useEffect, useState } from "react";
import { Button, Tab, Nav, TabContainer } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { recipeActions } from "../../redux/actions";
import { commentActions } from "../../redux/actions/comment.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import prepTimeLogo from "../../images/icons/prep-time.png";
import cookTimeLogo from "../../images/icons/cook-time.png";
import servingPortionLogo from "../../images/icons/serving-portion.png";
import dishTypeLogo from "../../images/icons/dish-type.png";
import Preloader from "../../components/Preloader";
import CommentForm from "../../components/CommentForm";
import CommentList from "../../components/CommentList";
import ReactionEmoji from "../../components/ReactionEmoji";

const RecipeDetailPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipe.selectedRecipe);
  const loading = useSelector((state) => state.recipe.loading);
  const subLoading = useSelector((state) => state.recipe.subLoading);
  const currentUser = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const history = useHistory();
  const [endIndex, setEndIndex] = useState(5);
  const moreOrLess = endIndex === 5 ? "more" : "less";
  const [commentText, setCommentText] = useState("");

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    dispatch(commentActions.createNewComment(recipe._id, commentText));
    setCommentText("");
  };

  useEffect(() => {
    if (params?.id) {
      dispatch(recipeActions.getSingleRecipe(params.id));
    }
  }, [dispatch, params]);

  // const handleGoBackClick = (e) => {
  //   history.goBack();
  // };

  const showMoreLessRow = () => {
    if (endIndex === 5) {
      setEndIndex(recipe.ingredients.length);
    }
    if (endIndex === recipe.ingredients.length) {
      setEndIndex(5);
    }
  };

  return (
    <div className="recipe-detail-page">
      {loading ? (
        <div className="text-center">
          <Preloader />
        </div>
      ) : (
        <>
          {recipe && (
            <div className="mb-5 detail-main-section">
              <header className="recipe-name">
                <h4>{recipe.name}</h4>
                {recipe?._id && currentUser?._id === recipe?.author?._id ? (
                  <Link
                    to={`/recipe/edit/${recipe._id}`}
                    className="edit-recipe-btn"
                  >
                    <Button variant="info">
                      <FontAwesomeIcon icon="edit" size="1x" /> Edit
                    </Button>
                  </Link>
                ) : (
                  <></>
                )}
              </header>

              <section className="image-description">
                <img
                  src={recipe.images && recipe.images[recipe.images.length - 1]}
                  alt="Recipe"
                  className="food-image"
                />

                <div className="description">{recipe?.description}</div>
              </section>

              <section className="author-time-serving">
                <div className="recipe-author-info">
                  <div>
                    <img
                      src={recipe?.author?.avatarUrl}
                      alt="Avatar"
                      className="profile-picture-icon"
                    />
                    <span className="text-muted author-name">
                      {recipe?.author?.name}{" "}
                    </span>
                  </div>

                  <ReactionEmoji
                    reactionsData={recipe.reactions}
                    targetType="Recipe"
                    targetId={recipe._id}
                    size="2x"
                  />
                </div>

                <div className="whitesmoke-info">
                  <p>
                    <img src={prepTimeLogo} alt="prep-time" className="logo" />{" "}
                    Prep time: {recipe?.preparation_time?.value}{" "}
                    {recipe?.preparation_time?.unit}(s)
                  </p>
                  <p>
                    <img src={cookTimeLogo} alt="cook-time" className="logo" />
                    Cook time: {recipe?.cooking_time?.value}{" "}
                    {recipe?.cooking_time?.unit}(s)
                  </p>
                  <p>
                    {" "}
                    <img
                      src={servingPortionLogo}
                      alt="servings"
                      className="logo"
                    />{" "}
                    No. of servings: {recipe?.portion} person(s)
                  </p>
                  <p>
                    <img src={dishTypeLogo} alt="dish type" className="logo" />
                    Dish type:{" "}
                    <span className="dish-type-value">
                      {" "}
                      {recipe?.dish_type}
                    </span>
                  </p>
                </div>
              </section>

              <main className="ingredients-and-directions">
                <section className="ingredients">
                  <table className="ingredients-table">
                    <thead>
                      <tr>
                        <th>Ingredients</th>
                        <th>Amount</th>
                      </tr>
                    </thead>

                    <tbody>
                      {recipe.ingredients && recipe.ingredients.length > 0 ? (
                        recipe.ingredients
                          .slice(0, endIndex)
                          .map((ingredient) => (
                            <tr key={ingredient._id}>
                              <td>{ingredient.name}</td>
                              <td>
                                {ingredient.amount} {ingredient.unit}
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td>THERE IS NO INGREDIENTS!</td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  <div className="d-flex justify-content-center align-items-center">
                    {recipe.ingredients && recipe.ingredients.length > 5 ? (
                      <button
                        type="button"
                        onClick={showMoreLessRow}
                        className="more-less-ingredients"
                      >
                        Show {moreOrLess} ingredients
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                </section>

                <section className="directions">
                  <div className="instruction">Instructions</div>

                  <TabContainer
                    id="left-tabs-example"
                    defaultActiveKey="1"
                    className="border-this"
                  >
                    <Nav className="direction-tab-buttons">
                      {recipe.directions && recipe.directions.length > 0 ? (
                        recipe.directions.map((direction, index) => (
                          <Nav.Link
                            eventKey={`${index + 1}`}
                            key={direction._id}
                          >
                            <button className="step-tab-button">
                              Step {index + 1}
                            </button>
                          </Nav.Link>
                        ))
                      ) : (
                        <div>No step</div>
                      )}
                    </Nav>

                    <Tab.Content className="border-this direction-tab-content">
                      {recipe.directions && recipe.directions.length > 0 ? (
                        recipe.directions.map((direction, index) => (
                          <Tab.Pane
                            eventKey={`${index + 1}`}
                            key={direction._id}
                          >
                            <p>
                              Bước {index + 1}: {direction.step}
                            </p>
                          </Tab.Pane>
                        ))
                      ) : (
                        <p>No instruction</p>
                      )}
                    </Tab.Content>
                  </TabContainer>
                </section>
              </main>

              <footer className="comment-section">
                <CommentList comments={recipe.comments} />

                {isAuthenticated && (
                  <CommentForm
                    commentText={commentText}
                    user={currentUser}
                    handleInputChange={handleCommentChange}
                    handleSubmitComment={handleSubmitComment}
                    loading={subLoading}
                  />
                )}
              </footer>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecipeDetailPage;
