import React from 'react';
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

import './heroes-list.css';

class HeroesList extends React.Component {
  constructor() {
    super()
    this.state = { showFavorite: false, nameFilter: "" };
    this.onToggleFilter = this.onToggleFilter.bind(this);
  }

  componentDidMount() {
    MarvelService.getAllCharacters()
      .then(data => this.setState({ data }));
  }
  handleChange = event => {
    this.setState({ nameFilter: event.target.value }, () => {
      this.getCharacters();
    });

  };

  render() {

    if (this.state.data) {
      return (
        <div>
          <div className="header">
            <div className="header-image">
              <Logo />
            </div>
            <div className="header-title">EXPLORE O UNIVERSO</div>
            <div className="header-subtitle">Mergulhe no domínio deslumbrante de todos os personagens clássicos que voce ama - e aqueles que você descobrirá em breve!</div>
            <div className="header-search">
              <div className="header-div-input">
                <SearchIcon className="search-icon" />
                <SearchBar className="search-bar" />
                <input name="message"
                  onChange={this.handleChange}
                  value={this.state.filter} className="search-input" type='text' placeholder="Procure por heróis" />
                <div />
              </div>
            </div>

          </div>
          <div className="header-filter">

            <div className="header-count-list">
              <p>Encontrados {this.state.data.data.total} heróis </p>
            </div>
            <div className="header-filter-options">
              <div className="header-filter-order-option">
                <HeroicIcon />
                <span>Ordenar por nome - A/Z</span>
              </div>
              {this.getCheckButton()}
              <div className="header-filter-fav-option">
                <Favorited />
                <span>Somente favoritos</span>
              </div>
            </div>
          </div>
          <div className="list-div">

            {
              this.state.data.data.results.map((value) => {

                return <HeroCard hero={value} key={value.id} />
              })
            }</div>

        </div>
      )
    }
  }

  getCheckButton() {
    if (this.state.showFavorite) return <ToggleOn className="header-toggle-filter" onClick={this.onToggleFilter} />
    return <ToggleOff className="header-toggle-filter" onClick={this.onToggleFilter} />
  }
  onToggleFilter() {
    this.setState({ showFavorite: !this.state.showFavorite })
    this.getCharacters();
  }
  getCharacters() {
    let filter = {}

    if (this.state.nameFilter) filter.nameStartsWith = this.state.nameFilter;
    if (!this.state.showFavorite) filter.orderBy = "name";
    MarvelService.getAllCharacters(filter)
      .then(data => this.setState({ data }));
  }

}

export default HeroesList;