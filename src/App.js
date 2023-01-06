import './App.css';
import SearchPage from './SearchPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Recipedetailspage from './Recipedetailspage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchPage />}></Route>
          <Route path="recipe/:id" element={<Recipedetailspage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
