import { useRef, useState } from "react";
import classes from "./Checkout.module.css";
const isEmpty = (value) => value.trim().length === 0;
const fiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [overallValidity, setOverallValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  })

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const streetName = streetInputRef.current.value;
    const postalName = postalInputRef.current.value;
    const cityName = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const streetNameIsValid = !isEmpty(streetName);
    const cityNameIsValid = !isEmpty(cityName);
    const postalNameIsValid = fiveChars(postalName);

    setOverallValidity({
      name: enteredNameIsValid,
      street: streetNameIsValid,
      postal: postalNameIsValid,
      city: cityNameIsValid,
    })

    const formIsValid =
      enteredNameIsValid &&
      streetNameIsValid &&
      cityNameIsValid &&
      postalNameIsValid;

    if (!formIsValid) {
      return;
    }

    /// submit cart data
    props.onConfirm({enteredName,streetName,postalName,cityName})
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${overallValidity.name ? '' : classes.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!overallValidity.name && <p>Please fill your name correctly.</p>}
      </div>
      <div className={`${classes.control} ${overallValidity.street ? '' : classes.invalid}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!overallValidity.street && <p>Please fill your street correctly.</p>}
      </div>
      <div className={`${classes.control} ${overallValidity.postal ? '' : classes.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!overallValidity.postal && <p>Please fill your postal correctly.</p>}
      </div>
      <div className={`${classes.control} ${overallValidity.city ? '' : classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!overallValidity.city && <p>Please fill your city correctly.</p>}
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
