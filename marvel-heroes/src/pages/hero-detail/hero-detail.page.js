import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo_menor.svg';
import { ReactComponent as SearchBar } from '../../assets/search_bar_branco.svg';
import { ReactComponent as SearchIcon } from '../../assets/ic_busca_menor.svg';
import { ReactComponent as NotFavorited } from '../../assets/favorito_02.svg';
import { ReactComponent as Filmes } from '../../assets/ic_trailer.svg';
import { ReactComponent as Quadrinhos } from '../../assets/ic_quadrinhos.svg';
import * as Vibrant from 'node-vibrant';


import { useParams, withRouter } from 'react-router-dom';


import './hero-detail.style.css';
import MarvelService from '../../services/marvel.service';


class HeroDetail extends React.Component {
  constructor(props) {
    super(props);
    const { id } = this.props.params;

    this.state = { id: id };
    this.fetchCharacter();
  }


  render() {
    return this.state.hero ? (<div className="hero-detail-bg" style={{ backgroundColor: this.state.color }}>
      <div className="hero-detail-main">
        <div className="hero-detail-header">
          <Logo className="hero-detail-header-logo" />
          <div className="hero-detail-header-div-input">
            <SearchIcon className="hero-detail-header-search-icon" />
            <SearchBar className="hero-detail-header-search-bar" />
          </div>
        </div>

        <div className="hero-detail-main-content">
          <div className="hero-detail-main-wrap-content-data">
            <div className="hero-detail-main-content-data">
              <div className="hero-detail-main-content-hero-name">
                <h1>{this.state.hero.name}</h1>
                <NotFavorited />
              </div>
              <div className="hero-detail-main-content-hero-description">
                <p>
                  {this.state.hero.description}
                </p>
              </div>
              <div className="hero-detail-main-content-hero-releases">
                <div className="hero-detail-main-content-hero-comics">
                  <div className="hero-detail-main-content-hero-comics-title">Quadrinhos</div>
                  <div className="hero-detail-main-content-hero-comics-count">
                    <Quadrinhos />
                    <div>{this.state.hero.comics.available}</div>
                  </div>
                </div>
                <div className="hero-detail-main-content-hero-comics">
                  <div className="hero-detail-main-content-hero-comics-title">Filmes</div>
                  <div className="hero-detail-main-content-hero-comics-count">
                    <Filmes />
                    <div>{this.state.hero.series.available}</div>
                  </div>
                </div>
                <div className="hero-detail-main-content-hero-rating">

                </div>
              </div>
            </div>

          </div>
          <div className="hero-detail-main-content-images">
            <img className="hero-image" src={`${this.state.hero.thumbnail.path}/portrait_uncanny.${this.state.hero.thumbnail.extension}`} alt="Hero" />
            {this.state.hero.comicImage ? <img className="hero-comic-image" src={`${this.state.hero.comicImage}`} alt="trailer"></img> : <div></div>}

          </div>

        </div>
      </div>


    </div>) : <div></div>
  }


  fetchCharacter() {
    MarvelService.getCharacterById(this.state.id).then((value) => {
      MarvelService.getComicsById(this.state.id).then((comics) => {
        let hero = value.data.results[0];
        hero.comicImage = "";
        if (comics.data.results.length > 0) {
          hero.comicImage = comics.data.results[comics.data.results.length - 1].thumbnail.path + "/landscape_xlarge." + comics.data.results[comics.data.results.length - 1].thumbnail.extension;
        }
        let v = new Vibrant(`${hero.thumbnail.path}/portrait_uncanny.${hero.thumbnail.extension}`);
        v.getPalette().then((palette) => {
          this.setState({ color: palette.DarkVibrant.getHex() + "22" }, () => {
            this.setState({ hero: hero });
          })
        })

      })
    });

  }
}
export default (props) => (
  <HeroDetail
    {...props}
    params={useParams()}
  />
);

