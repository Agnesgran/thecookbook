import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function PostCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    recipe_name: "",
    ingredients: "",
    instructions: "",
  });
  const { recipe_name, ingredients, instructions } = postData;

  const history = useHistory();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Client-side validation
    const validationErrors = {};

    if (!recipe_name.trim()) {
      validationErrors.recipe_name = "Recipe name is required.";
    }
    if (!ingredients.trim()) {
      validationErrors.ingredients = "Ingredients are required.";
    }
    if (!instructions.trim()) {
      validationErrors.instructions = "Instructions are required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If validation passes, proceed with form submission
    const formData = new FormData();

    formData.append('recipe_name', recipe_name);
    formData.append('ingredients', ingredients);
    formData.append('instructions', instructions);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Container
        style={{ maxWidth: '600px', width: '100%', height: '100vh', margin: '0 auto', padding: '15px' }}
        className={`${appStyles.Content} ${styles.formWrapper}`}
      >
        <div className="text-center">
          <Form.Group className={styles.customFormGroup}>
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control
              type="text"
              name="recipe_name"
              value={recipe_name}
              onChange={handleChange}
              placeholder="Enter the recipe name"
              style={{ marginBottom: '0' }}
            />
            {errors.recipe_name && (
              <Alert variant="warning" style={{ marginTop: '0.5rem' }}>
                {errors.recipe_name}
              </Alert>
            )}
          </Form.Group>

          <Form.Group className={styles.customFormGroup}>
            <Form.Label>Ingredients</Form.Label>
            <Form.Control
              as="textarea"
              name="ingredients"
              value={ingredients}
              onChange={handleChange}
              placeholder="List the ingredients"
              style={{ minHeight: '100px', marginBottom: '0' }}
            />
            {errors.ingredients && (
              <Alert variant="warning" style={{ marginTop: '0.5rem' }}>
                {errors.ingredients}
              </Alert>
            )}
          </Form.Group>

          <Form.Group className={styles.customFormGroup}>
            <Form.Label>Instructions</Form.Label>
            <Form.Control
              as="textarea"
              name="instructions"
              value={instructions}
              onChange={handleChange}
              placeholder="Write the instructions"
              style={{ minHeight: '150px', marginBottom: '0' }}
            />
            {errors.instructions && (
              <Alert variant="warning" style={{ marginTop: '0.5rem' }}>
                {errors.instructions}
              </Alert>
            )}
          </Form.Group>

          <Button
            className={`${btnStyles.Button} ${btnStyles.Dark}`}
            onClick={() => history.goBack()}
          >
            Cancel
          </Button>
          <Button className={`${btnStyles.Button} ${btnStyles.Dark}`} type="submit">
            Create
          </Button>
        </div>
      </Container>
    </Form>
  );
}

export default PostCreateForm;

