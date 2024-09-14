import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function RecipeDetail() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const { data } = await axiosReq.get(`/recipes/${id}/`);
        setRecipe(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchRecipe();
  }, [id]);

  return recipe ? (
    <div>
      <h2>{recipe.name}</h2>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <Link to={`/recipes/${recipe.id}/edit`}>Edit</Link>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default RecipeDetail;