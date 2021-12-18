import { useState } from "react";

import Cart from "./components/Cart/Cart";
import Header from "./components/Layouts/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShow, setShowIsCartShown] = useState(false);

  const showCartHandler = () => {
    setShowIsCartShown(true);
  };

  const hideCartHandler = () => {
    setShowIsCartShown(false);
  };

  return (
    <CartProvider>
      {cartIsShow && <Cart onClick={hideCartHandler} />}
      <Header onShowCartHandler={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
