import React, { useState, useEffect } from "react";
import { Form, Button, Container, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { recipeActions } from "../../redux/actions";
import { routeActions } from "../../redux/actions";

const RecipeEditorPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
    time: "",
    portion: "",
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

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
        tags: ["CookYourself", "recipeImages"],
      },
      function (error, result) {
        if (
          result.data &&
          result.data.info &&
          result.data.info.files &&
          result.data.info.files.length
        ) {
          setFormData({
            ...formData,
            images: result.data.info.files.map(
              (res) => res.uploadInfo.secure_url
            ),
          });
        }
        if (error) {
          console.log("Errors in images: ", error);
        }
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, images, time, portion } = formData;
    console.log("formData is:", formData);
    if (addOrEdit === "Add") {
      dispatch(
        recipeActions.createNewRecipe(name, description, images, time, portion)
      );
    } else if (addOrEdit === "Edit") {
      dispatch(
        recipeActions.updateRecipe(
          selectedRecipe._id,
          name,
          description,
          images,
          time,
          portion
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

        <Form.Group controlId="recipeTime">
          <Form.Label>Total time</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="recipePortion">
          <Form.Label>Portion serving</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter number of people"
            name="portion"
            value={formData.portion}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Upload image */}
        <Form.Group>
          {formData.images &&
            formData.images.length > 0 &&
            formData.images.map((image) => (
              <img
                src={image}
                key={image}
                width="120px"
                alt="blog images"
              ></img>
            ))}
          <Button variant="info" onClick={uploadWidget}>
            <FontAwesomeIcon icon="image" size="1x" /> {addOrEdit} Image
          </Button>
        </Form.Group>

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

export default RecipeEditorPage;
