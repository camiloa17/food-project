import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import classes from './Cart.module.css';
import CartItem from './CartItem/CartItem';
import Modal from '../UI/Modal/Modal';
import Checkout from './Checkout/Checkout';
import useFetch from '../../hooks/use-fetch';

export default function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const handleOrderPost = (message) => {
    if (message.name) {
      setIsSubmited(true);
      cartCtx.clearCart();
    }
  };

  const {
    sendRequest: postOrder,
    isLoading: submitLoading,
    error: submitError,
    abortRequest,
  } = useFetch(handleOrderPost);
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    postOrder({
      url: 'https://food-app-d0ee8-default-rtdb.firebaseio.com/orders.json',
      method: 'POST',
      body: { user: userData, orderItems: cartCtx.items },
    });
  };

  useEffect(() => {
    return () => {
      abortRequest();
    };
  }, [abortRequest]);
  const cartItem = cartCtx.items.map((meal) => (
    <CartItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      amount={meal.amount}
      onRemove={cartItemRemoveHandler.bind(null, meal.id)}
      onAdd={cartItemAddHandler.bind(null, { ...meal, amount: 1 })}
    />
  ));

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const modalContent = (
    <React.Fragment>
      <ul className={classes['cart-items']}>{cartItem}</ul>
      <div className={classes.total}>
        <span>Total amout</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );
  const isSubmittingModalContent = <p>Sending data...</p>;
  const didSumitModalContent = <p>Data sent seccuessfull</p>;
  const errorSubmittingModalContent = <p>Something went wrong</p>;
  return (
    <Modal onClose={props.onClose}>
      {!submitLoading && !submitError && !isSubmited && modalContent}
      {submitLoading && !submitError && !isSubmited && isSubmittingModalContent}
      {!submitLoading && !submitError && isSubmited && didSumitModalContent}
      {!submitLoading && submitError && errorSubmittingModalContent}
    </Modal>
  );
}
