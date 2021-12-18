import { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layouts/Header";
import Meals from "./components/Meals/Meals";

function App() {
  const [cartIsShow, setShowIsCartShown] = useState(false);

  const showCartHandler = () => {
    setShowIsCartShown(true);
  };

  const hideCartHandler = () => {
    setShowIsCartShown(false);
  };

  return (
    <Fragment>
      {cartIsShow && <Cart onClick={hideCartHandler} />}
      <Header onShowCartHandler={showCartHandler} />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
