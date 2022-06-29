import React, { useState, useEffect, useMemo } from 'react';
import MarvelService from '../../services/marvel.service';
import HeroCard from './hero-card.component';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as LogoLoader } from '../../assets/logo_loader.svg';
import { ReactComponent as SearchIcon } from '../../assets/ic_busca.svg';
import { ReactComponent as HeroicIcon } from '../../assets/ic_heroi.svg';
import { ReactComponent as ToggleOff } from '../../assets/toggle_off.svg';
import { ReactComponent as ToggleOn } from '../../assets/toggle_on.svg';
import { ReactComponent as Favorited } from '../../assets/favorito_01.svg';


import './heroes-list.style.css';
import '../_shared/loader.css';
import { useFavs } from '../../context/favorite.context';



function HeroesList(props) {

  const [filterOptions, setFilter] = useState({ showFavorite: false, });
  const [paginationOptions, setPagination] = useState({ currentPage: 1, pageSize: 20 })
  const [isLoading, setLoading] = useState(false);
  const [dataToShow, setDataToShow] = useState();

  const { favs } = useFavs();

  useEffect(() => {
    setLoading(true);
    MarvelService.getAllCharacters()
      .then(data => {
        const favorites = JSON.parse(localStorage.getItem('favs'));
        if (!favorites) localStorage.setItem("favs", JSON.stringify([]));
        setDataToShow(data?.data);
        setLoading(false)
      });
  }, []);



  useEffect(() => {
    setLoading(true);
    let filter = {};
    if (paginationOptions.pageSize) filter.limit = paginationOptions.pageSize;
    if (paginationOptions.currentPage > 1) filter.offset = (paginationOptions.currentPage - 1) * paginationOptions.pageSize;
    if (filterOptions.name) filter.nameStartsWith = filterOptions.name;
    if (!filterOptions.showFavorite) {
      MarvelService.getAllCharacters(filter)
        .then(data => {
          setDataToShow(data?.data);
          setLoading(false)
        });
    } else {
      let dataArray = favs;
      if (filterOptions.name) dataArray = favs.filter(t => t.name.toLowerCase().startsWith(filterOptions.name.toLowerCase()));
      setDataToShow({ results: dataArray, total: dataArray.length });
      setLoading(false)
    }
  }, [paginationOptions, favs, filterOptions]);

  useEffect(() => {
    setPagination({ currentPage: 1, pageSize: 20 });
  }, [filterOptions]);

  const handleChange = event => {
    setFilter(f => {
      return { ...f, ...{ name: event.target.value } }
    });
  };
  const handleOptionChange = event => {
    setPagination(f => {
      return { ...f, ...{ pageSize: event.target.value, currentPage: 1 } }
    })
  }
  function handleNextPage() {
    setPagination(f => {
      return { ...f, ...{ currentPage: paginationOptions.currentPage + 1 } }
    });
  }
  function handlePreviousPage() {
    setPagination(f => {
      return { ...f, ...{ currentPage: paginationOptions.currentPage - 1 } }
    });
  }

  function getCheckButton() {
    if (filterOptions.showFavorite) return <ToggleOn className="header-toggle-filter" onClick={onToggleFilter} />
    return <ToggleOff className="header-toggle-filter" onClick={onToggleFilter} />
  }

  function onToggleFilter() {
    setFilter(f => {
      return { ...f, ...{ showFavorite: !filterOptions.showFavorite } }
    })
  }

  if (dataToShow) {
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
                autocomplete="off"
                value={filterOptions.name} className="search-input" type='text' placeholder="Procure por heróis" />
            </div>
          </div>
        </div>
        <div className="header-filter">
          <div className="header-count-list">
            <p>Encontrados {dataToShow.total} heróis </p>
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
          <div className="header-pagination">
            <div className="select-page-size">
              Itens por pagina:
              <select value={paginationOptions.pageSize} onChange={handleOptionChange}>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div>
              {paginationOptions.currentPage === 1 ? 1 : (paginationOptions.pageSize * (paginationOptions.currentPage - 1)) + 1} - {(paginationOptions.pageSize * (paginationOptions.currentPage)) < dataToShow.total ? paginationOptions.pageSize * paginationOptions.currentPage : dataToShow.total} de {dataToShow.total}
            </div>
            <div>
              {paginationOptions.currentPage > 1 ? (<button className="pagination-btn" onClick={handlePreviousPage}>&lt; </button>) : <div></div>}

            </div>
            <div>
              {(paginationOptions.pageSize * (paginationOptions.currentPage)) > dataToShow.total ? <div></div> : (<button className="pagination-btn" onClick={handleNextPage}> &gt;</button>)}


            </div>
          </div>
        </div>


        {!isLoading ? <div className="list-div">
          {
            dataToShow.results.map((value) => {
              return <HeroCard hero={value} key={value.id} />
            })
          }</div> : <div className="showLoader">
          <div class="wrap-loader">
            <LogoLoader />
            <div className="loader"></div>
          </div></div>}


      </div>
    )
  } else {
    return (<div className="showLoaderFullScreen">
      <div class="wrap-loader">
        <LogoLoader />
        <div className="loader"></div>
      </div></div>)
  }
}
export default HeroesList;