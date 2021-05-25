import { useState } from 'react';

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [enteredValueIsTouched, setEnteredValueIsTouched] = useState(false);

  const enteredValueIsValid = validateValue(enteredValue);
  const isTouchedAndInvalid = !enteredValueIsValid && enteredValueIsTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const valueBlurHandler = () => {
    setEnteredValueIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setEnteredValueIsTouched(false);
  };

  return {
    value: enteredValue,
    isValidValue: enteredValueIsValid,
    isTouchedAndInvalid,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInput;
