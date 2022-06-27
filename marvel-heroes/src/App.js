import HeroesList from './pages/heroes-list/heroes-list.page';
import MarvelService from './services/marvel.service'
import { Route, Routes,Redirect,Navigate } from 'react-router-dom';
import  HeroDetail  from './pages/hero-detail/hero-detail.page';
import './index.css';
function App() {

  return (
    <Routes>
      <Route
        path="*"
        element={<Navigate to="/home" replace />}
    />
      <Route path="/home" element={<HeroesList/>} />
      <Route path="/hero/:id" element={<HeroDetail  />} />

    </Routes>

  );
}

export default App;
