import React, { useState, useEffect } from "react";
import { Form, Button, Container, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { recipeActions } from "../../redux/actions";
import { routeActions } from "../../redux/actions";

const AddEditRecipePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
  });
  const loading = useSelector((state) => state.recipe.loading);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const selectedRecipe = useSelector((state) => state.recipe.selectedRecipe);
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const addOrEdit = params.id ? "Edit" : "Add";
  const recipeId = params.id;

  useEffect(() => {
    if (recipeId) {
      if (!selectedRecipe) {
        dispatch(recipeActions.getSingleRecipe(recipeId));
      }
      setFormData((formData) => ({
        ...formData,
        name: selectedRecipe.name,
        description: selectedRecipe.description,
        images: selectedRecipe.images,
      }));
    }
  }, [recipeId, selectedRecipe, dispatch]);

  const handleChange = (e) => {
    if (e.target.name === "images") {
      console.log(e.target.files);
      setFormData({ ...formData, images: e.target.files });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, images } = formData;
    if (addOrEdit === "Add") {
      dispatch(recipeActions.createNewRecipe(name, description, images));
    } else if (addOrEdit === "Edit") {
      dispatch(
        recipeActions.updateRecipe(
          selectedRecipe._id,
          name,
          description,
          images
        )
      );
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleDelete = () => {
    dispatch(recipeActions.deleteRecipe(selectedRecipe._id));
  };

  useEffect(() => {
    if (redirectTo) {
      if (redirectTo === "__GO_BACK__") {
        history.goBack();
        dispatch(routeActions.removeRedirectTo());
      } else {
        history.push(redirectTo);
        dispatch(routeActions.removeRedirectTo());
      }
    }
  }, [redirectTo, dispatch, history]);

  return (
    <Container>
      <h1 className="text-center">{addOrEdit} Recipe</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="recipeName">
          <Form.Label>Recipe name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="recipeDescription">
          <Form.Label>Recipe description</Form.Label>
          <Form.Control
            as="textarea"
            rows="10"
            placeholder="Enter description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Upload image */}

        <ButtonGroup className="d-flex mb-3">
          {loading ? (
            <Button className="mr-3" variant="primary" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Submitting...
            </Button>
          ) : (
            <Button className="mr-3" type="submit" variant="primary">
              Submit
            </Button>
          )}

          <Button variant="light" onClick={handleCancel} disabled={loading}>
            Cancel
          </Button>
        </ButtonGroup>

        {addOrEdit === "Edit" && (
          <ButtonGroup className="d-flex">
            <Button variant="danger" onClick={handleDelete} disabled={loading}>
              Delete recipe
            </Button>
          </ButtonGroup>
        )}
      </Form>
    </Container>
  );
};

export default AddEditRecipePage;
