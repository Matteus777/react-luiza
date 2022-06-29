import React from 'react';
import './heroes-list.style.css';
import { ReactComponent as Favorited } from '../../assets/favorito_01.svg';
import { ReactComponent as NotFavorited } from '../../assets/favorito_02.svg';
import { ReactComponent as Favorited2 } from '../../assets/favorito_03.svg';
import { Link, } from 'react-router-dom';
import { useEffect } from 'react';
import { useFavs } from '../../context/favorite.context';

function HeroCard(props) {

  const { favs, addFavorite, removeFavorite, isFavorite } = useFavs();
  return (
    <div className="wrap-data">
      <Link to={{ pathname: `/hero/${props.hero.id}` }} >
        <div className="colored">
          <img src={`${props.hero.thumbnail.path}/standard_xlarge.${props.hero.thumbnail.extension}`} alt="thumbnail" />
        </div>
      </Link>
      <div className="hero-data">
        <span>{props.hero.name}</span>
        {isFavorite(props.hero.id) ?
          <Favorited onClick={() => { removeFavorite(props.hero.id) }} /> :
          <NotFavorited onClick={() => { addFavorite(props.hero) }} />}
      </div>
    </div>
  );

}
export default HeroCard;