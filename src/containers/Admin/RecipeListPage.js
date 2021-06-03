import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  //FormCheck,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import SearchBar from "../../components/SearchBar";
import PaginationBar from "../../components/PaginationBar";

import { recipeActions } from "../../redux/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "react-moment";

const RecipeListPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  // const [myRecipeOnly, setMyRecipeOnly] = useState(false);

  const [sortBy, setSortBy] = useState({ key: "", ascending: -1 });
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.recipe.loading);
  const recipes = useSelector((state) => state.recipe.recipes);
  const currentUser = useSelector((state) => state.auth.user);
  const totalPageNum = useSelector((state) => state.recipe.totalPageNum);

  const myRecipeOnly = currentUser._id;

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setPageNum(1);
    setQuery(searchInput);
    // dispatch(recipeActions.recipesRequest(1));
  };

  const handleSort = (key) => {
    if (!loading) {
      setSortBy((sortBy) => ({ key, ascending: -sortBy.ascending }));
    }
  };

  // const handleCheckMyRecipeOnly = () => {
  //   if (myRecipeOnly) {
  //     setMyRecipeOnly(false);
  //   } else {
  //     setMyRecipeOnly(currentUser._id);
  //   }
  // };

  useEffect(() => {
    dispatch(
      recipeActions.getRecipes(pageNum, 10, query, myRecipeOnly, sortBy)
    );
  }, [dispatch, pageNum, query, sortBy, myRecipeOnly]);

  return (
    <Container fluid>
      <h4 className="mt-3">My Recipes</h4>

      <Row>
        <Col md={4}>
          <SearchBar
            searchInput={searchInput}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmitSearch}
            loading={loading}
          />
        </Col>

        <Col md={4}></Col>
        {/* <Col md={4} className="d-flex justify-content-end align-items-start">
          <FormCheck
            type="checkbox"
            label="My Recipes only"
            checked={myRecipeOnly}
            onChange={handleCheckMyRecipeOnly}
          />
        </Col> */}

        <Col md={4} className="d-flex justify-content-end align-items-start">
          {/* <Link className="btn btn-primary" to="/user/recipe/add">
            <FontAwesomeIcon icon="plus" size="1x" /> Add
          </Link> */}
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="mouse-hover" onClick={() => handleSort("name")}>
                  Name <FontAwesomeIcon icon="sort" size="sm" />
                </th>

                {/* <th>Author</th> */}

                <th>Created At</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {recipes && recipes.length ? (
                recipes.map((recipe) => (
                  <tr key={recipe._id}>
                    <td>
                      <Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link>
                    </td>

                    {/* <td>
                    {recipe?.author ? (
                      recipe.author.name
                    ) : (
                      <Badge variant="danger">Anonym</Badge>
                    )}
                  </td> */}

                    <td>
                      <Moment fromNow>{recipe.createdAt}</Moment>
                    </td>

                    <td>
                      {currentUser?._id === recipe?.author?._id ? (
                        <Link to={`/user/recipe/edit/${recipe._id}`}>
                          <Button variant="primary">
                            <FontAwesomeIcon icon="edit" size="1x" /> Edit
                          </Button>
                        </Link>
                      ) : (
                        <Badge variant="warning">Uh oh</Badge>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <p>There is no recipe yet. Please create new one.</p>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row>
        <Col>
          <PaginationBar
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPageNum}
            loading={loading}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeListPage;
