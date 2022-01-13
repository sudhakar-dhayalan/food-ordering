import { Fragment } from "react";
import { useContext } from "react";
import { useState } from "react/cjs/react.development";

import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  const onOrderHandler = () => {
    setIsCheckout(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClick}>
        Cancel
      </button>
      {hasItem && (
        <button className={classes.button} onClick={onOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const placeOrderHandler = async (userInput) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-food-ordering-450e8-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          userData: userInput,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);

    cartCtx.clear();
  };

  const modalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onClick} onConfirm={placeOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const submittingContent = <p>Order is getting submited...</p>;
  const submittedContent = (
    <Fragment>
      <p>Successfully placed the order</p>
      <button className={classes.button} onClick={props.onClick}>
        Cancel
      </button>
    </Fragment>
  );

  return (
    <Modal onCloseModal={props.onClick}>
      {!didSubmit && !isSubmitting && modalContent}
      {!didSubmit && isSubmitting && submittingContent}
      {didSubmit && submittedContent}
    </Modal>
  );
};

export default Cart;
