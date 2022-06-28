import React from 'react';
import './hero-detail.style.css';
import { ReactComponent as Favorited } from '../../assets/favorito_01.svg';
import { ReactComponent as NotFavorited } from '../../assets/favorito_02.svg';
import { ReactComponent as Favorited2 } from '../../assets/favorito_03.svg';
import { Link, } from 'react-router-dom';

function HeroComicItem(props) {
  return (
    <div className="wrap-data">
        <div className="thumb">
          <img src={`${props.comic.thumbnail.path}/standard_xlarge.${props.comic.thumbnail.extension}`} alt="thumbnail"/>
        </div>
      <div className="comic-data">
        <span>{props.comic.title}</span>
      </div>
    </div>
  );

}
export default HeroComicItem;