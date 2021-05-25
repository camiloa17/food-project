import { useContext, useEffect, useState } from 'react';
import CartContext from '../../../store/cart-context';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../../Cart/CartIcon';

export default function HeaderCartButton(props) {
  const [btnIsHighlighted, setBtnIsHighliged] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalItems = cartCtx.items.reduce(
    (curNumber, item) => curNumber + item?.amount,
    0
  );
  const buttonClass = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ''
  }`;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    } else {
      setBtnIsHighliged(true);
    }
   const timer= setTimeout(() => setBtnIsHighliged(false), 300);
   return ()=>clearTimeout(timer);
  }, [cartCtx.items]);
  return (
    <button className={buttonClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
}
