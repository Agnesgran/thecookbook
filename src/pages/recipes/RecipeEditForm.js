import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function RecipeEditForm() {
  const [postData, setPostData] = useState({
    recipe_name: "",
    ingredients: "",
    instructions: "",
    is_private: false,
  });
  const { recipe_name, ingredients, instructions, is_private } = postData;
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const { data } = await axiosReq.get(`/recipes/${id}/`);
        setPostData(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchRecipe();
  }, [id]);

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
      await axiosReq.patch(`/recipes/${id}/`, formData);
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
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Ingredients</Form.Label>
        <Form.Control
          as="textarea"
          name="ingredients"
          value={ingredients}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Instructions</Form.Label>
        <Form.Control
          as="textarea"
          name="instructions"
          value={instructions}
          onChange={handleChange}
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
      <Button type="submit">Update Recipe</Button>
    </Form>
  );
}

export default RecipeEditForm;