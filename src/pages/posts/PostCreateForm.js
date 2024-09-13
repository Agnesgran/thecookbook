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

function PostCreateForm() {
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

  const textFields = (
    <div className="text-center">
      <Form.Group className={styles.customFormGroup}>
        <Form.Label>Recipe Name</Form.Label>
        <Form.Control
          type="text"
          name="recipe_name"
          value={recipe_name}
          onChange={handleChange}
          placeholder="Enter the recipe name"
          className={styles.customTextarea}
        />
      </Form.Group>

      <div className={styles.textFieldContainer}>
        <Form.Group className={styles.customFormGroup}>
          <Form.Label>Ingredients</Form.Label>
          <Form.Control
            as="textarea"
            name="ingredients"
            value={ingredients}
            onChange={handleChange}
            placeholder="List the ingredients"
            className={`${styles.customTextarea} ${styles.scrollableTextarea}`}
            style={{ minHeight: '100px' }}
          />
        </Form.Group>

        <Form.Group className={styles.customFormGroup}>
          <Form.Label>Instructions</Form.Label>
          <Form.Control
            as="textarea"
            name="instructions"
            value={instructions}
            onChange={handleChange}
            placeholder="Write the instructions"
            className={`${styles.customTextarea} ${styles.scrollableTextarea}`}
            style={{ minHeight: '150px' }}
          />
        </Form.Group>
      </div>

      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

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
  );

  const formStyle = {
    maxWidth: '600px',
    width: '100%',
    height: '100vh', 
    margin: '0 auto',
    padding: '15px',
    
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container
        style={formStyle}
        className={`${appStyles.Content} ${styles.formWrapper}`}
      >
        {textFields}
      </Container>
    </Form>
  );
}

export default PostCreateForm;
