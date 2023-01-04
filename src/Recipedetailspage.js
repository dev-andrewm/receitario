import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchdata() {
      setLoading(true);

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setRecipe(data.meals);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    }

    fetchdata();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  if (!recipe) {
    return <div>Nenhuma receita encontrada</div>;
  }
  console.log(recipe);
  return <div>{`${recipe[0].strMeasure1} ${recipe[0].strIngredient1}`}</div>;
};

export default RecipeDetailsPage;
