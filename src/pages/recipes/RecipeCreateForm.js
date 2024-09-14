import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function RecipeCreateForm() {
  const [postData, setPostData] = useState({
    recipe_name: "",
    ingredients: "",
    instructions: "",
    is_private: false,
  });
  const { recipe_name, ingredients, instructions, is_private } = postData;

  const history = useHistory();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setPostData({
      ...postData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('recipe_name', recipe_name);
    formData.append('ingredients', ingredients);
    formData.append('instructions', instructions);
    formData.append('is_private', is_private);

    try {
      await axiosReq.post("/recipes/", formData);
      history.push('/recipes');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Recipe Name</Form.Label>
        <Form.Control
          type="text"
          name="recipe_name"
          value={recipe_name}
          onChange={handleChange}
          placeholder="Enter the recipe name"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Ingredients</Form.Label>
        <Form.Control
          as="textarea"
          name="ingredients"
          value={ingredients}
          onChange={handleChange}
          placeholder="List the ingredients"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Instructions</Form.Label>
        <Form.Control
          as="textarea"
          name="instructions"
          value={instructions}
          onChange={handleChange}
          placeholder="Write the instructions"
        />
      </Form.Group>
      <Form.Group>
        <Form.Check
          type="checkbox"
          name="is_private"
          checked={is_private}
          onChange={handleChange}
          label="Keep this recipe private"
        />
      </Form.Group>
      <Button type="submit">Create Recipe</Button>
    </Form>
  );
}

export default RecipeCreateForm;