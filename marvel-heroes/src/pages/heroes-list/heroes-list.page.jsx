import React, { useState, useEffect, useMemo } from 'react';
import MarvelService from '../../services/marvel.service';
import HeroCard from './hero-card.component';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as SearchBar } from '../../assets/search_bar_vermelho.svg';
import { ReactComponent as SearchIcon } from '../../assets/ic_busca.svg';
import { ReactComponent as HeroicIcon } from '../../assets/ic_heroi.svg';
import { ReactComponent as ToggleOff } from '../../assets/toggle_off.svg';
import { ReactComponent as ToggleOn } from '../../assets/toggle_on.svg';
import { ReactComponent as Favorited } from '../../assets/favorito_01.svg';
import { ReactComponent as NotFavorited } from '../../assets/favorito_02.svg';
import { ReactComponent as Favorited2 } from '../../assets/favorito_03.svg';

import './heroes-list.style.css';
import { useFavs } from '../../context/favorite.context';



function HeroesList(props) {

  const [data, setData] = useState();
  const [showFavorite, setShowFavorite] = useState(false);
  const [nameFilter, setNameFilter] = useState("");


  const { favs } = useFavs();

  useEffect(() => {
    MarvelService.getAllCharacters()
      .then(data => {
        const favorites = JSON.parse(localStorage.getItem('favs'));
        if (!favorites) localStorage.setItem("favs", JSON.stringify([]));
        setData(data)
      });
  }, []);

  useEffect(() => {
    let filter = {};
    if (nameFilter) filter.nameStartsWith = nameFilter;
    if (!showFavorite) filter.orderBy = "name";
    MarvelService.getAllCharacters(filter)
      .then(data => setData(data));
  }, [nameFilter, showFavorite]);




  const handleChange = event => {
    setNameFilter(event.target.value);
  };
  function getCheckButton() {
    if (showFavorite) return <ToggleOn className="header-toggle-filter" onClick={onToggleFilter} />
    return <ToggleOff className="header-toggle-filter" onClick={onToggleFilter} />
  }

  function onToggleFilter() {
    setShowFavorite(!showFavorite)
  }
  const dataToShow = showFavorite ? favs : data?.data.results;

  if (data) {
    return (
      <div className="home-list">
        <div className="header">
          <div className="header-image">
            <Logo />
          </div>
          <div className="header-title">EXPLORE O UNIVERSO</div>
          <div className="header-subtitle">Mergulhe no domínio deslumbrante de todos os personagens clássicos que voce ama - e aqueles que você descobrirá em breve!</div>
          <div className="header-search">
            <div className="header-div-input">
              <SearchIcon className="search-icon" />
              <input name="message"
                onChange={handleChange}
                value={nameFilter} className="search-input" type='text' placeholder="Procure por heróis" />
            </div>
          </div>
        </div>
        <div className="header-filter">
          <div className="header-count-list">
            <p>Encontrados {data.data.total} heróis </p>
          </div>
          <div className="header-filter-options">
            <div className="header-filter-order-option">
              <HeroicIcon />
              <span>Ordenar por nome - A/Z</span>
            </div>
            {getCheckButton()}
            <div className="header-filter-fav-option">
              <Favorited />
              <span>Somente favoritos</span>
            </div>
          </div>
        </div>
        <div className="list-div">
          {
            dataToShow.map((value) => {
              return <HeroCard hero={value} key={value.id} />
            })
          }</div>
      </div>
    )
  }
}
export default HeroesList;