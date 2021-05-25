import React from 'react';
import classes from './Header.module.css';
import mealsImage from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton/HeaderCartButton';

export default function Header(props) {
  return <React.Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onCartOpen} />
      </header>
      <div className={classes['main-image']}>
          <img src={mealsImage} alt='A table full of food' />
      </div>
  </React.Fragment>;
}
