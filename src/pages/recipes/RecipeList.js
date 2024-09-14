import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const { data } = await axiosReq.get("/recipes/");
        setRecipes(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchRecipes();
  }, []);

  return (
    <div>
      <h2>My Recipes</h2>
      <Link to="/recipes/create">
        <Button>Create New Recipe</Button>
      </Link>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
            <Link to={`/recipes/${recipe.id}/edit`}>
              <Button>Edit</Button>
            </Link>
            <Button onClick={() => handleDelete(recipe.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

async function handleDelete(id) {
  try {
    await axiosReq.delete(`/recipes/${id}/`);
    // Refresh the list or redirect
  } catch (err) {
    console.error(err);
  }
}

export default RecipeList;