import React, { useState } from 'react';
import { ReactComponent as Logo } from '../../assets/logo_menor.svg';
import { ReactComponent as SearchBar } from '../../assets/search_bar_branco.svg';
import { ReactComponent as SearchIcon } from '../../assets/ic_busca_menor.svg';
import { ReactComponent as Favorited } from '../../assets/favorito_01.svg';
import { ReactComponent as NotFavorited } from '../../assets/favorito_02.svg';
import { ReactComponent as Filmes } from '../../assets/ic_trailer.svg';
import { ReactComponent as Quadrinhos } from '../../assets/ic_quadrinhos.svg';
import { ReactComponent as FillStar } from '../../assets/avaliacao_on.svg';
import { ReactComponent as EmptyStar } from '../../assets/avaliacao_off.svg';
import HeroComicItem from './hero-detail-comic-item';
import moment from 'moment';
import * as Vibrant from 'node-vibrant';


import { useParams, withRouter, } from 'react-router-dom';


import './hero-detail.style.css';
import MarvelService from '../../services/marvel.service';
import { useEffect } from 'react';
import { useFavs } from '../../context/favorite.context';

function HeroDetail(props) {

  const params = useParams();
  const [heroId, setHeroId] = useState(params.id);
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [hero, setHero] = useState();
  const [heroName, setHeroName] = useState();
  const [ratingStars, setRating] = useState(1);
  const [lastComic, setLastComic] = useState("");
  const [last10Comics, setLast10Comics] = useState([]);
  const [nameFilter, setNameFilter] = useState("");


  const { favs, addFavorite, removeFavorite, isFavorite } = useFavs();

  const handleChange = event => {
    setNameFilter(event.target.value);
  };
  useEffect(() => {
    MarvelService.getCharacterById(heroId).then((value) => {
      MarvelService.getComicsById(heroId).then((comics) => {
        moment.locale('pt-br');
        setLast10Comics(comics.data.results.slice(0, 10));
        let hero = value.data.results[0];
        hero.comicImage = "";
        if (comics.data.results.length > 0) {
          const lastComic = comics.data.results[0].dates.find(key => key.type === "onsaleDate");
          let formatedDate = new Date(lastComic.date).toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/de /g, '');
          setLastComic(formatedDate);
          hero.comicImage = comics.data.results[0].thumbnail.path + "/landscape_xlarge." + comics.data.results[comics.data.results.length - 1].thumbnail.extension;
        }
        let v = new Vibrant(`${hero.thumbnail.path}/portrait_uncanny.${hero.thumbnail.extension}`);
        v.getPalette().then((palette) => {
          setBgColor(palette.DarkVibrant.getHex() + "22");
          setHero(hero);
          setHeroName(hero.name.substring(0, hero.name.indexOf(" ") > 0 ? hero.name.indexOf(" ") : hero.name.length));
          const fillStars = Math.floor(Math.random() * (Math.floor(5) - Math.ceil(1) + 1) + 1);
          setRating(fillStars);
        })

      })
    });
  }, [heroId]);


  return (hero ? (<div className="hero-detail-bg" style={{ backgroundColor: bgColor }}>
    <div className="hero-detail-main">
      <div className="hero-detail-header">
        <Logo className="hero-detail-header-logo" />
        <div className="hero-detail-header-div-input">
          <SearchIcon className="hero-detail-header-search-icon" />
          <input name="message"
            onChange={handleChange}
            value={nameFilter} className="search-input-hero-detail" type='text' placeholder="Procure por heróis" />
        </div>
      </div>
      <div className="hero-detail-main-content">
        <div className="hero-detail-main-wrap-content-data">
          <div className="hero-detail-main-content-data">
            <div className="hero-detail-main-content-hero-name">
              <h1>{hero.name}</h1>
              {isFavorite(hero.id) ?
                <Favorited onClick={() => { removeFavorite(hero.id) }} /> :
                <NotFavorited onClick={() => { addFavorite(hero) }} />}
            </div>
            <div className="hero-detail-main-content-hero-description">
              <p>
                {hero.description}
              </p>
            </div>
            <div className="hero-detail-main-content-hero-releases">
              <div className="hero-detail-main-content-hero-comics">
                <div className="hero-detail-main-content-hero-comics-title">Quadrinhos</div>
                <div className="hero-detail-main-content-hero-comics-count">
                  <Quadrinhos />
                  <div>{hero.comics.available}</div>
                </div>
              </div>
              <div className="hero-detail-main-content-hero-comics">
                <div className="hero-detail-main-content-hero-comics-title">Filmes</div>
                <div className="hero-detail-main-content-hero-comics-count">
                  <Filmes />
                  <div>{hero.series.available}</div>
                </div>
              </div>

            </div>
            <div className="hero-detail-main-content-hero-rating">
              Rating: {([...Array(ratingStars)]).map(i => <FillStar key={i} />)}
              {([...Array(5 - ratingStars)]).map(i => <EmptyStar key={i} />)}
            </div>
            <div className="hero-detail-main-content-hero-last-comic">
              <span>Ultimo quadrinho:    </span>{lastComic}
            </div>


          </div>

        </div>
        <div className="hero-detail-main-content-images">
          <img className="hero-image" src={`${hero.thumbnail.path}/portrait_uncanny.${hero.thumbnail.extension}`} alt="Hero" />
          <img className="hero-image-mobile" src={`${hero.thumbnail.path}/landscape_xlarge.${hero.thumbnail.extension}`} alt="Hero" />

          {hero.comicImage ? <img className="hero-comic-image" src={`${hero.comicImage}`} alt="trailer"></img> : <div></div>}
        </div>


      </div>
      <div className="hero-detail-main-content-hero-last-releases">
        <div className="hero-detail-main-content-hero-last-releases-title"> <h2>Ultimos Lançamentos</h2></div>
        <div className="comics-list">
          {
            last10Comics.map((value) => {
              return <HeroComicItem comic={value} key={value.id} />
            })
          }
        </div>
      </div>
      <div className="hero-detail-bg-name">{heroName}</div>
    </div>


  </div>) : <div></div>)
}
export default HeroDetail;

