import React, { useState, useEffect } from "react";
import { Container, CardColumns, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import RecipeOutlineCard from "../../components/RecipeOutlineCard";
import PaginationBar from "../../components/PaginationBar";
import LandingJumbotron from "../../components/LandingJumbotron";

import { recipeActions } from "../../redux/actions";

import Preloader from "../../components/Preloader";
import NewSearchBar from "../../components/NewSearchBar";

const RecipesPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.recipe.loading);
  const recipes = useSelector((state) => state.recipe.recipes);
  const totalPageNum = useSelector((state) => state.recipe.totalPageNum);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();

  const handleSearchValueChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPageNum(1);
    setQuery(searchInputValue);
  };

  useEffect(() => {
    dispatch(recipeActions.getRecipes(pageNum, 9, query));
  }, [dispatch, pageNum, query]);

  const handleClickOnRecipe = (id) => {
    history.push(`/recipes/${id}`);
  };

  return (
    <>
      <LandingJumbotron />
      <Container className="recipes-page">
        <NewSearchBar
          search_keyword={searchInputValue}
          handle_keyword_change={handleSearchValueChange}
          handleSearchSubmit={handleSearchSubmit}
        />

        <PaginationBar
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPageNum}
          loading={loading}
        />

        <Row>
          {loading ? (
            <div className="text-center">
              <Preloader />
            </div>
          ) : (
            <>
              {recipes.length ? (
                <CardColumns className="recipe-list ">
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
        </Row>
        <PaginationBar
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPageNum}
          loading={loading}
        />
      </Container>
    </>
  );
};

export default RecipesPage;
