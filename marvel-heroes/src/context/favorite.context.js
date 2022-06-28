import { createContext, useCallback, useContext, useEffect, useState } from "react";

const FavoriteContext = createContext({});


const FavoriteProvider = ({ children }) => {
  const [favs, setFavs] = useState(() => {
    return JSON.parse(localStorage.getItem("favs") ?? '[]');
  });

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(favs));
  }, [favs])

  const addFavorite = useCallback((hero) => {
    if (favs.length < 5) {
      setFavs(f => [...f, hero]);
    }
  }, [favs.length]);

  const removeFavorite = useCallback((heroId) => {
    setFavs(f => f.filter(favoritedHero => favoritedHero.id !== heroId));
  }, [])

  const isFavorite = useCallback((heroId) => {
    return !!favs.find(f => f.id === heroId);
  }, [favs])

  return (
    <FavoriteContext.Provider value={{ favs, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  )
}

const useFavs = () => {
  const context = useContext(FavoriteContext)

  if (!context)
    throw new Error('Erro.')

  return context
}

export { useFavs, FavoriteProvider };
