import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {[{ id: "1", name: "Food name", amount: 2, total: 88 }].map((item) => {
        return <li key={item.id}>{item.name}</li>;
      })}
    </ul>
  );

  const onOrderHandler = () => {
    console.log("Ordered");
    props.onClick();
  };

  return (
    <Modal onCloseModal={props.onClick}>
      {cartItems}
      <div className={classes.total}>
        <span>Total</span>
        <span>100</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClick}>
          Cancel
        </button>
        <button className={classes.button} onClick={onOrderHandler}>
          Order
        </button>
      </div>
    </Modal>
  );
};

export default Cart;
