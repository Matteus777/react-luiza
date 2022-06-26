import HeroesList from './pages/heroes-list/heroes-list.page';
import MarvelService from './services/marvel.service'
import { Route, Routes,Redirect,Navigate } from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route
        path="*"
        element={<Navigate to="/home" replace />}
    />
      <Route path="/home" element={<HeroesList name="teste" className="home-list" />} />

    </Routes>

  );
}

export default App;
