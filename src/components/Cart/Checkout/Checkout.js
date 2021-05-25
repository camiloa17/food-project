import classes from './Checkout.module.css';
import useInput from '../../../hooks/use-input';
const isNotEmpty = (value) => value.trim() !== '';
const isNotFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const {
    value: nameValue,
    isTouchedAndInvalid: nameHasError,
    isValidValue: nameIsValid,
    valueBlurHandler: nameBlurHandler,
    valueChangeHandler: nameChangeHandler,
  } = useInput(isNotEmpty);

  const {
    value: streetValue,
    isTouchedAndInvalid: streetHasError,
    isValidValue: streetIsValid,
    valueBlurHandler: streetBlurHandler,
    valueChangeHandler: streetChangeHandler,
  } = useInput(isNotEmpty);
  const {
    value: postalValue,
    isTouchedAndInvalid: postalHasError,
    isValidValue: postalIsValid,
    valueBlurHandler: postalBlurHandler,
    valueChangeHandler: postalChangeHandler,
  } = useInput(isNotFiveChars);
  const {
    value: cityValue,
    isTouchedAndInvalid: cityHasError,
    isValidValue: cityIsValid,
    valueBlurHandler: cityBlurHandler,
    valueChangeHandler: cityChangeHandler,
  } = useInput(isNotEmpty);

  const formIsValid =
    nameIsValid && streetIsValid && cityIsValid && postalIsValid;

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    const userDataAndReset = {
      name: nameValue,
      street: streetValue,
      city: cityValue,
      postal: postalValue,
    };
    props.onConfirm(userDataAndReset);
  };

  const nameControlClasses = `${classes.control} ${
    nameHasError && classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    streetHasError && classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    postalHasError && classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    cityHasError && classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          value={nameValue}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input
          type='text'
          id='street'
          value={streetValue}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && <p>Please enter a valid street</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input
          type='text'
          id='postal'
          value={postalValue}
          onBlur={postalBlurHandler}
          onChange={postalChangeHandler}
        />
        {postalHasError && <p>Please enter a valid postal code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          id='city'
          value={cityValue}
          onBlur={cityBlurHandler}
          onChange={cityChangeHandler}
        />
        {cityHasError && <p>Please enter a valid city five characters</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
