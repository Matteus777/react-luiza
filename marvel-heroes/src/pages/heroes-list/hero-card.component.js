import React from 'react';
import './heroes-list.style.css';
import { ReactComponent as Favorited } from '../../assets/favorito_01.svg';
import { ReactComponent as NotFavorited } from '../../assets/favorito_02.svg';
import { ReactComponent as Favorited2 } from '../../assets/favorito_03.svg';
import { Link,  } from 'react-router-dom';

class HeroCard extends React.Component {
  render() {
    return (
      <div className="wrap-data">
        <Link to={{pathname:`/hero/${this.props.hero.id}`}} >
          <div className="colored">
            <img src={`${this.props.hero.thumbnail.path}/standard_xlarge.${this.props.hero.thumbnail.extension}`} alt="thumbnail" height='200px' width='200px' />
          </div>
        </Link>
        <div className="hero-data">
          <span>{this.props.hero.name}</span>

          <NotFavorited />


        </div>
      </div>
    );
  }
}
export default HeroCard;