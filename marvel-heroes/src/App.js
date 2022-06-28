import HeroesList from './pages/heroes-list/heroes-list.page';
import MarvelService from './services/marvel.service'
import { Route, Routes, Redirect, Navigate } from 'react-router-dom';
import HeroDetail from './pages/hero-detail/hero-detail.page';
import './index.css';
import { FavoriteProvider } from './context/favorite.context';
function App() {

  return (
    <FavoriteProvider>
      <Routes>
        <Route
          path="*"
          element={<Navigate to="/home" replace />}
        />
        <Route path="/home" element={<HeroesList />} />
        <Route path="/hero/:id" element={<HeroDetail />} />

      </Routes>
    </FavoriteProvider>
  );
}

export default App;
