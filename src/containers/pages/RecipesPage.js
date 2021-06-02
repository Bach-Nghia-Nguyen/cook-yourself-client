import React, { useState, useEffect } from "react";
import { Container, CardColumns } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import RecipeOutlineCard from "../../components/RecipeOutlineCard";
import PaginationBar from "../../components/PaginationBar";
import LandingJumbotron from "../../components/LandingJumbotron";

import { recipeActions } from "../../redux/actions";

import Preloader from "../../components/Preloader";

const RecipesPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.recipe.loading);
  const recipes = useSelector((state) => state.recipe.recipes);
  const totalPageNum = useSelector((state) => state.recipe.totalPageNum);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();

  useEffect(() => {
    dispatch(recipeActions.getRecipes(pageNum));
  }, [dispatch, pageNum]);

  const handleClickOnRecipe = (id) => {
    history.push(`/recipes/${id}`);
  };

  return (
    <Container>
      {/* <Jumbotron className="text-center">
        <h1>Cook Yourself</h1>
        <p>Wanna feel like a Masterchef? Try to cook those dishes!</p>
        {isAuthenticated && (
          <Link to="/recipe/add">
            <Button variant="info">Add recipe</Button>
          </Link>
        )}
      </Jumbotron> */}

      <LandingJumbotron />

      <PaginationBar
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPageNum={totalPageNum}
        loading={loading}
      />

      {loading ? (
        <div className="text-center">
          {/* <ClipLoader color="#f86c6b" size={150} loading={loading} /> */}
          <Preloader />
        </div>
      ) : (
        <>
          {recipes.length ? (
            <CardColumns>
              {recipes.map((recipe) => (
                <RecipeOutlineCard
                  recipe={recipe}
                  key={recipe._id}
                  handleClick={handleClickOnRecipe}
                />
              ))}
            </CardColumns>
          ) : (
            <p>There is no recipe</p>
          )}
        </>
      )}
    </Container>
  );
};

export default RecipesPage;
