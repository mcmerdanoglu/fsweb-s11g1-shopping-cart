import React, { useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";

//Context
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

const writeToLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const readFromLocalStorage = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};

const LSkey = "g0223";
const initializeCart = () => {
  const cart = readFromLocalStorage(LSkey);
  if (cart === null) {
    return [];
  } else {
    return cart;
  }
};

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState(/*[]*/ () => initializeCart());

  const addItem = (item) => {
    // verilen itemi sepete ekleyin
    const newCart = [...cart, item];
    setCart(newCart);
    writeToLocalStorage(LSkey, newCart);
  };

  const removeItem = (id) => {
    const newCart = [...cart];
    let CartIndex = newCart.findIndex((i) => i.id === id);
    newCart.splice(CartIndex, 1);
    setCart(newCart);
    writeToLocalStorage(LSkey, newCart);
  };

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart, removeItem }}>
          <Navigation /*cart={cart}*/ />

          {/* Routelar */}
          <main className="content">
            <Route exact path="/">
              <Products /*products={products} addItem={addItem}*/ />
            </Route>

            <Route path="/cart">
              <ShoppingCart /*cart={cart}*/ />
            </Route>
          </main>
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
