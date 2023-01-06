import lupa from './lupa.svg';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Recipedetailspage from './Recipedetailspage';

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`,
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setResults(data.meals);
    } catch (e) {
      setError(e.message);
    }

    setLoading(false);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <BrowserRouter>
      <h1>Search for your favorite recipe</h1>
      <div className="search-box">
        <input
          className="meal-input-field"
          type="text"
          placeholder="Dish name"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <img className="lupa" src={lupa} alt="" onClick={handleClick} />
      </div>
      {loading && <div className="loader"></div>}
      {error && <div>{error}</div>}
      {results !== null ? (
        <div className="recipes-box">
          {results.map((result) => (
            <Link
              className="link"
              key={result.idMeal}
              to={`/recipe/${result.idMeal}`}
            >
              <div className="recipe__box">
                <p>{result.strMeal}</p>
                <img
                  className="recipe__image"
                  src={result.strMealThumb}
                  alt="Meal"
                />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="no-results">No results found!</div>
      )}
      <Routes>
        <Route path="recipe/:id" element={<Recipedetailspage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default SearchPage;
