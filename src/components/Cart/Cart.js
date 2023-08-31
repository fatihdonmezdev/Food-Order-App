import { Fragment, useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [submitCheck, setSubmitCheck] = useState(false);
  const [submittingCheck, setSubmittingCheck] = useState(false);
  const [formDisplay, setFormDisplay] = useState(false);
  const orderHandler = () => {
    setFormDisplay(true);
  };
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const submitOrderHandler = async (userData) => {
    setSubmittingCheck(true);
    await fetch(
      "https://react-project-ab92f-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setSubmittingCheck(false);
    setSubmitCheck(true);
    cartCtx.clearCart()
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModel = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {formDisplay && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!formDisplay && modalActions}
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!submitCheck && !submittingCheck && cartModel}
      {submittingCheck && <p>Your order is being submitted,please wait.</p>}
      {submitCheck && (
        <Fragment>
          <p>Your order has been sent!</p>
          <button onClick={props.onClose}>
            Close
          </button>
        </Fragment>
      )}
    </Modal>
  );
};

export default Cart;
