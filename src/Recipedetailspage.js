import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

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
    return <div className="loader"></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!recipe) {
    return <div>No recipes found</div>;
  }

  return (
    <>
      <Link className="link-back" to={'/'}>
        &lt;&lt;Back
      </Link>
      <div className="recipe-details-box">
        <div className="recipe-details">
          <h1>{recipe[0].strMeal}</h1>
          <p>Ingredients:</p>
          <ul>
            {Object.entries(recipe[0])
              .filter(
                ([key, value]) =>
                  /^strIngredient\d+$/.test(key) &&
                  value !== '' &&
                  value !== null,
              )
              .map(([key, value]) => (
                <li>
                  {`${recipe[0][`strMeasure${key.match(/\d+/)[0]}`]} ${value}`}
                </li>
              ))}
          </ul>
          <p>Instructions:</p>
          <p>{recipe[0].strInstructions}</p>
        </div>
        <div className="recipe-img">
          <img src={recipe[0].strMealThumb} alt="Recipe" />
        </div>
      </div>
    </>
  );
};

export default RecipeDetailsPage;
