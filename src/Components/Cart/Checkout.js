import { useRef } from "react";
import { useState } from "react/cjs/react.development";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const nameInput = nameInputRef.current.value;
    const streetInput = streetInputRef.current.value;
    const postalCodeInput = postalCodeInputRef.current.value;
    const cityInput = cityInputRef.current.value;

    const nameInputIsValid = !isEmpty(nameInput);
    const streetInputIsValid = !isEmpty(streetInput);
    const cityInputIsValid = !isEmpty(cityInput);
    const postalCodeInputIsValid = isFiveChars(postalCodeInput);

    setFormValidity({
      name: nameInputIsValid,
      street: streetInputIsValid,
      city: cityInputIsValid,
      postalCode: postalCodeInputIsValid,
    });

    const formIsValid =
      nameInputIsValid &&
      streetInputIsValid &&
      cityInputIsValid &&
      postalCodeInputIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: nameInput,
      street: streetInput,
      postalCode: postalCodeInput,
      city: cityInput,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formValidity.street ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formValidity.name && <p>Enter your name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formValidity.street && <p>Enter your street name</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formValidity.postalCode && (
          <p>Enter your postalcode(must be of length 5)</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formValidity.city && <p>Enter name of your city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
