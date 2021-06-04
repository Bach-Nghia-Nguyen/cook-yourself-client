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
    dish_type: "other",
    preparation_time: {
      value: 0,
      unit: "minute",
    },
    cooking_time: {
      value: 0,
      unit: "minute",
    },
    portion: 0,
    ingredients: [
      {
        name: "",
        amount: 0,
        unit: "",
      },
    ],
    directions: [
      {
        step: "",
      },
    ],
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
    if (recipeId && addOrEdit === "Edit") {
      if (!selectedRecipe) {
        dispatch(recipeActions.getSingleRecipe(recipeId));
      }

      if (selectedRecipe && selectedRecipe._id !== recipeId) {
        dispatch(recipeActions.getSingleRecipe(recipeId));
      }

      if (selectedRecipe && selectedRecipe._id === recipeId) {
        setFormData((formData) => ({
          ...formData,
          name: selectedRecipe.name,
          description: selectedRecipe.description,
          images: selectedRecipe.images,
          dish_type: selectedRecipe.dish_type,
          preparation_time: selectedRecipe.preparation_time,
          cooking_time: selectedRecipe.cooking_time,
          portion: selectedRecipe.portion,
          ingredients: selectedRecipe.ingredients,
          directions: selectedRecipe.directions,
        }));
      }
    }
  }, [recipeId, selectedRecipe, dispatch, addOrEdit]);

  const handleChange = (e) => {
    if (e.target.name === "images") {
      setFormData({ ...formData, images: e.target.files });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handlePreparationTimeChange = (e) => {
    if (e.target.name === "preparation_time_value") {
      let preparation_time = { ...formData.preparation_time };
      preparation_time.value = Number(e.target.value);

      setFormData({ ...formData, preparation_time });
    } else if (e.target.name === "preparation_time_unit") {
      let preparation_time = { ...formData.preparation_time };
      preparation_time.unit = e.target.value;
      setFormData({ ...formData, preparation_time });
    }
  };

  const handleCookingTimeChange = (e) => {
    if (e.target.name === "cooking_time_value") {
      let cooking_time = { ...formData.cooking_time };
      cooking_time.value = Number(e.target.value);

      setFormData({ ...formData, cooking_time });
    } else if (e.target.name === "cooking_time_unit") {
      let cooking_time = { ...formData.cooking_time };
      cooking_time.unit = e.target.value;
      setFormData({ ...formData, cooking_time });
    }
  };

  const handleIngredientChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "amount") {
      let list = [...formData.ingredients];

      list[index][name] = value;
      setFormData({ ...formData, ingredients: list });
    } else {
      let list = [...formData.ingredients];
      list[index][name] = value;
      setFormData({ ...formData, ingredients: list });
    }
  };

  const handleDirectionChange = (e, index) => {
    const { name, value } = e.target;

    let stepList = [...formData.directions];
    stepList[index][name] = value;
    setFormData({ ...formData, directions: stepList });
  };

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
        cropping: true,
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

  const handleAddIngredientItem = (index) => {
    if (
      formData.ingredients[index].name &&
      formData.ingredients[index].amount &&
      formData.ingredients[index].unit
    ) {
      setFormData({
        ...formData,
        ingredients: [
          ...formData.ingredients,
          {
            name: "",
            amount: 0,
            unit: "",
          },
        ],
      });
    } else {
      alert("Please fill all ingredient inputs");
    }
  };

  const handleRemoveIngredientItem = (index) => {
    let list = [...formData.ingredients];
    list.splice(index, 1);
    setFormData({ ...formData, ingredients: list });
  };

  const handleAddDirectionStep = (index) => {
    if (formData.directions[index].step) {
      setFormData({
        ...formData,
        directions: [...formData.directions, { step: "" }],
      });
    } else {
      alert(`Please fill step ${index + 1}`);
    }
  };

  const handleRemoveDirectionStep = (index) => {
    let stepList = [...formData.directions];
    stepList.splice(index, 1);
    setFormData({ ...formData, directions: stepList });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      description,
      images,
      preparation_time,
      cooking_time,
      portion,
      dish_type,
      ingredients,
      directions,
    } = formData;

    if (addOrEdit === "Add") {
      dispatch(
        recipeActions.createNewRecipe(
          name,
          description,
          images,
          preparation_time,
          cooking_time,
          portion,
          dish_type,
          ingredients,
          directions
        )
      );
    } else if (addOrEdit === "Edit") {
      dispatch(
        recipeActions.updateRecipe(
          selectedRecipe._id,
          name,
          description,
          images,
          dish_type,
          preparation_time,
          cooking_time,
          portion,
          ingredients,
          directions
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
    <Container className="recipe-editor-page">
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

        <Form.Group controlId="recipePrepTime">
          <Form.Label>Preparation time</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter value"
            name="preparation_time_value"
            value={formData.preparation_time?.value}
            min={0}
            onChange={handlePreparationTimeChange}
          />
          <Form.Control
            required
            as="select"
            name="preparation_time_unit"
            value={formData.preparation_time?.unit}
            onChange={handlePreparationTimeChange}
          >
            <option value="minute">Minute</option>
            <option value="second">Second</option>
            <option value="hour">Hour</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="recipeCookTime">
          <Form.Label>Cooking time</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter value"
            name="cooking_time_value"
            value={formData.cooking_time?.value}
            min={0}
            onChange={handleCookingTimeChange}
          />
          <Form.Control
            required
            as="select"
            name="cooking_time_unit"
            value={formData.cooking_time?.unit}
            onChange={handleCookingTimeChange}
          >
            <option value="minute">Minute</option>
            <option value="second">Second</option>
            <option value="hour">Hour</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="recipePortion">
          <Form.Label>No. of Servings</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter number of people"
            name="portion"
            value={formData.portion}
            min={0}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="recipeDishType">
          <Form.Label>Dish type</Form.Label>
          <Form.Control
            required
            as="select"
            name="dish_type"
            value={formData.dish_type}
            onChange={handleChange}
          >
            <option value="main dish">Main Dish</option>
            <option value="side dish">Side Dish</option>
            <option value="appetizer">Appetizer</option>
            <option value="soup">Soup</option>
            <option value="salad">Salad</option>
            <option value="dessert">Dessert</option>
            <option value="drink">Drink</option>
            <option value="vegan">Vegan</option>
            <option value="other">Other</option>
          </Form.Control>
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

        <Form.Group controlId="recipeIngredients">
          <Form.Label>Ingredients</Form.Label>
          {formData.ingredients?.map((item, index) => {
            return (
              <div className="ingredient-input-box" key={index}>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter ingredient name"
                  name="name"
                  value={item.name}
                  onChange={(e) => handleIngredientChange(e, index)}
                  className="ingredient-input"
                />
                <Form.Control
                  required
                  type="text"
                  // step="any"
                  placeholder="Enter amount"
                  name="amount"
                  // min={0}
                  value={item.amount}
                  onChange={(e) => handleIngredientChange(e, index)}
                  className="ingredient-input"
                />
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter unit"
                  name="unit"
                  value={item.unit}
                  onChange={(e) => handleIngredientChange(e, index)}
                  className="ingredient-input"
                />
                {formData.ingredients.length !== 1 && (
                  <button
                    type="button"
                    value="Remove"
                    className="btn btn-danger ingredient-remove-btn"
                    onClick={() => handleRemoveIngredientItem(index)}
                  >
                    Remove
                  </button>
                )}

                {formData.ingredients.length - 1 === index && (
                  <button
                    type="button"
                    value="Add"
                    className="btn btn-success ingredient-add-btn"
                    onClick={() => handleAddIngredientItem(index)}
                  >
                    Add
                  </button>
                )}
              </div>
            );
          })}
        </Form.Group>

        <Form.Group controlId="recipeDirections">
          <Form.Label>Directions</Form.Label>
          {formData.directions?.map((item, index) => {
            return (
              <div className="direction-input-box" key={index}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder={`Step ${index + 1}`}
                  name="step"
                  value={item.step}
                  onChange={(e) => handleDirectionChange(e, index)}
                  className="direction-input"
                />

                <div className="direction-btn-group">
                  {formData.directions.length !== 1 && (
                    <button
                      type="button"
                      value="Remove"
                      className=" direction-remove-btn"
                      onClick={() => handleRemoveDirectionStep(index)}
                    >
                      Remove
                    </button>
                  )}

                  {formData.directions.length - 1 === index && (
                    <button
                      type="button"
                      value="Add"
                      className=" direction-add-btn"
                      onClick={() => handleAddDirectionStep(index)}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </Form.Group>

        <ButtonGroup className="d-flex mb-3">
          {loading ? (
            <Button className="mr-3" variant="success" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Submitting...
            </Button>
          ) : (
            <Button className="mr-3" type="submit" variant="success">
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
