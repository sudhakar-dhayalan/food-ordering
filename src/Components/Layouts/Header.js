import { Fragment } from "react/cjs/react.production.min";

import mealsImg from "../../assets/mealsImg.jpeg";
import classes from "./Header.module.css";
import HeaderCard from "./HeaderCard";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCard onClick={props.onShowCartHandler} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="A table full of delious meals!!!" />
      </div>
    </Fragment>
  );
};

export default Header;
